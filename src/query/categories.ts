import { graphql } from '../gql';

export const CATEGORY_QUERY = graphql(/* GraphQL */ `
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`);
