import { useState, useEffect } from 'react';

import type { Application, BlockedPeriod, User, Venue } from '@/types';
import { FAKE_HIRER_NAMES } from '@/data';
import ApplicantListSection from './components/ApplicantListSection';
import ApplicantDialog from './components/ApplicantDialog';
import BlockVenueSection from './components/BlockVenueSection';
import AnalyticsSection from './components/AnalyticSection';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// localStorage helpers
const getApplications = () => {
  const raw = localStorage.getItem('applications');
  return raw ? JSON.parse(raw) : [];
};

const saveApplications = (data: Application[]) => {
  localStorage.setItem('applications', JSON.stringify(data));
};

// Returns only blocked periods belonging to this vendor's venues
const getBlockedForVendor = (vendorId: string) => {
  // Load all venues from localStorage
  const venueRaw = localStorage.getItem('venues');
  const allVenues: Venue[] = venueRaw ? JSON.parse(venueRaw) : [];

  // Collect only the venue IDs that belong to this vendor
  // Using a Set for fast lookup later
  const myVenueIds = new Set(
    allVenues.filter((venue) => venue.vendorId === vendorId).map((venue) => venue.id),
  );

  // Load all blocked periods from localStorage
  const blockRaw = localStorage.getItem('blocked_periods');
  const allBlocked: BlockedPeriod[] = blockRaw ? JSON.parse(blockRaw) : [];

  // Keep only the blocked periods whose venueId is in this vendor's venue list
  return allBlocked.filter((blocked) => myVenueIds.has(blocked.venueId));
};

// Overwrites all blocked periods in localStorage with the given array
const saveBlocked = (data: BlockedPeriod[]) => {
  localStorage.setItem('blocked_periods', JSON.stringify(data));
};

type UserRecord = Pick<User, 'email' | 'firstName' | 'lastName'>;

// Returns the full display name for a hirer, given their email
// Looks up real registered users first; falls back to the fake seed map, then the email itself
const getHirerName = (email: string, users: UserRecord[]) => {
  const found = users.find((user) => user.email === email);
  if (found) return `${found.firstName} ${found.lastName}`.trim();

  return FAKE_HIRER_NAMES[email] ?? email;
};

const VendorDashboardPage = () => {
  const { user } = useAuth();

  const [applications, setApplications] = useState<Application[]>([]);
  const [blocked, setBlocked] = useState<BlockedPeriod[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Flow: load → enrich → set state → UI update.
  useEffect(() => {
    if (!user?.id) return;

    const all = getApplications();
    const users: UserRecord[] = JSON.parse(localStorage.getItem('users') ?? '[]');

    // Enrich each application with hirerName for display
    const enriched = all.map((application: Application) => ({
      ...application,
      hirerName: getHirerName(application.hirerId, users),
    }));

    setApplications(enriched);
    // Filter blocked periods to only this vendor's venues
    setBlocked(getBlockedForVendor(user.id));
  }, [user?.id]);

  if (!user) return null;

  // Handler groups
  const handleSelect = (app: Application) => {
    setSelectedId(app.id);
    setDialogOpen(true);
  };

  const handleApprove = (id: string, comment: string) => {
    const updated = applications.map((application) =>
      application.id === id
        ? { ...application, status: 'approved' as const, comment }
        : application,
    );

    setApplications(updated);
    saveApplications(updated);
  };

  const handleReject = (id: string) => {
    const updated = applications.map((application) =>
      application.id === id ? { ...application, status: 'rejected' as const } : application,
    );

    setApplications(updated);
    saveApplications(updated);
  };

  // Update comment without changing application status
  const handleSaveComment = (id: string, comment: string) => {
    const updated = applications.map((application) =>
      application.id === id ? { ...application, comment } : application,
    );
    setApplications(updated);
    saveApplications(updated);
    toast.success('Note saved successfully');
  };

  const handleAddBlocked = (period: BlockedPeriod) => {
    const updated = [...blocked, period];
    setBlocked(updated);

    // Merge with other vendors' blocked periods before saving
    const blockRaw = localStorage.getItem('blocked_periods');
    const allBlocked: BlockedPeriod[] = blockRaw ? JSON.parse(blockRaw) : [];

    const venueRaw = localStorage.getItem('venues');
    const allVenues: Venue[] = venueRaw ? JSON.parse(venueRaw) : [];

    const myVenueIds = new Set(
      allVenues.filter((venue) => venue.vendorId === user.id).map((venue) => venue.id),
    );

    // Keep other vendors' blocks, replace this vendor's with updated list
    const others = allBlocked.filter((blocked) => !myVenueIds.has(blocked.venueId));
    saveBlocked([...others, ...updated]);
  };

  const handleRemoveBlocked = (id: string) => {
    const updated = blocked.filter((blocked) => blocked.id !== id);
    setBlocked(updated);

    // Merge with other vendors' blocked periods before saving
    const blockRaw = localStorage.getItem('blocked_periods');
    const allBlocked: BlockedPeriod[] = blockRaw ? JSON.parse(blockRaw) : [];

    const venueRaw = localStorage.getItem('venues');
    const allVenues: Venue[] = venueRaw ? JSON.parse(venueRaw) : [];

    const myVenueIds = new Set(
      allVenues.filter((venue) => venue.vendorId === user.id).map((venue) => venue.id),
    );

    const others = allBlocked.filter((blocked) => !myVenueIds.has(blocked.venueId));
    saveBlocked([...others, ...updated]);
  };

  const selectedApp = selectedId
    ? (applications.find((application) => application.id === selectedId) ?? null)
    : null;

  return (
    <div className="bg-dashboard min-h-screen">
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-10">
        {/* Page heading */}
        <div className="pb-1">
          <h1 className="text-primary text-2xl font-semibold">
            Welcome back,{' '}
            <span className="text-secondary font-medium">{user.username || 'Vendor'}</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Review applicants, check their history, and confirm bookings for your venue.
          </p>
        </div>

        {/* i — Applicant list */}
        <div id="applicants">
          <ApplicantListSection applicants={applications} onSelect={handleSelect} />
        </div>

        {/* ii — Block venue availability */}
        <div id="block">
          <BlockVenueSection
            blocked={blocked}
            onAdd={handleAddBlocked}
            onRemove={handleRemoveBlocked}
          />
        </div>

        {/* iii — Analytics */}
        <div id="analytics">
          <AnalyticsSection applicants={applications} />
        </div>

        {/* Applicant detail dialog */}
        <ApplicantDialog
          applicant={selectedApp}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onApprove={handleApprove}
          onReject={handleReject}
          onSaveComment={handleSaveComment}
        />
      </div>
    </div>
  );
};

export default VendorDashboardPage;
