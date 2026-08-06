import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, ShieldCheck, Sparkles, MapPin, Search, Utensils, Wifi, 
  Dumbbell, Zap, ArrowRight, CheckCircle2, Star, Smartphone, HeartHandshake,
  Users, Award, TrendingUp, HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SearchBar } from '../../components/ui/SearchBar';
import { PGCard } from '../../components/ui/PGCard';
import { MOCK_CITIES, MOCK_AMENITIES, MOCK_REVIEWS, MOCK_BLOGS } from '../../mock/data';

export const Home: React.FC = () => {
  const { pgs, setActiveTab, setFilters, filters, setAuthModalOpen, setAuthModalView } = useApp();

  const featuredPGs = pgs.filter(p => p.featured);
  const luxuryPGs = pgs.filter(p => p.isLuxury);
  const budgetPGs = pgs.filter(p => p.isBudget || p.startingPrice < 10000);

  const handleCitySelect = (cityName: string) => {
    setFilters({ ...filters, city: cityName });
    setActiveTab('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-red-50/60 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
        
        {/* Background glow graphics */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-red-500/10 dark:bg-red-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 fill-red-500" />
              <span>OVER 500+ VERIFIED PGs NATIONWIDE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Find Your Perfect <span className="text-red-600 dark:text-red-500">PG & Co-Living</span> Stay
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Fully furnished rooms with chef-cooked meals, high-speed fiber internet, 24/7 security, and zero brokerage fees.
            </p>
          </div>

          {/* Hero Search Bar */}
          <div className="mt-8 max-w-4xl mx-auto">
            <SearchBar />
          </div>

          {/* Key Stats Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-200/60 dark:border-slate-800 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">100,000+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Happy Residents</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">15+ Cities</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Across India</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">100% Verified</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Physical Inspections</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">₹0 Brokerage</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Direct Owner Contact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Popular Cities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore stays in India’s prime tech hubs and educational hubs
            </p>
          </div>
          <button
            onClick={() => setActiveTab('browse')}
            className="text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
          >
            View All Cities <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOCK_CITIES.map((city) => (
            <motion.div
              key={city.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleCitySelect(city.name)}
              className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer shadow-md"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-4 flex flex-col justify-end text-white">
                <h3 className="font-bold text-base leading-tight">{city.name}</h3>
                <p className="text-[11px] text-slate-300 font-medium mt-0.5">{city.totalPGs}+ Stays</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured PGs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Handpicked Properties
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured PG Stays
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('browse')}
            className="text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
          >
            Browse All ({pgs.length}) <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPGs.map((pg) => (
            <PGCard key={pg.id} pg={pg} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-900 text-white py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight">Why Choose PGNest?</h2>
            <p className="text-sm text-slate-400 mt-2">
              We eliminate traditional PG hassles with tech-driven transparency, security, and comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-800/60 rounded-3xl border border-slate-700/50 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">100% Verified Properties</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every PG listed undergoes thorough physical audit, security verification, and biometric compliance.
              </p>
            </div>

            <div className="p-6 bg-slate-800/60 rounded-3xl border border-slate-700/50 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">Hygienic Homestyle Food</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                3-time daily meals prepared by background-checked chefs with rotating North and South Indian menus.
              </p>
            </div>

            <div className="p-6 bg-slate-800/60 rounded-3xl border border-slate-700/50 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <Wifi className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">High-Speed Fiber Internet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated Wi-Fi access points in every room ensuring seamless WFH and online classes without drops.
              </p>
            </div>

            <div className="p-6 bg-slate-800/60 rounded-3xl border border-slate-700/50 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-white">App Resident Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pay rent via UPI, raise maintenance tickets, view weekly meal menus, and get digital receipts instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury vs Budget Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            Explore Collection Stays
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Luxury Co-Living */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-3 py-1 bg-amber-500 text-slate-900 font-black text-xs rounded-xl inline-block">
                  PREMIUM COLLECTION
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Luxury Co-Living Spaces</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Premium private studio rooms with attached balconies, gym, PS5 lounge zones, rooftop cafes, and weekly networking events.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-amber-500/20">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">From ₹12,500/mo</span>
                <button
                  onClick={() => {
                    setFilters({ ...filters, minBudget: 12000, maxBudget: 30000 });
                    setActiveTab('browse');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  Explore Luxury Stays <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Budget Friendly */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-3 py-1 bg-emerald-600 text-white font-black text-xs rounded-xl inline-block">
                  BUDGET FRIENDLY
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Affordable Pocket-Friendly PGs</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  High-value double and triple sharing rooms close to IT parks and university campuses without compromising hygiene and security.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-emerald-500/20">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Under ₹8,000/mo</span>
                <button
                  onClick={() => {
                    setFilters({ ...filters, minBudget: 0, maxBudget: 8500 });
                    setActiveTab('browse');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  Explore Budget Stays <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Owner Benefits CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl">
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-xl backdrop-blur-md">
              FOR PROPERTY OWNERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              List Your PG Property on PGNest
            </h2>
            <p className="text-sm text-red-100 leading-relaxed">
              Automate rent collection, verify tenant KYC, manage room occupancy, and reach over 100,000 active students and working professionals.
            </p>

            <ul className="grid grid-cols-2 gap-2 text-xs font-semibold text-red-50">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-white" /> Zero Listing Fee</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-white" /> Automated Rent Reminders</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-white" /> Biometric System Sync</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-white" /> Dedicated Manager</li>
            </ul>
          </div>

          <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setAuthModalView('signup');
                setAuthModalOpen(true);
              }}
              className="px-8 py-4 bg-white text-red-600 font-bold text-sm rounded-2xl shadow-xl hover:bg-slate-100 transition-colors text-center"
            >
              List Property Free
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className="px-8 py-3 bg-red-800/60 hover:bg-red-800 text-white font-semibold text-xs rounded-2xl transition-colors text-center border border-white/20"
            >
              View Owner Plans
            </button>
          </div>

        </div>
      </section>

      {/* Recent Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Loved by Residents
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real feedback from students and working professionals living in PGNest properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_REVIEWS.map((rev) => (
            <div key={rev.id} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rev.userName}</h4>
                    <p className="text-[11px] text-slate-400">{rev.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-xl text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{rev.rating}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{rev.comment}"
              </p>

              {rev.ownerReply && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-xs text-slate-500 dark:text-slate-400 border-l-2 border-red-500">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Owner Response:</span>
                  {rev.ownerReply}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
