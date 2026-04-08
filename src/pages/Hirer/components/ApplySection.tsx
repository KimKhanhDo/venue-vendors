import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import { applySchema, type ApplyFormInput, type ApplyFormOutput } from '@/schemas';
import type { Application, BlockedPeriod, Venue } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSection from '@/components/DashboardSection';
import ApplicationCard from './ApplicationCard';

// localStorage helpers
const getVenues = () => {
  const raw = localStorage.getItem('venues');
  return raw ? JSON.parse(raw) : [];
};

// Load all blocked periods — used for date conflict validation on submit
const getBlockedPeriods = (): BlockedPeriod[] => {
  const raw = localStorage.getItem('blocked_periods');
  return raw ? JSON.parse(raw) : [];
};

// Reads all applications from localStorage and returns only those belonging to the current hirer.
// Matches by email since hirerId uses email as the consistent identifier across all keys.
const getMyApplications = (email: string | undefined) => {
  const raw = localStorage.getItem('applications');
  const all: Application[] = raw ? JSON.parse(raw) : [];

  return all.filter((application) => application.hirerId === email);
};

interface Props {
  selectedVenueId: string | null; // pre-fills the venue dropdown when set
  onSubmitDone: (venueId: string) => void; // notifies parent to remove venue from candidates
}

const ApplySection = ({ selectedVenueId, onSubmitDone }: Props) => {
  const { user } = useAuth();

  // Incremented after each submit to force useMemo to re-read from localStorage
  const [submitTick, setSubmitTick] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ApplyFormInput, unknown, ApplyFormOutput>({
    resolver: zodResolver(applySchema),
  });

  // Data setup
  const venues = useMemo(getVenues, []);

  // Re-reads from localStorage every time hirer submits a new application
  const myApplications = useMemo(() => getMyApplications(user?.email), [submitTick, user?.email]);

  // Pre-fills the venue dropdown when hirer clicks Apply on a RankCard
  useEffect(() => {
    if (selectedVenueId) {
      setValue('venueId', selectedVenueId);
    }
  }, [selectedVenueId, setValue]);

  const inputClass = (hasError: boolean) =>
    cn(
      'focus:border-secondary w-full rounded-2xl border px-4 py-2 text-sm transition-all outline-none',
      hasError ? 'border-red-400' : 'border-muted-foreground/30',
    );

  const onSubmit = (data: ApplyFormOutput) => {
    // Check if selected date conflicts with any blocked period for this venue
    const blockedPeriods = getBlockedPeriods();
    const selectedDate = new Date(data.date);

    const isBlocked = blockedPeriods.some((block) => {
      if (block.venueId !== data.venueId) return false;
      return selectedDate >= new Date(block.from) && selectedDate <= new Date(block.to);
    });

    if (isBlocked) {
      setError('date', { message: 'Selected date/time is unavailable.' });
      return;
    }

    // Find the full venue object to copy its name, location, capacity into the application
    const selectedVenue = venues.find((venue: Venue) => venue.id === data.venueId)!;

    const raw = localStorage.getItem('applications');
    const all: Application[] = raw ? JSON.parse(raw) : [];

    // Check if hirer already has an application for this venue
    const existingIdx = all.findIndex(
      (application) => application.hirerId === user?.email && application.venueId === data.venueId,
    );

    const entry: Application = {
      id: existingIdx >= 0 ? all[existingIdx].id : `app_${Date.now()}`,
      hirerId: user?.email ?? '',
      venueId: data.venueId,
      venueName: selectedVenue.name,
      location: selectedVenue.location,
      capacity: selectedVenue.capacity,
      eventName: data.eventName,
      eventType: 'General',
      guestCount: data.guestCount,
      date: data.date,
      time: data.time,
      duration: data.duration,
      status: existingIdx >= 0 ? all[existingIdx].status : 'pending',
      comment: existingIdx >= 0 ? all[existingIdx].comment : undefined,
      rank: existingIdx >= 0 ? all[existingIdx].rank : all.length + 1,
      matchScore: existingIdx >= 0 ? all[existingIdx].matchScore : 80,
    };

    if (existingIdx >= 0) {
      all[existingIdx] = entry; // update existing
    } else {
      all.push(entry); // or add new
    }

    localStorage.setItem('applications', JSON.stringify(all));
    reset();

    // trigger re-read from localStorage
    setSubmitTick((tick) => tick + 1);

    // notify parent to remove venue from candidates
    onSubmitDone(data.venueId);

    toast.success('Application submitted successfully!');
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
              {venues.map((venue: Venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name} — {venue.location}
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
            disabled={isSubmitting}
            className="bg-secondary hover:bg-secondary/90 cursor-pointer rounded-2xl px-6 py-2 text-sm font-medium text-white opacity-100 transition-all"
          >
            Submit Application
          </button>
        </div>
      </form>

      {/* List of this hirer's submitted applications */}
      {myApplications.length > 0 && (
        <div className="mt-8 space-y-3">
          <h3 className="text-primary text-sm font-medium">Your Submitted Applications</h3>
          {myApplications.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </DashboardSection>
  );
};

export default ApplySection;
