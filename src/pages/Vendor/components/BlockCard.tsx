import type { BlockedPeriod } from '@/types';
import { format } from 'date-fns';

interface BlockCardProps {
  block: BlockedPeriod;
  onRemove: (id: string) => void;
}

const BlockCard = ({ block, onRemove }: BlockCardProps) => (
  <div className="flex items-center justify-between rounded-2xl border border-rose-100 bg-rose-50/50 px-4 py-3">
    <div className="space-y-1">
      <p className="text-sm font-semibold text-rose-800">{block.venueName}</p>
      <p className="text-xs text-rose-700">
        {format(new Date(block.from), 'dd-MM-yyyy')} → {format(new Date(block.to), 'dd-MM-yyyy')}
      </p>
      <p className="text-xs text-rose-500">{block.reason}</p>
    </div>

    <button
      onClick={() => onRemove(block.id)}
      className="cursor-pointer rounded-xl border border-red-200 bg-white px-3 py-1 text-xs font-medium text-red-500 hover:shadow-[0_1px_4px_0_var(colors.red.200)]"
    >
      Remove
    </button>
  </div>
);

export default BlockCard;
