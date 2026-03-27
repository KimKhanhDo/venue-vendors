import { Ban, Check, Plus } from 'lucide-react';
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
    <div
      className={cn(
        'group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all',
        blocked
          ? 'bg-rose-50/50 opacity-60 ring-1 ring-rose-200'
          : 'bg-purple-50/80 ring-1 ring-gray-200',
      )}
    >
      {/* Thumbnail */}
      {venue.photo ? (
        <img
          src={venue.photo}
          alt={venue.name}
          className={cn('h-60 w-full object-cover', blocked && 'grayscale')}
        />
      ) : (
        <div
          className={cn(
            'flex h-60 items-center justify-center',
            blocked ? 'bg-rose-100' : 'bg-linear-to-br from-purple-200 to-violet-100',
          )}
        >
          <MdOutlineHome className={cn('h-7 w-7', blocked ? 'text-rose-300' : 'text-purple-300')} />
        </div>
      )}

      {/* Card body */}
      <div className="flex flex-1 flex-col justify-between gap-1 p-4">
        {/* Blocked reason */}
        {blocked && blockedInfo && (
          <p className="mb-3 text-xs text-rose-500">
            {blockedInfo.reason} · {blockedInfo.from} → {blockedInfo.to}
          </p>
        )}

        {/* Name + unavailable badge */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-gray-900">{venue.name}</p>
          {blocked && (
            <span className="shrink-0 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-600">
              Unavailable
            </span>
          )}
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

        {/* Add button */}
        <button
          onClick={() => onAdd(venue)}
          disabled={added || blocked}
          className={cn(
            'mt-2.5 flex h-7 w-full items-center justify-center gap-1.5 rounded-lg border text-xs transition-all',
            blocked
              ? 'cursor-not-allowed border-rose-200 bg-rose-50 text-rose-400'
              : added
                ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
                : 'cursor-pointer border-purple-200 bg-white! text-purple-700 group-hover:border-purple-400 group-hover:shadow-md',
          )}
        >
          {blocked ? (
            <>
              <Ban size={12} /> Unavailable
            </>
          ) : added ? (
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
