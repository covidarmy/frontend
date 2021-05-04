export const isServer = typeof window === "undefined"
export const isProduction = process.env.NODE_ENV === "production"

/** @type {import("next-seo").DefaultSeoProps} */
export const defaultSeoProps = {
  defaultTitle: "Covid.army",
  description: "Verified Real Time List of COVID-19 Resources and Aid",
  twitter: {
    handle: "covid_army",
    cardType: "summary_large_image",
  },
  openGraph: {
    title: "Covid.army | Twitter Covid Leads",
    description: "Verified Real Time List of COVID-19 Resources and Aid",
    type: "website",
    url: "https://covid.army",
    images: [{ url: "/static/og.png", height: 630, width: 1200 }],
  },
}
