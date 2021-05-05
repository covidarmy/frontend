import * as React from "react"
import "../styles/index.css"
import "inter-ui/inter.css"
import { DefaultSeo } from "next-seo"
import { defaultSeoProps, isProduction } from "@/constants"
import NextGA from "@/components/NextGA"
import "react-static-tweets/styles.css"
import Head from "next/head"
import NextClarity from "@/components/NextClarity"
// import '../../manifest.json'
// import '../../service-worker'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          crossOrigin="use-credentials"
          rel="manifest"
          href="/static/manifest.json"
        ></link>
        <script src="/static/service-worker.js"></script>
      </Head>

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
