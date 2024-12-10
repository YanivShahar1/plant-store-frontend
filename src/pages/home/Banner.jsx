import React from 'react'
import { Link } from 'react-router-dom'
import plantBannerImg from '../../assets/plants-cover-image-2.png'

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
      <div className='md:w-1/2 w-full flex items-center md:justify-end'>
        <img 
          src={plantBannerImg} 
          alt="Beautiful indoor plants collection" 
          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className='md:w-1/2 w-full'>
        <h1 className='md:text-5xl text-2xl font-medium mb-7'>Bring Nature Indoors</h1>
        <p className='mb-10 text-gray-600 leading-relaxed'>
          Discover a wide selection of vibrant, low-maintenance houseplants perfect for
          brightening up any space. Start your indoor garden today!
        </p>
        <div className="flex gap-4">
          <a 
            href="#featured-plants" // Smooth scroll to your TopSellers or Recommended section
            className='btn-primary inline-flex items-center'
          >
            View Collection
          </a>
          <Link 
            to="/about" 
            className='border-2 border-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white transition-all duration-200'
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Banner