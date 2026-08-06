import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Home, User, CreditCard, Heart, AlertCircle, MessageSquare, Shield, 
  Wifi, Key, Utensils, Calendar, Clock, Download, CheckCircle2, Send, 
  Sparkles, FileText, Settings, Plus, Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAppSelector } from '@/src/redux/hooks';

export const UserDashboard: React.FC = () => {
  const { 
    currentUser, bookings, complaints, raiseComplaint, wishlist, pgs, 
    showToast, setActiveTab, setActivePGId 
  } = useApp();

  const [activeDashTab, setActiveDashTab] = useState<'overview' | 'profile' | 'current_stay' | 'payments' | 'complaints' | 'chat'>('overview');

  // Complaint form state
  const [newComplaintTitle, setNewComplaintTitle] = useState('');
  const [newComplaintCategory, setNewComplaintCategory] = useState<'wifi' | 'plumbing' | 'cleaning' | 'food' | 'electricity' | 'other'>('wifi');
  const [newComplaintPriority, setNewComplaintPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [newComplaintDesc, setNewComplaintDesc] = useState('');
  const { userProfile } = useAppSelector((state) => state.login); // Access userProfile from Redux store

  // Chat state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'owner', text: 'Hello Aarav! Welcome to Stanza Living Maple House. Let me know if you need any assistance.', time: '10:00 AM' },
    { sender: 'user', text: 'Hi Rajesh! Everything is great, just wanted to check what time breakfast is served.', time: '10:05 AM' },
    { sender: 'owner', text: 'Breakfast is served in the 1st floor dining lounge from 7:30 AM to 10:00 AM daily!', time: '10:08 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const activeBooking = bookings[0];

  const handleRaiseComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaintTitle || !newComplaintDesc) return;
    raiseComplaint(newComplaintTitle, newComplaintCategory, newComplaintPriority, newComplaintDesc, activeBooking?.pgId || 'pg1', activeBooking?.pgName || 'Stanza Living');
    setNewComplaintTitle('');
    setNewComplaintDesc('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg) return;
    setChatMessages(prev => [...prev, { sender: 'user', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInputMsg('');

    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'owner', text: 'Got it! I am looking into this right away.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <img src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} alt="User" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-red-500" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">Welcome back, {userProfile?.name || 'Aarav Sharma'}!</h1>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-bold text-[10px] rounded-md border border-emerald-500/30">KYC VERIFIED</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Resident at {activeBooking?.pgName || 'Stanza Living - Maple House'} (Room {activeBooking?.roomNumber || '102'})</p>
          </div>
        </div>

        <button
          onClick={() => setActiveDashTab('complaints')}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5"
        >
          <AlertCircle className="w-4 h-4" /> Raise Ticket
        </button>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sub-Sidebar */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-3xl p-3 border border-slate-100 dark:border-slate-800 shadow-sm space-y-1 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: Home },
            { id: 'current_stay', label: 'Active Stay & Access', icon: Key },
            { id: 'payments', label: 'Payments & Receipts', icon: CreditCard },
            { id: 'complaints', label: 'Maintenance Tickets', icon: AlertCircle },
            { id: 'chat', label: 'Chat With Owner', icon: MessageSquare },
            { id: 'profile', label: 'Resident Profile', icon: User }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDashTab(item.id as any)}
                className={`w-full text-left px-4 py-3 rounded-2xl flex items-center gap-2.5 transition-all ${
                  activeDashTab === item.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Dashboard Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeDashTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Active Stay Card */}
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase text-red-600 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Active Booking
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-xl">
                    CONFIRMED STAY
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Wi-Fi Network</span>
                    <p className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1">
                      <Wifi className="w-4 h-4 text-red-500" /> {activeBooking?.wifiCredentials?.ssid || 'MapleHouse_5G'}
                    </p>
                    <p className="text-[11px] text-slate-500">Pass: {activeBooking?.wifiCredentials?.pass || 'StayAtMaple#2024'}</p>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Digital Gate Pass</span>
                    <p className="font-mono font-black text-red-600 text-base">
                      {activeBooking?.gatePassCode || 'GP-88392'}
                    </p>
                    <p className="text-[11px] text-slate-500">Show code at main biometric entry</p>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Next Rent Due</span>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">
                      15th Aug 2026 (₹{activeBooking?.monthlyRent.toLocaleString()})
                    </p>
                    <button
                      onClick={() => {
                        setActivePGId(activeBooking?.pgId || 'pg1');
                        setActiveTab('checkout');
                      }}
                      className="text-[11px] text-red-600 font-bold hover:underline"
                    >
                      Pay Rent Online →
                    </button>
                  </div>
                </div>
              </div>

              {/* Weekly Meal Menu Preview */}
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-red-600" /> Today's Homestyle Food Menu
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30">
                    <span className="font-bold text-red-600 block mb-1">Breakfast (7:30 - 10:00 AM)</span>
                    <p className="text-slate-700 dark:text-slate-300">Aloo Paratha with Curd, Tea/Coffee, Omelette</p>
                  </div>
                  <div className="p-3 bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30">
                    <span className="font-bold text-red-600 block mb-1">Lunch (12:30 - 2:30 PM)</span>
                    <p className="text-slate-700 dark:text-slate-300">Roti, Paneer Butter Masala, Dal Tadka, Rice, Salad</p>
                  </div>
                  <div className="p-3 bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30">
                    <span className="font-bold text-red-600 block mb-1">Dinner (8:00 - 10:00 PM)</span>
                    <p className="text-slate-700 dark:text-slate-300">Veg Biryani / Chicken Curry, Phulka, Gulab Jamun</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CURRENT STAY */}
          {activeDashTab === 'current_stay' && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Room & Roommates</h2>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-500">Property</span>
                  <span className="text-slate-900 dark:text-white">{activeBooking?.pgName}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-500">Room Number</span>
                  <span className="text-slate-900 dark:text-white">Room {activeBooking?.roomNumber}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-500">Bed Allocation</span>
                  <span className="text-slate-900 dark:text-white">Bed {activeBooking?.bedNumber}</span>
                </div>
              </div>

              <h3 className="font-bold text-sm text-slate-900 dark:text-white pt-2">Roommates</h3>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Roommate" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Vikram Singh</h4>
                    <p className="text-slate-400">Software Engineer @ Wipro</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-xl">Bed 102-B</span>
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENTS */}
          {activeDashTab === 'payments' && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Rent Payments & Invoices</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase">
                      <th className="py-3">Date</th>
                      <th className="py-3">Type</th>
                      <th className="py-3">Amount</th>
                      <th className="py-3">Method</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="font-medium">
                      <td className="py-3">10th Jan 2024</td>
                      <td className="py-3">Security Deposit</td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">₹15,000</td>
                      <td className="py-3">Credit Card</td>
                      <td className="py-3"><span className="text-emerald-600 font-bold">PAID</span></td>
                      <td className="py-3">
                        <button onClick={() => showToast('Downloading invoice...', 'info')} className="text-red-600 font-bold hover:underline flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      </td>
                    </tr>
                    <tr className="font-medium">
                      <td className="py-3">1st Jul 2026</td>
                      <td className="py-3">Monthly Rent</td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">₹12,500</td>
                      <td className="py-3">UPI (GPay)</td>
                      <td className="py-3"><span className="text-emerald-600 font-bold">PAID</span></td>
                      <td className="py-3">
                        <button onClick={() => showToast('Downloading invoice...', 'info')} className="text-red-600 font-bold hover:underline flex items-center gap-1">
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COMPLAINTS */}
          {activeDashTab === 'complaints' && (
            <div className="space-y-6">
              
              {/* Form */}
              <form onSubmit={handleRaiseComplaintSubmit} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Log Maintenance Ticket</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bathroom tap leaking"
                      value={newComplaintTitle}
                      onChange={e => setNewComplaintTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                    <select
                      value={newComplaintCategory}
                      onChange={e => setNewComplaintCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                    >
                      <option value="wifi">Wi-Fi & Internet</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="cleaning">Daily Cleaning</option>
                      <option value="food">Food Quality</option>
                      <option value="electricity">Electricity / AC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Priority</label>
                    <select
                      value={newComplaintPriority}
                      onChange={e => setNewComplaintPriority(e.target.value as any)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Detailed Description</label>
                  <textarea
                    required
                    rows={2}
                    value={newComplaintDesc}
                    onChange={e => setNewComplaintDesc(e.target.value)}
                    placeholder="Describe the issue in detail..."
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                  />
                </div>

                <button type="submit" className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-md">
                  Submit Ticket
                </button>
              </form>

              {/* Tickets List */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Your Ticket History</h3>
                {complaints.map(c => (
                  <div key={c.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-white">{c.title} ({c.id})</span>
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                        c.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {c.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-500">{c.description}</p>
                    <div className="text-[10px] text-slate-400">Created: {c.createdAt} • Staff: {c.assignedStaff || 'Unassigned'}</div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 5: CHAT WITH OWNER */}
          {activeDashTab === 'chat' && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Direct Chat with Rajesh Kumar (Owner)</h2>

              <div className="h-80 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 overflow-y-auto space-y-3 text-xs">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-xs ${
                      msg.sender === 'user' ? 'bg-red-600 text-white' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={e => setInputMsg(e.target.value)}
                  placeholder="Type a message to owner..."
                  className="flex-1 p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                />
                <button type="submit" className="px-4 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold">
                  Send
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeDashTab === 'profile' && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 text-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Resident Information & Emergency Contacts</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Full Name</label>
                  <input type="text" defaultValue={currentUser?.name} className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-semibold" />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Mobile Phone</label>
                  <input type="text" defaultValue={currentUser?.phone} className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-semibold" />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Emergency Contact Number</label>
                  <input type="text" defaultValue="+91 99000 11223 (Father)" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl font-semibold" />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Aadhaar / Passport KYC</label>
                  <input type="text" defaultValue="•••• •••• 9812 (Verified)" disabled className="w-full p-2.5 bg-slate-100 dark:bg-slate-800/40 border rounded-xl font-semibold text-emerald-600" />
                </div>
              </div>

              <button onClick={() => showToast('Profile details updated!', 'success')} className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold">
                Save Profile
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
