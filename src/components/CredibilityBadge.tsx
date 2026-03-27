import StarRating from '@/components/StarRating';

interface CredibilityBadgeProps {
  value: number;
}

const CredibilityBadge = ({ value }: CredibilityBadgeProps) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5">
      <StarRating value={value} />
    </div>
  );
};

export default CredibilityBadge;
