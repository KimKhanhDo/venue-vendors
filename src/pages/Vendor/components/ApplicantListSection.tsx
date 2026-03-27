import { useState } from 'react';
import { Star, Target } from 'lucide-react';

import DashboardSection from '@/components/DashboardSection';
import ApplicantListCard from './ApplicantListCard';
import { cn } from '@/lib/utils';
import type { Applicant } from '@/types';

interface ApplicantListSectionProps {
  applicants: Applicant[];
  onSelect: (app: Applicant) => void;
}

const ApplicantListSection = ({ applicants, onSelect }: ApplicantListSectionProps) => {
  const [sortBy, setSortBy] = useState<'reputation' | 'match'>('reputation');

  const sorted = [...applicants].sort((a, b) =>
    sortBy === 'reputation' ? b.reputation - a.reputation : b.matchScore - a.matchScore,
  );

  return (
    <DashboardSection
      number="i"
      title="Applicant List"
      badge={
        <div className="border-secondary/80 flex rounded-xl border text-xs font-medium">
          <button
            onClick={() => setSortBy('reputation')}
            className={cn(
              'flex cursor-pointer items-center gap-1 rounded-l-xl px-3 py-1 transition-all',
              sortBy === 'reputation'
                ? 'bg-secondary text-white'
                : 'text-secondary hover:bg-purple-50',
            )}
          >
            <Star size={12} />
            Reputation
          </button>
          <button
            onClick={() => setSortBy('match')}
            className={cn(
              'flex cursor-pointer items-center gap-1 rounded-r-xl px-3 py-1 transition-all',
              sortBy === 'match' ? 'bg-secondary text-white' : 'text-secondary hover:bg-purple-50',
            )}
          >
            <Target size={12} />
            Match
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        {sorted.map((app) => (
          <ApplicantListCard key={app.id} applicant={app} onSelect={onSelect} />
        ))}
      </div>
    </DashboardSection>
  );
};

export default ApplicantListSection;
