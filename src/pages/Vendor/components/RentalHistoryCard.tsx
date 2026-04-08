import { format } from 'date-fns';
import StarRating from '@/components/StarRating';

interface RentalHistoryEntry {
  venue: string;
  location: string;
  eventName: string;
  date: string;
  rating: number;
  status: 'completed' | 'cancelled';
}

interface RentalHistoryCardProps {
  history: RentalHistoryEntry[];
}

const RentalHistoryCard = ({ history }: RentalHistoryCardProps) => {
  // Summary stats for the last row
  const totalEvents = history.length;
  const uniqueLocations = new Set(history.map((r) => r.location)).size;
  const avgRating =
    totalEvents === 0 ? 0 : history.reduce((sum, r) => sum + r.rating, 0) / totalEvents;

  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
        Rental History
        <span className="bg-secondary flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
          {totalEvents}
        </span>
      </p>

      {totalEvents === 0 ? (
        <p className="text-sm text-gray-400">No past hiring history available.</p>
      ) : (
        <div className="space-y-2">
          {/* History rows */}
          {history.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-2xl border border-purple-100 bg-white px-4 py-2.5"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{r.eventName}</p>
                <p className="text-xs text-gray-400">
                  {r.venue} · {r.location} · {format(new Date(r.date), 'dd-MM-yyyy')}
                </p>
              </div>
              <StarRating value={r.rating} />
            </div>
          ))}

          {/* Summary row */}
          <div className="flex items-center justify-between rounded-2xl border border-purple-200 bg-purple-50 px-4 py-2.5">
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">{totalEvents}</span> events ·{' '}
              <span className="font-semibold text-gray-700">{uniqueLocations}</span> locations
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">Avg</span>
              <StarRating value={avgRating} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalHistoryCard;
