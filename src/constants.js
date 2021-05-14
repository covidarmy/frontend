export const isServer = typeof window === "undefined"
export const isProduction = process.env.NODE_ENV === "production"
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.covid.army"

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
    images: [
      { url: "https://covid.army/static/og.png", height: 630, width: 1200 },
    ],
  },
  additionalLinkTags: [
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
}
