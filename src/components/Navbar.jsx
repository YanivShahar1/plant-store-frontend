import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import avatarImg from "../assets/avatar.png";
import SearchInput from "./SearchInput/SearchInput";

const navigation = [
    {name: "Dashboard", href:"/user-dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.cartItems);
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
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="size-6" />
                    </Link>

                    {/* search input */}
                    <SearchInput className="sm:w-72 w-40"/>
                </div>

                {/* right side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div>
                        {currentUser ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img 
                                        src={avatarImg} 
                                        alt="" 
                                        className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} 
                                    />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link 
                                                        to={item.href} 
                                                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </> 
                        ) : token ? (
                            <Link to="/dashboard" className='border-b-2 border-primary'>Dashboard</Link>
                        ) : (
                            <Link to="/login"><HiOutlineUser className="size-6" /></Link>
                        )}
                    </div>
                    
                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6" />
                    </button>

                    <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className='' />
                        <span className="text-sm font-semibold sm:ml-1">
                            {cartItems.length || 0}
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;