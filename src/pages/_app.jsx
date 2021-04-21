import * as React from "react"
import "../styles/index.css"
import "inter-ui/inter.css"
import { initFirebase } from "~/lib/firebase"
import { DefaultSeo } from "next-seo"
import { defaultSeoProps } from "~/seo.config"
import { isProduction } from "~/constants"
import NextGA from "~/components/NextGA"
import "react-static-tweets/styles.css"

function App({ Component, pageProps }) {
  React.useEffect(() => {
    initFirebase()
  }, [])

  return (
    <>
      {isProduction && (
        <NextGA trackingId={process.env.NEXT_PUBLIC_GA_TRACKING_ID} />
      )}
      <DefaultSeo {...defaultSeoProps} />
      <Component {...pageProps} />
    </>
  )
}

export default App
