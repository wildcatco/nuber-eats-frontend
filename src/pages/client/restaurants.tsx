import { useQuery } from '@apollo/client';
import React from 'react';
import { graphql } from './../../gql/gql';

const RESTAURANTS_QUERY = graphql(`
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

const Restaurants: React.FC = () => {
  const { data, loading, error } = useQuery(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  return <h1>Restaurants</h1>;
};

export default Restaurants;
