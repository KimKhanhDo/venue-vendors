// import { type ChartConfig } from '@/components/ui/chart';
// import type { Applicant, BlockedPeriod } from '@/types';

// // NOTE: id '1' matches hirerId 'hirer@test.com' (Alex Johnson) — the real dummy user.
// // The rest are additional fake applicants to populate the vendor UI.
// export const MOCK_APPLICANTS: Applicant[] = [
//   {
//     id: 'app_hirer_1',
//     hirerId: 'hirer@test.com',
//     venueId: 'v1',
//     venueName: 'Rooftop Social',
//     location: 'Southbank', // venue v1
//     capacity: 200, // venue v1
//     eventName: 'Annual Tech Summit',
//     date: '2025-08-15',
//     eventType: 'Conference',
//     guestCount: 200,
//     duration: 6,
//     status: 'pending',
//     // ── Hirer profile ──
//     name: 'Alex Johnson',
//     email: 'hirer@test.com',
//     phone: '0412 345 678',
//     // ── Vendor-facing fields ──
//     matchScore: 92,
//     reputation: 4.8,
//     timesSelected: 9,
//     rentalHistory: [
//       {
//         venue: 'The Garden Hall',
//         eventName: 'Product Launch',
//         date: '2024-11-10',
//         status: 'completed',
//       },
//       {
//         venue: 'Skyview Lounge',
//         eventName: 'Team Offsite',
//         date: '2024-06-05',
//         status: 'completed',
//       },
//     ],
//     documents: [
//       { name: 'Public Liability Insurance.pdf', url: '#' },
//       { name: 'Event Plan.pdf', url: '#' },
//     ],
//   },
//   {
//     id: 'app_fake_2',
//     hirerId: 'bob@email.com',
//     venueId: 'v5',
//     venueName: 'Botanic Hall',
//     location: 'South Yarra', // venue v5
//     capacity: 150, // venue v5
//     eventName: 'Wedding Ceremony',
//     date: '2025-09-20',
//     eventType: 'Wedding',
//     guestCount: 120,
//     duration: 8,
//     status: 'pending',
//     // ── Hirer profile ──
//     name: 'Bob Smith',
//     email: 'bob@email.com',
//     phone: '0423 456 789',
//     // ── Vendor-facing fields ──
//     matchScore: 78,
//     reputation: 3.5,
//     timesSelected: 4,
//     rentalHistory: [
//       {
//         venue: 'Rooftop Social',
//         eventName: 'Engagement Party',
//         date: '2024-03-22',
//         status: 'completed',
//       },
//     ],
//     documents: [{ name: 'Insurance Certificate.pdf', url: '#' }],
//   },
//   {
//     id: 'app_fake_3',
//     hirerId: 'carol@email.com',
//     venueId: 'v6',
//     venueName: 'Harbour View',
//     location: 'St Kilda', // venue v6
//     capacity: 80, // venue v6
//     eventName: 'Birthday Bash',
//     date: '2025-07-10',
//     eventType: 'Private Party',
//     guestCount: 60,
//     duration: 4,
//     status: 'pending',
//     // ── Hirer profile ──
//     name: 'Carol White',
//     email: 'carol@email.com',
//     phone: '0434 567 890',
//     // ── Vendor-facing fields ──
//     matchScore: 65,
//     reputation: 2.1,
//     timesSelected: 1,
//     rentalHistory: [],
//     documents: [],
//   },
//   {
//     id: 'app_fake_4',
//     hirerId: 'david@email.com',
//     venueId: 'v4',
//     venueName: 'Skyline Loft',
//     location: 'Docklands', // venue v4
//     capacity: 300, // venue v4
//     eventName: 'Startup Networking Night',
//     date: '2025-10-05',
//     eventType: 'Corporate',
//     guestCount: 90,
//     duration: 3,
//     status: 'pending',
//     // ── Hirer profile ──
//     name: 'David Lee',
//     email: 'david@email.com',
//     phone: '0445 678 901',
//     // ── Vendor-facing fields ──
//     matchScore: 81,
//     reputation: 4.2,
//     timesSelected: 0,
//     rentalHistory: [],
//     documents: [{ name: 'Company Registration.pdf', url: '#' }],
//   },
//   {
//     id: 'app_fake_5',
//     hirerId: 'eva@email.com',
//     venueId: 'v2',
//     venueName: 'The Grand Hall',
//     location: 'CBD Melbourne', // venue v2
//     capacity: 500, // venue v2
//     eventName: 'Art Exhibition',
//     date: '2025-11-01',
//     eventType: 'Exhibition',
//     guestCount: 150,
//     duration: 5,
//     status: 'pending',
//     // ── Hirer profile ──
//     name: 'Eva Martinez',
//     email: 'eva@email.com',
//     phone: '0456 789 012',
//     // ── Vendor-facing fields ──
//     matchScore: 74,
//     reputation: 3.9,
//     timesSelected: 0,
//     rentalHistory: [
//       {
//         venue: 'CBD Gallery',
//         eventName: 'Photography Show',
//         date: '2023-09-15',
//         status: 'completed',
//       },
//     ],
//     documents: [],
//   },
// ];

// export const MOCK_BLOCKED: BlockedPeriod[] = [
//   {
//     id: 'b1',
//     venueId: 'v1',
//     venueName: 'Rooftop Social',
//     from: '2025-07-01',
//     to: '2025-07-07',
//     reason: 'Maintenance',
//   },
// ];

// export const vendorChartConfig = {
//   times: {
//     label: 'Times Selected: ',
//     color: '#894eef',
//   },
// } satisfies ChartConfig;

import { type ChartConfig } from '@/components/ui/chart';
import type { BlockedPeriod } from '@/types';

// MOCK_APPLICANTS đã bị xóa.
// Vendor applicant list được đọc trực tiếp từ localStorage key 'applications'
// (seeded bởi APPLICATIONS trong hirer_db.ts) và enrich từ các keys liên quan.

export const MOCK_BLOCKED: BlockedPeriod[] = [
  // u3 Morgan — block v1
  {
    id: 'b1',
    venueId: 'v1',
    venueName: 'Rooftop Social',
    from: '2025-07-01',
    to: '2025-07-07',
    reason: 'Maintenance',
  },
  // u4 Riley — block v5
  {
    id: 'b2',
    venueId: 'v5',
    venueName: 'Botanic Hall',
    from: '2025-08-10',
    to: '2025-08-20',
    reason: 'Renovation',
  },
];

export const vendorChartConfig = {
  times: {
    label: 'Times Selected: ',
    color: '#894eef',
  },
} satisfies ChartConfig;
