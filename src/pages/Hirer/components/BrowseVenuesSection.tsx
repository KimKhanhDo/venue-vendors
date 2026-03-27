import { useMemo, useState } from 'react';
import { MdOutlineHome } from 'react-icons/md';

import DashboardSection from '@/components/DashboardSection';
import { useAuth } from '@/contexts/AuthContext';
import type { Application, BlockedPeriod, Venue } from '@/types';
import SearchVenuesSection from './SearchVenueSection';
import VenueCard from './VenueCard';

const getVenues = (): Venue[] => {
  const raw = localStorage.getItem('venues');
  return raw ? JSON.parse(raw) : [];
};

const getBlockedPeriods = (): BlockedPeriod[] => {
  const raw = localStorage.getItem('blocked_periods');
  return raw ? JSON.parse(raw) : [];
};

interface Props {
  candidates: Application[];
  setCandidates: React.Dispatch<React.SetStateAction<Application[]>>;
}

const BrowseVenuesSection = ({ candidates, setCandidates }: Props) => {
  const { user } = useAuth();

  const [filteredVenues, setFilteredVenues] = useState<Venue[] | null>(null);

  const allVenues = useMemo(getVenues, []);
  const blockedPeriods = useMemo(getBlockedPeriods, []);
  const venues = filteredVenues ?? allVenues;

  const blockedVenueIds = new Set(blockedPeriods.map((b) => b.venueId));
  const addedIds = new Set(candidates.map((a) => a.venueId));

  const getBlockedInfo = (venueId: string): BlockedPeriod | undefined =>
    blockedPeriods.find((b) => b.venueId === venueId);

  const handleAdd = (venue: Venue) => {
    if (!user || addedIds.has(venue.id) || blockedVenueIds.has(venue.id)) return;

    const newApp: Application = {
      id: `app_${Date.now()}`,
      hirerId: user.email,
      venueId: venue.id,
      venueName: venue.name,
      location: venue.location,
      capacity: venue.capacity,
      rank: candidates.length + 1,
      status: 'pending',
    };

    const raw = localStorage.getItem('applications');
    const all: Application[] = raw ? JSON.parse(raw) : [];
    all.push(newApp);
    localStorage.setItem('applications', JSON.stringify(all));

    setCandidates((prev) => [...prev, newApp]);
  };

  return (
    <DashboardSection number="i" title="Browse Venues">
      {/* Search & filter */}
      <div className="mb-5">
        <SearchVenuesSection onFilterChange={setFilteredVenues} />
      </div>

      {/* Empty state */}
      {venues.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-purple-200 bg-purple-50/50 py-16 text-center">
          <MdOutlineHome className="mb-3 h-10 w-10 text-purple-200" />
          {filteredVenues !== null ? (
            <>
              <p className="text-sm font-medium text-gray-500">No venues found</p>
              <p className="mt-1 text-xs text-gray-400">Try adjusting your search filters.</p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-500">No venues available</p>
              <p className="mt-1 text-xs text-gray-400">Check back later for new listings.</p>
            </>
          )}
        </div>
      ) : (
        /* Venue grid */
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              added={addedIds.has(venue.id)}
              blocked={blockedVenueIds.has(venue.id)}
              blockedInfo={getBlockedInfo(venue.id)}
              onAdd={handleAdd}
            />
          ))}
        </div>
      )}
    </DashboardSection>
  );
};

export default BrowseVenuesSection;
