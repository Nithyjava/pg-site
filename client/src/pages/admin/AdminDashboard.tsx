import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Users, Building2, CreditCard, AlertCircle, Sparkles, Check, X, 
  Search, SlidersHorizontal, BarChart3, Settings, ShieldCheck, Activity 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../../context/AppContext';
import { MOCK_ANALYTICS } from '../../mock/data';

export const AdminDashboard: React.FC = () => {
  const { pgs, complaints, resolveComplaint, updatePGStatus, showToast } = useApp();

  const [adminTab, setAdminTab] = useState<'overview' | 'users' | 'approvals' | 'complaints' | 'catalog'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="p-6 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold text-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">PGNest SaaS Super Admin Panel</h1>
            <p className="text-xs text-slate-400 mt-0.5">Platform Administration & Compliance Operations</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> All Systems Operational
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold no-scrollbar">
        {[
          { id: 'overview', label: 'Platform Analytics', icon: BarChart3 },
          { id: 'approvals', label: 'Property Listings Approval', icon: Building2 },
          { id: 'complaints', label: 'Complaints Portal', icon: AlertCircle },
          { id: 'users', label: 'Users & Owners Directory', icon: Users }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setAdminTab(t.id as any)}
              className={`py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all ${
                adminTab === t.id
                  ? 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-slate-400">Total Registered Users</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">104,280</div>
              <span className="text-[11px] text-emerald-600 font-bold">+7.2% this week</span>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-slate-400">Active PG Properties</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">540</div>
              <span className="text-[11px] text-slate-500">Across 15 Cities</span>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-slate-400">Gross Monthly GMV</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">₹4.2 Cr</div>
              <span className="text-[11px] text-emerald-600 font-bold">+18.4% MoM</span>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase text-slate-400">Platform Health Score</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">99.98%</div>
              <span className="text-[11px] text-slate-500">Zero Security Breaches</span>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">User Registration Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_ANALYTICS.userGrowth}>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip />
                  <Area type="monotone" dataKey="guests" stroke="#e53935" fill="#f87171" fillOpacity={0.2} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROPERTY APPROVALS */}
      {adminTab === 'approvals' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Property Verification & Approvals</h2>

          <div className="space-y-3">
            {pgs.map((pg) => (
              <div key={pg.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{pg.name}</h4>
                  <p className="text-slate-500">Owner: {pg.owner.name} ({pg.owner.phone}) • {pg.city}</p>
                  <p className="text-slate-400">Status: <span className="font-bold uppercase text-emerald-600">{pg.status}</span></p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updatePGStatus(pg.id, 'active')}
                    className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl"
                  >
                    Approve Property
                  </button>
                  <button
                    onClick={() => updatePGStatus(pg.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COMPLAINTS PORTAL */}
      {adminTab === 'complaints' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">All Open Maintenance Tickets Across Cities</h2>

          <div className="space-y-3">
            {complaints.map((c) => (
              <div key={c.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{c.title} ({c.id})</h4>
                  <p className="text-slate-500">{c.pgName} • Raised by {c.userName} ({c.userRoom})</p>
                  <p className="text-slate-400 mt-1">{c.description}</p>
                </div>

                <button
                  onClick={() => resolveComplaint(c.id)}
                  disabled={c.status === 'resolved'}
                  className={`px-4 py-2 rounded-xl font-bold ${
                    c.status === 'resolved' ? 'bg-slate-200 text-slate-500' : 'bg-red-600 text-white'
                  }`}
                >
                  {c.status === 'resolved' ? 'Resolved' : 'Mark Resolved'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: USERS DIRECTORY */}
      {adminTab === 'users' && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Registered Users & Owners</h2>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase">
                <th className="py-3">Name</th>
                <th className="py-3">Role</th>
                <th className="py-3">Email</th>
                <th className="py-3">KYC Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="font-medium">
                <td className="py-3 font-bold text-slate-900 dark:text-white">Aarav Sharma</td>
                <td className="py-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-bold rounded-md">RESIDENT</span></td>
                <td className="py-3">aarav@example.com</td>
                <td className="py-3"><span className="text-emerald-600 font-bold">VERIFIED</span></td>
              </tr>
              <tr className="font-medium">
                <td className="py-3 font-bold text-slate-900 dark:text-white">Rajesh Kumar</td>
                <td className="py-3"><span className="px-2 py-0.5 bg-purple-100 text-purple-700 font-bold rounded-md">OWNER</span></td>
                <td className="py-3">rajesh.stay@example.com</td>
                <td className="py-3"><span className="text-emerald-600 font-bold">VERIFIED</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
