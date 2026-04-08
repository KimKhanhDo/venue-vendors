import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import type { Candidate } from '@/types';
import BrowseVenuesSection from './components/BrowseVenuesSection';
import RankVenuesSection from './components/RankVenuesSection';
import ApplySection from './components/ApplySection';
import HistorySection from './components/HistorySection';

// Reads the current hirer's venue candidates from localStorage and sorts them by rank.
// Filters by hirerId (email) so each hirer only sees their own candidates.
const getInitialCandidates = (email: string | undefined): Candidate[] => {
  const raw = localStorage.getItem('candidates');
  const all: Candidate[] = raw ? JSON.parse(raw) : [];

  return all
    .filter((candidate) => candidate.hirerId === email) // keep only this hirer's candidates
    .sort((a, b) => a.rank - b.rank); // preserve the order the hirer last saved
};

export default function HirerDashboardPage() {
  const { user } = useAuth();

  const [candidates, setCandidates] = useState<Candidate[]>(() =>
    getInitialCandidates(user?.email),
  );

  // Tracks which venue the hirer wants to apply for.
  // Set when clicking "Apply" on a RankCard, cleared after form submission.
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  // Called after hirer submits the form — removes the applied venue from candidates
  const handleSubmitDone = (venueId: string) => {
    const raw = localStorage.getItem('candidates');
    const all: Candidate[] = raw ? JSON.parse(raw) : [];

    const updated = all.filter((c) => c.venueId !== venueId);
    localStorage.setItem('candidates', JSON.stringify(updated));

    setCandidates((prev) => prev.filter((setCandidates) => setCandidates.venueId !== venueId)); // remove from UI
    setSelectedVenueId(null); // clear selection
  };

  return (
    <div className="bg-dashboard min-h-screen">
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-10">
        {/* Page Header */}
        <div className="pb-1">
          <h1 className="text-primary text-2xl font-semibold">
            Welcome back,{' '}
            <span className="text-secondary font-medium">{user?.username || 'Hirer'}</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Browse venues, rank your candidates, and submit applications.
          </p>
        </div>

        {/* i — Browse Venues */}
        <div id="venues">
          <BrowseVenuesSection candidates={candidates} setCandidates={setCandidates} />
        </div>

        {/* ii — Rank Venue Candidates */}
        <div id="rank">
          <RankVenuesSection
            candidates={candidates}
            setCandidates={setCandidates}
            onApply={setSelectedVenueId}
          />
        </div>

        {/* iii — Apply for a Venue */}
        <div id="apply">
          <ApplySection selectedVenueId={selectedVenueId} onSubmitDone={handleSubmitDone} />
        </div>

        {/* iv — Hiring Reputation & History */}
        <div id="history">
          <HistorySection />
        </div>
      </div>
    </div>
  );
}
