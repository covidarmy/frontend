const withPWA = require("next-pwa")

module.exports = withPWA({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
  images: {
    domains: ["pbs.twimg.com", "abs.twimg.com", "www.notion.so"],
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
})
