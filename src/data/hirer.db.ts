import type { Application, Candidate, ComplianceDocuments, HireHistory, Venue } from '@/types';

// ─── Venues ───────────────────────────────────────────────────────────────────
// v1–v3 owned by Morgan (u3 / vendor@test.com)
// v4–v6 owned by Riley  (u4 / vendor2@test.com)

export const VENUES: Venue[] = [
  {
    id: 'v1',
    vendorId: 'u3',
    name: 'Rooftop Social',
    description:
      'A stunning open-air rooftop space with panoramic views of the Melbourne skyline, perfect for sophisticated evening events.',
    photo:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop',
    location: 'Southbank',
    capacity: 200,
    suitability: ['Corporate', 'Wedding'],
    pricePerHour: 450,
  },
  {
    id: 'v2',
    vendorId: 'u3',
    name: 'The Grand Hall',
    description:
      'An elegant heritage ballroom featuring soaring ceilings, crystal chandeliers, and a dedicated stage for large-scale events.',
    photo:
      'https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?q=80&w=1470&auto=format&fit=crop',
    location: 'CBD Melbourne',
    capacity: 500,
    suitability: ['Gala', 'Conference'],
    pricePerHour: 900,
  },
  {
    id: 'v3',
    vendorId: 'u3',
    name: 'Garden Pavilion',
    description:
      'A charming outdoor pavilion nestled in lush greenery, offering a tranquil garden setting ideal for intimate gatherings.',
    photo:
      'https://images.unsplash.com/photo-1521543387600-c745f8e83d77?q=80&w=1470&auto=format&fit=crop',
    location: 'Fitzroy',
    capacity: 120,
    suitability: ['Outdoor', 'Birthday'],
    pricePerHour: 300,
  },
  {
    id: 'v4',
    vendorId: 'u4',
    name: 'Skyline Loft',
    description:
      'A sleek industrial-style loft with floor-to-ceiling windows overlooking the Docklands waterfront and city skyline.',
    photo:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1470&auto=format&fit=crop',
    location: 'Docklands',
    capacity: 300,
    suitability: ['Corporate', 'Launch'],
    pricePerHour: 600,
  },
  {
    id: 'v5',
    vendorId: 'u4',
    name: 'Botanic Hall',
    description:
      'A refined and naturally lit event hall surrounded by botanical gardens, creating a serene atmosphere for elegant occasions.',
    photo:
      'https://images.unsplash.com/photo-1773005695304-97e7dbf5ff15?q=80&w=1470&auto=format&fit=crop',
    location: 'South Yarra',
    capacity: 150,
    suitability: ['Wedding', 'Gala'],
    pricePerHour: 500,
  },
  {
    id: 'v6',
    vendorId: 'u4',
    name: 'Harbour View',
    description:
      'A cosy waterfront space with casual beach-side vibes, stunning bay views, and a relaxed atmosphere for social events.',
    photo:
      'https://images.unsplash.com/photo-1680956987334-f068594ad200?q=80&w=1470&auto=format&fit=crop',
    location: 'St Kilda',
    capacity: 80,
    suitability: ['Birthday', 'Casual'],
    pricePerHour: 250,
  },
  // ADD FROM HERE
  // u5 Jordan Park — vendor3@test.com
  {
    id: 'v7',
    vendorId: 'u5',
    name: 'The Laneways Studio',
    description: "A creative inner-city studio tucked in Melbourne's iconic laneways...",
    photo:
      'https://images.unsplash.com/photo-1603425013520-e0b30e6e37dc?q=80&w=1471&auto=format&fit=crop',
    location: 'Collingwood',
    capacity: 90,
    suitability: ['Launch', 'Exhibition', 'Corporate'],
    pricePerHour: 350,
  },
  {
    id: 'v8',
    vendorId: 'u5',
    name: 'Riverside Terrace',
    description: 'An open-air terrace perched above the Yarra River...',
    photo:
      'https://images.unsplash.com/photo-1632316962873-47ee3d309f02?q=80&w=1470&auto=format&fit=crop',
    location: 'Richmond',
    capacity: 180,
    suitability: ['Wedding', 'Gala', 'Corporate'],
    pricePerHour: 550,
  },
  {
    id: 'v9',
    vendorId: 'u5',
    name: 'The Heritage Club',
    description: "A grand Victorian-era members' club with ornate interiors...",
    photo:
      'https://plus.unsplash.com/premium_photo-1663091120574-d87d12ff2753?q=80&w=1470&auto=format&fit=crop',
    location: 'East Melbourne',
    capacity: 250,
    suitability: ['Gala', 'Conference', 'Wedding'],
    pricePerHour: 750,
  },
];

// ─── Candidates ───────────────────────────────────────────────────────────────
// Venues hirer đang xem xét — chỉ dùng cho Browse + Rank sections
// hirerId = email (thống nhất)

export const CANDIDATES: Candidate[] = [
  // u2 Jamie — đang xem xét v3, v6
  {
    id: 'cand_3',
    hirerId: 'hirer2@test.com',
    venueId: 'v3',
    venueName: 'Garden Pavilion',
    location: 'Fitzroy',
    capacity: 120,
    rank: 1,
  },
  {
    id: 'cand_4',
    hirerId: 'hirer2@test.com',
    venueId: 'v6',
    venueName: 'Harbour View',
    location: 'St Kilda',
    capacity: 80,
    rank: 2,
  },
];

// ─── Applications ─────────────────────────────────────────────────────────────
// Form submissions chính thức — vendor đọc từ đây để hiển thị applicant list
// hirerId = email (thống nhất)
// matchScore: hardcoded vì không có logic thực để tính

export const APPLICATIONS: Application[] = [
  // u1 Alex — apply v1 (Annual Tech Summit)
  {
    id: 'app_1',
    hirerId: 'hirer@test.com',
    venueId: 'v1',
    venueName: 'Rooftop Social',
    location: 'Southbank',
    capacity: 200,
    eventName: 'Annual Tech Summit',
    eventType: 'Conference',
    guestCount: 200,
    date: '2025-08-15',
    time: '18:00',
    duration: 6,
    status: 'pending',
    rank: 1,
    matchScore: 92,
  },
  // u2 Jamie — apply v2 (Charity Fundraiser Gala)
  {
    id: 'app_2',
    hirerId: 'hirer2@test.com',
    venueId: 'v2',
    venueName: 'The Grand Hall',
    location: 'CBD Melbourne',
    capacity: 500,
    eventName: 'Charity Fundraiser Gala',
    eventType: 'Gala',
    guestCount: 350,
    date: '2025-09-10',
    time: '19:00',
    duration: 5,
    status: 'pending',
    rank: 1,
    matchScore: 85,
  },
  // Fake hirers — để vendor list trông phong phú hơn
  {
    id: 'app_3',
    hirerId: 'bob@email.com',
    venueId: 'v5',
    venueName: 'Botanic Hall',
    location: 'South Yarra',
    capacity: 150,
    eventName: 'Wedding Ceremony',
    eventType: 'Wedding',
    guestCount: 120,
    date: '2025-09-20',
    time: '14:00',
    duration: 8,
    status: 'pending',
    rank: 1,
    matchScore: 78,
  },
  {
    id: 'app_4',
    hirerId: 'carol@email.com',
    venueId: 'v6',
    venueName: 'Harbour View',
    location: 'St Kilda',
    capacity: 80,
    eventName: 'Birthday Bash',
    eventType: 'Private Party',
    guestCount: 60,
    date: '2025-07-10',
    time: '16:00',
    duration: 4,
    status: 'pending',
    rank: 1,
    matchScore: 65,
  },
  {
    id: 'app_5',
    hirerId: 'david@email.com',
    venueId: 'v4',
    venueName: 'Skyline Loft',
    location: 'Docklands',
    capacity: 300,
    eventName: 'Startup Networking Night',
    eventType: 'Corporate',
    guestCount: 90,
    date: '2025-10-05',
    time: '17:00',
    duration: 3,
    status: 'pending',
    rank: 1,
    matchScore: 81,
  },
  {
    id: 'app_6',
    hirerId: 'eva@email.com',
    venueId: 'v3',
    venueName: 'Garden Pavilion',
    location: 'Fitzroy',
    capacity: 120,
    eventName: 'Art Exhibition Opening',
    eventType: 'Exhibition',
    guestCount: 100,
    date: '2025-11-01',
    time: '11:00',
    duration: 5,
    status: 'pending',
    rank: 1,
    matchScore: 74,
  },
];

// ─── Hire History ─────────────────────────────────────────────────────────────
// hirerId = email (thống nhất — đổi từ id sang email)
// Vendor dialog map sang format { venue, eventName, date, status }

export const HIRE_HISTORY: HireHistory[] = [
  // u1 Alex Johnson — hirer@test.com
  {
    id: 'h1',
    hirerId: 'hirer@test.com',
    venueName: 'Skyline Loft',
    location: 'Docklands',
    eventName: 'Product Launch',
    dateOfHire: '2025-03-12',
    rating: 5,
  },
  {
    id: 'h2',
    hirerId: 'hirer@test.com',
    venueName: 'Botanic Hall',
    location: 'South Yarra',
    eventName: 'Team Offsite',
    dateOfHire: '2024-11-08',
    rating: 4,
  },
  {
    id: 'h3',
    hirerId: 'hirer@test.com',
    venueName: 'Harbour View',
    location: 'St Kilda',
    eventName: 'Birthday Gala',
    dateOfHire: '2024-07-22',
    rating: 3,
  },
  // u2 Jamie Chen — hirer2@test.com
  {
    id: 'h4',
    hirerId: 'hirer2@test.com',
    venueName: 'Rooftop Social',
    location: 'Southbank',
    eventName: 'Charity Fundraiser',
    dateOfHire: '2025-02-05',
    rating: 5,
  },
  {
    id: 'h5',
    hirerId: 'hirer2@test.com',
    venueName: 'Garden Pavilion',
    location: 'Fitzroy',
    eventName: 'Engagement Party',
    dateOfHire: '2024-09-19',
    rating: 4,
  },
  {
    id: 'h6',
    hirerId: 'hirer2@test.com',
    venueName: 'The Grand Hall',
    location: 'CBD Melbourne',
    eventName: 'Annual Gala Dinner',
    dateOfHire: '2024-06-30',
    rating: 2,
  },
  // Bob Smith — bob@email.com
  {
    id: 'h7',
    hirerId: 'bob@email.com',
    venueName: 'Rooftop Social',
    location: 'Southbank',
    eventName: 'Engagement Party',
    dateOfHire: '2024-03-22',
    rating: 4,
  },
  // Eva Martinez — eva@email.com
  {
    id: 'h8',
    hirerId: 'eva@email.com',
    venueName: 'Skyline Loft',
    location: 'Docklands',
    eventName: 'Photography Show',
    dateOfHire: '2023-09-15',
    rating: 4,
  },
  {
    id: 'h9',
    hirerId: 'eva@email.com',
    venueName: 'Garden Pavilion',
    location: 'Fitzroy',
    eventName: 'Product Launch',
    dateOfHire: '2024-05-10',
    rating: 3,
  },
  // David Lee — david@email.com — chưa có history (timesSelected = 0)
];

// ─── Compliance Documents ─────────────────────────────────────────────────────
// Seed data chỉ chứa metadata (isBusiness, abnNumber) — không có file content
// All hirers start with no uploaded documents so real uploads can be tested
// credibility score starts at 0 for everyone

export const COMPLIANCE_DOCS: ComplianceDocuments[] = [
  // u1 Alex — no documents uploaded
  { hirerId: 'hirer@test.com', isBusiness: false },
  // u2 Jamie — registered as business, but no documents uploaded yet
  { hirerId: 'hirer2@test.com', isBusiness: true, abnNumber: '51 824 753 556' },
  // fake hirers — no documents uploaded
  { hirerId: 'bob@email.com', isBusiness: false },
  { hirerId: 'carol@email.com', isBusiness: false },
  { hirerId: 'david@email.com', isBusiness: false },
  { hirerId: 'eva@email.com', isBusiness: true, abnNumber: '72 631 450 889' },
];

// ─── Hirer display names ──────────────────────────────────────────────────────
// Dùng để enrich fake hirers trên vendor page (không có trong users localStorage)

export const FAKE_HIRER_NAMES: Record<string, string> = {
  'bob@email.com': 'Bob Smith',
  'carol@email.com': 'Carol White',
  'david@email.com': 'David Lee',
  'eva@email.com': 'Eva Martinez',
};

// ─── matchScore per applicant ─────────────────────────────────────────────────
// Hardcoded vì không có logic thực để tính
// Key = application id

export const MATCH_SCORES: Record<string, number> = {
  app_1: 92,
  app_2: 85,
  app_3: 78,
  app_4: 65,
  app_5: 81,
  app_6: 74,
};
