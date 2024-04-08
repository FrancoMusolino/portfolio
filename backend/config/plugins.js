module.exports = ({ env }) => ({
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  },
  graphql: {
    config: {
      maxLimit: -1,
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {
          folder: "strapi-portfolio",
        },
        delete: {},
      },
      breakpoints: {
        small: 250,
        medium: 500,
        large: 750,
      },
    },
  },
});
