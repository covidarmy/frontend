import * as React from "react"
import "../styles/index.css"
import "inter-ui/inter.css"
import { initFirebase } from "~/utils/firebase"
import { DefaultSeo } from "next-seo"
import { defaultSeoProps } from "~/seo.config"
import NextGA from "~/components/NextGA"

function MyApp({ Component, pageProps }) {
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

export default MyApp
