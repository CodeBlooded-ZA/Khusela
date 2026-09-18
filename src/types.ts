export type Screen =
  | 'onboarding'
  | 'home'
  | 'incident-detail'
  | 'safety-map'
  | 'sos-active'
  | 'help-on-the-way'
  | 'friends'
  | 'providers'
  | 'provider-detail'
  | 'report-incident'
  | 'provider-portal'
  | 'settings'
  | 'offline-preview'
  | 'privacy-policy';

export type UserPersona = 'thandi' | 'lerato' | 'provider';

export type Theme = 'dark' | 'light';

export interface Friend {
  id: string;
  name: string;
  surname: string;
  phone: string;
  avatar: string;
  isOnline: boolean;
  status: 'safe' | 'alert' | 'danger-zone' | 'offline';
  lastLocation: string;
  alertDetail?: {
    timeAgo: string;
    address: string;
    distanceKm: number;
    description: string;
    type: string;
  };
}

export interface TimelineEntry {
  time: string;
  text: string;
  isLive?: boolean;
}

export interface Incident {
  id: string;
  title: string;
  location: string;
  distanceKm: number;
  timeAgo: string;
  description: string;
  status: 'live' | 'recent' | 'trending';
  category: string;
  verified: boolean;
  x: number; // coordinate percentage 0-100 on map
  y: number; // coordinate percentage 0-100 on map
  timeline: TimelineEntry[];
  photos?: string[];
  reportedBy?: string;
  isDangerZoneNotice?: boolean;
  isFriendAlert?: boolean;
  friendId?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  type: 'Police' | 'Ambulance' | 'Security' | 'Fire';
  address: string;
  distanceKm: number;
  etaMinutes: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  isSponsored?: boolean;
  phone: string;
  coverageKm: number;
  about: string;
  services: string[];
  bannerUrl?: string;
  logoText: string;
  stats: {
    avgResponse: string;
    monthlyResponses: number;
    coverageRadius: string;
  };
}

export interface DangerZone {
  id: string;
  name: string;
  area: string;
  incidentCount: number;
  riskLevel: 'high' | 'extreme';
  x: number;
  y: number;
  radius: number;
}

export interface DataSharingLog {
  id: string;
  timestamp: string;
  description: string;
  recipient: string;
  reason: string;
  canRevoke: boolean;
  isRevoked?: boolean;
}

export interface ProviderRegistration {
  orgName: string;
  type: string;
  psiraNumber: string;
  coverageAddress: string;
  coverageRadiusKm: number;
  contactNumber: string;
  email: string;
  about: string;
  consentDPA: boolean;
  status: 'draft' | 'pending' | 'verified';
}
