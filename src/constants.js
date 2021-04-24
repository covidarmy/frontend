export const isProduction = process.env.NODE_ENV === "production"

export const corsOptions = {
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  origin: isProduction
    ? ["covid.army", "covidresources.vercel.app"]
    : "localhost",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

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

/** @type {import("next-seo").DefaultSeoProps} */
export const seoProps = {}
