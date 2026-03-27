import { useState, useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import type { Venue } from '@/types';
import ProfileSection from '../Hirer/components/ProfileSection';
import VenueListSection from './components/VenueListSection';

const getMyVenues = (vendorId: string): Venue[] => {
  const raw = localStorage.getItem('venues');
  const all: Venue[] = raw ? JSON.parse(raw) : [];
  return all.filter((v) => v.vendorId === vendorId);
};

const saveVenue = (venue: Venue) => {
  const raw = localStorage.getItem('venues');
  const all: Venue[] = raw ? JSON.parse(raw) : [];
  all.push(venue);
  localStorage.setItem('venues', JSON.stringify(all));
};

const VendorProfilePage = () => {
  const { user, isLoading } = useAuth();
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    if (user?.id) setVenues(getMyVenues(user.id));
  }, [user?.id]);

  if (isLoading || !user) return null;

  const handleAddVenue = (venue: Venue) => {
    saveVenue(venue);
    setVenues((prev) => [...prev, venue]);
  };

  return (
    <div className="bg-dashboard min-h-screen">
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-10">
        <div className="pb-1">
          <h1 className="text-primary text-2xl font-semibold">My Profile</h1>
          <p className="mt-2 text-sm text-gray-500">
            Update your personal details and manage your venues.
          </p>
        </div>

        {/* Reuse hirer ProfileSection */}
        <ProfileSection />

        {/* Vendor-specific: venue management */}
        <VenueListSection venues={venues} onAdd={handleAddVenue} vendorId={user.id} />
      </div>
    </div>
  );
};

export default VendorProfilePage;
