import type { Application } from '@/types';

interface RankCardProps {
  candidate: Application;
  index: number;
  total: number;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

const RankCard = ({ candidate, index, total, onMoveUp, onMoveDown }: RankCardProps) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50/80 px-3 py-2.5">
      {/* Rank badge */}
      <span className="bg-secondary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white">
        {index + 1}
      </span>

      {/* Venue info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">{candidate.venueName}</p>
        <p className="text-xs text-gray-500">
          {candidate.location} · Cap. {candidate.capacity}
        </p>
      </div>

      {/* Move buttons */}
      <div className="flex gap-1">
        <button
          onClick={() => onMoveUp(index)}
          disabled={index === 0}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-purple-200 text-purple-600 transition-all hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ↑
        </button>
        <button
          onClick={() => onMoveDown(index)}
          disabled={index === total - 1}
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-purple-200 text-purple-600 transition-all hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default RankCard;
