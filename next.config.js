const withPWA = require("next-pwa")

let config = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
  future: {
    webpack5: true,
  },
  images: {
    domains: ["pbs.twimg.com", "abs.twimg.com", "www.notion.so"],
  },
}

if (process.env.NODE_ENV === "production") {
  config = withPWA({
    ...config,
    pwa: {
      disable: process.env.NODE_ENV === "development",
      dest: "public",
    },
  })
}

module.exports = config
