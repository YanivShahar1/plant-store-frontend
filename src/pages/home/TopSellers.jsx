import React, { useEffect, useState } from 'react';
import PlantCard from '../plants/PlantCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllPlantsQuery } from '../../redux/features/plants/plantsApi';

const categories = ["Choose a type", "Indoor", "Outdoor", "Succulents", "Flowers","Trees", "Herbs"];
const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Choose a type");
    const { data: plants = [] } = useFetchAllPlantsQuery();

    useEffect(() => {
        console.log(`plants: ${plants}`);
    }, [plants]);

    const filteredPlants = selectedCategory === "Choose a type"
        ? plants
        : plants.filter(plant => plant.category === selectedCategory.toLowerCase());

    return (
        <div className='py-10 '>
            <h2 className='text-3xl font-semibold mb-6'>Top Selling Plants</h2>
            {/* Category filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category"
                    id="category"
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {filteredPlants.length > 0 && filteredPlants.map((plant, index) => (
                    <SwiperSlide key={index}>
                        <PlantCard plant={plant} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopSellers;
