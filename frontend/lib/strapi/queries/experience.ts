export const getExperienceByLocaleQuery = /* GraphQL */ `
  query getExperienceByLocale($locale: I18NLocaleCode) {
    experiences(locale: $locale, sort: "startedOn:asc") {
      data {
        attributes {
          title
          description
          icon
          startedOn
          finishedAt
        }
      }
    }
  }
`;
