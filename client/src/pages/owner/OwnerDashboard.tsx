import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, Building2, Users, Bed, Check, X, Plus, DollarSign, 
  TrendingUp, Sparkles, AlertCircle, Edit, Trash2, Calendar, FileText, Tag 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useApp } from '../../context/AppContext';
import { MOCK_ANALYTICS } from '../../mock/data';

export const OwnerDashboard: React.FC = () => {
  const { pgs, bookings, approveBookingRequest, rejectBookingRequest, addNewPG, showToast } = useApp();

  const [activeOwnerTab, setActiveOwnerTab] = useState<'analytics' | 'pgs' | 'rooms' | 'requests' | 'residents' | 'coupons'>('analytics');
  
  // Add PG Modal state
  const [addPgModalOpen, setAddPgModalOpen] = useState(false);
  const [newPgName, setNewPgName] = useState('');
  const [newPgCity, setNewPgCity] = useState('Bengaluru');
  const [newPgArea, setNewPgArea] = useState('');
  const [newPgPrice, setNewPgPrice] = useState(12000);
  const [newPgGender, setNewPgGender] = useState<'male' | 'female' | 'unisex'>('unisex');

  // Coupon state
  const [coupons, setCoupons] = useState([
    { id: 'c1', code: 'WELCOME1000', discount: '₹1,000 Off', count: 42, active: true },
    { id: 'c2', code: 'EARLYBIRD', discount: '10% Off Deposit', count: 18, active: true }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');

  const pendingBookings = bookings.filter(b => b.bookingStatus === 'pending_approval');
  const confirmedBookings = bookings.filter(b => b.bookingStatus === 'confirmed');

  const handleCreatePG = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPgName || !newPgArea) return;

    addNewPG({
      name: newPgName,
      tagline: `Premium ${newPgGender} PG in ${newPgArea}`,
      ownerId: 'o1',
      owner: {
        id: 'o1',
        name: 'Rajesh Kumar',
        phone: '+91 99887 76655',
        email: 'rajesh.stay@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        verified: true,
        responseRate: '98%',
        memberSince: '2022'
      },
      city: newPgCity,
      area: newPgArea,
      fullAddress: `${newPgArea}, ${newPgCity}`,
      mapCoordinates: { lat: 12.9352, lng: 77.6245 },
      gender: newPgGender,
      startingPrice: Number(newPgPrice),
      securityDeposit: Number(newPgPrice) + 2000,
      maintenanceFee: 1000,
      noticePeriodDays: 30,
      featured: true,
      isLuxury: true,
      isBudget: false,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'
      ],
      amenities: ['High-Speed Wi-Fi', 'Air Conditioner', '3-Time Meals', 'Daily Housekeeping'],
      foodAvailable: true,
      foodType: 'both',
      rules: ['No loud noise after 10 PM'],
      nearbyPlaces: [{ name: 'Tech Park Metro', distance: '500m', category: 'metro' }],
      description: 'Newly listed property on PGNest.',
      rooms: [
        {
          id: `rm-${Date.now()}`,
          roomNumber: '101',
          type: 'double',
          floor: 1,
          pricePerMonth: Number(newPgPrice),
          securityDeposit: Number(newPgPrice) + 2000,
          isAC: true,
          hasAttachedBathroom: true,
          hasBalcony: true,
          images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
          beds: [
            { id: `b1`, bedNumber: '101-A', status: 'available', rentAmount: Number(newPgPrice) }
          ]
        }
      ],
      availableBedsCount: 1,
      totalBedsCount: 12
    });

    setAddPgModalOpen(false);
    setNewPgName('');
    setNewPgArea('');
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    setCoupons(prev => [...prev, { id: `c-${Date.now()}`, code: newCouponCode.toUpperCase(), discount: '₹1,000 Off', count: 0, active: true }]);
    showToast(`Created coupon code ${newCouponCode.toUpperCase()}`, 'success');
    setNewCouponCode('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold text-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">PG Owner Portal</h1>
            <p className="text-xs text-slate-400 mt-0.5">Managing {pgs.length} Properties • 89% Average Occupancy</p>
          </div>
        </div>

        <button
          onClick={() => setAddPgModalOpen(true)}
          className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-red-600/30 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New PG Property
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold no-scrollbar">
        {[
          { id: 'analytics', label: 'Owner Analytics', icon: BarChart3 },
          { id: 'pgs', label: 'Properties (PGs)', icon: Building2 },
          { id: 'rooms', label: 'Rooms & Beds Matrix', icon: Bed },
          { id: 'requests', label: 'Booking Requests', badge: pendingBookings.length, icon: AlertCircle },
          { id: 'residents', label: 'Active Residents', icon: Users },
          { id: 'coupons', label: 'Coupons & Offers', icon: Tag }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveOwnerTab(t.id as any)}
              className={`py-2.5 px-4 rounded-xl flex items-center gap-2 shrink-0 transition-all ${
                activeOwnerTab === t.id
                  ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
              {t.badge ? (
                <span className="px-1.5 py-0.2 bg-red-600 text-white text-[10px] rounded-full font-bold">
                  {t.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeOwnerTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Rent Collected (Jul)</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">₹8,50,000</div>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +14% vs last month
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Occupancy Rate</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">92.4%</div>
              <p className="text-[11px] text-slate-500">28/32 Beds Occupied</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Pending Requests</span>
              <div className="text-2xl font-black text-red-600">{pendingBookings.length} Applicants</div>
              <p className="text-[11px] text-slate-500">Requires Owner Approval</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Average Rating</span>
              <div className="text-2xl font-black text-amber-500">4.85 ★</div>
              <p className="text-[11px] text-slate-500">Based on 220 Reviews</p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Monthly Revenue Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_ANALYTICS.monthlyRevenue}>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#e53935" fill="#f87171" fillOpacity={0.2} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PROPERTIES */}
      {activeOwnerTab === 'pgs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pgs.map((pg) => (
            <div key={pg.id} className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
              <img src={pg.images[0]} alt={pg.name} className="w-full h-40 object-cover rounded-2xl" />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">{pg.name}</h3>
                  <p className="text-xs text-slate-400">{pg.area}, {pg.city}</p>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-lg">ACTIVE</span>
              </div>

              <div className="flex justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Rent: ₹{pg.startingPrice.toLocaleString()}/mo</span>
                <span className="font-bold text-slate-900 dark:text-white">{pg.availableBedsCount} Beds Available</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ROOMS MATRIX */}
      {activeOwnerTab === 'rooms' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Interactive Room & Bed Status Matrix</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pgs[0].rooms.map((rm) => (
              <div key={rm.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-3 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">Room {rm.roomNumber} ({rm.type})</span>
                  <span className="text-xs font-bold text-red-600">₹{rm.pricePerMonth.toLocaleString()}</span>
                </div>

                <div className="space-y-2">
                  {rm.beds.map((b) => (
                    <div key={b.id} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-between text-xs border">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Bed {b.bedNumber}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        b.status === 'occupied' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {b.status === 'occupied' ? `Occupied (${b.occupantName})` : 'VACANT BED'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: REQUESTS */}
      {activeOwnerTab === 'requests' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tenant Booking Applications</h2>

          {pendingBookings.length === 0 ? (
            <p className="text-xs text-slate-400">No pending booking requests right now.</p>
          ) : (
            <div className="space-y-3">
              {pendingBookings.map((b) => (
                <div key={b.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{b.userName} ({b.userPhone})</h4>
                    <p className="text-slate-500">Applied for {b.pgName} • Room {b.roomNumber}</p>
                    <p className="text-slate-400 mt-0.5">Move-in Date: {b.moveInDate} • Deposit Paid: ₹{b.totalPaid.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => approveBookingRequest(b.id)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => rejectBookingRequest(b.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold flex items-center gap-1"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: RESIDENTS */}
      {activeOwnerTab === 'residents' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Resident Directory</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase">
                  <th className="py-3">Resident Name</th>
                  <th className="py-3">Property & Room</th>
                  <th className="py-3">Rent Status</th>
                  <th className="py-3">Mobile Phone</th>
                  <th className="py-3">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="font-medium">
                  <td className="py-3 font-bold text-slate-900 dark:text-white">Aarav Sharma</td>
                  <td className="py-3">Stanza Living (Room 102-A)</td>
                  <td className="py-3"><span className="text-emerald-600 font-bold">UP TO DATE</span></td>
                  <td className="py-3">+91 98765 43210</td>
                  <td className="py-3">15th Jan 2024</td>
                </tr>
                <tr className="font-medium">
                  <td className="py-3 font-bold text-slate-900 dark:text-white">Ananya Roy</td>
                  <td className="py-3">Zolo Blossom (Room 301-A)</td>
                  <td className="py-3"><span className="text-emerald-600 font-bold">UP TO DATE</span></td>
                  <td className="py-3">+91 98123 45678</td>
                  <td className="py-3">10th Feb 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: COUPONS */}
      {activeOwnerTab === 'coupons' && (
        <div className="space-y-6">
          <form onSubmit={handleAddCoupon} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Create New Promo Coupon</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. FESTIVE2026"
                value={newCouponCode}
                onChange={e => setNewCouponCode(e.target.value)}
                className="flex-1 p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-bold uppercase"
              />
              <button type="submit" className="px-5 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl">
                Create Offer
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coupons.map((c) => (
              <div key={c.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs flex justify-between items-center">
                <div>
                  <span className="font-mono font-black text-red-600 text-sm block">{c.code}</span>
                  <span className="text-slate-500">{c.discount} • Used {c.count} times</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-md">ACTIVE</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD PG MODAL */}
      {addPgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">List New PG Property</h3>
              <button onClick={() => setAddPgModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePG} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">PG Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanza Living - Ivy House"
                  value={newPgName}
                  onChange={e => setNewPgName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <select
                    value={newPgCity}
                    onChange={e => setNewPgCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Area / Locality</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Indiranagar"
                    value={newPgArea}
                    onChange={e => setNewPgArea(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Starting Rent (₹/mo)</label>
                  <input
                    type="number"
                    value={newPgPrice}
                    onChange={e => setNewPgPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={newPgGender}
                    onChange={e => setNewPgGender(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="unisex">Unisex</option>
                    <option value="female">Girls PG</option>
                    <option value="male">Boys PG</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full py-3 bg-red-600 text-white font-bold rounded-2xl shadow-md">
                Publish PG Listing
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
