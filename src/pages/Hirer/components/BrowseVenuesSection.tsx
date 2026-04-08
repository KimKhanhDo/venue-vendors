import { useMemo } from 'react';
import { MdOutlineHome } from 'react-icons/md';

import DashboardSection from '@/components/DashboardSection';
import { useAuth } from '@/contexts/AuthContext';
import type { Candidate, BlockedPeriod, Venue } from '@/types';
import VenueCard from './VenueCard';

// Reads all venues & blocked periods from localStorage
const getVenues = () => {
  const raw = localStorage.getItem('venues');
  return raw ? JSON.parse(raw) : [];
};

const getBlockedPeriods = () => {
  const raw = localStorage.getItem('blocked_periods');
  return raw ? JSON.parse(raw) : [];
};

interface Props {
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

const BrowseVenuesSection = ({ candidates, setCandidates }: Props) => {
  const { user } = useAuth();

  const venues = useMemo(getVenues, []);
  const blockedPeriods = useMemo(getBlockedPeriods, []);

  // Apply Set to get unique values
  const blockedVenueIds = new Set(blockedPeriods.map((blocked: BlockedPeriod) => blocked.venueId));
  const addedIds = new Set(candidates.map((candidate) => candidate.venueId));

  const getBlockedInfo = (venueId: string) =>
    blockedPeriods.find((blocked: BlockedPeriod) => blocked.venueId === venueId);

  const handleAdd = (venue: Venue) => {
    // Guard: skip if venue is already added or blocked
    if (addedIds.has(venue.id) || blockedVenueIds.has(venue.id)) return;

    // Create a candidate entry (not an application — candidates are just bookmarks for ranking)
    const newCandidate: Candidate = {
      id: `cand_${Date.now()}`,
      hirerId: user!.email,
      venueId: venue.id,
      venueName: venue.name,
      location: venue.location,
      capacity: venue.capacity,
      rank: candidates.length + 1, // appended to the bottom of the rank list
    };

    // Persist to localStorage then sync React state
    const raw = localStorage.getItem('candidates');
    const all: Candidate[] = raw ? JSON.parse(raw) : [];

    all.push(newCandidate);
    localStorage.setItem('candidates', JSON.stringify(all));

    setCandidates((prev) => [...prev, newCandidate]);
  };

  return (
    <DashboardSection number="i" title="Browse Venues">
      {/* TODO: implement search & filter UI (CR feature) */}

      {/* Empty state */}
      {venues.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-purple-200 bg-purple-50/50 py-16 text-center">
          <MdOutlineHome className="mb-3 h-10 w-10 text-purple-200" />
          <p className="text-sm font-medium text-gray-500">No venues available</p>
          <p className="mt-1 text-xs text-gray-400">Check back later for new listings.</p>
        </div>
      ) : (
        /* Venue grid */
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue: Venue) => (
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
