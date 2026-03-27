import type { HireHistory, Venue } from '@/types';

// v1, v2, v3 owned by Morgan (u2 / vendor@test.com)
// v4, v5, v6 reserved for future vendors
export const VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'Rooftop Social',
    description:
      'A stunning open-air rooftop space with panoramic views of the Melbourne skyline, perfect for sophisticated evening events.',
    photo:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop',
    location: 'Southbank',
    capacity: 200,
    suitability: ['Corporate', 'Wedding'],
    pricePerHour: 450,
    vendorId: 'u2',
  },
  {
    id: 'v2',
    name: 'The Grand Hall',
    description:
      'An elegant heritage ballroom featuring soaring ceilings, crystal chandeliers, and a dedicated stage for large-scale events.',
    photo:
      'https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?q=80&w=1470&auto=format&fit=crop',
    location: 'CBD Melbourne',
    capacity: 500,
    suitability: ['Gala', 'Conference'],
    pricePerHour: 900,
    vendorId: 'u2',
  },
  {
    id: 'v3',
    name: 'Garden Pavilion',
    description:
      'A charming outdoor pavilion nestled in lush greenery, offering a tranquil garden setting ideal for intimate gatherings.',
    photo:
      'https://images.unsplash.com/photo-1521543387600-c745f8e83d77?q=80&w=1470&auto=format&fit=crop',
    location: 'Fitzroy',
    capacity: 120,
    suitability: ['Outdoor', 'Birthday'],
    pricePerHour: 300,
    vendorId: 'u2',
  },
  {
    id: 'v4',
    name: 'Skyline Loft',
    description:
      'A sleek industrial-style loft with floor-to-ceiling windows overlooking the Docklands waterfront and city skyline.',
    photo:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1470&auto=format&fit=crop',
    location: 'Docklands',
    capacity: 300,
    suitability: ['Corporate', 'Launch'],
    pricePerHour: 600,
    vendorId: '',
  },
  {
    id: 'v5',
    name: 'Botanic Hall',
    description:
      'A refined and naturally lit event hall surrounded by botanical gardens, creating a serene atmosphere for elegant occasions.',
    photo:
      'https://images.unsplash.com/photo-1773005695304-97e7dbf5ff15?q=80&w=1470&auto=format&fit=crop',
    location: 'South Yarra',
    capacity: 150,
    suitability: ['Wedding', 'Gala'],
    pricePerHour: 500,
    vendorId: '',
  },
  {
    id: 'v6',
    name: 'Harbour View',
    description:
      'A cosy waterfront space with casual beach-side vibes, stunning bay views, and a relaxed atmosphere for social events.',
    photo:
      'https://images.unsplash.com/photo-1680956987334-f068594ad200?q=80&w=1470&auto=format&fit=crop',
    location: 'St Kilda',
    capacity: 80,
    suitability: ['Birthday', 'Casual'],
    pricePerHour: 250,
    vendorId: '',
  },
];

export const DUMMY_HISTORY: (HireHistory & { hirerId: string })[] = [
  {
    id: 'h1',
    hirerId: 'u1',
    venueName: 'Skyline Loft',
    location: 'Docklands',
    eventName: 'Product Launch',
    dateOfHire: '12 Mar 2025',
    rating: 5,
  },
  {
    id: 'h2',
    hirerId: 'u1',
    venueName: 'Botanic Hall',
    location: 'South Yarra',
    eventName: 'Team Offsite',
    dateOfHire: '08 Nov 2024',
    rating: 4,
  },
  {
    id: 'h3',
    hirerId: 'u1',
    venueName: 'Harbour View',
    location: 'St Kilda',
    eventName: 'Birthday Gala',
    dateOfHire: '22 Jul 2024',
    rating: 3,
  },
];
