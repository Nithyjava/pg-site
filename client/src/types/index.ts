export type UserRole = 'guest' | 'user' | 'owner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  verified: boolean;
  joinedDate: string;
  gender?: 'male' | 'female' | 'other';
  emergencyContact?: string;
  kycStatus?: 'verified' | 'pending' | 'unverified';
}

export type PGGender = 'male' | 'female' | 'unisex';

export interface Amenity {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  category: 'essential' | 'comfort' | 'safety' | 'recreation';
}

export interface City {
  id: string;
  name: string;
  state: string;
  image: string;
  popularAreas: string[];
  totalPGs: number;
}

export interface Bed {
  id: string;
  bedNumber: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  occupantName?: string;
  occupantPhone?: string;
  rentAmount: number;
  joinedDate?: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  type: 'single' | 'double' | 'triple' | 'four_sharing';
  floor: number;
  pricePerMonth: number;
  securityDeposit: number;
  isAC: boolean;
  hasAttachedBathroom: boolean;
  hasBalcony: boolean;
  beds: Bed[];
  images: string[];
}

export interface PGReview {
  id: string;
  pgId: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  ownerReply?: string;
  helpfulCount: number;
}

export interface PGOwnerInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  verified: boolean;
  responseRate: string;
  memberSince: string;
}

export interface PGProperty {
  id: string;
  name: string;
  tagline: string;
  ownerId: string;
  owner: PGOwnerInfo;
  city: string;
  area: string;
  fullAddress: string;
  mapCoordinates: { lat: number; lng: number };
  gender: PGGender;
  startingPrice: number;
  securityDeposit: number;
  maintenanceFee: number;
  noticePeriodDays: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isLuxury: boolean;
  isBudget: boolean;
  verified: boolean;
  images: string[];
  amenities: string[]; // amenity IDs or names
  foodAvailable: boolean;
  foodType?: 'veg' | 'non-veg' | 'both';
  rules: string[];
  nearbyPlaces: { name: string; distance: string; category: 'metro' | 'college' | 'it_park' | 'hospital' | 'mall' }[];
  description: string;
  rooms: Room[];
  availableBedsCount: number;
  totalBedsCount: number;
  status: 'active' | 'pending_approval' | 'rejected' | 'inactive';
}

export interface Booking {
  id: string;
  pgId: string;
  pgName: string;
  pgImage: string;
  pgAddress: string;
  ownerName: string;
  ownerPhone: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  roomId: string;
  roomNumber: string;
  bedId: string;
  bedNumber: string;
  roomType: string;
  moveInDate: string;
  durationMonths: number;
  monthlyRent: number;
  securityDeposit: number;
  discountAmount: number;
  totalPaid: number;
  couponCode?: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  bookingStatus: 'confirmed' | 'pending_approval' | 'cancelled' | 'checked_out';
  createdAt: string;
  rentDueDate?: string;
  wifiCredentials?: { ssid: string; pass: string };
  gatePassCode?: string;
}

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  pgName: string;
  amount: number;
  type: 'rent' | 'security_deposit' | 'maintenance' | 'refund';
  method: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
  invoiceUrl?: string;
  transactionRef: string;
}

export interface Complaint {
  id: string;
  pgId: string;
  pgName: string;
  userId: string;
  userName: string;
  userRoom: string;
  title: string;
  category: 'wifi' | 'plumbing' | 'cleaning' | 'food' | 'electricity' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved';
  description: string;
  createdAt: string;
  resolvedAt?: string;
  assignedStaff?: string;
  updates: { time: string; note: string; by: string }[];
}

export interface OfferCoupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  minBookingValue: number;
  description: string;
  expiryDate: string;
  usageCount: number;
  active: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'complaint' | 'offer' | 'system';
  date: string;
  read: boolean;
  link?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface SearchFilterState {
  searchQuery: string;
  city: string;
  area: string;
  gender: 'all' | 'male' | 'female' | 'unisex';
  minBudget: number;
  maxBudget: number;
  roomTypes: string[]; // single, double, etc.
  amenities: string[];
  foodRequired: boolean;
  acRequired: boolean;
  wifiRequired: boolean;
  parkingRequired: boolean;
  sortBy: 'popularity' | 'price_low' | 'price_high' | 'rating';
  viewMode: 'grid' | 'list' | 'map';
}
