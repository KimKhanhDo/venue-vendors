import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import DashboardSection from '@/components/DashboardSection';
import type { BlockedPeriod, Venue } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { blockVenueSchema, type BlockVenueFormValues } from '@/schemas';
import BlockCard from './BlockCard';

interface BlockVenueSectionProps {
  blocked: BlockedPeriod[];
  onAdd: (period: BlockedPeriod) => void;
  onRemove: (id: string) => void;
}

const inputCls =
  'focus:border-secondary border-muted-foreground/30 rounded-2xl border px-4 py-2 text-sm outline-none transition-all w-full';

// Load venues from localStorage
const getMyVenues = (userId: string | undefined) => {
  const raw = localStorage.getItem('venues');
  const all: Venue[] = raw ? JSON.parse(raw) : [];
  return all.filter((v) => v.vendorId === userId);
};

// Default form values
const getDefaultValues = () => ({
  venueId: '',
  reason: '',
  from: '',
  to: '',
});

const BlockVenueSection = ({ blocked, onAdd, onRemove }: BlockVenueSectionProps) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<BlockVenueFormValues>({
    resolver: zodResolver(blockVenueSchema),
    defaultValues: getDefaultValues(),
    mode: 'onChange',
  });

  // Get only venues owned by this vendor
  const myVenues = useMemo<Venue[]>(() => getMyVenues(user?.id), [user?.id]);

  const onSubmit = (data: BlockVenueFormValues) => {
    const venue = myVenues.find((v) => v.id === data.venueId)!;
    onAdd({
      id: `b${Date.now()}`,
      venueId: data.venueId,
      venueName: venue.name,
      from: data.from,
      to: data.to,
      reason: data.reason,
    });
    reset(getDefaultValues());
  };

  return (
    <DashboardSection number="ii" title="Block Venue Availability">
      {/* Form for block venue */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Row 1: Venue + Reason */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500">Venue</label>

            <div className="relative">
              <select {...register('venueId')} className={`appearance-none pr-8 ${inputCls}`}>
                <option value="">Select a venue</option>
                {myVenues.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {v.location}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
            {errors.venueId && <p className="text-destructive text-xs">{errors.venueId.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500">Reason</label>

            <input
              type="text"
              placeholder="e.g. Maintenance"
              className={inputCls}
              {...register('reason')}
            />
            {errors.reason && <p className="text-destructive text-xs">{errors.reason.message}</p>}
          </div>
        </div>

        {/* Row 2: From + To */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500">From</label>

            <input type="date" className={inputCls} {...register('from')} />
            {errors.from && <p className="text-destructive text-xs">{errors.from.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500">To</label>

            <input type="date" className={inputCls} {...register('to')} />
            {errors.to && <p className="text-destructive text-xs">{errors.to.message}</p>}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-start">
          <Button
            type="submit"
            disabled={!isValid}
            className="bg-secondary hover:bg-secondary/90 cursor-pointer rounded-2xl px-10 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Block Period
          </Button>
        </div>
      </form>

      {/* Blocked list */}
      <div className="pt-3">
        {blocked.length === 0 ? (
          <p className="text-sm text-gray-400">No blocked periods.</p>
        ) : (
          <div className="space-y-2">
            {blocked.map((b) => (
              <BlockCard key={b.id} block={b} onRemove={onRemove} />
            ))}
          </div>
        )}
      </div>
    </DashboardSection>
  );
};

export default BlockVenueSection;
