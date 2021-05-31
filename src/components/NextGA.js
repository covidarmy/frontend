import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const context = React.createContext(undefined);

export default function NextGA({ trackingId, children, disabled = false }) {
  const router = useRouter();

  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  const pageview = (/** @type {URL} */ url) => {
    window.gtag("config", trackingId, {
      page_path: url,
    });
  };

  const handleRouteChange = (/** @type {URL} */ url) => {
    /* invoke analytics function only for production */
    pageview(url);
  };

  // https://developers.google.com/analytics/devguides/collection/gtagjs/events
  const event = ({ action, category, label, value }) => {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };

  React.useEffect(() => {
    if (!disabled) {
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <>
      {!disabled && (
        <Head>
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${trackingId}', {
                page_path: window.location.pathname,
              });
          `,
              }}
            />
          </>
        </Head>
      )}
      <context.Provider value={{ event, pageview }}>
        {children}
      </context.Provider>
    </>
  );
}
