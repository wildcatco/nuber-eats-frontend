import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { RESTAURANT_QUERY } from '../../query/restaurants';

const Restaurant = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery(RESTAURANT_QUERY, {
    variables: {
      input: {
        restaurantId: +id,
      },
    },
  });

  console.log(data);

  return (
    <div>
      <div
        className="bg-gray-800 py-40 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="bg-white w-1/4 py-8 pl-52">
          <h4 className="text-3xl mb-3">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="text-sm font-light mb-2">
            <Link
              to={`/category/${data?.restaurant.restaurant?.category.slug}`}
            >
              {data?.restaurant.restaurant?.category.name}
            </Link>
          </h5>
          <h6 className="text-sm font-light">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
