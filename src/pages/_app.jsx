import "../styles/index.css"
import "inter-ui/inter.css"
import "react-static-tweets/styles.css"
import * as React from "react"
import NextGA from "~/components/NextGA"
import { DefaultSeo } from "next-seo"
import { defaultSeoProps, isProduction } from "~/constants"
import SlugProvider from "~/context/slug"
import TranslationProvider from "~/context/translation"

function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <NextGA
        disabled={!isProduction}
        trackingId={process.env.NEXT_PUBLIC_GA_TRACKING_ID}
      >
        <TranslationProvider>
          <SlugProvider>
            <Component {...pageProps} />
          </SlugProvider>
        </TranslationProvider>
      </NextGA>
    </>
  )
}

export default App
