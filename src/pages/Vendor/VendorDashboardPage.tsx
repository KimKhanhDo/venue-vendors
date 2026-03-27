import { useState, useEffect } from 'react';

import type { Applicant, BlockedPeriod } from '@/types';
import ApplicantListSection from './components/ApplicantListSection';
import ApplicantDialog from './components/ApplicantDialog';
import BlockVenueSection from './components/BlockVenueSection';
import AnalyticsSection from './components/AnalyticSection';
import { useAuth } from '@/contexts/AuthContext';

// localStorage helpers
const getApplications = (): Applicant[] => {
  const raw = localStorage.getItem('applications');
  return raw ? JSON.parse(raw) : [];
};

const saveApplications = (data: Applicant[]) => {
  localStorage.setItem('applications', JSON.stringify(data));
};

const getBlocked = (): BlockedPeriod[] => {
  const raw = localStorage.getItem('blocked_periods');
  return raw ? JSON.parse(raw) : [];
};

const saveBlocked = (data: BlockedPeriod[]) => {
  localStorage.setItem('blocked_periods', JSON.stringify(data));
};

const VendorDashboardPage = () => {
  const { user } = useAuth();

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [blocked, setBlocked] = useState<BlockedPeriod[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<Applicant | null>(null);

  // Load and enrich applications on mount
  useEffect(() => {
    const all = getApplications();
    const users: { email: string; firstName: string; lastName: string }[] = JSON.parse(
      localStorage.getItem('users') ?? '[]',
    );

    // Build reputation lookup map from mock entries
    const reputationMap = new Map(
      all.filter((a) => a.reputation !== undefined).map((a) => [a.hirerId, a]),
    );

    const enriched = all.map((a) => {
      // Mock data already has vendor fields — skip enrichment
      if (a.name) return a;

      // Real hirer submissions — enrich with user profile + defaults
      const matched = users.find((u) => u.email === a.hirerId);

      // Reuse reputation/history from same hirer's mock entry if exists
      const existing = reputationMap.get(a.hirerId);

      return {
        ...a,
        name: matched ? `${matched.firstName} ${matched.lastName}` : a.hirerId,
        matchScore: a.hirerId === 'hirer@test.com' ? 98 : (a.matchScore ?? 50),
        reputation: existing?.reputation ?? 0,
        timesSelected: existing?.timesSelected ?? 0,
        rentalHistory: existing?.rentalHistory ?? [],
        documents: existing?.documents ?? [],
        eventType: a.eventType ?? 'General',
      };
    });

    setApplicants(enriched);
    setBlocked(getBlocked());
  }, []);

  if (!user) return null;

  // Open dialog with selected applicant
  const handleSelect = (app: Applicant) => {
    setSelected(app);
    setDialogOpen(true);
  };

  // Approve: update state + persist to localStorage
  const handleApprove = (id: string, comment: string) => {
    const updated = applicants.map((a) =>
      a.id === id ? { ...a, status: 'approved' as const, comment } : a,
    );
    setApplicants(updated);
    saveApplications(updated);
  };

  // Reject: update state + persist to localStorage
  const handleReject = (id: string) => {
    const updated = applicants.map((a) =>
      a.id === id ? { ...a, status: 'rejected' as const } : a,
    );
    setApplicants(updated);
    saveApplications(updated);
  };

  // Block period handlers
  const handleAddBlocked = (period: BlockedPeriod) => {
    const updated = [...blocked, period];
    setBlocked(updated);
    saveBlocked(updated);
  };

  const handleRemoveBlocked = (id: string) => {
    const updated = blocked.filter((b) => b.id !== id);
    setBlocked(updated);
    saveBlocked(updated);
  };

  const dialogApplicant = selected ? (applicants.find((a) => a.id === selected.id) ?? null) : null;

  return (
    <div className="bg-dashboard min-h-screen">
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-10">
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

        {/* Applicant list */}
        <div id="applicants">
          <ApplicantListSection applicants={applicants} onSelect={handleSelect} />
        </div>

        {/* Block venue availability */}
        <div id="block">
          <BlockVenueSection
            blocked={blocked}
            onAdd={handleAddBlocked}
            onRemove={handleRemoveBlocked}
          />
        </div>

        {/* Analytics / visualization */}
        <div id="analytics">
          <AnalyticsSection applicants={applicants} />
        </div>

        {/* Applicant detail dialog */}
        <ApplicantDialog
          applicant={dialogApplicant}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};

export default VendorDashboardPage;
