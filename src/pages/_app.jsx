import * as React from "react"
import "../styles/index.css"
import "inter-ui/inter.css"
import { DefaultSeo } from "next-seo"
import { defaultSeoProps, isProduction } from "~/constants"
import NextGA from "~/components/NextGA"
import "react-static-tweets/styles.css"
import Head from "next/head"

function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <NextGA
        disabled={!isProduction}
        trackingId={process.env.NEXT_PUBLIC_GA_TRACKING_ID}
      >
        <Component {...pageProps} />
      </NextGA>
    </>
  )
}

export default App
