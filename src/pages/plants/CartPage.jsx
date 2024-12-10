import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl'
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice'

export const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems)
    const dispatch = useDispatch()

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    return (
        <div className="min-h-screen bg-blackBG font-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-secondary font-bold text-secondary">Your Plant Collection</h1>
                            <button
                                onClick={handleClearCart}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 font-medium"
                            >
                                Clear Collection
                            </button>
                        </div>

                        <div className="mt-8">
                            {cartItems.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                                    {cartItems.map((plant) => (
                                        <li key={plant?._id} className="py-6 flex flex-col sm:flex-row">
                                            <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                                <img
                                                    src={getImgUrl(plant?.coverImage)}
                                                    alt={plant?.name}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="sm:ml-6 flex-1">
                                                <div className="flex flex-col sm:flex-row justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-medium text-secondary">
                                                            {plant?.name}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500 italic">
                                                            {plant?.scientificName}
                                                        </p>
                                                    </div>
                                                    <div className="mt-2 sm:mt-0">
                                                        <div className="flex items-center">
                                                            {plant?.oldPrice && (
                                                                <span className="text-sm line-through text-gray-500 mr-2">
                                                                    ${plant?.oldPrice}
                                                                </span>
                                                            )}
                                                            <span className="text-lg font-medium text-primary">
                                                                ${plant?.price}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                    <div className="flex items-center text-sm">
                                                        <span className="text-gray-600">Category:</span>
                                                        <span className="ml-2 text-secondary">{plant?.category}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <span className="text-gray-600">Size:</span>
                                                        <span className="ml-2 text-secondary">{plant?.plantSize}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <span className="text-gray-600">Care Level:</span>
                                                        <span className="ml-2 text-secondary">{plant?.maintenanceLevel}</span>
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <span className="text-gray-600">Light Needs:</span>
                                                        <span className="ml-2 text-secondary">{plant?.careInstructions?.light}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex justify-between items-center">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <span>Qty: 1</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveFromCart(plant)}
                                                        className="text-red-500 hover:text-red-600 font-medium transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-lg text-gray-600">Your plant collection is empty!</p>
                                    <p className="mt-2 text-sm text-gray-500">Add some green friends to your cart.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-lg font-medium text-secondary">
                            <p>Subtotal</p>
                            <p>${totalPrice}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            Shipping calculated at checkout. All plants come with basic care instructions.
                        </p>
                        <div className="mt-6 flex flex-col items-center space-y-4">
                            <Link
                                to="/checkout"
                                className="w-full max-w-md flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
                            >
                                Proceed to Checkout
                            </Link>
                            <Link
                                to="/"
                                className="w-full max-w-md flex justify-center items-center px-6 py-3 border border-primary rounded-md text-base font-medium text-primary hover:bg-primary/10 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}