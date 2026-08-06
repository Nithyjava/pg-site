import React from 'react';
import { motion } from 'motion/react';
import { Scale, Check, X, Star, ArrowRight, Trash2, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ComparePGs: React.FC = () => {
  const { pgs, comparedPGs, toggleCompare, clearCompare, setActiveTab, setActivePGId } = useApp();

  const selectedProperties = pgs.filter(p => comparedPGs.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Scale className="w-8 h-8 text-red-600" /> Compare PG Properties
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Side-by-side feature comparison to help you make the right choice
          </p>
        </div>

        {selectedProperties.length > 0 && (
          <button
            onClick={clearCompare}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4 text-red-500" /> Clear Comparison
          </button>
        )}
      </div>

      {selectedProperties.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 mx-auto flex items-center justify-center font-bold">
            <Scale className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No PGs Selected for Comparison</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse properties and click the scale icon on any PG card to add up to 3 stays for side-by-side comparison.
          </p>
          <button
            onClick={() => setActiveTab('browse')}
            className="px-6 py-2.5 bg-red-600 text-white rounded-2xl text-xs font-bold shadow-md flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" /> Browse & Add PGs
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="p-4 text-xs font-bold uppercase text-slate-400 w-48">Feature</th>
                {selectedProperties.map(pg => (
                  <th key={pg.id} className="p-4 w-72 align-top">
                    <div className="space-y-3">
                      <div className="relative h-36 rounded-2xl overflow-hidden">
                        <img src={pg.images[0]} alt={pg.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleCompare(pg.id)}
                          className="absolute top-2 right-2 p-1.5 bg-slate-900/80 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{pg.name}</h4>
                        <p className="text-xs text-slate-400">{pg.area}, {pg.city}</p>
                      </div>

                      <button
                        onClick={() => {
                          setActivePGId(pg.id);
                          setActiveTab('pg_details');
                        }}
                        className="w-full py-2 bg-red-600 text-white rounded-xl text-xs font-bold"
                      >
                        Book Stay
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300">Starting Price</td>
                {selectedProperties.map(pg => (
                  <td key={pg.id} className="p-4 font-black text-slate-900 dark:text-white text-base">
                    ₹{pg.startingPrice.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300">Security Deposit</td>
                {selectedProperties.map(pg => (
                  <td key={pg.id} className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                    ₹{pg.securityDeposit.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300">Gender Allowance</td>
                {selectedProperties.map(pg => (
                  <td key={pg.id} className="p-4 font-bold capitalize text-slate-800 dark:text-slate-200">
                    {pg.gender}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300">Ratings</td>
                {selectedProperties.map(pg => (
                  <td key={pg.id} className="p-4">
                    <span className="flex items-center gap-1 font-bold text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400" /> {pg.rating} ({pg.reviewCount})
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300">Food Included</td>
                {selectedProperties.map(pg => (
                  <td key={pg.id} className="p-4 font-semibold">
                    {pg.foodAvailable ? <span className="text-emerald-600 flex items-center gap-1"><Check className="w-4 h-4" /> Yes ({pg.foodType})</span> : <span className="text-red-500 flex items-center gap-1"><X className="w-4 h-4" /> No</span>}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300">Air Conditioning</td>
                {selectedProperties.map(pg => (
                  <td key={pg.id} className="p-4">
                    {pg.amenities.includes('Air Conditioner') ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-300" />}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-700 dark:text-slate-300">Fitness Gym</td>
                {selectedProperties.map(pg => (
                  <td key={pg.id} className="p-4">
                    {pg.amenities.includes('Fitness Gym') ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-300" />}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
