import { useMemo } from 'react';

import DashboardSection from '@/components/DashboardSection';
import StarRating from '@/components/StarRating';
import { useAuth } from '@/contexts/AuthContext';
import type { HireHistory } from '@/types';
import CredibilityBadge from '@/components/CredibilityBadge';

// localStorage helpers
const getHistory = (userId: string | undefined): HireHistory[] => {
  const raw = localStorage.getItem('hire_history');
  const all: HireHistory[] = raw ? JSON.parse(raw) : [];
  return all.filter((h) => h.hirerId === userId);
};

const getAvg = (history: HireHistory[]): number => {
  if (history.length === 0) return 0;
  return history.reduce((sum, h) => sum + h.rating, 0) / history.length;
};

const HistorySection = () => {
  const { user } = useAuth();

  const history = useMemo(() => getHistory(user?.id), [user?.email]);
  const avg = useMemo(() => getAvg(history), [history]);

  return (
    <DashboardSection
      number="iv"
      title="Hiring Reputation & History"
      badge={<CredibilityBadge value={avg} />}
    >
      {history.length === 0 ? (
        <p className="py-4 text-center text-sm text-gray-400">No hiring history yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-xs font-semibold text-gray-500">Venue</th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-500">Location</th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-500">Event</th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-500">Date</th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-500">Rating</th>
                <th className="px-4 py-2 text-xs font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-t border-gray-100 hover:bg-purple-50/50">
                  {/* Venue */}
                  <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap text-gray-900">
                    {h.venueName}
                  </td>
                  {/* Location */}
                  <td className="px-4 py-3 text-xs whitespace-nowrap text-gray-500">
                    {h.location}
                  </td>
                  {/* Event */}
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                    {h.eventName}
                  </td>
                  {/* Date */}
                  <td className="px-4 py-3 text-xs whitespace-nowrap text-gray-500">
                    {h.dateOfHire}
                  </td>
                  {/* Rating */}
                  <td className="px-4 py-3">
                    <StarRating value={h.rating} />
                  </td>
                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs whitespace-nowrap text-emerald-700">
                      Approved
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardSection>
  );
};

export default HistorySection;
