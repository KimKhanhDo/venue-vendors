const StarRating = ({ value }: { value: number }) => {
  const safeValue = value ?? 0; // ← fallback
  const full = Math.floor(safeValue);
  const half = safeValue - full >= 0.5;

  return (
    <span className="flex items-center gap-0.5 text-sm">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={
            s <= full
              ? 'text-yellow-400'
              : s === full + 1 && half
                ? 'text-yellow-300'
                : 'text-gray-300'
          }
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-xs text-gray-500">{safeValue.toFixed(1)}</span>
    </span>
  );
};

export default StarRating;
