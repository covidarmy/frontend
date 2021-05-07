import "../styles/index.css"
import "inter-ui/inter.css"
import "react-static-tweets/styles.css"
import * as React from "react"
import NextGA from "~/components/NextGA"
import { DefaultSeo } from "next-seo"
import { defaultSeoProps, isProduction } from "~/constants"
import SlugProvider from "~/context/slug"

function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <NextGA
        disabled={!isProduction}
        trackingId={process.env.NEXT_PUBLIC_GA_TRACKING_ID}
      >
        <SlugProvider>
          <Component {...pageProps} />
        </SlugProvider>
      </NextGA>
    </>
  )
}

export default App
