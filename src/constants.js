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
  title: "Covid India Twitter Resources",
  description: "Latest verified covid 19 information from Twitter",
}

/** @type {import("next-seo").DefaultSeoProps} */
export const seoProps = {}
