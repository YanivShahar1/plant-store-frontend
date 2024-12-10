import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchPlantByIdQuery } from '../../redux/features/plants/plantsApi';

export const SinglePlant = () => {
    const { id } = useParams();
    const { data: plant, isLoading, isError } = useFetchPlantByIdQuery(id);
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error occurred while loading plant info</div>;

    return (
        <div className="h-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="md:flex">
                {/* Left side - Image */}
                <div className="md:w-1/3">
                    <img
                        src={`${getImgUrl(plant.coverImage)}`}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right side - Plant Information */}
                <div className="md:w-2/3 p-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">{plant.name}</h1>
                        <p className="text-gray-600 italic mb-4">{plant.scientificName}</p>
                        <div className="mb-4">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                {plant.category}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-2xl font-bold text-green-600">${plant.price}</span>
                            {plant.oldPrice && (
                                <span className="text-lg text-gray-500 line-through">${plant.oldPrice}</span>
                            )}
                            {plant.onSale && (
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                                    {plant.discountPercentage}% OFF
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                plant.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                                plant.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {plant.status}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700">{plant.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Care Instructions</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><span className="font-medium">Light:</span> {plant.careInstructions.light}</li>
                                <li><span className="font-medium">Water:</span> {plant.careInstructions.water}</li>
                                <li><span className="font-medium">Temperature:</span> {plant.careInstructions.temperature}</li>
                                <li><span className="font-medium">Humidity:</span> {plant.careInstructions.humidity}</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Characteristics</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><span className="font-medium">Size:</span> {plant.plantSize}</li>
                                <li><span className="font-medium">Growth Rate:</span> {plant.growthRate}</li>
                                <li><span className="font-medium">Maintenance:</span> {plant.maintenanceLevel}</li>
                                <li><span className="font-medium">Sun Exposure:</span> {plant.sunExposure}</li>
                            </ul>
                        </div>
                    </div>

                    {plant.features && plant.features.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Features</h2>
                            <div className="flex flex-wrap gap-2">
                                {plant.features.map((feature, index) => (
                                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {plant.poisonous && (
                        <div className="mb-6">
                            <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
                                ⚠️ Warning: This plant is poisonous if ingested
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center">
                        <button
                            onClick={() => handleAddToCart(plant)}
                            className="bg-green-600 text-white py-3 px-12 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 max-w-xs"
                            disabled={plant.status === 'Out of Stock'}
                        >
                            <FiShoppingCart className="text-xl" />
                            <span>Add to Cart</span>
                        </button>
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                        <p>Added on: {new Date(plant.dateAdded).toLocaleDateString()}</p>
                        {plant.tags && plant.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {plant.tags.map((tag, index) => (
                                    <span key={index} className="text-gray-600">#{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};