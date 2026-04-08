import { useState, useMemo } from 'react';
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';

import type { Application } from '@/types';
import DashboardSection from '@/components/DashboardSection';
import ApplicantCard from './ApplicantCard';
import { getReputationMap } from '@/utils';

interface ApplicantListSectionProps {
  applicants: Application[];
  onSelect: (app: Application) => void;
}

const ApplicantListSection = ({ applicants, onSelect }: ApplicantListSectionProps) => {
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  // Compute reputation map once on mount — no need to recalculate on every render
  const reputationMap = useMemo(getReputationMap, []);

  // Re-sort applicants whenever sortDir or applicants list changes
  const sorted = useMemo(
    () =>
      // Spread into a new array first to avoid mutating the original prop
      [...applicants].sort((a, b) => {
        const repA = reputationMap.get(a.hirerId) ?? 0;
        const repB = reputationMap.get(b.hirerId) ?? 0;
        return sortDir === 'desc' ? repB - repA : repA - repB;
      }),
    [applicants, sortDir, reputationMap],
  );

  const DirIcon = sortDir === 'desc' ? ArrowDownNarrowWide : ArrowUpNarrowWide;

  return (
    <DashboardSection
      number="i"
      title="Applicant List"
      badge={
        <button
          onClick={() => setSortDir((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
          className="border-secondary/80 text-secondary flex cursor-pointer items-center gap-1 rounded-xl border px-3 py-1 text-xs font-medium transition-all hover:bg-purple-50"
        >
          <DirIcon size={12} />
          Reputation
        </button>
      }
    >
      {sorted.length === 0 ? (
        <p className="py-1 text-sm text-gray-400">No applications yet.</p>
      ) : (
        <div className="space-y-3">
          {sorted.map((app) => (
            <ApplicantCard
              key={app.id}
              applicant={app}
              reputation={reputationMap.get(app.hirerId) ?? 0}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </DashboardSection>
  );
};

export default ApplicantListSection;
