export const getIntroByLocaleQuery = /* GraphQL */ `
  query getIntroByLocale($locale: I18NLocaleCode) {
    intros(locale: $locale) {
      data {
        attributes {
          text
        }
      }
    }
  }
`;
