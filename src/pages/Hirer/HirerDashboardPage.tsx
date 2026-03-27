import { useState } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import type { Application } from '@/types';
import BrowseVenuesSection from './components/BrowseVenuesSection';
import RankVenuesSection from './components/RankVenuesSection';
import ApplySection from './components/ApplySection';
import HistorySection from './components/HistorySection';

const getInitialCandidates = (email: string | undefined): Application[] => {
  const raw = localStorage.getItem('applications');
  const all: Application[] = raw ? JSON.parse(raw) : [];
  return all.filter((a) => a.hirerId === email).sort((a, b) => a.rank - b.rank);
};

export default function HirerDashboardPage() {
  const { user } = useAuth();

  const [candidates, setCandidates] = useState<Application[]>(() =>
    getInitialCandidates(user?.email),
  );

  return (
    <div className="bg-dashboard min-h-screen">
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-10">
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

        {/* i — Browse Venues (with search built-in) */}
        <div id="venues">
          <BrowseVenuesSection candidates={candidates} setCandidates={setCandidates} />
        </div>

        {/* ii — Rank Venue Candidates */}
        <div id="rank">
          <RankVenuesSection candidates={candidates} setCandidates={setCandidates} />
        </div>

        {/* iii — Apply for a Venue */}
        <div id="apply">
          <ApplySection />
        </div>

        {/* iv — Hiring Reputation & History */}
        <div id="history">
          <HistorySection />
        </div>
      </div>
    </div>
  );
}
