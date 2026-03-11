import React, { useState } from 'react';

const CarFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    const defaultFilters = {
      keyword: '',
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: ''
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="glass-card p-6 rounded-xl h-fit sticky top-24">
      <h3 className="text-xl font-display font-semibold text-white mb-6">Filter Fleet</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-textMuted mb-2">Search</label>
          <input 
            type="text" 
            name="keyword"
            value={filters.keyword}
            onChange={handleChange}
            placeholder="Model or Brand..." 
            className="input-field"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-textMuted mb-2">Category</label>
          <select 
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="input-field appearance-none bg-surface"
          >
            <option value="">All Categories</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="luxury">Luxury</option>
            <option value="sports">Sports</option>
            <option value="van">Van</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-textMuted mb-2">Price Range / Day</label>
          <div className="flex gap-4">
            <input 
              type="number" 
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min $" 
              className="input-field"
            />
            <input 
              type="number" 
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max $" 
              className="input-field"
            />
          </div>
        </div>

        <div className="pt-4  flex flex-col gap-3">
          <button type="submit" className="btn-primary w-full text-center">
            Apply Filters
          </button>
          <button type="button" onClick={handleReset} className="btn-secondary w-full text-center">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarFilter;
