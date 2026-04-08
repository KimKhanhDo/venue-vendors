import type { Application } from '@/types';
import MatchBadge from '@/components/MatchBadge';
import StarRating from '@/components/StarRating';

interface SummaryCardProps {
  applicant: Application;
  reputation: number;
}

const SummaryCard = ({ applicant, reputation }: SummaryCardProps) => (
  <div className="space-y-1 rounded-2xl border border-purple-100 bg-purple-50/50 px-4 py-3 text-sm">
    <div className="mb-1 flex items-center justify-between">
      <p className="text-base font-semibold">{applicant.hirerName ?? applicant.hirerId}</p>
      <MatchBadge score={applicant.matchScore ?? 0} />
    </div>
    <p>
      <span className="font-semibold">Event:</span> {applicant.eventName} (
      {applicant.eventType ?? 'General'})
    </p>
    <p>
      <span className="font-semibold">Date:</span> {applicant.date}
    </p>
    <p>
      <span className="font-semibold">Guests:</span> {applicant.guestCount}
    </p>
    <p>
      <span className="font-semibold">Duration:</span> {applicant.duration} hours
    </p>
    <p>
      <span className="font-semibold">Email:</span> {applicant.hirerId}
    </p>
    <div className="flex items-center gap-2 pt-1">
      <span className="font-semibold">Reputation:</span>
      <StarRating value={reputation} />
    </div>
  </div>
);

export default SummaryCard;
