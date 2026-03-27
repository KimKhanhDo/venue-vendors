// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  role: 'hirer' | 'vendor';
  credibilityScore?: number; // 0-5, auto-calculated from compliance docs
}

// ─── Compliance Documents ─────────────────────────────────────────────────────

export interface ComplianceDocuments {
  hirerId: string;
  // Driver's license — stored as base64 jpg in localStorage
  driverLicense?: {
    fileName: string;
    base64: string; // data:image/jpeg;base64,...
  };
  // Public liability insurance — stored as base64 pdf in localStorage
  liabilityInsurance?: {
    fileName: string;
    base64: string; // data:application/pdf;base64,...
  };
  // Business details — only present when isBusiness = true
  isBusiness: boolean;
  abnNumber?: string;
  businessCert?: {
    fileName: string;
    base64: string; // data:application/pdf;base64,...
  };
}

// ─── Hirer ────────────────────────────────────────────────────────────────────

export interface Venue {
  id: string;
  vendorId: string; // owner of this venue
  name: string;
  description: string;
  photo?: string; // optional URL — falls back to icon thumbnail if absent
  location: string;
  capacity: number;
  suitability: string[];
  pricePerHour: number;
}

export interface Application {
  id: string;
  hirerId: string;
  venueId: string;
  venueName: string;
  location: string;
  capacity: number;
  rank: number;
  // Filled in ApplySection
  eventName?: string;
  guestCount?: number;
  date?: string;
  time?: string;
  duration?: number;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
}

export interface HireHistory {
  id: string;
  hirerId: string;
  venueName: string;
  location: string;
  eventName: string;
  dateOfHire: string;
  rating: number;
}

// ─── Vendor ───────────────────────────────────────────────────────────────────

export interface RentalHistory {
  venue: string;
  eventName: string;
  date: string;
  status: 'completed' | 'cancelled';
}

export interface HirerDocument {
  name: string;
  url: string;
}

export interface Applicant {
  // From Application
  id: string;
  hirerId: string;
  venueId: string;
  venueName: string;
  location: string;
  capacity: number;
  eventName: string;
  date: string;
  eventType: string;
  guestCount: number;
  duration: number;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
  // ── Hirer profile (denormalized for vendor view) ──
  name: string;
  email: string;
  phone: string;
  // Computed / dummy fields - Vendor-facing fields
  matchScore: number;
  reputation: number;
  credibilityScore?: number; // pulled from user profile
  timesSelected: number;
  rentalHistory: RentalHistory[];
  documents: HirerDocument[];
}

export interface BlockedPeriod {
  id: string;
  venueId: string;
  venueName: string;
  from: string;
  to: string;
  reason: string;
}
