import * as React from 'react'
import '~/styles/tailwind.css'
import '~/styles/custom-scrollbar.css'
import 'react-static-tweets/styles.css'

import NextGA from '~/components/NextGA'
import { DefaultSeo } from 'next-seo'
import { defaultSeoProps, isProduction } from '~/constants'

import SlugProvider from '~/context/slug'
import TranslationProvider from '~/context/translation'
import AuthProvider from '~/context/auth'
import { TwitterContextProvider } from 'react-static-tweets'

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
              <TwitterContextProvider
                value={{
                  swrOptions: {
                    fetcher: () => null,
                  },
                }}
              >
                <Component {...pageProps} />
              </TwitterContextProvider>
            </SlugProvider>
          </TranslationProvider>
        </AuthProvider>
      </NextGA>
    </>
  )
}

export default App
