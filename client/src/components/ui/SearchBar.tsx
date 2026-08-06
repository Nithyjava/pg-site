import React from 'react';
import { Search, MapPin, Users, SlidersHorizontal, IndianRupee } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_CITIES } from '../../mock/data';

export const SearchBar: React.FC = () => {
  const { filters, setFilters, setActiveTab } = useApp();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="w-full bg-white dark:bg-slate-900/90 rounded-3xl p-3 sm:p-4 shadow-xl border border-slate-100 dark:border-slate-800 backdrop-blur-xl"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* City Selector */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700">
          <MapPin className="w-5 h-5 text-red-600 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] font-bold uppercase text-slate-400">Select City</label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="w-full bg-transparent text-xs font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All Cities" className="dark:bg-slate-900">All Cities</option>
              {MOCK_CITIES.map((c) => (
                <option key={c.id} value={c.name} className="dark:bg-slate-900">{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Input / Area */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700">
          <Search className="w-5 h-5 text-red-600 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] font-bold uppercase text-slate-400">Area or PG Name</label>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="e.g. Koramangala, Stanza..."
              className="w-full bg-transparent text-xs font-semibold text-slate-900 dark:text-white focus:outline-none placeholder-slate-400"
            />
          </div>
        </div>

        {/* Gender Toggle */}
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700">
          <Users className="w-5 h-5 text-red-600 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] font-bold uppercase text-slate-400">Gender Preferred</label>
            <select
              value={filters.gender}
              onChange={(e) => setFilters({ ...filters, gender: e.target.value as any })}
              className="w-full bg-transparent text-xs font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="all" className="dark:bg-slate-900">Any Gender</option>
              <option value="female" className="dark:bg-slate-900">Girls PG</option>
              <option value="male" className="dark:bg-slate-900">Boys PG</option>
              <option value="unisex" className="dark:bg-slate-900">Unisex / Co-Living</option>
            </select>
          </div>
        </div>

        {/* Submit Search Button */}
        <div className="flex items-center">
          <button
            type="submit"
            className="w-full h-full py-3.5 px-6 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 group"
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Search Stays</span>
          </button>
        </div>

      </div>
    </form>
  );
};
