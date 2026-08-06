import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, ShieldCheck, Heart, ArrowRight, Utensils, Wifi, AirVent, Sparkles, Scale } from 'lucide-react';
import { PGProperty } from '../../types';
import { useApp } from '../../context/AppContext';

interface PGCardProps {
  pg: PGProperty;
}

export const PGCard: React.FC<PGCardProps> = ({ pg }) => {
  const { wishlist, toggleWishlist, comparedPGs, toggleCompare, setActivePGId, setActiveTab } = useApp();

  const isWishlisted = wishlist.includes(pg.id);
  const isCompared = comparedPGs.includes(pg.id);

  const handleCardClick = () => {
    setActivePGId(pg.id);
    setActiveTab('pg_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col"
    >
      {/* Top Image Banner */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={pg.images[0]}
          alt={pg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2.5 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md ${
            pg.gender === 'female' ? 'bg-pink-500 text-white' :
            pg.gender === 'male' ? 'bg-blue-600 text-white' :
            'bg-purple-600 text-white'
          }`}>
            {pg.gender === 'female' ? 'Girls PG' : pg.gender === 'male' ? 'Boys PG' : 'Unisex'}
          </span>

          {pg.isLuxury && (
            <span className="px-2.5 py-1 bg-amber-500 text-slate-900 font-extrabold text-[11px] rounded-xl shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-slate-900" /> Luxury
            </span>
          )}

          {pg.verified && (
            <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[11px] rounded-xl shadow-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified
            </span>
          )}
        </div>

        {/* Action icons on top right */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(pg.id);
            }}
            className="p-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 backdrop-blur-md shadow-md transition-all"
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600 text-red-600' : ''}`} />
          </button>

          {/* Compare toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(pg.id);
            }}
            className={`p-2 rounded-2xl backdrop-blur-md shadow-md transition-all ${
              isCompared ? 'bg-red-600 text-white' : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-red-600'
            }`}
            title="Compare PG"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-slate-900/80 text-white backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{pg.rating.toFixed(1)}</span>
          <span className="text-slate-400 font-normal">({pg.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="truncate">{pg.area}, {pg.city}</span>
          </div>

          <h3 
            onClick={handleCardClick}
            className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-red-600 dark:group-hover:text-red-400 cursor-pointer transition-colors"
          >
            {pg.name}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
            {pg.tagline}
          </p>
        </div>

        {/* Quick Features */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          {pg.foodAvailable && (
            <span className="flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-red-500" /> Meals
            </span>
          )}
          <span className="flex items-center gap-1">
            <Wifi className="w-3.5 h-3.5 text-red-500" /> Wi-Fi
          </span>
          <span className="flex items-center gap-1">
            <AirVent className="w-3.5 h-3.5 text-red-500" /> AC Available
          </span>
        </div>

        {/* Price & CTA */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Starts from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900 dark:text-white">₹{pg.startingPrice.toLocaleString()}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ mo</span>
            </div>
          </div>

          <button
            onClick={handleCardClick}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-semibold shadow-md shadow-red-600/20 transition-all flex items-center gap-1"
          >
            <span>View Stay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
