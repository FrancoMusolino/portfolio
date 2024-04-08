export const getSkillsQuery = /* GraphQL */ `
  query getSkills {
    skills(sort: "order", pagination: { limit: 99 }) {
      data {
        attributes {
          name
        }
      }
    }
  }
`;
