import { graphql } from '../gql';

export const RESTAURANT_FRAGMENT = graphql(/* GraphQL */ `
  fragment RestaurantFragment on Restaurant {
    id
    name
    coverImg
    category {
      name
    }
    address
    isPromoted
  }
`);

// TODO: Fragment 사용하기

export const RESTAURANTS_QUERY = graphql(/* GraphQL */ `
  query restaurantsPage($input: RestaurantsInput!) {
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

export const SEARCH_RESTAURANT = graphql(/* GraphQL */ `
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
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
