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

// ─── Venue ────────────────────────────────────────────────────────────────────

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

// ─── Candidate ────────────────────────────────────────────────────────────────
// Venue hirer is considering — used only for Browse + Rank sections
// localStorage key: 'candidates'

export interface Candidate {
  id: string;
  hirerId: string; // email
  venueId: string;
  venueName: string;
  location: string;
  capacity: number;
  rank: number;
}

// ─── Application ──────────────────────────────────────────────────────────────
// Official form submission — hirer submits, vendor reviews and acts on
// localStorage key: 'applications'

export interface Application {
  id: string;
  hirerId: string; // email — consistent across all keys
  hirerName?: string; // enriched when vendor loads, not persisted
  venueId: string;
  venueName: string;
  location: string;
  capacity: number;
  eventName: string; // always present — only created via form submission
  eventType?: string;
  guestCount: number;
  date: string;
  time?: string;
  duration: number;
  status: 'pending' | 'approved' | 'rejected';
  comment?: string;
  rank: number;
  matchScore?: number; // hardcoded in seed, optional for real submissions
}

// ─── HireHistory ──────────────────────────────────────────────────────────────
// localStorage key: 'hire_history'

export interface HireHistory {
  id: string;
  hirerId: string; // email
  venueName: string;
  location: string;
  eventName: string;
  dateOfHire: string;
  rating: number; // 0–5, used to calculate reputation
}

// ─── StoredFile ───────────────────────────────────────────────────────────────
// Generic type for any file stored as base64 in localStorage

export interface StoredFile {
  fileName: string;
  base64: string; // data URL — e.g. data:image/jpeg;base64,...
}

// ─── ComplianceDocuments ──────────────────────────────────────────────────────
// localStorage key: 'compliance_docs'

export interface ComplianceDocuments {
  hirerId: string; // email
  isBusiness: boolean;
  abnNumber?: string;
  driverLicense?: StoredFile; // jpg
  liabilityInsurance?: StoredFile; // pdf
  businessCert?: StoredFile; // pdf, only when isBusiness = true
}

// ─── BlockedPeriod ────────────────────────────────────────────────────────────
// localStorage key: 'blocked_periods'

export interface BlockedPeriod {
  id: string;
  venueId: string;
  venueName: string;
  from: string;
  to: string;
  reason: string;
}
