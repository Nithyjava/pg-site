import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, PGProperty, Booking, Complaint, OfferCoupon, NotificationItem, SearchFilterState } from '../types';
import { MOCK_PGS, MOCK_BOOKINGS, MOCK_COMPLAINTS, MOCK_OFFERS, MOCK_NOTIFICATIONS, MOCK_USERS } from '../mock/data';

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Data State
  pgs: PGProperty[];
  setPgs: React.Dispatch<React.SetStateAction<PGProperty[]>>;
  bookings: Booking[];
  complaints: Complaint[];
  offers: OfferCoupon[];
  notifications: NotificationItem[];
  wishlist: string[];
  comparedPGs: string[];
  
  // Search Filters
  filters: SearchFilterState;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  resetFilters: () => void;
  
  // Modals & UI Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activePGId: string | null;
  setActivePGId: (id: string | null) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalView: 'login' | 'signup' | 'forgot' | 'otp' | 'role_select';
  setAuthModalView: (view: 'login' | 'signup' | 'forgot' | 'otp' | 'role_select') => void;
  authModalTargetRole: UserRole;
  setAuthModalTargetRole: (role: UserRole) => void;
  openAuthModal: (view?: 'login' | 'signup' | 'forgot' | 'otp', targetRole?: UserRole) => void;
  
  // Action Handlers
  toggleWishlist: (pgId: string) => void;
  toggleCompare: (pgId: string) => void;
  clearCompare: () => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  raiseComplaint: (title: string, category: Complaint['category'], priority: Complaint['priority'], description: string, pgId: string, pgName: string) => void;
  resolveComplaint: (complaintId: string) => void;
  addNewPG: (newPg: Omit<PGProperty, 'id' | 'rating' | 'reviewCount' | 'verified' | 'status'>) => void;
  updatePGStatus: (pgId: string, status: PGProperty['status']) => void;
  approveBookingRequest: (bookingId: string) => void;
  rejectBookingRequest: (bookingId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Toast helper
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  toastMessage: { text: string; type: 'success' | 'error' | 'info' } | null;
}

const defaultFilters: SearchFilterState = {
  searchQuery: '',
  city: 'All Cities',
  area: '',
  gender: 'all',
  minBudget: 0,
  maxBudget: 30000,
  roomTypes: [],
  amenities: [],
  foodRequired: false,
  acRequired: false,
  wifiRequired: false,
  parkingRequired: false,
  sortBy: 'popularity',
  viewMode: 'grid'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  const [pgs, setPgs] = useState<PGProperty[]>(MOCK_PGS);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);
  const [offers] = useState<OfferCoupon[]>(MOCK_OFFERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  
  const [wishlist, setWishlist] = useState<string[]>(['pg1', 'pg2']);
  const [comparedPGs, setComparedPGs] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilterState>(defaultFilters);
  
  const [activeTab, setActiveTab] = useState<string>('home'); // home, browse, pg_details, compare, user_dashboard, owner_dashboard, admin_dashboard, etc.
  const [activePGId, setActivePGId] = useState<string | null>('pg1');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup' | 'forgot' | 'otp' | 'role_select'>('login');
  const [authModalTargetRole, setAuthModalTargetRole] = useState<UserRole>('user');

  const openAuthModal = (view: 'login' | 'signup' | 'forgot' | 'otp' = 'login', targetRole: UserRole = 'user') => {
    setAuthModalView(view);
    setAuthModalTargetRole(targetRole);
    setAuthModalOpen(true);
  };
  
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text: message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'guest') {
      setCurrentUser(null);
    } else if (role === 'user') {
      setCurrentUser(MOCK_USERS[0]);
    } else if (role === 'owner') {
      setCurrentUser(MOCK_USERS[2]);
    } else if (role === 'admin') {
      setCurrentUser(MOCK_USERS[3]);
    }
  };

  const toggleWishlist = (pgId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(pgId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== pgId);
      } else {
        showToast('Saved to Wishlist!', 'success');
        return [...prev, pgId];
      }
    });
  };

  const toggleCompare = (pgId: string) => {
    setComparedPGs(prev => {
      if (prev.includes(pgId)) {
        return prev.filter(id => id !== pgId);
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 PGs at a time', 'error');
        return prev;
      }
      showToast('Added to Compare List', 'success');
      return [...prev, pgId];
    });
  };

  const clearCompare = () => setComparedPGs([]);

  const resetFilters = () => setFilters(defaultFilters);

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Booking ${newBooking.id} created successfully!`, 'success');
    return newBooking;
  };

  const raiseComplaint = (title: string, category: Complaint['category'], priority: Complaint['priority'], description: string, pgId: string, pgName: string) => {
    const newComplaint: Complaint = {
      id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
      pgId,
      pgName,
      userId: currentUser?.id || 'u1',
      userName: currentUser?.name || 'Aarav Sharma',
      userRoom: '102-A',
      title,
      category,
      priority,
      status: 'open',
      description,
      createdAt: new Date().toLocaleString(),
      updates: [{ time: new Date().toLocaleTimeString(), note: 'Ticket registered.', by: 'System' }]
    };
    setComplaints(prev => [newComplaint, ...prev]);
    showToast('Complaint ticket logged successfully!', 'success');
  };

  const resolveComplaint = (complaintId: string) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? {
      ...c,
      status: 'resolved',
      resolvedAt: new Date().toLocaleString(),
      updates: [...c.updates, { time: new Date().toLocaleTimeString(), note: 'Marked as resolved.', by: currentUser?.name || 'Manager' }]
    } : c));
    showToast('Complaint status updated to Resolved', 'success');
  };

  const addNewPG = (newPgData: Omit<PGProperty, 'id' | 'rating' | 'reviewCount' | 'verified' | 'status'>) => {
    const newPG: PGProperty = {
      ...newPgData,
      id: `pg-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      verified: true,
      status: 'active'
    };
    setPgs(prev => [newPG, ...prev]);
    showToast('New PG Property listed successfully!', 'success');
  };

  const updatePGStatus = (pgId: string, status: PGProperty['status']) => {
    setPgs(prev => prev.map(p => p.id === pgId ? { ...p, status } : p));
    showToast(`PG property status updated to ${status}`, 'success');
  };

  const approveBookingRequest = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, bookingStatus: 'confirmed' } : b));
    showToast('Booking request approved!', 'success');
  };

  const rejectBookingRequest = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, bookingStatus: 'cancelled' } : b));
    showToast('Booking request rejected', 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  return (
    <AppContext.Provider value={{
      currentRole,
      setRole,
      currentUser,
      setCurrentUser,
      darkMode,
      toggleDarkMode,
      pgs,
      setPgs,
      bookings,
      complaints,
      offers,
      notifications,
      wishlist,
      comparedPGs,
      filters,
      setFilters,
      resetFilters,
      activeTab,
      setActiveTab,
      activePGId,
      setActivePGId,
      authModalOpen,
      setAuthModalOpen,
      authModalView,
      setAuthModalView,
      authModalTargetRole,
      setAuthModalTargetRole,
      openAuthModal,
      toggleWishlist,
      toggleCompare,
      clearCompare,
      createBooking,
      raiseComplaint,
      resolveComplaint,
      addNewPG,
      updatePGStatus,
      approveBookingRequest,
      rejectBookingRequest,
      markNotificationRead,
      markAllNotificationsRead,
      showToast,
      toastMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
