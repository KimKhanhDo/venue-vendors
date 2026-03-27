const MatchBadge = ({ score }: { score: number }) => {
  const color =
    score >= 85
      ? 'bg-green-100 text-green-700'
      : score >= 65
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-red-100 text-red-700';

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {score}% match
    </span>
  );
};
export default MatchBadge;
