import "../styles/index.css"
import "inter-ui/inter.css"
import "react-static-tweets/styles.css"
import * as React from "react"
import DataProvider from "~/context/data"
import NextGA from "~/components/NextGA"
import SlugProvider from "~/context/slug"
import { DefaultSeo } from "next-seo"
import { defaultSeoProps, isProduction } from "~/constants"
import NextGA from "~/components/NextGA"
import "react-static-tweets/styles.css"
import SlugProvider from "../context/slug"
import DataProvider from "../context/data"

function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <NextGA
        disabled={!isProduction}
        trackingId={process.env.NEXT_PUBLIC_GA_TRACKING_ID}
      >
        <SlugProvider>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </SlugProvider>
      </NextGA>
    </>
  )
}

export default App
