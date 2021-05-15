const withPWA = require("next-pwa")

module.exports = withPWA({
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
    domains: ["pbs.twimg.com", "abs.twimg.com"],
  },
  pwa: {
    dest: "public",
  },
})
