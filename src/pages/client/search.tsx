import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { SEARCH_RESTAURANT } from '../../query/restaurants';

const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [searchRestaurant, { data, loading }] = useLazyQuery(SEARCH_RESTAURANT);

  useEffect(() => {
    const query = location.search.split('?term=')[1];
    if (!query) {
      return history.replace('/');
    }
    searchRestaurant({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location, searchRestaurant]);

  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <h1>Search page</h1>
    </div>
  );
};

export default Search;
