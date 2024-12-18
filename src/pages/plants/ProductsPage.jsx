import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PlantCard from './PlantCard';
import { useFetchAllPlantsQuery } from '../../redux/features/plants/plantsApi';
import { FiFilter, FiLoader, FiRotateCcw, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const ProductsPage = () => {
  const { data: plants, isLoading, isError } = useFetchAllPlantsQuery();
  const [searchParams] = useSearchParams();

  // Get all URL parameters
  const urlCategory = searchParams.get('category');
  const urlMaintenance = searchParams.get('maintenance');
  const urlSort = searchParams.get('sort');
  const urlOnSale = searchParams.get('onSale');
  const searchQuery = searchParams.get('search');
// Set initial filters based on URL parameters
const [filters, setFilters] = useState({
    category: urlCategory || 'all',
    maintenance: urlMaintenance || 'all',
    priceRange: 'all',
    status: 'all',
    search: searchQuery || '',
    onSale: urlOnSale === 'true'
  });

  const [sortConfig, setSortConfig] = useState({
    field: urlSort === 'newest' ? 'date' : 'price',
    direction: 'asc'
  });

  // Update filters when URL parameters change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: urlCategory || 'all',
      maintenance: urlMaintenance || 'all',
      search: searchQuery || '',
      onSale: urlOnSale === 'true'
    }));

    if (urlSort === 'newest') {
      setSortConfig({
        field: 'date',
        direction: 'desc'
      });
    }
  }, [urlCategory, urlMaintenance, urlSort, urlOnSale, searchQuery]);

  const categories = [
    'Indoor Plants',
    'Outdoor Plants',
    'Succulents & Cacti',
    'Flowering Plants',
    'Trees & Shrubs',
    'Herbs & Vegetables'
  ];

  const maintenanceLevels = ['Easy', 'Moderate', 'Expert'];
  
  const priceRanges = [
    { label: 'Under $20', value: '0-20' },
    { label: '$20 - $50', value: '20-50' },
    { label: 'Over $50', value: '50-999' }
  ];

  const statusOptions = ['In Stock', 'Low Stock', 'Out of Stock', 'Coming Soon', 'Discontinued'];

  const filterPlants = (plantsData) => {
    if (!plantsData) return [];
    
    return plantsData.filter(plant => {
      const categoryMatch = filters.category === 'all' || plant.category === filters.category;
      const maintenanceMatch = filters.maintenance === 'all' || plant.maintenanceLevel === filters.maintenance;
      const statusMatch = filters.status === 'all' || plant.status === filters.status;
      const saleMatch = !filters.onSale || (plant.oldPrice && plant.oldPrice > plant.price);
      
      let priceMatch = true;
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        priceMatch = plant.price >= min && plant.price <= max;
      }

      let searchMatch = true;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        searchMatch = 
          plant.name.toLowerCase().includes(searchLower) ||
          plant.description.toLowerCase().includes(searchLower) ||
          plant.category.toLowerCase().includes(searchLower) ||
          (plant.tags && plant.tags.some(tag => tag.toLowerCase().includes(searchLower)));
      }

      return categoryMatch && maintenanceMatch && priceMatch && statusMatch && searchMatch && saleMatch;
    });
  };

  const sortPlants = (plantsToSort) => {
    return [...plantsToSort].sort((a, b) => {
      if (sortConfig.field === 'price') {
        return sortConfig.direction === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (sortConfig.field === 'date') {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
      return 0;
    });
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      maintenance: 'all',
      priceRange: 'all',
      status: 'all',
      search: '',
      onSale: false
    });
    setSortConfig({
      field: 'price',
      direction: 'asc'
    });
  };

  const handleSort = () => {
    setSortConfig(prev => ({
      ...prev,
      direction: prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredPlants = filterPlants(plants);
  const sortedPlants = sortPlants(filteredPlants);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500">Error loading plants. Please try again later.</p>
      </div>
    );
  }

  // Generate page title based on filters
  const getPageTitle = () => {
    if (filters.onSale) return "Plants on Sale";
    if (sortConfig.field === 'date') return "New Arrivals";
    if (filters.maintenance === 'Easy') return "Easy Care Plants";
    if (filters.category !== 'all') return filters.category;
    return "Our Collection";
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary mb-2">Our Collection</h1>
        <p className="text-gray-600">Discover our wide variety of plants for every space and lifestyle</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-primary" />
            <h2 className="font-semibold">Filters</h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FiRotateCcw className="text-gray-500" />
              Reset Filters
            </button>
            <button
              onClick={handleSort}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {sortConfig.direction === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
              Price
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={filters.maintenance}
            onChange={(e) => setFilters(prev => ({ ...prev, maintenance: e.target.value }))}
          >
            <option value="all">All Maintenance Levels</option>
            {maintenanceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={filters.priceRange}
            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
          >
            <option value="all">All Prices</option>
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option value="all">All Status</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {sortedPlants.length} {sortedPlants.length === 1 ? 'plant' : 'plants'}
        </p>
        <p className="text-sm text-gray-500">
          {Object.values(filters).some(value => value !== 'all') && "* Filtered results"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedPlants.map(plant => (
          <PlantCard key={plant._id} plant={plant} />
        ))}
      </div>

      {sortedPlants.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No plants found matching your filters.</p>
          <button
            onClick={resetFilters}
            className="mt-4 text-primary hover:underline"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;