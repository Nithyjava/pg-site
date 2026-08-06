import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Heart, Bell, Sun, Moon, Search, User, Menu, X, 
  Sparkles, Check, ChevronDown, LogOut, Shield, Home, Compass, 
  Layers, HelpCircle, PhoneCall, Tag, BarChart3, Settings
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { userLogout } from '@/src/redux/auth/authApi';

export const Navbar: React.FC = () => {
  const { 
    currentRole, setRole, currentUser, darkMode, toggleDarkMode, 
    wishlist, comparedPGs, notifications, activeTab, setActiveTab, 
    openAuthModal, markAllNotificationsRead, showToast
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();

  const {userProfile,loginisLoading} = useAppSelector((state) => state.login);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handlePortalClick = (targetRole: UserRole, targetTab: string) => {
    setPortalsDropdownOpen(false);
    setMobileMenuOpen(false);

    if (currentRole === targetRole) {
      setActiveTab(targetTab);
    } else {
      openAuthModal('login', targetRole);
      showToast(`Please enter email and password to access ${targetRole.toUpperCase()} portal`, 'info');
    }
  };
     
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
                P
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  PGNest
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-md">PRO</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5 font-medium">Find the Perfect Stay</p>
              </div>
            </button>
          </div>

          {/* Center Navigation Links (Public / Guest) */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'home' ? 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'browse' ? 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Browse PGs
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-3 py-2 rounded-xl text-sm font-medium relative transition-colors ${activeTab === 'compare' ? 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Compare
              {comparedPGs.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-red-600 text-white text-[10px] rounded-full font-bold">
                  {comparedPGs.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('how_it_works')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'how_it_works' ? 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
            >
              How It Works
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${activeTab === 'pricing' ? 'text-red-600 bg-red-50 dark:bg-red-950/40 dark:text-red-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
            >
              For Owners
            </button>

            {/* Portals Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
              >
                <span>Portals</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <AnimatePresence>
                {portalsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-56 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 z-50 text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                      Login Required
                    </div>
                    <button
                      onClick={() => handlePortalClick('user', 'user_dashboard')}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2 font-semibold">
                        <Home className="w-4 h-4 text-red-500" /> Resident Portal
                      </span>
                      {currentRole === 'user' ? (
                        <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 px-1.5 py-0.5 rounded font-bold">Active</span>
                      ) : (
                        <span className="text-[10px] text-slate-400 group-hover:text-red-600">Login</span>
                      )}
                    </button>
                    <button
                      onClick={() => handlePortalClick('owner', 'owner_dashboard')}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2 font-semibold">
                        <BarChart3 className="w-4 h-4 text-red-500" /> PG Owner Dashboard
                      </span>
                      {currentRole === 'owner' ? (
                        <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 px-1.5 py-0.5 rounded font-bold">Active</span>
                      ) : (
                        <span className="text-[10px] text-slate-400 group-hover:text-red-600">Login</span>
                      )}
                    </button>
                    <button
                      onClick={() => handlePortalClick('admin', 'admin_dashboard')}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between group"
                    >
                      <span className="flex items-center gap-2 font-semibold">
                        <Shield className="w-4 h-4 text-red-500" /> SaaS Admin Panel
                      </span>
                      {currentRole === 'admin' ? (
                        <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 px-1.5 py-0.5 rounded font-bold">Active</span>
                      ) : (
                        <span className="text-[10px] text-slate-400 group-hover:text-red-600">Login</span>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            {userProfile  && (<>
                     <button
              onClick={() => {
                if (currentRole === 'guest') setRole('user');
                setActiveTab('wishlist');
              }}
              className="relative p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Saved PGs Wishlist"
            >
              <Heart className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-50"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">Notifications</h4>
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-red-600 hover:underline font-semibold"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto my-2">
                      {notifications.map((n) => (
                        <div key={n.id} className={`py-3 px-1 transition-colors ${!n.read ? 'bg-red-50/50 dark:bg-red-950/20 rounded-xl px-2' : ''}`}>
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">{n.title}</h5>
                            <span className="text-[10px] text-slate-400 shrink-0">{n.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
              
              </>)
            }
            {/* Wishlist Button */}
      

            {/* Auth Button or User Menu */}
            { !userProfile ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="hidden sm:inline-flex px-4 py-2 rounded-2xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-sm font-semibold shadow-lg shadow-red-600/20 transition-all flex items-center gap-1.5"
                >
                  <User className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-red-500 transition-colors bg-slate-50 dark:bg-slate-800/80"
                >
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt="User"
                    className="w-7 h-7 rounded-xl object-cover ring-2 ring-red-500/30"
                  />
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-none">{userProfile?.name || 'Aarav Sharma'}</div>
                    <div className="text-[10px] text-red-600 dark:text-red-400 capitalize font-medium">{userProfile?.role} Portal</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 p-2 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-50 text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl mb-2">
                        <p className="font-bold text-slate-900 dark:text-white">{userProfile?.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{userProfile?.email}</p>
                      </div>

                      {userProfile?.role === 'user' && (
                        <>
                          <button
                            onClick={() => { setActiveTab('user_dashboard'); setUserDropdownOpen(false); }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                          >
                            <Home className="w-4 h-4 text-slate-400" /> Resident Dashboard
                          </button>
                          <button
                            onClick={() => { setActiveTab('current_booking'); setUserDropdownOpen(false); }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                          >
                            <Building2 className="w-4 h-4 text-slate-400" /> Active Booking
                          </button>
                        </>
                      )}

                      {userProfile?.role === 'owner' && (
                        <button
                          onClick={() => { setActiveTab('owner_dashboard'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                        >
                          <BarChart3 className="w-4 h-4 text-slate-400" /> Owner Dashboard
                        </button>
                      )}

                      {currentRole === 'admin' && (
                        <button
                          onClick={() => { setActiveTab('admin_dashboard'); setUserDropdownOpen(false); }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                        >
                          <Shield className="w-4 h-4 text-slate-400" /> SaaS Admin Panel
                        </button>
                      )}

                      <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                      <button
                        onClick={() => {
                         dispatch(userLogout());
                          setActiveTab('home');
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 font-semibold flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2 text-sm"
          >
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => { setActiveTab('browse'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Browse PGs
            </button>
            <button
              onClick={() => { setActiveTab('compare'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Compare PGs ({comparedPGs.length})
            </button>
            <button
              onClick={() => { setActiveTab('how_it_works'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              How It Works
            </button>
            <button
              onClick={() => { setActiveTab('pricing'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              For Owners
            </button>
            <button
              onClick={() => { setActiveTab('blog'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Blog
            </button>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Portals (Login Required)
              </div>
              <button
                onClick={() => handlePortalClick('user', 'user_dashboard')}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between font-medium text-slate-700 dark:text-slate-200"
              >
                <span>Resident Portal</span>
                <span className="text-xs text-red-600 font-semibold">{currentRole === 'user' ? 'Active' : 'Log In'}</span>
              </button>
              <button
                onClick={() => handlePortalClick('owner', 'owner_dashboard')}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between font-medium text-slate-700 dark:text-slate-200"
              >
                <span>PG Owner Dashboard</span>
                <span className="text-xs text-red-600 font-semibold">{currentRole === 'owner' ? 'Active' : 'Log In'}</span>
              </button>
              <button
                onClick={() => handlePortalClick('admin', 'admin_dashboard')}
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between font-medium text-slate-700 dark:text-slate-200"
              >
                <span>SaaS Admin Panel</span>
                <span className="text-xs text-red-600 font-semibold">{currentRole === 'admin' ? 'Active' : 'Log In'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
