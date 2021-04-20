import * as React from "react"
import Head from "next/head"
import { useRouter } from "next/router"

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export default function NextGA({ trackingId }) {
  const router = useRouter()

  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  const pageview = (/** @type {URL} */ url) => {
    window.gtag("config", trackingId, {
      page_path: url,
    })
  }

  const handleRouteChange = (/** @type {URL} */ url) => {
    /* invoke analytics function only for production */
    if (isProduction) pageview(url)
  }

  React.useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  return (
    <>
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
    </>
  )
}
