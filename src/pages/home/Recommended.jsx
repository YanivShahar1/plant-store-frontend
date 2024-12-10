import React, { useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import PlantCard from '../plants/PlantCard'; // Replace with the actual path to your PlantCard component
import { useFetchAllPlantsQuery } from '../../redux/features/plants/plantsApi'; // Replace with the actual path to your plants API slice

const Recommended = () => {
    const { data: plants = [] } = useFetchAllPlantsQuery();

    useEffect(() => {
        console.log(`Recommended plants:`, plants);
    }, [plants]);

    return (
        <div id="featured-plants" className="py-16">
            <h2 className="text-3xl font-semibold mb-6">Recommended for You</h2>

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
                    },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {plants.length > 0 &&
                    plants.slice(6, 18).map((plant, index) => (
                        <SwiperSlide key={index}>
                            <PlantCard plant={plant} />
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default Recommended;
