export const getProjectsByLocaleQuery = /* GraphQL */ `
  query getProjectsByLocale($locale: I18NLocaleCode) {
    projects(locale: $locale, sort: "order") {
      data {
        attributes {
          title
          description
          image {
            data {
              attributes {
                formats
              }
            }
          }
          skills {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
