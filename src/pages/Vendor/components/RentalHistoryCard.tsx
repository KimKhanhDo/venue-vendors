import { cn } from '@/lib/utils';
import type { RentalHistory } from '@/types';

interface RentalHistoryCardProps {
  history: RentalHistory[];
}

const RentalHistoryCard = ({ history }: RentalHistoryCardProps) => {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
        Rental History
        <span className="bg-secondary flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
          {history.length}
        </span>
      </p>
      {history.length === 0 ? (
        <p className="text-sm text-gray-400">No rental history available.</p>
      ) : (
        <div className="space-y-2">
          {history.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl border border-purple-100 bg-white px-4 py-2.5"
            >
              <div>
                <p className="text-sm font-medium">{r.eventName}</p>
                <p className="text-xs text-gray-400">
                  {r.venue} · {r.date}
                </p>
              </div>
              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-xs font-medium',
                  r.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-500',
                )}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalHistoryCard;
