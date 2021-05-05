import * as React from "react"
import "../styles/index.css"
import "inter-ui/inter.css"
import { DefaultSeo } from "next-seo"
import { defaultSeoProps, isProduction } from "~/constants"
import NextGA from "~/components/NextGA"
import "react-static-tweets/styles.css"
import DataProvider from "~/context/data"
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
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </SlugProvider>
      </NextGA>
    </>
  )
}

export default App
