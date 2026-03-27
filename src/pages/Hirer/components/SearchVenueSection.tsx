import { useMemo, useState } from 'react';
import { Search, MapPin, Users, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Venue } from '@/types';

const EVENT_TYPES = [
  'Wedding',
  'Corporate',
  'Birthday',
  'Conference',
  'Concert',
  'Exhibition',
  'Private Party',
  'Other',
];

const CAPACITY_OPTIONS = [
  { label: 'Up to 50', min: 0, max: 50 },
  { label: '50 – 150', min: 50, max: 150 },
  { label: '150 – 300', min: 150, max: 300 },
  { label: '300 – 500', min: 300, max: 500 },
  { label: '500+', min: 500, max: Infinity },
];

const getVenues = (): Venue[] => {
  const raw = localStorage.getItem('venues');
  return raw ? JSON.parse(raw) : [];
};

const getLocations = (venues: Venue[]): string[] =>
  [...new Set(venues.map((v) => v.location))].sort();

interface Props {
  onFilterChange: (filtered: Venue[] | null) => void;
}

export default function SearchVenuesSection({ onFilterChange }: Props) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [eventType, setEventType] = useState('');

  const allVenues = useMemo(getVenues, []);
  const locations = useMemo(() => getLocations(allVenues), [allVenues]);

  const hasActiveFilter = !!(query || location || capacity || eventType);

  const handleSearch = () => {
    const capacityRange = CAPACITY_OPTIONS.find((c) => c.label === capacity);

    const results = allVenues.filter((venue) => {
      const matchesQuery = !query || venue.name.toLowerCase().includes(query.toLowerCase());
      const matchesLocation = !location || venue.location === location;
      const matchesCapacity =
        !capacityRange ||
        (venue.capacity >= capacityRange.min && venue.capacity <= capacityRange.max);
      const matchesEventType =
        !eventType || venue.suitability.some((s) => s.toLowerCase() === eventType.toLowerCase());

      return matchesQuery && matchesLocation && matchesCapacity && matchesEventType;
    });

    onFilterChange(results);
  };

  const handleReset = () => {
    setQuery('');
    setLocation('');
    setCapacity('');
    setEventType('');
    onFilterChange(null);
  };

  return (
    <div className="bg-card rounded-2xl border border-white/60 p-5 shadow-sm">
      {/* Section label */}
      <p className="text-primary pb-4 text-base font-medium">Find a Venue</p>

      {/* Search input */}
      <div className="relative mb-3">
        <Search
          size={15}
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search by venue name…"
          className="pl-9 focus-visible:ring-violet-400"
        />
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-2">
        {/* Location */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="min-w-35 flex-1 focus:ring-0 focus:ring-violet-400 focus:ring-offset-0">
            <MapPin size={13} className="text-muted-foreground mr-1.5 shrink-0" />
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Capacity */}
        <Select value={capacity} onValueChange={setCapacity}>
          <SelectTrigger className="min-w-32 flex-1 focus:ring-0 focus:ring-violet-400 focus:ring-offset-0">
            <Users size={13} className="text-muted-foreground mr-1.5 shrink-0" />
            <SelectValue placeholder="Any capacity" />
          </SelectTrigger>
          <SelectContent>
            {CAPACITY_OPTIONS.map((c) => (
              <SelectItem key={c.label} value={c.label}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Event type */}
        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger className="min-w-37 flex-1 focus:ring-0 focus:ring-violet-400 focus:ring-offset-0">
            <Calendar size={13} className="text-muted-foreground mr-1.5 shrink-0" />
            <SelectValue placeholder="All event types" />
          </SelectTrigger>
          <SelectContent>
            {EVENT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search button */}
        <Button
          onClick={handleSearch}
          className="bg-secondary hover:bg-secondary/90 cursor-pointer px-5 text-white"
        >
          Search
        </Button>

        {/* Reset button */}
        <Button
          onClick={handleReset}
          disabled={!hasActiveFilter}
          variant="outline"
          className="cursor-pointer px-5 text-gray-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
