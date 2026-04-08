import { CalendarOff, Check, Plus } from 'lucide-react';
import { MdOutlineHome } from 'react-icons/md';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { BlockedPeriod, Venue } from '@/types';

interface VenueCardProps {
  venue: Venue;
  added: boolean;
  blocked: boolean;
  blockedInfo?: BlockedPeriod;
  onAdd: (venue: Venue) => void;
}

const VenueCard = ({ venue, added, blocked, blockedInfo, onAdd }: VenueCardProps) => {
  return (
    <div className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-purple-50/80 ring-1 ring-gray-200 transition-all">
      {/* Thumbnail */}
      {venue.photo ? (
        <img src={venue.photo} alt={venue.name} className="h-60 w-full object-cover" />
      ) : (
        <div className="flex h-60 items-center justify-center bg-linear-to-br from-purple-200 to-violet-100">
          <MdOutlineHome className="h-7 w-7 text-purple-300" />
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-1 flex-col justify-between gap-1 p-4">
        {/* Blocked period info — shown as a warning, not a hard block */}
        {blocked && blockedInfo && (
          <div className="mb-2 flex items-center justify-between">
            <p className="flex items-center gap-1 text-xs text-rose-500">
              <CalendarOff size={12} className="shrink-0" />
              {blockedInfo.reason} · {blockedInfo.from} → {blockedInfo.to}
            </p>

            <span className="shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">
              Unavailable period
            </span>
          </div>
        )}

        {/* Name + unavailable badge */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-gray-900">{venue.name}</p>
        </div>

        {/* Location + capacity */}
        <p className="mt-0.5 text-xs text-gray-500">
          {venue.location} · Cap. {venue.capacity}
        </p>

        {/* Price */}
        <p className="text-secondary mt-0.5 text-xs font-medium">${venue.pricePerHour}/hr</p>

        {/* Description */}
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-400">
          {venue.description}
        </p>

        {/* Suitability tags */}
        <div className="mt-1 flex flex-wrap gap-1">
          {venue.suitability.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="text-secondary bg-primary/10 border-none px-2 text-xs"
            >
              {s}
            </Badge>
          ))}
        </div>

        {/* Add button — only disabled when already added, not when blocked */}
        <button
          onClick={() => onAdd(venue)}
          disabled={added}
          className={cn(
            'mt-2.5 flex h-7 w-full items-center justify-center gap-1.5 rounded-lg border text-xs transition-all',
            added
              ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
              : 'group-hover:border-secondary cursor-pointer border-purple-200 bg-white! text-purple-700 group-hover:shadow-md',
          )}
        >
          {added ? (
            <>
              <Check size={12} /> Added
            </>
          ) : (
            <>
              <Plus size={12} /> Add to candidates
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
