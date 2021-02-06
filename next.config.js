module.exports = {
  env: {
    API_EMAIL_SECRET: process.env.API_EMAIL_SECRET,
    API_REGISTER_SECRET: process.env.API_REGISTER_SECRET,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
