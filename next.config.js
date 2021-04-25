let config = {
  future: {
    webpack5: true,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/delhi",
      },
    ]
  },
  images: {
    domains: ["pbs.twimg.com", "abs.twimg.com"],
  },
}

module.exports = config
