import { useQuery } from '@apollo/client';
import React from 'react';
import { RESTAURANTS_QUERY } from '../../query/restaurants';

const Restaurants: React.FC = () => {
  const { data, loading } = useQuery(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  return (
    <div>
      <form className="bg-gray-800 w-full py-20 flex flex-col items-center justify-center">
        <input
          className="input rounded-md border-0 w-1/4 h-9"
          type="search"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="container mt-8">
          <div className="flex justify-around max-w-2xl mx-auto">
            {data?.categories.categories?.map((category) => (
              <div key={category.id} className="flex flex-col items-center">
                <div className="w-36 h-14 mx-5 bg-emerald-500 hover:bg-emerald-800 cursor-pointer rounded-lg flex justify-end">
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
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <div>
                <div
                  className="py-28 bg-red-500 bg-cover bg-center mb-3"
                  style={{ backgroundImage: `url(${restaurant.coverImg})` }}
                ></div>
                <h3 className="text-xl font-medium">{restaurant.name}</h3>
                <span className="border-t-2 border-gray-200">
                  {restaurant.category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
