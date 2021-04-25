let config = {
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/delhi",
        permanent: false,
      },
    ]
  },
  images: {
    domains: ["pbs.twimg.com", "abs.twimg.com"],
  },
}

module.exports = config
