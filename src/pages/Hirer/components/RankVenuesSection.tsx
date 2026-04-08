import { useAuth } from '@/contexts/AuthContext';
import DashboardSection from '@/components/DashboardSection';
import type { Candidate } from '@/types';
import RankCard from './RankCard';

interface Props {
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  onApply: (venueId: string) => void; // called when hirer clicks Apply on a RankCard
}

const RankVenuesSection = ({ candidates, setCandidates, onApply }: Props) => {
  const { user } = useAuth();

  //reRanked fixes the rank based on the actual position in the array so rank always matches the visual order (index 0 = rank 1).
  const saveRanks = (updated: Candidate[]) => {
    const reRanked = updated.map((candidate, i) => ({ ...candidate, rank: i + 1 }));

    const raw = localStorage.getItem('candidates');
    const all: Candidate[] = raw ? JSON.parse(raw) : [];

    // others - localStorage holds all hirers' candidates, so we keep other hirers' entries untouched and only replace the current hirer's part.
    const others = all.filter((candidate) => candidate.hirerId !== user?.email);
    localStorage.setItem('candidates', JSON.stringify([...others, ...reRanked])); // merge back

    setCandidates(reRanked); // sync React state
  };

  const moveUp = (index: number) => {
    // already at top
    if (index === 0) return;

    // Swaps the candidate at the given index with the one above it.
    const updated = [...candidates];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    saveRanks(updated);
  };

  const moveDown = (index: number) => {
    // already at bottom
    if (index === candidates.length - 1) return;

    // Swaps the candidate at the given index with the one below it.
    const updated = [...candidates];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    saveRanks(updated);
  };

  const handleApply = (venueId: string) => {
    onApply(venueId); // pass venueId up to HirerDashboardPage
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' }); // scroll to form
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
                onApply={handleApply}
              />
            ))}
          </div>
        </>
      )}
    </DashboardSection>
  );
};

export default RankVenuesSection;
