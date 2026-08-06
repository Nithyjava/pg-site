import { PGProperty, City, Amenity, Booking, PaymentTransaction, Complaint, OfferCoupon, NotificationItem, PGReview, User } from '../types';

export const MOCK_CITIES: City[] = [
  { id: 'c1', name: 'Bengaluru', state: 'Karnataka', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80', popularAreas: ['Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield', 'Electronic City'], totalPGs: 84 },
  { id: 'c2', name: 'Pune', state: 'Maharashtra', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80', popularAreas: ['Viman Nagar', 'Hinjewadi', 'Kothrud', 'Baner', 'Wakad'], totalPGs: 62 },
  { id: 'c3', name: 'Hyderabad', state: 'Telangana', image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80', popularAreas: ['Gachibowli', 'HITECH City', 'Madhapur', 'Kondapur'], totalPGs: 58 },
  { id: 'c4', name: 'Delhi NCR', state: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80', popularAreas: ['Cyber City', 'Sector 62 Noida', 'North Campus', 'Saket'], totalPGs: 75 },
  { id: 'c5', name: 'Mumbai', state: 'Maharashtra', image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80', popularAreas: ['Andheri West', 'Powai', 'Bandra', 'Thane West'], totalPGs: 49 },
  { id: 'c6', name: 'Chennai', state: 'Tamil Nadu', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80', popularAreas: ['OMR', 'Velachery', 'Anna Nagar', 'Guindy'], totalPGs: 38 }
];

export const MOCK_AMENITIES: Amenity[] = [
  { id: 'a1', name: 'High-Speed Wi-Fi', icon: 'Wifi', category: 'essential' },
  { id: 'a2', name: 'Air Conditioner', icon: 'AirVent', category: 'comfort' },
  { id: 'a3', name: '3-Time Meals', icon: 'Utensils', category: 'essential' },
  { id: 'a4', name: 'Daily Housekeeping', icon: 'Sparkles', category: 'essential' },
  { id: 'a5', name: '24/7 Power Backup', icon: 'Zap', category: 'essential' },
  { id: 'a6', name: 'CCTV & Biometric Entry', icon: 'ShieldCheck', category: 'safety' },
  { id: 'a7', name: 'Washing Machine', icon: 'Shirt', category: 'comfort' },
  { id: 'a8', name: 'Fitness Gym', icon: 'Dumbbell', category: 'recreation' },
  { id: 'a9', name: 'Attached Bathroom', icon: 'Bath', category: 'comfort' },
  { id: 'a10', name: 'Gaming & Lounge Zone', icon: 'Gamepad2', category: 'recreation' },
  { id: 'a11', name: 'Covered Vehicle Parking', icon: 'Car', category: 'comfort' },
  { id: 'a12', name: 'RO Water Purifier', icon: 'Droplets', category: 'essential' }
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Aarav Sharma', email: 'aarav@example.com', phone: '+91 98765 43210', role: 'user', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', verified: true, joinedDate: '2024-01-15', gender: 'male', kycStatus: 'verified' },
  { id: 'u2', name: 'Ananya Roy', email: 'ananya@example.com', phone: '+91 98123 45678', role: 'user', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', verified: true, joinedDate: '2024-02-10', gender: 'female', kycStatus: 'verified' },
  { id: 'o1', name: 'Rajesh Kumar (Owner)', email: 'rajesh.stay@example.com', phone: '+91 99887 76655', role: 'owner', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', verified: true, joinedDate: '2023-06-20', kycStatus: 'verified' },
  { id: 'admin1', name: 'PGNest Super Admin', email: 'admin@pgnest.com', phone: '+91 90000 00000', role: 'admin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', verified: true, joinedDate: '2023-01-01' }
];

export const MOCK_PGS: PGProperty[] = [
  {
    id: 'pg1',
    name: 'Stanza Living - Maple House',
    tagline: 'Luxury Tech-Enabled Unisex PG in Heart of Koramangala',
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
    city: 'Bengaluru',
    area: 'Koramangala 4th Block',
    fullAddress: '#42, 8th Main, 4th Block, Koramangala, Bengaluru, Karnataka 560034',
    mapCoordinates: { lat: 12.9352, lng: 77.6245 },
    gender: 'unisex',
    startingPrice: 12500,
    securityDeposit: 15000,
    maintenanceFee: 1000,
    noticePeriodDays: 30,
    rating: 4.8,
    reviewCount: 124,
    featured: true,
    isLuxury: true,
    isBudget: false,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['High-Speed Wi-Fi', 'Air Conditioner', '3-Time Meals', 'Daily Housekeeping', '24/7 Power Backup', 'CCTV & Biometric Entry', 'Fitness Gym', 'Gaming & Lounge Zone'],
    foodAvailable: true,
    foodType: 'both',
    rules: [
      'Visitors allowed till 8:00 PM',
      'No smoking in indoor common areas',
      'Quiet hours from 11:00 PM to 6:00 AM',
      'Biometric entry strictly enforced'
    ],
    nearbyPlaces: [
      { name: 'Sony World Junction Bus Stop', distance: '300m', category: 'metro' },
      { name: 'Forum Mall Koramangala', distance: '800m', category: 'mall' },
      { name: 'Wipro & Accenture Tech Parks', distance: '1.2 km', category: 'it_park' },
      { name: 'St. John’s Hospital', distance: '1.5 km', category: 'hospital' }
    ],
    description: 'Welcome to Maple House by Stanza Living! Designed for young professionals and university students seeking premium living. Equipped with high-speed fiber internet, chef-curated meals, bi-weekly linen change, gaming zone, and 24/7 security.',
    availableBedsCount: 6,
    totalBedsCount: 32,
    status: 'active',
    rooms: [
      {
        id: 'r101',
        roomNumber: '101',
        type: 'single',
        floor: 1,
        pricePerMonth: 18500,
        securityDeposit: 20000,
        isAC: true,
        hasAttachedBathroom: true,
        hasBalcony: true,
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
        beds: [
          { id: 'b101-1', bedNumber: '101-A', status: 'available', rentAmount: 18500 }
        ]
      },
      {
        id: 'r102',
        roomNumber: '102',
        type: 'double',
        floor: 1,
        pricePerMonth: 12500,
        securityDeposit: 15000,
        isAC: true,
        hasAttachedBathroom: true,
        hasBalcony: false,
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'],
        beds: [
          { id: 'b102-1', bedNumber: '102-A', status: 'occupied', occupantName: 'Aarav Sharma', occupantPhone: '+91 98765 43210', rentAmount: 12500, joinedDate: '2024-01-15' },
          { id: 'b102-2', bedNumber: '102-B', status: 'available', rentAmount: 12500 }
        ]
      },
      {
        id: 'r201',
        roomNumber: '201',
        type: 'triple',
        floor: 2,
        pricePerMonth: 9500,
        securityDeposit: 10000,
        isAC: false,
        hasAttachedBathroom: true,
        hasBalcony: true,
        images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'],
        beds: [
          { id: 'b201-1', bedNumber: '201-A', status: 'occupied', occupantName: 'Vikram Singh', rentAmount: 9500 },
          { id: 'b201-2', bedNumber: '201-B', status: 'occupied', occupantName: 'Rohan Gupta', rentAmount: 9500 },
          { id: 'b201-3', bedNumber: '201-C', status: 'available', rentAmount: 9500 }
        ]
      }
    ]
  },
  {
    id: 'pg2',
    name: 'Zolo Blossom - Women’s Sanctuary',
    tagline: 'Safe, Serene & High-Tech Women PG in HSR Layout',
    ownerId: 'o1',
    owner: {
      id: 'o2',
      name: 'Sunita Menon',
      phone: '+91 97766 55443',
      email: 'sunita.zolo@example.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      verified: true,
      responseRate: '99%',
      memberSince: '2021'
    },
    city: 'Bengaluru',
    area: 'HSR Layout Sector 1',
    fullAddress: '#112, 27th Main Road, HSR Sector 1, Bengaluru 560102',
    mapCoordinates: { lat: 12.9116, lng: 77.6389 },
    gender: 'female',
    startingPrice: 11000,
    securityDeposit: 12000,
    maintenanceFee: 800,
    noticePeriodDays: 30,
    rating: 4.9,
    reviewCount: 98,
    featured: true,
    isLuxury: true,
    isBudget: false,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['High-Speed Wi-Fi', 'Air Conditioner', '3-Time Meals', 'Daily Housekeeping', 'CCTV & Biometric Entry', 'Washing Machine', 'RO Water Purifier'],
    foodAvailable: true,
    foodType: 'veg',
    rules: [
      'Girls-only property',
      'Visiting hours: 10:00 AM - 7:00 PM (Lobby only)',
      'Bio-metric entry logs sent to resident app'
    ],
    nearbyPlaces: [
      { name: 'Agara Lake Park', distance: '400m', category: 'college' },
      { name: 'HSR BDA Complex Metro Station', distance: '1.0 km', category: 'metro' },
      { name: 'NIFT Bengaluru', distance: '1.8 km', category: 'college' }
    ],
    description: 'Zolo Blossom is crafted exclusively for corporate women and students. Offers top-notch security, organic North & South Indian meals, smart laundry systems, and serene rooftop gardens.',
    availableBedsCount: 4,
    totalBedsCount: 24,
    status: 'active',
    rooms: [
      {
        id: 'r301',
        roomNumber: '301',
        type: 'double',
        floor: 3,
        pricePerMonth: 13500,
        securityDeposit: 15000,
        isAC: true,
        hasAttachedBathroom: true,
        hasBalcony: true,
        images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'],
        beds: [
          { id: 'b301-1', bedNumber: '301-A', status: 'occupied', occupantName: 'Ananya Roy', occupantPhone: '+91 98123 45678', rentAmount: 13500, joinedDate: '2024-02-10' },
          { id: 'b301-2', bedNumber: '301-B', status: 'available', rentAmount: 13500 }
        ]
      }
    ]
  },
  {
    id: 'pg3',
    name: 'CyberStay Executive Men’s PG',
    tagline: 'Budget-Friendly Techie Hub in Hinjewadi Phase 1',
    ownerId: 'o3',
    owner: {
      id: 'o3',
      name: 'Amitabh Verma',
      phone: '+91 98989 12345',
      email: 'amitabh@cyberstay.in',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      verified: true,
      responseRate: '95%',
      memberSince: '2023'
    },
    city: 'Pune',
    area: 'Hinjewadi Phase 1',
    fullAddress: 'Plot 18, Near Rajiv Gandhi Infotech Park, Hinjewadi, Pune 411057',
    mapCoordinates: { lat: 18.5912, lng: 73.7389 },
    gender: 'male',
    startingPrice: 7500,
    securityDeposit: 8000,
    maintenanceFee: 500,
    noticePeriodDays: 15,
    rating: 4.6,
    reviewCount: 76,
    featured: false,
    isLuxury: false,
    isBudget: true,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['High-Speed Wi-Fi', '3-Time Meals', '24/7 Power Backup', 'Washing Machine', 'Covered Vehicle Parking'],
    foodAvailable: true,
    foodType: 'both',
    rules: [
      'Smoking strictly outside main building',
      'Visitors allowed in cafeteria area',
      'Rent due on 1st of every month'
    ],
    nearbyPlaces: [
      { name: 'TCS Hinjewadi Circle', distance: '500m', category: 'it_park' },
      { name: 'Infosys Phase 1 Gate', distance: '800m', category: 'it_park' },
      { name: 'Xion Mall Hinjewadi', distance: '1.1 km', category: 'mall' }
    ],
    description: 'Perfect for IT engineers working in Hinjewadi. Walking distance from TCS, Wipro, and Cognizant. Clean daily housekeeping, nutritious homestyle meals, and ultra-high-speed Wi-Fi.',
    availableBedsCount: 8,
    totalBedsCount: 40,
    status: 'active',
    rooms: [
      {
        id: 'r401',
        roomNumber: '101',
        type: 'triple',
        floor: 1,
        pricePerMonth: 7500,
        securityDeposit: 8000,
        isAC: false,
        hasAttachedBathroom: true,
        hasBalcony: false,
        images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'],
        beds: [
          { id: 'b401-1', bedNumber: '101-A', status: 'available', rentAmount: 7500 },
          { id: 'b401-2', bedNumber: '101-B', status: 'available', rentAmount: 7500 }
        ]
      }
    ]
  },
  {
    id: 'pg4',
    name: 'Gachibowli Heights Co-Living',
    tagline: 'Ultra-Modern Co-Living Spaces near DLF Cyber City',
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
    city: 'Hyderabad',
    area: 'Gachibowli',
    fullAddress: 'Lane 4, Telecom Nagar, Gachibowli, Hyderabad, Telangana 500032',
    mapCoordinates: { lat: 17.4401, lng: 78.3489 },
    gender: 'unisex',
    startingPrice: 14000,
    securityDeposit: 15000,
    maintenanceFee: 1200,
    noticePeriodDays: 30,
    rating: 4.9,
    reviewCount: 156,
    featured: true,
    isLuxury: true,
    isBudget: false,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: ['High-Speed Wi-Fi', 'Air Conditioner', '3-Time Meals', 'Daily Housekeeping', 'Fitness Gym', 'Gaming & Lounge Zone', 'Covered Vehicle Parking'],
    foodAvailable: true,
    foodType: 'both',
    rules: [
      'No loud music past midnight',
      'Cleanliness in common kitchen required',
      'Visitors allowed in lounge till 9 PM'
    ],
    nearbyPlaces: [
      { name: 'DLF Cyber City', distance: '600m', category: 'it_park' },
      { name: 'IKEA Hyderabad', distance: '2.5 km', category: 'mall' },
      { name: 'Raidurg Metro Station', distance: '1.8 km', category: 'metro' }
    ],
    description: 'Experience co-living redefined. Gachibowli Heights offers workstation-ready rooms, rooftop movie screenings, weekly community mixers, and organic multi-cuisine buffet.',
    availableBedsCount: 5,
    totalBedsCount: 28,
    status: 'active',
    rooms: [
      {
        id: 'r501',
        roomNumber: '501',
        type: 'single',
        floor: 5,
        pricePerMonth: 21000,
        securityDeposit: 22000,
        isAC: true,
        hasAttachedBathroom: true,
        hasBalcony: true,
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'],
        beds: [
          { id: 'b501-1', bedNumber: '501-A', status: 'available', rentAmount: 21000 }
        ]
      }
    ]
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'BK-9821',
    pgId: 'pg1',
    pgName: 'Stanza Living - Maple House',
    pgImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    pgAddress: '#42, 8th Main, 4th Block, Koramangala, Bengaluru',
    ownerName: 'Rajesh Kumar',
    ownerPhone: '+91 99887 76655',
    userId: 'u1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav@example.com',
    userPhone: '+91 98765 43210',
    roomId: 'r102',
    roomNumber: '102',
    bedId: 'b102-1',
    bedNumber: '102-A',
    roomType: 'Double Sharing AC',
    moveInDate: '2024-01-15',
    durationMonths: 6,
    monthlyRent: 12500,
    securityDeposit: 15000,
    discountAmount: 1000,
    totalPaid: 26500,
    couponCode: 'WELCOME1000',
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdAt: '2024-01-10',
    rentDueDate: '2026-08-15',
    wifiCredentials: { ssid: 'MapleHouse_HighSpeed_5G', pass: 'StayAtMaple#2024' },
    gatePassCode: 'GP-88392'
  },
  {
    id: 'BK-7712',
    pgId: 'pg2',
    pgName: 'Zolo Blossom - Women’s Sanctuary',
    pgImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    pgAddress: '#112, 27th Main Road, HSR Sector 1, Bengaluru',
    ownerName: 'Sunita Menon',
    ownerPhone: '+91 97766 55443',
    userId: 'u2',
    userName: 'Ananya Roy',
    userEmail: 'ananya@example.com',
    userPhone: '+91 98123 45678',
    roomId: 'r301',
    roomNumber: '301',
    bedId: 'b301-1',
    bedNumber: '301-A',
    roomType: 'Double Sharing AC',
    moveInDate: '2024-02-10',
    durationMonths: 11,
    monthlyRent: 13500,
    securityDeposit: 15000,
    discountAmount: 1500,
    totalPaid: 27000,
    couponCode: 'ZOLO1500',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdAt: '2024-02-05',
    rentDueDate: '2026-08-10',
    wifiCredentials: { ssid: 'ZoloBlossom_Guest', pass: 'BlossomSafe@2024' },
    gatePassCode: 'GP-11209'
  }
];

export const MOCK_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'TXN-908123',
    bookingId: 'BK-9821',
    userId: 'u1',
    userName: 'Aarav Sharma',
    pgName: 'Stanza Living - Maple House',
    amount: 12500,
    type: 'rent',
    method: 'UPI (GPay)',
    status: 'success',
    date: '2026-07-01 10:30 AM',
    transactionRef: 'UPI/418293019230/GPay'
  },
  {
    id: 'TXN-882194',
    bookingId: 'BK-9821',
    userId: 'u1',
    userName: 'Aarav Sharma',
    pgName: 'Stanza Living - Maple House',
    amount: 26500,
    type: 'security_deposit',
    method: 'HDFC Credit Card',
    status: 'success',
    date: '2024-01-10 03:15 PM',
    transactionRef: 'CC/9981203910/HDFC'
  },
  {
    id: 'TXN-773821',
    bookingId: 'BK-7712',
    userId: 'u2',
    userName: 'Ananya Roy',
    pgName: 'Zolo Blossom',
    amount: 13500,
    type: 'rent',
    method: 'Net Banking (ICICI)',
    status: 'success',
    date: '2026-07-05 09:12 AM',
    transactionRef: 'NB/552910391/ICICI'
  }
];

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-104',
    pgId: 'pg1',
    pgName: 'Stanza Living - Maple House',
    userId: 'u1',
    userName: 'Aarav Sharma',
    userRoom: '102-A',
    title: 'Wi-Fi Speed Drop in Room 102',
    category: 'wifi',
    priority: 'medium',
    status: 'in_progress',
    description: 'The Wi-Fi speed drops below 5 Mbps during evening peak hours (8 PM - 10 PM). Please check router bandwidth.',
    createdAt: '2026-08-03 04:30 PM',
    assignedStaff: 'Ramesh (IT Support)',
    updates: [
      { time: '2026-08-03 05:00 PM', note: 'Ticket logged. Assigned to network engineer.', by: 'System' },
      { time: '2026-08-04 11:00 AM', note: 'Technician visited site, replacing secondary router mesh unit.', by: 'Ramesh (IT)' }
    ]
  },
  {
    id: 'CMP-099',
    pgId: 'pg2',
    pgName: 'Zolo Blossom',
    userId: 'u2',
    userName: 'Ananya Roy',
    userRoom: '301-A',
    title: 'Bathroom Tap Leakage',
    category: 'plumbing',
    priority: 'low',
    status: 'resolved',
    description: 'Tap in bathroom 301 is dripping slightly.',
    createdAt: '2026-07-20 09:00 AM',
    resolvedAt: '2026-07-20 02:00 PM',
    assignedStaff: 'Suresh (Plumber)',
    updates: [
      { time: '2026-07-20 02:00 PM', note: 'Washer replaced. Issue fixed successfully.', by: 'Suresh' }
    ]
  }
];

export const MOCK_OFFERS: OfferCoupon[] = [
  { id: 'off1', code: 'PGNEST1000', discountPercentage: 10, maxDiscount: 1000, minBookingValue: 8000, description: 'Flat ₹1,000 Off on your first PG booking!', expiryDate: '2026-12-31', usageCount: 412, active: true },
  { id: 'off2', code: 'LUXURY2000', discountPercentage: 15, maxDiscount: 2000, minBookingValue: 15000, description: '₹2,000 Off on premium luxury co-living spaces', expiryDate: '2026-09-30', usageCount: 189, active: true },
  { id: 'off3', code: 'STUDENT500', discountPercentage: 5, maxDiscount: 500, minBookingValue: 5000, description: 'Special discount for college students with valid ID', expiryDate: '2026-10-31', usageCount: 650, active: true }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', title: 'Rent Due Reminder', message: 'Your monthly rent for Stanza Living - Maple House is due on 15th Aug.', type: 'payment', date: '2 hours ago', read: false, link: '/user/payments' },
  { id: 'n2', title: 'Complaint Ticket Updated', message: 'Ticket CMP-104 (Wi-Fi speed drop) has been updated by Ramesh IT Support.', type: 'complaint', date: 'Yesterday', read: false, link: '/user/complaints' },
  { id: 'n3', title: 'Independence Day Offer!', message: 'Use code FREEDOM15 for 15% off on security deposit across all cities.', type: 'offer', date: '3 days ago', read: true }
];

export const MOCK_REVIEWS: PGReview[] = [
  {
    id: 'rev1',
    pgId: 'pg1',
    userName: 'Karthik Raja',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    comment: 'Exceptional stay! The food menu changes daily and is very hygienic. High-speed internet never goes down, which is crucial for my WFH setup.',
    date: '2026-07-28',
    ownerReply: 'Thank you Karthik! We take pride in maintaining our fiber broadband and chef-cooked meals.',
    helpfulCount: 18
  },
  {
    id: 'rev2',
    pgId: 'pg1',
    userName: 'Priya Sundaram',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    rating: 4.5,
    comment: 'Super safe property with biometric access. The lounge area with PS5 is a great place to unwind after work.',
    date: '2026-07-15',
    helpfulCount: 12
  }
];

export const MOCK_BLOGS = [
  {
    id: 'blog1',
    title: '10 Essential Things to Check Before Booking a PG in Bengaluru',
    category: 'Guide',
    author: 'PGNest Editorial',
    date: 'Aug 2, 2026',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    summary: 'From metro connectivity to hidden maintenance charges, here is your ultimate checklist before signing a PG agreement.'
  },
  {
    id: 'blog2',
    title: 'Co-Living vs Traditional PG: Which One Fits Your Budget & Lifestyle?',
    category: 'Comparison',
    author: 'Shruti V.',
    date: 'Jul 28, 2026',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    summary: 'A detailed breakdown of costs, community perks, amenities, and flexibility differences.'
  },
  {
    id: 'blog3',
    title: 'How PG Owners Can Boost Occupancy by 40% with PGNest Tech Platform',
    category: 'For Owners',
    author: 'Rajesh Kumar',
    date: 'Jul 15, 2026',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    summary: 'Automated rent reminders, biometric integrations, and digital marketing strategies for PG property managers.'
  }
];

export const MOCK_ANALYTICS = {
  monthlyRevenue: [
    { month: 'Jan', revenue: 420000, bookings: 32 },
    { month: 'Feb', revenue: 480000, bookings: 38 },
    { month: 'Mar', revenue: 530000, bookings: 44 },
    { month: 'Apr', revenue: 610000, bookings: 51 },
    { month: 'May', revenue: 690000, bookings: 58 },
    { month: 'Jun', revenue: 780000, bookings: 65 },
    { month: 'Jul', revenue: 850000, bookings: 72 }
  ],
  occupancyByCity: [
    { city: 'Bengaluru', occupancy: 92 },
    { city: 'Pune', occupancy: 88 },
    { city: 'Hyderabad', occupancy: 85 },
    { city: 'Delhi NCR', occupancy: 79 },
    { city: 'Mumbai', occupancy: 94 }
  ],
  userGrowth: [
    { month: 'Jan', guests: 1200, owners: 85 },
    { month: 'Feb', guests: 1800, owners: 110 },
    { month: 'Mar', guests: 2400, owners: 145 },
    { month: 'Apr', guests: 3100, owners: 180 },
    { month: 'May', guests: 4200, owners: 220 },
    { month: 'Jun', guests: 5600, owners: 270 },
    { month: 'Jul', guests: 7200, owners: 340 }
  ]
};
