import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Search, SlidersHorizontal, MapPin, Users, Utensils, Wifi, AirVent, 
  Dumbbell, Sparkles, RotateCcw, LayoutGrid, List, Map, ArrowRight, Scale, X 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PGCard } from '../../components/ui/PGCard';
import { MOCK_CITIES, MOCK_AMENITIES } from '../../mock/data';

export const BrowsePGs: React.FC = () => {
  const { pgs, filters, setFilters, resetFilters, comparedPGs, clearCompare, setActiveTab } = useApp();

  // Filter logic
  const filteredPGs = useMemo(() => {
    return pgs.filter((pg) => {
      // City
      if (filters.city && filters.city !== 'All Cities' && pg.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
      // Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matches = pg.name.toLowerCase().includes(q) || pg.area.toLowerCase().includes(q) || pg.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Gender
      if (filters.gender !== 'all' && pg.gender !== filters.gender) {
        return false;
      }
      // Budget
      if (pg.startingPrice > filters.maxBudget || pg.startingPrice < filters.minBudget) {
        return false;
      }
      // AC
      if (filters.acRequired && !pg.amenities.includes('Air Conditioner')) {
        return false;
      }
      // Food
      if (filters.foodRequired && !pg.foodAvailable) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_low') return a.startingPrice - b.startingPrice;
      if (filters.sortBy === 'price_high') return b.startingPrice - a.startingPrice;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // popularity
    });
  }, [pgs, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Browse PG Stays
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Showing <span className="font-bold text-red-600 dark:text-red-400">{filteredPGs.length}</span> verified properties in {filters.city}
          </p>
        </div>

        {/* View Toggle & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setFilters({ ...filters, viewMode: 'grid' })}
              className={`p-2 rounded-xl flex items-center gap-1 transition-all ${filters.viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm' : 'text-slate-500'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFilters({ ...filters, viewMode: 'list' })}
              className={`p-2 rounded-xl flex items-center gap-1 transition-all ${filters.viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm' : 'text-slate-500'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFilters({ ...filters, viewMode: 'map' })}
              className={`p-2 rounded-xl flex items-center gap-1 transition-all ${filters.viewMode === 'map' ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm' : 'text-slate-500'}`}
              title="Map View"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>

          {/* Sort By */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="popularity">Sort by: Popularity</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Filters Sidebar */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <SlidersHorizontal className="w-4 h-4 text-red-600" /> Filter Stays
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-red-600 hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">City Location</label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white"
            >
              <option value="All Cities">All Cities</option>
              {MOCK_CITIES.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Gender Preference</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'all', label: 'All Gender' },
                { id: 'female', label: 'Girls PG' },
                { id: 'male', label: 'Boys PG' },
                { id: 'unisex', label: 'Unisex' }
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setFilters({ ...filters, gender: g.id as any })}
                  className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${
                    filters.gender === g.id
                      ? 'border-red-600 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              <span>Max Monthly Budget</span>
              <span className="text-red-600 font-extrabold">₹{filters.maxBudget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={30000}
              step={1000}
              value={filters.maxBudget}
              onChange={(e) => setFilters({ ...filters, maxBudget: Number(e.target.value) })}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
              <span>₹5,000</span>
              <span>₹30,000</span>
            </div>
          </div>

          {/* Quick Amenities Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <label className="block font-bold text-slate-700 dark:text-slate-300">Popular Amenities</label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={filters.acRequired}
                onChange={(e) => setFilters({ ...filters, acRequired: e.target.checked })}
                className="rounded text-red-600 focus:ring-red-500"
              />
              <span>Air Conditioner (AC)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={filters.foodRequired}
                onChange={(e) => setFilters({ ...filters, foodRequired: e.target.checked })}
                className="rounded text-red-600 focus:ring-red-500"
              />
              <span>3-Time Meals Included</span>
            </label>
          </div>
        </div>

        {/* Right Listings View */}
        <div className="lg:col-span-3 space-y-6">
          
          {filteredPGs.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 mx-auto flex items-center justify-center font-bold">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Matching PGs Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your budget range or changing city/gender filter criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Reset All Filters
              </button>
            </div>
          ) : filters.viewMode === 'map' ? (
            /* Mock Map Placeholder View */
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 h-[600px] flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e53935_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <MapPin className="w-12 h-12 text-red-500 animate-bounce" />
              <div className="relative z-10 max-w-md">
                <h3 className="text-2xl font-bold">Interactive Map Search Active</h3>
                <p className="text-xs text-slate-400 mt-2">
                  Displaying {filteredPGs.length} properties pinned on map across {filters.city}. Click map markers to preview room options.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {filteredPGs.map(pg => (
                    <span key={pg.id} className="px-3 py-1 bg-red-600/30 border border-red-500 text-red-200 text-xs rounded-xl font-bold">
                      📍 {pg.name} (₹{pg.startingPrice})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : filters.viewMode === 'list' ? (
            /* List Layout */
            <div className="space-y-4">
              {filteredPGs.map((pg) => (
                <div key={pg.id} className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                  <img src={pg.images[0]} alt={pg.name} className="w-full sm:w-48 h-36 object-cover rounded-2xl" />
                  <div className="flex-1 space-y-2 text-left w-full">
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-600">
                      <MapPin className="w-3.5 h-3.5" /> {pg.area}, {pg.city}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pg.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{pg.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-black text-slate-900 dark:text-white">₹{pg.startingPrice.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span></span>
                      <button
                        onClick={() => {
                          setActiveTab('pg_details');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Standard Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPGs.map((pg) => (
                <PGCard key={pg.id} pg={pg} />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Compare Floating Bar */}
      {comparedPGs.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold">
            <Scale className="w-4 h-4 text-red-500" />
            <span>{comparedPGs.length} Stays selected for comparison</span>
          </div>
          <button
            onClick={() => {
              setActiveTab('compare');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md"
          >
            Compare Now
          </button>
          <button onClick={clearCompare} className="text-slate-400 hover:text-white text-xs">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
