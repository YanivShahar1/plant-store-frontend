import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchInput = ({ className = "" }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    return (
        <form onSubmit={handleSearch} className={`relative ${className}`}>
            <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
            <input 
                type="text" 
                placeholder=" Search plants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
        </form>
    );
};

export default SearchInput;