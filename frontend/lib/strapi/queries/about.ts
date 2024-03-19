export const getAboutByLocaleQuery = /* GraphQL */ `
  query getAboutByLocale($locale: I18NLocaleCode) {
    abouts(locale: $locale) {
      data {
        attributes {
          text
        }
      }
    }
  }
`;
