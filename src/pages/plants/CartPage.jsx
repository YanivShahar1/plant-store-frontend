import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getImgUrl } from '../../utils/getImgUrl'
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice'
import { HiOutlineShoppingCart } from "react-icons/hi2"

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

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <HiOutlineShoppingCart className="w-16 h-16 text-gray-300" />
                <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
                <p className="text-gray-500">Browse our collection and add some green friends to your cart!</p>
                <Link 
                    to="/products" 
                    className="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Browse Collection
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-blackBG font-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    {/* Rest of your existing cart content */}
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
                            <ul className="divide-y divide-gray-200">
                                {cartItems.map((plant) => (
                                    // Your existing cart item JSX
                                    <li key={plant?._id} className="py-6 flex flex-col sm:flex-row">
                                        {/* ... rest of your cart item content ... */}
                                    </li>
                                ))}
                            </ul>
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
                                to="/products"
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