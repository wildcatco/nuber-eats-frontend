import React from 'react';
import { Link } from 'react-router-dom';

interface IRestaurantProps {
  id: string;
  name: string;
  coverImg: string;
  categoryName?: string;
}

const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  name,
  coverImg,
  categoryName,
}) => {
  return (
    <Link to={`/restaurants/${id}`}>
      <div
        className="py-28 bg-cover bg-center mb-3"
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <h3 className="text-xl font-medium border-b-2 pb-3">{name}</h3>
      <span className="border-gray-400 inline-block mt-1 text-xs opacity-50">
        {categoryName}
      </span>
    </Link>
  );
};

export default Restaurant;
