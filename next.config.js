module.exports = {
  webpack: (config, options) => {
    const { experiments } = options;
    config.module.rules.push({
      use: [options.experiments, { options: { topLevelAwait: "true" } }],
    });
    return config;
  },
};
module.exports = {
  reactStrictMode: true,

  images: {
    domains: ["s.gravatar.com", "vie-invoice-app.s3.eu-west-2.amazonaws.com"],
  },
};