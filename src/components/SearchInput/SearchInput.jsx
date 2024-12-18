import React, { useState, useEffect, useRef } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFetchAllPlantsQuery } from '../../redux/features/plants/plantsApi';

const SearchInput = ({ className = "" }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const suggestionRef = useRef(null);
    const inputRef = useRef(null);
    
    const { data: plants } = useFetchAllPlantsQuery();

    const getMatchScore = (text, query, weight = 1) => {
        if (!text) return 0;
        text = text.toLowerCase();
        query = query.toLowerCase();
        
        if (text === query) return 100 * weight;
        if (text.startsWith(query)) return 80 * weight;
        if (text.includes(query)) return 40 * weight;
        if (text.split(' ').some(word => word.startsWith(query))) return 60 * weight;
        
        return 0;
    };

    const getSuggestions = () => {
        if (!searchQuery.trim() || !plants) return [];
        
        const query = searchQuery.toLowerCase();
        
        const scoredPlants = plants
            .map(plant => {
                const nameScore = getMatchScore(plant.name, query, 1.0);
                const scientificNameScore = getMatchScore(plant.scientificName, query, 0.8);
                const categoryScore = getMatchScore(plant.category, query, 0.7);
                const descriptionScore = getMatchScore(plant.description, query, 0.5);
                const tagScores = plant.tags ? 
                    Math.max(...plant.tags.map(tag => getMatchScore(tag, query, 0.6))) : 0;

                const totalScore = Math.max(
                    nameScore,
                    scientificNameScore,
                    categoryScore,
                    descriptionScore,
                    tagScores
                );

                return {
                    ...plant,
                    score: totalScore,
                    matchedField: totalScore === nameScore ? 'name' :
                                totalScore === scientificNameScore ? 'scientific' :
                                totalScore === categoryScore ? 'category' :
                                totalScore === tagScores ? 'tag' : 'description'
                };
            })
            .filter(plant => plant.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);

        return scoredPlants;
    };

    const suggestions = getSuggestions();

    const highlightMatch = (text, query) => {
        if (!text || !query) return text;
        
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) => 
                    part.toLowerCase() === query.toLowerCase() ? 
                        <span key={i} className="bg-yellow-100 font-medium">{part}</span> : 
                        part
                )}
            </span>
        );
    };

    const handleSearch = (query) => {
        if (query.trim()) {
            navigate(`/products?search=${encodeURIComponent(query.trim())}`);
            setSearchQuery("");
            setShowSuggestions(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery);
    };

    const handleSuggestionClick = (suggestion) => {
        // Navigate to SinglePlant page instead of search results
        navigate(`/plants/${suggestion._id}`);
        setSearchQuery("");
        setShowSuggestions(false);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSuggestionClick(suggestions[selectedIndex]);
                } else {
                    handleSubmit(e);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                inputRef.current?.blur();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={suggestionRef}>
            <form onSubmit={handleSubmit} className="relative" role="search">
                <label htmlFor="search-input" className="sr-only">Search plants</label>
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    id="search-input"
                    ref={inputRef}
                    type="search" 
                    placeholder="Search plants..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                        setSelectedIndex(-1);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onKeyDown={handleKeyDown}
                    className="bg-gray-50 w-full py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-shadow"
                    aria-expanded={showSuggestions}
                    aria-controls="search-suggestions"
                    aria-autocomplete="list"
                />
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <div 
                    id="search-suggestions"
                    className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-auto"
                    role="listbox"
                >
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={suggestion._id}
                            role="option"
                            aria-selected={index === selectedIndex}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`p-2.5 cursor-pointer transition-colors hover:bg-gray-50 ${
                                index === selectedIndex ? 'bg-gray-50' : ''
                            }`}
                        >
                            <div className="flex justify-between items-start gap-3">
                                <div className="min-w-0 flex-1">
                                    <div className="font-medium text-gray-900">
                                        {highlightMatch(suggestion.name, searchQuery)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {suggestion.matchedField === 'scientific' && (
                                            <div className="italic">
                                                {highlightMatch(suggestion.scientificName, searchQuery)}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <span>
                                                {suggestion.matchedField === 'category' ? 
                                                    highlightMatch(suggestion.category, searchQuery) :
                                                    suggestion.category
                                                }
                                            </span>
                                            {suggestion.status === 'In Stock' && (
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs font-medium bg-green-100 text-green-800">
                                                    In Stock
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                    ${suggestion.price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchInput;