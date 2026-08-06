import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Send, ArrowUpRight, Shield, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setFilters, filters, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleCityClick = (cityName: string) => {
    setFilters({ ...filters, city: cityName });
    setActiveTab('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast('Subscribed to PGNest deals & newsletter!', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-red-600/30">
                P
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">PGNest</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India’s premier tech-enabled Paying Guest (PG) & co-living discovery platform. Safe, verified stays with chef-cooked meals and high-speed Wi-Fi.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2">
              <p className="text-xs font-semibold text-slate-200 mb-2">Get exclusive PG deals & city guides</p>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('browse')} className="hover:text-white transition-colors">
                  Browse All PGs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-white transition-colors">
                  Compare PGs
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('how_it_works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-white transition-colors">
                  Owner Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-white transition-colors">
                  Blog & Student Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Top Cities</h4>
            <ul className="space-y-2 text-xs">
              {['Bengaluru', 'Pune', 'Hyderabad', 'Delhi NCR', 'Mumbai', 'Chennai'].map((city) => (
                <li key={city}>
                  <button
                    onClick={() => handleCityClick(city)}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    PG in {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">Contact & Help</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>Koramangala 4th Block, Bengaluru, Karnataka</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>1800-200-9898 (Toll Free)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>support@pgnest.com</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('faq')}
                className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:underline font-semibold"
              >
                <span>Read Help Center FAQs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PGNest Technologies Pvt Ltd. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('privacy')} className="hover:text-slate-300">Privacy Policy</button>
            <button onClick={() => setActiveTab('terms')} className="hover:text-slate-300">Terms of Service</button>
            <button onClick={() => setActiveTab('maintenance')} className="hover:text-slate-300">System Status</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
