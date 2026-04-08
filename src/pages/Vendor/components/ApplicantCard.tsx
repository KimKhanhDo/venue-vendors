import StarRating from '@/components/StarRating';
import MatchBadge from '@/components/MatchBadge';
import StatusBadge from '@/components/StatusBadge';
import type { Application } from '@/types';

interface ApplicantCardProps {
  applicant: Application;
  reputation: number;
  onSelect: (app: Application) => void;
}

const ApplicantCard = ({ applicant, reputation, onSelect }: ApplicantCardProps) => {
  return (
    <div
      onClick={() => onSelect(applicant)}
      className="flex cursor-pointer items-center justify-between rounded-2xl border border-purple-100 bg-purple-50/60 px-4 py-3 transition-all hover:border-purple-300"
    >
      {/* Applicant Info */}
      <div className="space-y-1">
        <p className="text-sm font-semibold">{applicant.hirerName ?? applicant.hirerId}</p>

        <p className="text-xs text-gray-500">
          {applicant.eventName} · {applicant.eventType ?? 'General'} · {applicant.date}
        </p>

        <p className="text-xs text-gray-400">
          {applicant.guestCount} guests · {applicant.duration}h
        </p>

        {reputation === 0 ? (
          <span className="text-xs font-semibold text-gray-600">No rating</span>
        ) : (
          <StarRating value={reputation} />
        )}
      </div>

      {/* Score & Status */}
      <div className="flex flex-col items-end gap-2">
        <MatchBadge score={applicant.matchScore ?? 0} />
        <StatusBadge status={applicant.status} />
      </div>
    </div>
  );
};

export default ApplicantCard;
