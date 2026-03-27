import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';

import { useAuth } from '@/contexts/AuthContext';
import DashboardSection from '@/components/DashboardSection';
import { applySchema, type ApplyFormInput, type ApplyFormOutput } from '@/schemas';
import type { Application, BlockedPeriod, Venue } from '@/types';
import ApplicationCard from './ApplicationCard';

// ─── localStorage helpers ─────────────────────────────────────────────────────

const getVenues = (): Venue[] => {
  const raw = localStorage.getItem('venues');
  return raw ? JSON.parse(raw) : [];
};

const getBlockedVenueIds = (): Set<string> => {
  const raw = localStorage.getItem('blocked_periods');
  const periods: BlockedPeriod[] = raw ? JSON.parse(raw) : [];
  return new Set(periods.map((b) => b.venueId));
};

const getSubmittedApplications = (email: string | undefined): Application[] => {
  const raw = localStorage.getItem('applications');
  const all: Application[] = raw ? JSON.parse(raw) : [];
  return all.filter((a) => a.hirerId === email);
};

// ─── Component ────────────────────────────────────────────────────────────────

const ApplySection = () => {
  const { user } = useAuth();
  const [submitTick, setSubmitTick] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormInput, unknown, ApplyFormOutput>({
    resolver: zodResolver(applySchema),
  });

  const venues = useMemo(getVenues, []);
  const blockedVenueIds = useMemo(getBlockedVenueIds, []);
  const availableVenues = useMemo(
    () => venues.filter((v) => !blockedVenueIds.has(v.id)),
    [venues, blockedVenueIds],
  );
  const submittedApplications = useMemo(
    () => getSubmittedApplications(user?.email),
    [submitTick, user?.email],
  );

  const watchedFields = watch(['eventName', 'guestCount', 'date', 'time', 'duration', 'venueId']);
  const isFormFilled = watchedFields.every((v) => v !== '' && v !== undefined && v !== null);

  const inputClass = (hasError: boolean) =>
    cn(
      'focus:border-secondary w-full rounded-2xl border px-4 py-2 text-sm transition-all outline-none',
      hasError ? 'border-red-400' : 'border-muted-foreground/30',
    );

  const onSubmit = (data: ApplyFormOutput) => {
    const selectedVenue = venues.find((v) => v.id === data.venueId)!;

    const raw = localStorage.getItem('applications');
    const all: Application[] = raw ? JSON.parse(raw) : [];

    const existingIdx = all.findIndex(
      (a) => a.hirerId === user?.email && a.venueId === data.venueId,
    );

    const entry: Application = {
      id: existingIdx >= 0 ? all[existingIdx].id : `app_${Date.now()}`,
      hirerId: user?.email ?? '',
      venueId: data.venueId,
      venueName: selectedVenue.name,
      location: selectedVenue.location,
      capacity: selectedVenue.capacity,
      eventName: data.eventName,
      guestCount: data.guestCount,
      date: data.date,
      time: data.time,
      duration: data.duration,
      status: 'pending',
      rank: existingIdx >= 0 ? all[existingIdx].rank : all.length + 1,
    };

    if (existingIdx >= 0) all[existingIdx] = entry;
    else all.push(entry);

    localStorage.setItem('applications', JSON.stringify(all));
    reset();
    setSubmitTick((t) => t + 1);
  };

  return (
    <DashboardSection number="iii" title="Apply for a Venue">
      {/* Application form */}
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        {/* Event name */}
        <div className="space-y-2">
          <label htmlFor="eventName" className="block text-sm font-semibold">
            Event Name
          </label>
          <input
            id="eventName"
            type="text"
            placeholder="e.g. Annual Tech Summit"
            className={inputClass(!!errors.eventName)}
            {...register('eventName')}
          />
          {errors.eventName && (
            <p className="text-destructive text-sm">{errors.eventName.message}</p>
          )}
        </div>

        {/* Expected guests */}
        <div className="space-y-2">
          <label htmlFor="guestCount" className="block text-sm font-semibold">
            Expected Guests
          </label>
          <input
            id="guestCount"
            type="number"
            min={1}
            placeholder="e.g. 200"
            className={inputClass(!!errors.guestCount)}
            {...register('guestCount')}
          />
          {errors.guestCount && (
            <p className="text-destructive text-sm">{errors.guestCount.message}</p>
          )}
        </div>

        {/* Event date */}
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-semibold">
            Event Date
          </label>
          <input
            id="date"
            type="date"
            className={inputClass(!!errors.date)}
            {...register('date')}
          />
          {errors.date && <p className="text-destructive text-sm">{errors.date.message}</p>}
        </div>

        {/* Start time */}
        <div className="space-y-2">
          <label htmlFor="time" className="block text-sm font-semibold">
            Start Time
          </label>
          <input
            id="time"
            type="time"
            className={inputClass(!!errors.time)}
            {...register('time')}
          />
          {errors.time && <p className="text-destructive text-sm">{errors.time.message}</p>}
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-semibold">
            Duration (hours)
          </label>
          <input
            id="duration"
            type="number"
            min={1}
            max={24}
            placeholder="e.g. 4"
            className={inputClass(!!errors.duration)}
            {...register('duration')}
          />
          {errors.duration && <p className="text-destructive text-sm">{errors.duration.message}</p>}
        </div>

        {/* Preferred venue */}
        <div className="space-y-2">
          <label htmlFor="venueId" className="block text-sm font-semibold">
            Preferred Venue
          </label>
          <div className="relative">
            <select
              id="venueId"
              className={cn('appearance-none pr-10', inputClass(!!errors.venueId))}
              {...register('venueId')}
            >
              <option value="">Select a venue</option>
              {availableVenues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} — {v.location}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.venueId && <p className="text-destructive text-sm">{errors.venueId.message}</p>}
        </div>

        {/* Submit button */}
        <div className="mt-2 md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting || !isFormFilled}
            className={cn(
              'bg-secondary rounded-2xl px-6 py-2 text-sm font-medium text-white transition-all',
              isFormFilled
                ? 'hover:bg-secondary/90 cursor-pointer opacity-100'
                : 'cursor-not-allowed opacity-50',
            )}
          >
            Submit Application
          </button>
        </div>
      </form>

      {/* Submitted applications */}
      {submittedApplications.length > 0 && (
        <div className="mt-8 space-y-3">
          <h3 className="text-primary text-sm font-medium">Your Submitted Applications</h3>
          {submittedApplications.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </DashboardSection>
  );
};

export default ApplySection;
