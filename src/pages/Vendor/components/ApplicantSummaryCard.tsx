import type { Applicant } from '@/types';
import MatchBadge from '@/components/MatchBadge';
import StarRating from '@/components/StarRating';

interface ApplicantSummaryCardProps {
  applicant: Applicant;
}

const ApplicantSummaryCard = ({ applicant }: ApplicantSummaryCardProps) => {
  return (
    <div className="space-y-1 rounded-2xl border border-purple-100 bg-purple-50/60 px-4 py-3 text-sm">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-base font-semibold">{applicant.name}</p>
        <MatchBadge score={applicant.matchScore} />
      </div>
      <p>
        <span className="font-semibold">Event:</span> {applicant.eventName} ({applicant.eventType})
      </p>
      {/* ──  eventDate */}
      <p>
        <span className="font-semibold">Date:</span> {applicant.date}
      </p>
      {/* ──  guestCount ── */}
      <p>
        <span className="font-semibold">Guests:</span> {applicant.guestCount}
      </p>
      <p>
        <span className="font-semibold">Duration:</span> {applicant.duration} hours
      </p>
      <p>
        <span className="font-semibold">Contact:</span> {applicant.email} · {applicant.phone}
      </p>
      <div className="flex items-center gap-2 pt-1">
        <span className="font-semibold">Reputation:</span>
        <StarRating value={applicant.reputation ?? 0} />
      </div>
    </div>
  );
};

export default ApplicantSummaryCard;
