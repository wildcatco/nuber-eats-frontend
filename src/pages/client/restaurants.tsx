import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Restaurant from '../../components/restaurant';
import { RESTAURANTS_QUERY } from '../../query/restaurants';

interface IFormProps {
  searchTerm: string;
}

const Restaurants: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, loading } = useQuery(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
        offset: 3,
      },
    },
  });

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  const { register, handleSubmit, getValues } = useForm<IFormProps>({
    mode: 'onSubmit',
  });
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: '/search',
      search: `?term=${searchTerm}`,
    });
  };

  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <form
        className="bg-gray-800 w-full py-20 flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSearchSubmit)}
      >
        <input
          {...register('searchTerm', {
            required: true,
            min: 3,
          })}
          className="input rounded-md border-0 w-3/4 md:w-1/4 h-9"
          type="search"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="container mt-8">
          <div className="flex flex-wrap justify-around max-w-3xl mx-auto">
            {data?.categories.categories?.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`}>
                <div className="w-36 h-14 mx-5 my-3 bg-emerald-500 hover:bg-emerald-800 cursor-pointer rounded-lg flex justify-end">
                  <span className="px-4 text-lg text-white">
                    {category.name}
                  </span>
                  {category.coverImg && (
                    <img
                      className="w-10 rounded-lg"
                      src={category.coverImg}
                      alt="category"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ''}
                name={restaurant.name}
                coverImg={restaurant.coverImg}
                categoryName={restaurant.category.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center items-center mx-auto max-w-md mt-10 pb-20">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl pb-1"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}

            <span>
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl pb-1"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
