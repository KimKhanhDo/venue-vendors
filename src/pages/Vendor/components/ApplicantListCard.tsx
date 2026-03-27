import StarRating from '@/components/StarRating';
import MatchBadge from '@/components/MatchBadge';
import StatusBadge from '@/components/StatusBadge';
import type { Applicant } from '@/types';

interface ApplicantListCardProps {
  applicant: Applicant;
  onSelect: (app: Applicant) => void;
}

const ApplicantListCard = ({ applicant, onSelect }: ApplicantListCardProps) => {
  return (
    <div
      onClick={() => onSelect(applicant)}
      className="flex cursor-pointer items-center justify-between rounded-2xl border border-purple-100 bg-purple-50/60 px-4 py-3 transition-all hover:border-purple-300"
    >
      {/* Applicant Info */}
      <div className="space-y-0.5">
        <p className="text-sm font-semibold">{applicant.name}</p>
        <p className="text-xs text-gray-500">
          {applicant.eventName} · {applicant.eventType} · {applicant.date}
        </p>
        <p className="text-xs text-gray-400">
          {applicant.guestCount} guests · {applicant.duration}h
        </p>
        <StarRating value={applicant.reputation} />
      </div>

      {/* Score & Status */}
      <div className="flex flex-col items-end gap-1.5">
        <MatchBadge score={applicant.matchScore} />
        <StatusBadge status={applicant.status} />
      </div>
    </div>
  );
};

export default ApplicantListCard;
