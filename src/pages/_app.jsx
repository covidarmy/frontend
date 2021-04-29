import * as React from "react"
import "../styles/index.css"
import "inter-ui/inter.css"
import { DefaultSeo } from "next-seo"
import { defaultSeoProps, isProduction } from "~/constants"
import NextGA from "~/components/NextGA"
import "react-static-tweets/styles.css"
import Head from "next/head"
import NextClarity from "~/components/NextClarity"

function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <NextClarity id={process.env.NEXT_PUBLIC_CLARITY_ID} />
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
