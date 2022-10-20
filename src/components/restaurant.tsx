import React from 'react';

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
    <div>
      <div
        className="py-28 bg-cover bg-center mb-3"
        style={{ backgroundImage: `url(${coverImg})` }}
      ></div>
      <h3 className="text-xl font-medium border-b-2 pb-3">{name}</h3>
      <span className="border-gray-400 inline-block mt-1 text-xs opacity-50">
        {categoryName}
      </span>
    </div>
  );
};

export default Restaurant;
