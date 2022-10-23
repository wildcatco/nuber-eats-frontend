import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Restaurant from '../../components/restaurant';
import { RESTAURANTS_QUERY } from '../../query/restaurants';

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

  return (
    <div>
      <form className="bg-gray-800 w-full py-20 flex flex-col items-center justify-center">
        <input
          className="input rounded-md border-0 w-3/4 md:w-1/4 h-9"
          type="search"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="container mt-8">
          <div className="flex flex-wrap justify-around max-w-3xl mx-auto">
            {data?.categories.categories?.map((category) => (
              <div
                key={category.id}
                className="w-36 h-14 mx-5 my-3 bg-emerald-500 hover:bg-emerald-800 cursor-pointer rounded-lg flex justify-end"
              >
                <span className="px-4 text-lg text-white">{category.name}</span>
                {category.coverImg && (
                  <img
                    className="w-10 rounded-lg"
                    src={category.coverImg}
                    alt="category"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
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
