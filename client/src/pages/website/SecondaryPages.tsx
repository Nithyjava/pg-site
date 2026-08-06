import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, ShieldCheck, HeartHandshake, Award, Users, CheckCircle2, 
  HelpCircle, Mail, Phone, MapPin, ArrowRight, Sparkles, Send, FileText 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_BLOGS } from '../../mock/data';

export const About: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
    <div className="text-center space-y-3">
      <span className="px-3 py-1 bg-red-100 text-red-600 font-bold text-xs rounded-xl">ABOUT PGNEST</span>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Redefining Urban Living in India</h1>
      <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
        Founded in 2024, PGNest is on a mission to provide transparent, tech-enabled, safe, and comfortable Paying Guest stays for students and young corporate professionals.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-center space-y-2">
        <div className="text-3xl font-black text-red-600">500+</div>
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Verified Stays</h3>
        <p className="text-xs text-slate-500">Every single room inspected physically for security & sanitation.</p>
      </div>
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-center space-y-2">
        <div className="text-3xl font-black text-red-600">100,000+</div>
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Happy Residents</h3>
        <p className="text-xs text-slate-500">Students and tech engineers across Bengaluru, Pune, Hyderabad, and Delhi.</p>
      </div>
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-center space-y-2">
        <div className="text-3xl font-black text-red-600">₹0</div>
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Brokerage Fee</h3>
        <p className="text-xs text-slate-500">Direct digital agreement with property owners.</p>
      </div>
    </div>
  </div>
);

export const HowItWorks: React.FC = () => {
  const { setActiveTab } = useApp();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-red-100 text-red-600 font-bold text-xs rounded-xl">3 SIMPLE STEPS</span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">How PGNest Works</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-black text-xl mx-auto flex items-center justify-center">1</div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Search & Compare Stays</h3>
          <p className="text-xs text-slate-500">Filter by city, gender, budget, food inclusion, AC, and Wi-Fi speed. Compare up to 3 stays side-by-side.</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-black text-xl mx-auto flex items-center justify-center">2</div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Book & Pay Online</h3>
          <p className="text-xs text-slate-500">Select room type (Single, Double, Triple), apply promo coupons, and pay security deposit via UPI/Card.</p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-black text-xl mx-auto flex items-center justify-center">3</div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Move In & Enjoy</h3>
          <p className="text-xs text-slate-500">Receive your digital gate pass, Wi-Fi password, and access tenant app for meal menus and rent receipts.</p>
        </div>
      </div>

      <div className="text-center pt-4">
        <button onClick={() => setActiveTab('browse')} className="px-8 py-3.5 bg-red-600 text-white font-bold text-sm rounded-2xl shadow-xl">
          Start Searching Stays Now
        </button>
      </div>
    </div>
  );
};

export const Pricing: React.FC = () => {
  const { setAuthModalOpen, setAuthModalView } = useApp();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-red-100 text-red-600 font-bold text-xs rounded-xl">FOR PROPERTY MANAGERS</span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">PG Owner SaaS Membership Plans</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">Automate tenant onboardings, biometric entry, rent reminders, and complaints.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Starter Plan</h3>
          <div className="text-3xl font-black text-slate-900 dark:text-white">Free<span className="text-xs text-slate-400 font-normal"> / forever</span></div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>✓ List up to 1 PG property</li>
            <li>✓ Basic tenant directory</li>
            <li>✓ Manual rent receipts</li>
          </ul>
          <button onClick={() => { setAuthModalView('signup'); setAuthModalOpen(true); }} className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold">
            Get Started Free
          </button>
        </div>

        <div className="p-6 bg-gradient-to-b from-red-600 to-red-700 text-white rounded-3xl space-y-4 shadow-xl relative overflow-hidden">
          <span className="px-3 py-1 bg-white text-red-600 font-extrabold text-[10px] rounded-xl">MOST POPULAR</span>
          <h3 className="font-bold text-lg">Professional SaaS</h3>
          <div className="text-3xl font-black">₹1,999<span className="text-xs text-red-200 font-normal"> / month</span></div>
          <ul className="space-y-2 text-xs text-red-100">
            <li>✓ List up to 5 PG properties</li>
            <li>✓ Automated UPI Rent Collection</li>
            <li>✓ Biometric & Gate Pass Integration</li>
            <li>✓ Maintenance Ticket Dispatcher</li>
          </ul>
          <button onClick={() => { setAuthModalView('signup'); setAuthModalOpen(true); }} className="w-full py-2.5 bg-white text-red-600 rounded-xl text-xs font-bold shadow-lg">
            Start 14-Day Free Trial
          </button>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Enterprise Network</h3>
          <div className="text-3xl font-black text-slate-900 dark:text-white">Custom<span className="text-xs text-slate-400 font-normal"> / pricing</span></div>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>✓ Unlimited properties & beds</li>
            <li>✓ Dedicated account manager</li>
            <li>✓ Custom ERP & Accounting API</li>
          </ul>
          <button onClick={() => { setAuthModalView('signup'); setAuthModalOpen(true); }} className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export const Blog: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
    <div className="text-center space-y-3">
      <span className="px-3 py-1 bg-red-100 text-red-600 font-bold text-xs rounded-xl">PGNEST INSIGHTS</span>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Blog & Student Living Guides</h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {MOCK_BLOGS.map((b) => (
        <div key={b.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between">
          <div>
            <img src={b.image} alt={b.title} className="w-full h-44 object-cover" />
            <div className="p-5 space-y-2">
              <span className="px-2 py-0.5 bg-red-100 text-red-600 font-bold text-[10px] rounded-md">{b.category}</span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{b.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-3">{b.summary}</p>
            </div>
          </div>
          <div className="p-5 pt-0 text-[10px] text-slate-400 font-medium">
            By {b.author} • {b.date}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: 'Is there any brokerage fee when booking through PGNest?', a: 'Zero! PGNest connects residents directly with property owners, completely waiving any middleman brokerage fee.' },
    { q: 'How does food service work in PGNest properties?', a: 'Most listed PGs include 3-time daily homestyle meals (Breakfast, Lunch, Dinner). Weekly menus change daily with both Veg and Non-Veg options.' },
    { q: 'Can I cancel my booking and get a deposit refund?', a: 'Yes! If you cancel at least 48 hours before your move-in date, 100% of your security deposit is refunded automatically to your payment source.' },
    { q: 'Are visitors allowed inside the PG?', a: 'Visitor policies depend on the specific property rules (e.g., girls PGs allow visitors in lobby until 7 PM). You can check rules on each property details page.' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h1>
        <p className="text-xs text-slate-500">Everything you need to know about booking and resident living</p>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 space-y-2">
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full text-left font-bold text-sm text-slate-900 dark:text-white flex justify-between items-center"
            >
              <span>{f.q}</span>
              <span>{openIdx === i ? '-' : '+'}</span>
            </button>
            {openIdx === i && (
              <p className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                {f.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Contact: React.FC = () => {
  const { showToast } = useApp();
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Get in Touch</h1>
        <p className="text-xs text-slate-500">Our support team is available 24/7 to assist with bookings or property listings</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setSent(true); showToast('Message sent to PGNest support!', 'success'); }} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Your Name</label>
          <input required type="text" placeholder="Aarav Sharma" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl" />
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1">Email Address</label>
          <input required type="email" placeholder="aarav@example.com" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl" />
        </div>
        <div>
          <label className="block font-bold text-slate-700 mb-1">Message</label>
          <textarea required rows={3} placeholder="How can we help you?" className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl" />
        </div>
        <button type="submit" className="w-full py-3 bg-red-600 text-white font-bold rounded-2xl shadow-md">
          {sent ? 'Message Sent ✓' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};
