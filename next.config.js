

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  future: {
    webpack5: true,
  },
  images: {
    domains: ["pbs.twimg.com", "abs.twimg.com"],
  },
}
