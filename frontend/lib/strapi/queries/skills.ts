export const getSkillsQuery = /* GraphQL */ `
  query getSkills {
    skills(sort: "order") {
      data {
        attributes {
          name
        }
      }
    }
  }
`;
