import { useMemo } from 'react';

import type { HireHistory } from '@/types';
import DashboardSection from '@/components/DashboardSection';
import StarRating from '@/components/StarRating';
import { useAuth } from '@/contexts/AuthContext';
import CredibilityBadge from '@/components/CredibilityBadge';

// Reads hire history from localStorage and filters by the current hirer's email.
// hirerId in 'hire_history' uses email as the consistent identifier.
const getHistory = (email: string | undefined) => {
  const raw = localStorage.getItem('hire_history');
  const all: HireHistory[] = raw ? JSON.parse(raw) : [];

  return all.filter((history) => history.hirerId === email);
};

// Calculates the average star rating across all past hires.
// Returns 0 if the hirer has no history yet.
const getAvg = (history: HireHistory[]) => {
  if (history.length === 0) return 0;
  return history.reduce((sum, history) => sum + history.rating, 0) / history.length;
};

const HistorySection = () => {
  const { user } = useAuth();

  // Filter hire history by the logged-in user's email.
  const history = useMemo(() => getHistory(user?.email), [user?.email]);

  // Derive the average rating from the filtered history.
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
              <tr className="bg-secondary/10">
                <th className="text-primary px-4 py-2 text-xs font-semibold">Venue</th>
                <th className="text-primary px-4 py-2 text-xs font-semibold">Location</th>
                <th className="text-primary px-4 py-2 text-xs font-semibold">Event</th>
                <th className="text-primary px-4 py-2 text-xs font-semibold">Date</th>
                <th className="text-primary px-4 py-2 text-xs font-semibold">Rating</th>
                <th className="text-primary px-4 py-2 text-xs font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((history) => (
                <tr key={history.id} className="border-t border-gray-100 hover:bg-purple-50/50">
                  <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap text-gray-900">
                    {history.venueName}
                  </td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap text-gray-500">
                    {history.location}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-700">
                    {history.eventName}
                  </td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap text-gray-500">
                    {history.dateOfHire}
                  </td>
                  <td className="px-4 py-3">
                    <StarRating value={history.rating} />
                  </td>
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
