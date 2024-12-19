import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '../../redux/features/wishlist/wishlistSlice';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { Link } from 'react-router-dom';
import { HiOutlineHeart, HiOutlineShoppingCart, HiTrash } from "react-icons/hi2";
import { getImgUrl } from '../../utils/getImgUrl';
import Swal from 'sweetalert2';

const WishlistPage = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);

    const handleRemoveFromWishlist = (item) => {
        dispatch(removeFromWishlist(item));
    };

    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
        dispatch(removeFromWishlist(item));
    };

    const handleClearWishlist = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will remove all items from your wishlist!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, clear it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(clearWishlist());
                Swal.fire({
                    title: "Cleared!",
                    text: "Your wishlist has been cleared.",
                    icon: "success"
                });
            }
        });
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <HiOutlineHeart className="w-16 h-16 text-gray-300" />
                <h2 className="text-2xl font-semibold text-gray-600">Your wishlist is empty</h2>
                <p className="text-gray-500">Browse our collection and add items you love!</p>
                <Link 
                    to="/products" 
                    className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Browse Plants
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-secondary">
                    My Wishlist ({wishlistItems.length})
                </h1>
                {wishlistItems.length > 0 && (
                    <button
                        onClick={handleClearWishlist}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                        <HiTrash className="w-5 h-5" />
                        Clear Wishlist
                    </button>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map(item => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <Link to={`/plants/${item._id}`}>
                            <div className="relative h-48">
                                <img 
                                    src={getImgUrl(item.coverImage)} 
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                                {item.status === 'Low Stock' && (
                                    <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                                        Low Stock
                                    </span>
                                )}
                            </div>
                        </Link>
                        
                        <div className="p-4">
                            <Link to={`/plants/${item._id}`}>
                                <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">
                                    {item.name}
                                </h3>
                            </Link>
                            
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {item.description}
                            </p>
                            
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xl font-bold text-primary">
                                    ${item.price}
                                </span>
                                <span className={`text-sm px-2 py-0.5 rounded-full ${
                                    item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                                    item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    disabled={item.status === 'Out of Stock'}
                                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm 
                                             hover:bg-primary/90 transition-colors flex items-center justify-center gap-2
                                             disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    <HiOutlineShoppingCart className="text-lg" />
                                    {item.status === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
                                </button>
                                
                                <button
                                    onClick={() => handleRemoveFromWishlist(item)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Remove from Wishlist"
                                >
                                    <HiOutlineHeart className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Care Instructions */}
                            {item.careInstructions && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span title="Light">💡 {item.careInstructions.light}</span>
                                        <span title="Water">💧 {item.careInstructions.water}</span>
                                        <span title="Temperature">🌡️ {item.careInstructions.temperature}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;