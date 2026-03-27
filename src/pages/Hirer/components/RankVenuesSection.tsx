import { useAuth } from '@/contexts/AuthContext';
import DashboardSection from '@/components/DashboardSection';
import type { Application } from '@/types';
import RankCard from './RankCard';

interface Props {
  candidates: Application[];
  setCandidates: React.Dispatch<React.SetStateAction<Application[]>>;
}

const RankVenuesSection = ({ candidates, setCandidates }: Props) => {
  const { user } = useAuth();

  const saveRanks = (updated: Application[]) => {
    const reRanked = updated.map((a, i) => ({ ...a, rank: i + 1 }));
    const raw = localStorage.getItem('applications');
    const all: Application[] = raw ? JSON.parse(raw) : [];
    const others = all.filter((a) => a.hirerId !== user?.email);
    localStorage.setItem('applications', JSON.stringify([...others, ...reRanked]));
    setCandidates(reRanked);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...candidates];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    saveRanks(updated);
  };

  const moveDown = (index: number) => {
    if (index === candidates.length - 1) return;
    const updated = [...candidates];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    saveRanks(updated);
  };

  return (
    <DashboardSection number="ii" title="Rank Venue Candidates">
      {candidates.length === 0 ? (
        <p className="py-1 text-sm text-gray-400">
          Add venues above to start ranking your candidates...
        </p>
      ) : (
        <>
          <p className="-mt-2 mb-3 text-xs text-gray-400">
            Use the arrows to reorder by preference
          </p>
          <div className="space-y-2">
            {candidates.map((candidate, index) => (
              <RankCard
                key={candidate.id}
                candidate={candidate}
                index={index}
                total={candidates.length}
                onMoveUp={moveUp}
                onMoveDown={moveDown}
              />
            ))}
          </div>
        </>
      )}
    </DashboardSection>
  );
};

export default RankVenuesSection;
