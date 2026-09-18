import { Friend, Incident, ServiceProvider, DangerZone, DataSharingLog } from '../types';

export const INITIAL_FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: 'Lerato',
    surname: 'Molefe',
    phone: '+27 82 555 1201',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    status: 'safe',
    lastLocation: 'Braamfontein'
  },
  {
    id: 'f2',
    name: 'Naledi',
    surname: 'Mokoena',
    phone: '+27 83 992 4819',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    status: 'alert',
    lastLocation: 'Alexandra',
    alertDetail: {
      timeAgo: '1 min ago',
      address: '3rd Ave, Alexandra',
      distanceKm: 2.3,
      description: 'Naledi triggered an emergency alert. Her live location is broadcasting to the network.',
      type: 'SOS EMERGENCY'
    }
  },
  {
    id: 'f3',
    name: 'Ayesha',
    surname: 'Patel',
    phone: '+27 71 443 8920',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    status: 'safe',
    lastLocation: 'Randburg'
  },
  {
    id: 'f4',
    name: 'Zanele',
    surname: 'Khumalo',
    phone: '+27 84 321 0092',
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
    status: 'safe',
    lastLocation: 'Soweto'
  },
  {
    id: 'f5',
    name: 'Busi',
    surname: 'Sithole',
    phone: '+27 76 112 3490',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    isOnline: false,
    status: 'offline',
    lastLocation: 'Hillbrow'
  }
];

export const INITIAL_SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: 'p1',
    name: 'SAPS ALEXANDRA',
    type: 'Police',
    address: 'Vasco Da Gama St, Alexandra',
    distanceKm: 1.1,
    etaMinutes: 4,
    rating: 4.2,
    reviewsCount: 348,
    isVerified: true,
    isSponsored: false,
    phone: '+27 11 321 7600',
    coverageKm: 8,
    logoText: 'SAPS',
    about: 'South African Police Service precinct covering Alexandra, Marlboro, and Sandton East boundaries. Dedicated Family Violence, Child Protection and Sexual Offences (FCS) unit on standby 24/7.',
    services: ['Armed Response', 'FCS Specialized Unit', 'Crime Scene Response', 'Emergency Escort'],
    stats: {
      avgResponse: '4-7 min',
      monthlyResponses: 412,
      coverageRadius: '8 km radius'
    }
  },
  {
    id: 'p2',
    name: 'GAUTENG MEDASSIST',
    type: 'Ambulance',
    address: 'Corlett Dr, Bramley',
    distanceKm: 2.0,
    etaMinutes: 7,
    rating: 4.7,
    reviewsCount: 512,
    isVerified: true,
    isSponsored: false,
    phone: '+27 82 911 0000',
    coverageKm: 15,
    logoText: 'MED',
    about: 'Provincial certified rapid emergency medical service with advanced life support paramedics and dedicated trauma counselling units for gender-based violence survivors.',
    services: ['Advanced Life Support', 'Trauma Counselling', 'Hospital Transfer', 'Emergency Paramedic'],
    stats: {
      avgResponse: '7 min',
      monthlyResponses: 689,
      coverageRadius: '15 km radius'
    }
  },
  {
    id: 'p3',
    name: 'SENTINEL RAPID RESPONSE',
    type: 'Security',
    address: 'Rivonia Rd, Sandhurst',
    distanceKm: 2.6,
    etaMinutes: 6,
    rating: 4.8,
    reviewsCount: 940,
    isVerified: true,
    isSponsored: true,
    phone: '+27 11 888 2400',
    coverageKm: 20,
    logoText: 'SRR',
    bannerUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&auto=format&fit=crop&q=80',
    about: 'PSIRA accredited private tactical protection fleet. Equipped with live GPS dispatch, armored Hilux patrol units, body-worn cameras, and trained female tactical responders.',
    services: ['Tactical Armed Response', 'Panic Alarm Dispatch', 'Safe Zone Escort', 'Live GPS Tracking'],
    stats: {
      avgResponse: '6 min',
      monthlyResponses: 1240,
      coverageRadius: '20 km radius'
    }
  },
  {
    id: 'p4',
    name: 'SAPS HILLBROW',
    type: 'Police',
    address: 'Clarendon Place, Hillbrow',
    distanceKm: 2.8,
    etaMinutes: 8,
    rating: 4.1,
    reviewsCount: 420,
    isVerified: true,
    isSponsored: false,
    phone: '+27 11 488 6511',
    coverageKm: 6,
    logoText: 'SAPS',
    about: 'Hillbrow precinct community policing forum unit. Active night patrols and crisis intake desk for vulnerable women and children.',
    services: ['Emergency Patrol', 'Victim Support Room', 'Stationary Protection Desk'],
    stats: {
      avgResponse: '8 min',
      monthlyResponses: 530,
      coverageRadius: '6 km radius'
    }
  },
  {
    id: 'p5',
    name: 'JOZI GUARD SECURITY',
    type: 'Security',
    address: 'Jorissen St, Braamfontein',
    distanceKm: 3.4,
    etaMinutes: 9,
    rating: 4.5,
    reviewsCount: 260,
    isVerified: true,
    isSponsored: false,
    phone: '+27 11 717 1000',
    coverageKm: 10,
    logoText: 'JGS',
    about: 'Campus precinct and inner-city mobile patrol security with dedicated foot officers and quick-reaction motorcycle units.',
    services: ['Campus & Street Escort', 'Patrol Units', 'Visible Deterrence'],
    stats: {
      avgResponse: '9 min',
      monthlyResponses: 310,
      coverageRadius: '10 km radius'
    }
  },
  {
    id: 'p6',
    name: 'CITY FIRE & RESCUE',
    type: 'Fire',
    address: 'Fairview Fire Station, Johannesburg',
    distanceKm: 4.0,
    etaMinutes: 11,
    rating: 4.9,
    reviewsCount: 180,
    isVerified: true,
    isSponsored: false,
    phone: '+27 11 375 5911',
    coverageKm: 18,
    logoText: 'FIRE',
    about: 'Johannesburg Emergency Medical Services (EMS) & Fire Operations division.',
    services: ['Heavy Rescue', 'Hazardous Extraction', 'Structural Assistance'],
    stats: {
      avgResponse: '11 min',
      monthlyResponses: 215,
      coverageRadius: '18 km radius'
    }
  }
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-live-1',
    title: 'NALEDI NEEDS HELP',
    location: '3rd Ave, Alexandra',
    distanceKm: 2.3,
    timeAgo: 'Just now',
    description: 'Alert triggered by Naledi Mokoena. Network alert active. Responder dispatch pending.',
    status: 'live',
    category: 'Emergency SOS',
    verified: true,
    x: 68,
    y: 32,
    isFriendAlert: true,
    friendId: 'f2',
    reportedBy: 'Naledi Mokoena',
    timeline: [
      { time: 'Just now', text: 'Live location broadcasting to 5 trusted friends', isLive: true },
      { time: '1 min ago', text: 'Emergency SOS triggered via 5-tap gesture' }
    ]
  },
  {
    id: 'inc-2',
    title: 'SUSPICIOUS VEHICLE FOLLOWING WOMEN NEAR TAXI RANK',
    location: 'Bara Taxi Rank, Soweto',
    distanceKm: 4.1,
    timeAgo: '12 mins ago',
    description: 'White sedan circling slowly near rank exit for 20 minutes with no plates. Women walking alone advised to take well-lit main concourse.',
    status: 'trending',
    category: 'Suspicious Vehicle',
    verified: true,
    x: 28,
    y: 72,
    reportedBy: 'Community Watch Soweto',
    photos: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80'
    ],
    timeline: [
      { time: 'Now', text: 'SAPS patrol van dispatched to Chris Hani Rd', isLive: true },
      { time: '5 mins ago', text: 'Vehicle seen heading north on Old Potch Rd' },
      { time: '12 mins ago', text: 'Two women reported being tailed from taxi queue' },
      { time: '20 mins ago', text: 'Initial sighting reported by rank marshal' }
    ]
  },
  {
    id: 'inc-3',
    title: 'LERATO ENTERED A HIGH-RISK AREA',
    location: 'Hillbrow',
    distanceKm: 1.8,
    timeAgo: '18 mins ago',
    description: 'Automated geofence notification: Lerato entered high-risk zone (18 violent incidents reported in last 7 days).',
    status: 'recent',
    category: 'Danger Zone Notice',
    verified: true,
    x: 52,
    y: 44,
    isDangerZoneNotice: true,
    friendId: 'f1',
    reportedBy: 'Khusela Geofence Engine',
    timeline: [
      { time: '18 mins ago', text: 'Automatic network alert sent to 5 closest contacts' },
      { time: '20 mins ago', text: 'Entered Hillbrow Central zone near Pretoria St' }
    ]
  },
  {
    id: 'inc-4',
    title: 'STREETLIGHTS OUT ON JAN SMUTS AVE',
    location: 'Jan Smuts Ave, Randburg',
    distanceKm: 6.0,
    timeAgo: '45 mins ago',
    description: 'Entire 800m stretch from Conrad Dr to Republic Rd in complete darkness due to cable fault. Walkers advised to divert.',
    status: 'recent',
    category: 'Hazard / Infrastructure',
    verified: false,
    x: 38,
    y: 24,
    reportedBy: 'Ayesha Patel',
    timeline: [
      { time: '45 mins ago', text: 'Reported by community walker' },
      { time: '1 hour ago', text: 'City Power logged ticket CP-88219' }
    ]
  },
  {
    id: 'inc-5',
    title: 'BREAK-IN REPORTED',
    location: 'De Korte St, Braamfontein',
    distanceKm: 0.4,
    timeAgo: '1 hour ago',
    description: 'Attempted break-in reported at student residence gate. Private security on site, suspect fled west towards Station.',
    status: 'recent',
    category: 'Security Alert',
    verified: true,
    x: 48,
    y: 52,
    reportedBy: 'Jozi Guard Security',
    timeline: [
      { time: '50 mins ago', text: 'Area swept and secured by Jozi Guard' },
      { time: '1 hour ago', text: 'Alarm triggered, response arrived within 3 mins' }
    ]
  }
];

export const INITIAL_DANGER_ZONES: DangerZone[] = [
  {
    id: 'dz1',
    name: 'Hillbrow Central',
    area: 'Pretoria St & Quartz St',
    incidentCount: 18,
    riskLevel: 'extreme',
    x: 54,
    y: 45,
    radius: 38
  },
  {
    id: 'dz2',
    name: 'Alexandra 3rd Ave Taxi Rank',
    area: 'Vasco Da Gama & 3rd Ave',
    incidentCount: 14,
    riskLevel: 'high',
    x: 69,
    y: 33,
    radius: 34
  },
  {
    id: 'dz3',
    name: 'Bara Taxi Rank Perimeter',
    area: 'Chris Hani Baragwanath',
    incidentCount: 9,
    riskLevel: 'high',
    x: 27,
    y: 73,
    radius: 32
  }
];

export const INITIAL_DATA_SHARING_LOGS: DataSharingLog[] = [
  {
    id: 'log-1',
    timestamp: 'Today 21:14',
    description: 'Live GPS location broadcast during active emergency alert',
    recipient: '5 Closest Friends (Lerato, Ayesha, Zanele, Naledi, Busi)',
    reason: 'User triggered SOS alert (5-tap trigger)',
    canRevoke: true,
    isRevoked: false
  },
  {
    id: 'log-2',
    timestamp: 'Today 21:16',
    description: 'High-resolution photo, contact number, and real-time GPS telemetry',
    recipient: 'Sentinel Rapid Response (Dispatched by Lerato Molefe)',
    reason: 'Emergency provider dispatch to locate victim in field',
    canRevoke: true,
    isRevoked: false
  },
  {
    id: 'log-3',
    timestamp: 'Yesterday 18:40',
    description: 'Geofence entry notification (Location tag: Hillbrow)',
    recipient: '5 Closest Friends',
    reason: 'Automatic high-risk zone notification (Consent verified)',
    canRevoke: false
  },
  {
    id: 'log-4',
    timestamp: '3 days ago',
    description: 'Anonymized incident report metadata (Category: Streetlight fault)',
    recipient: 'Khusela Public Safety Map & City Power',
    reason: 'Community safety alert sharing',
    canRevoke: false
  }
];
