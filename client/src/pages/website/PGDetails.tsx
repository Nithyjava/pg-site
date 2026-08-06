import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, MapPin, ShieldCheck, Heart, Share2, Sparkles, Utensils, Wifi, AirVent, 
  Dumbbell, Check, Calendar, Phone, Mail, MessageSquare, ArrowRight, Info, ChevronRight, X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_PGS } from '../../mock/data';

export const PGDetails: React.FC = () => {
  const { activePGId, pgs, wishlist, toggleWishlist, showToast, setActiveTab, createBooking, setAuthModalOpen, currentUser } = useApp();

  const pg = pgs.find(p => p.id === activePGId) || pgs[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(pg.rooms[0] || null);
  const [moveInDate, setMoveInDate] = useState('2026-08-15');
  const [durationMonths, setDurationMonths] = useState(6);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const isWishlisted = wishlist.includes(pg.id);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'PGNEST1000') {
      setAppliedDiscount(1000);
      showToast('Coupon applied! ₹1,000 discount applied.', 'success');
    } else if (couponCode.toUpperCase() === 'WELCOME500') {
      setAppliedDiscount(500);
      showToast('Coupon applied! ₹500 discount applied.', 'success');
    } else {
      showToast('Invalid or expired coupon code', 'error');
    }
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const rent = selectedRoom.pricePerMonth;
    const deposit = selectedRoom.securityDeposit;
    return rent + deposit - appliedDiscount;
  };

  const handleProceedToPayment = () => {
    if (!selectedRoom) return;
    
    // Switch to booking checkout tab
    setActiveTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <button onClick={() => setActiveTab('home')} className="hover:text-slate-600">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => setActiveTab('browse')} className="hover:text-slate-600">{pg.city}</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-800 dark:text-slate-200">{pg.name}</span>
      </div>

      {/* Main Title & Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2.5 py-1 rounded-xl text-[11px] font-bold uppercase tracking-wider ${
              pg.gender === 'female' ? 'bg-pink-500 text-white' : pg.gender === 'male' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
            }`}>
              {pg.gender === 'female' ? 'Girls Only PG' : pg.gender === 'male' ? 'Boys Only PG' : 'Unisex Co-Living'}
            </span>
            {pg.verified && (
              <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-[11px] rounded-xl flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Property
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {pg.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
            <span>{pg.fullAddress}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleWishlist(pg.id)}
            className={`p-3 rounded-2xl border transition-all flex items-center gap-2 text-xs font-semibold ${
              isWishlisted ? 'border-red-600 bg-red-50 text-red-600' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
            <span>{isWishlisted ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              showToast('Link copied to clipboard!', 'info');
            }}
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden">
        <div className="md:col-span-2 relative h-80 sm:h-96 group cursor-pointer" onClick={() => setLightboxOpen(true)}>
          <img src={pg.images[activeImageIdx] || pg.images[0]} alt="PG Main" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />
        </div>

        <div className="hidden md:grid col-span-2 grid-cols-2 gap-3">
          {pg.images.slice(0, 4).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImageIdx(idx)}
              className={`relative h-44 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                activeImageIdx === idx ? 'border-red-600' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`PG Gallery ${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Details + Sticky Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Overview Badges */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Rating Score</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {pg.rating}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Food Service</span>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1 capitalize">
                {pg.foodAvailable ? `3-Meals (${pg.foodType})` : 'Self-Cooking'}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Notice Period</span>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {pg.noticePeriodDays} Days
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Available Beds</span>
              <div className="text-sm font-bold text-emerald-600 mt-1">
                {pg.availableBedsCount} Beds Left
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">About Property</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {pg.description}
            </p>
          </div>

          {/* Room Types & Pricing Selection */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select Room Occupancy</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pg.rooms.map((rm) => (
                <div
                  key={rm.id}
                  onClick={() => setSelectedRoom(rm)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-2 ${
                    selectedRoom?.id === rm.id
                      ? 'border-red-600 bg-red-50/50 dark:bg-red-950/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold capitalize text-slate-900 dark:text-white">
                      {rm.type} Sharing
                    </span>
                    {rm.isAC && <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 font-bold rounded-md">AC</span>}
                  </div>

                  <div className="text-lg font-black text-slate-900 dark:text-white">
                    ₹{rm.pricePerMonth.toLocaleString()} <span className="text-xs font-normal text-slate-400">/mo</span>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Deposit: ₹{rm.securityDeposit.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Included Amenities</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pg.amenities.map((am, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Owner Details & Direct Chat */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={pg.owner.avatar} alt={pg.owner.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-red-500/20" />
              <div>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Property Manager</span>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{pg.owner.name}</h4>
                <p className="text-xs text-slate-500">Response Rate: {pg.owner.responseRate} • On PGNest since {pg.owner.memberSince}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('chat_owner');
                showToast(`Opened direct chat with ${pg.owner.name}`, 'info');
              }}
              className="px-5 py-2.5 bg-slate-900 text-white dark:bg-slate-800 rounded-2xl text-xs font-semibold flex items-center gap-2 shadow-md shrink-0"
            >
              <MessageSquare className="w-4 h-4 text-red-500" /> Chat With Owner
            </button>
          </div>

        </div>

        {/* Right Sticky Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-xl space-y-5">
            
            <div className="flex items-baseline justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Monthly Rent</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  ₹{selectedRoom?.pricePerMonth.toLocaleString() || pg.startingPrice.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400"> /mo</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">Security Deposit</span>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  ₹{selectedRoom?.securityDeposit.toLocaleString() || pg.securityDeposit.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Move-in Date Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Expected Move-in Date</label>
              <input
                type="date"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white"
              />
            </div>

            {/* Coupon Code Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Have a Coupon Code?</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. PGNEST1000"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold uppercase"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Apply
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Try code <span className="font-bold text-red-500">PGNEST1000</span> for ₹1,000 off!</p>
            </div>

            {/* Price Breakdown */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>First Month Rent</span>
                <span>₹{selectedRoom?.pricePerMonth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Refundable Deposit</span>
                <span>₹{selectedRoom?.securityDeposit.toLocaleString()}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{appliedDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-slate-900 dark:text-white text-sm">
                <span>Total Due Now</span>
                <span className="text-red-600 font-extrabold">₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            {/* Proceed CTA */}
            <button
              onClick={handleProceedToPayment}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Book Stay Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-slate-400">
              🔒 100% Refund Guarantee if cancelled 48 hours before move-in.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};
