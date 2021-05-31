import * as React from 'react'
import '~/styles/index.css'
import 'react-static-tweets/styles.css'

import NextGA from '~/components/NextGA'
import { DefaultSeo } from 'next-seo'
import { defaultSeoProps, isProduction } from '~/constants'

import SlugProvider from '~/context/slug'
import TranslationProvider from '~/context/translation'
import AuthProvider from '~/context/auth'

function App({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <NextGA
        disabled={!isProduction}
        trackingId={process.env.NEXT_PUBLIC_GA_TRACKING_ID}
      >
        <AuthProvider>
          <TranslationProvider>
            <SlugProvider>
              <Component {...pageProps} />
            </SlugProvider>
          </TranslationProvider>
        </AuthProvider>
      </NextGA>
    </>
  )
}

export default App
