import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import { PiPlant } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import avatarImg from "../assets/avatar.png";
import SearchInput from "./SearchInput/SearchInput";

const navigation = [
    {name: "Dashboard", href:"/user-dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Wishlist", href:"/wishlist"}, // Added Wishlist to navigation
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
];

// Rest of the categories array remains the same
const categories = [
    { name: "All Plants", href: "/products" },
    { name: "Indoor Plants", href: "/products?category=Indoor Plants" },
    { name: "Outdoor Plants", href: "/products?category=Outdoor Plants" },
    { name: "Easy Care", href: "/products?maintenance=Easy" },
    { name: "New Arrivals", href: "/products?sort=newest" },
    { name: "Sale", href: "/products?onSale=true" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.cartItems);
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems); // Added wishlist items
    const {currentUser, logout} = useAuth();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    const handleLogOut = () => {
        logout();
    };

    const token = localStorage.getItem('token');
  
    return (
        <header className="max-w-screen-2xl mx-auto">
            {/* Upper Navbar */}
            <div className="px-4 py-4 border-b">
                <nav className="flex justify-between items-center gap-4">
                    {/* Left side - Logo and Search */}
                    <div className="flex items-center lg:gap-16 gap-4 flex-1">
                        <Link to="/" className="flex items-center gap-2 min-w-max">
                            <PiPlant className="text-primary h-8 w-8" />
                            <span className="text-xl font-semibold hidden sm:block text-primary">
                                PlantShop
                            </span>
                        </Link>

                        <SearchInput className="w-full max-w-xl"/>
                    </div>

                    {/* Right side - Navigation Icons */}
                    <div className="flex items-center gap-6">
                        <Link 
                            to="/wishlist" 
                            className="hidden sm:flex flex-col items-center"
                        >
                            <div className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                                <HiOutlineHeart className="h-6 w-6" />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-gray-600">Wishlist</span>
                        </Link>

                        <Link 
                            to="/cart" 
                            className="hidden sm:flex flex-col items-center"
                        >
                            <div className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                                <HiOutlineShoppingCart className="h-6 w-6" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs text-gray-600">Cart</span>
                        </Link>

                        {/* Rest of the navbar code remains the same */}
                        <div className="relative">
                            {currentUser ? (
                                <>
                                    <button 
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="p-0.5">
                                            <img 
                                                src={avatarImg} 
                                                alt="" 
                                                className={`h-8 w-8 rounded-full ${currentUser ? 'ring-2 ring-primary' : ''}`} 
                                            />
                                        </div>
                                        <span className="text-xs text-gray-600">Account</span>
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-40 border">
                                            <ul className="py-2">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link 
                                                            to={item.href} 
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                            onClick={() => setIsDropdownOpen(false)}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                <li className="border-t">
                                                    <button
                                                        onClick={handleLogOut}
                                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </> 
                            ) : token ? (
                                <Link to="/dashboard" className="text-primary font-medium hover:underline">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="flex flex-col items-center"
                                >
                                    <div className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <HiOutlineUser className="h-6 w-6" />
                                    </div>
                                    <span className="text-xs text-gray-600">Login</span>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Cart Icon */}
                        <Link 
                            to="/cart" 
                            className="sm:hidden relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <HiOutlineShoppingCart className="h-6 w-6" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Category Navigation */}
            <nav className="px-4 py-3 border-b overflow-x-auto">
                <ul className="flex items-center gap-8 max-w-screen-xl mx-auto">
                    {categories.map((category) => (
                        <li key={category.name}>
                            <Link
                                to={category.href}
                                className="text-gray-600 hover:text-primary whitespace-nowrap text-sm font-medium transition-colors"
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;