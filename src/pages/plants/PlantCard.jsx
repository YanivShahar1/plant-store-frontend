import React from 'react';
import { FiShoppingCart, FiSun, FiDroplet, FiThermometer } from "react-icons/fi";
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const PlantCard = ({ plant }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const discountPercentage = plant.oldPrice 
    ? Math.round(((plant.oldPrice - plant.price) / plant.oldPrice) * 100)
    : 0;

  return (
    <div className='max-w-sm mx-auto bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300'>
      {/* Image Container */}
      <div className='relative h-[280px] overflow-hidden rounded-t-lg'>
        <Link to={`/plants/${plant._id}`}>
          <img
            src={`${getImgUrl(plant?.coverImage)}`}
            alt={plant?.name}
            className='w-full h-full object-contain p-4 hover:scale-110 transition-all duration-500'
          />
          <div className='absolute top-4 right-4 flex flex-col gap-2'>
            {plant.trending && (
              <span className='bg-accent text-white text-xs px-3 py-1.5 rounded-full font-medium'>
                🔥 Trending
              </span>
            )}
            {discountPercentage > 0 && (
              <span className='bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-medium'>
                {discountPercentage}% OFF
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Content Container */}
      <div className='p-4'>
        <div className='mb-2'>
          <Link to={`/plants/${plant._id}`}>
            <h3 className='text-lg font-semibold text-secondary hover:text-primary transition-colors line-clamp-1'>
              {plant.name}
            </h3>
          </Link>
          <p className='text-gray-600 text-xs italic font-secondary'>
            {plant.scientificName}
          </p>
        </div>

        <p className='text-gray-700 text-sm mb-3 line-clamp-2 font-secondary'>
          {plant.description}
        </p>

        <div className='flex flex-wrap gap-1.5 mb-3'>
          {plant.features?.slice(0, 2).map((feature, index) => (
            <span key={index} className='text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full'>
              {feature}
            </span>
          ))}
          {plant.maintenanceLevel === 'Easy' && (
            <span className='text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full'>
              🌱 Easy Care
            </span>
          )}
        </div>

        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-baseline gap-2'>
            <span className='text-xl font-bold text-primary'>
              ${plant?.price}
            </span>
            {plant?.oldPrice && (
              <span className='text-sm text-gray-500 line-through'>
                ${plant.oldPrice}
              </span>
            )}
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            plant.status === 'In Stock' ? 'bg-primary/10 text-primary' :
            plant.status === 'Low Stock' ? 'bg-accent/10 text-accent' :
            'bg-red-100 text-red-600'
          }`}>
            {plant.status}
          </span>
        </div>

        <div className='flex flex-col gap-2'>
          <button
            onClick={() => handleAddToCart(plant)}
            disabled={plant.status === 'Out of Stock'}
            className='w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium 
                     hover:bg-primary/90 transition-all duration-200 
                     flex items-center justify-center gap-2
                     disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed'
          >
            <FiShoppingCart className='text-lg' />
            <span>{plant.status === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
          
          <div className='flex justify-between text-xs text-gray-500 px-1 mt-1'>
            <span className='flex items-center gap-1'>
              <FiSun /> {plant.careInstructions.light.split(' ')[0]}
            </span>
            <span className='flex items-center gap-1'>
              <FiDroplet /> {plant.careInstructions.water.split(' ')[0]}
            </span>
            <span className='flex items-center gap-1'>
              <FiThermometer /> {plant.careInstructions.temperature.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;