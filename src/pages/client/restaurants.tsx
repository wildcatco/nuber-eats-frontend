import { useQuery } from '@apollo/client';
import React from 'react';
import { RESTAURANTS_QUERY } from '../../query/restaurants';

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
