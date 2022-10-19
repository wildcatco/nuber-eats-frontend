import { graphql } from '../gql/gql';

export const RESTAURANTS_QUERY = graphql(`
  query restaurantsPageQuery($input: RestaurantsInput!) {
    categories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
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
