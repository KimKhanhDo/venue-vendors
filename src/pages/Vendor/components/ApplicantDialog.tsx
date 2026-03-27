import { useEffect, useState } from 'react';
import { CheckCircle, FileText, XCircle } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Applicant } from '@/types';
import StarRating from '@/components/StarRating';
import MatchBadge from '@/components/MatchBadge';
import CredibilityBadge from '@/components/CredibilityBadge';

interface ApplicantDialogProps {
  applicant: Applicant | null;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string, comment: string) => void;
  onReject: (id: string) => void;
}

const getCredibilityScore = (hirerId: string): number => {
  const users = JSON.parse(localStorage.getItem('users') ?? '[]');
  const hirer = users.find(
    (u: { email: string; credibilityScore?: number }) => u.email === hirerId,
  );
  return hirer?.credibilityScore ?? 0;
};

const ApplicantDialog = ({
  applicant,
  open,
  onClose,
  onApprove,
  onReject,
}: ApplicantDialogProps) => {
  const [comment, setComment] = useState('');

  // Reset comment whenever dialog opens or closes
  useEffect(() => {
    if (!open) setComment('');
  }, [open]);

  if (!applicant) return null;

  const isResolved = applicant.status !== 'pending';
  const credibility = getCredibilityScore(applicant.hirerId);

  const handleApprove = () => {
    /* ── Save status + comment to localStorage so hirer sees the update ── */
    const raw = localStorage.getItem('applications');
    const all = raw ? JSON.parse(raw) : [];
    const updated = all.map((a: Applicant) =>
      a.id === applicant.id ? { ...a, status: 'approved', comment } : a,
    );
    localStorage.setItem('applications', JSON.stringify(updated));

    onApprove(applicant.id, comment);
    setComment('');
    onClose();
  };

  const handleReject = () => {
    /* ── Save rejected status to localStorage so hirer sees the update ── */
    const raw = localStorage.getItem('applications');
    const all = raw ? JSON.parse(raw) : [];
    const updated = all.map((a: Applicant) =>
      a.id === applicant.id ? { ...a, status: 'rejected' } : a,
    );
    localStorage.setItem('applications', JSON.stringify(updated));

    onReject(applicant.id);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-full max-w-4xl! overflow-y-auto rounded-2xl p-4! md:left-[calc(50%+100px)] lg:left-[calc(50%+132px)]">
        <DialogTitle className="sr-only">Applicant Details</DialogTitle>
        <DialogDescription className="sr-only">
          Review applicant details and take action
        </DialogDescription>

        <div className="space-y-5 px-4 py-5.5">
          {/* ── 1. Applicant summary card ── */}
          <div className="space-y-1 rounded-2xl border border-purple-100 bg-purple-50/50 px-4 py-3 text-sm">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-base font-semibold">{applicant.name}</p>
              <MatchBadge score={applicant.matchScore} />
            </div>
            <p>
              <span className="font-semibold">Event:</span> {applicant.eventName} (
              {applicant.eventType})
            </p>
            {/* ── Fixed: eventDate → date ── */}
            <p>
              <span className="font-semibold">Date:</span> {applicant.date}
            </p>
            {/* ── Fixed: guests → guestCount ── */}
            <p>
              <span className="font-semibold">Guests:</span> {applicant.guestCount}
            </p>
            <p>
              <span className="font-semibold">Duration:</span> {applicant.duration} hours
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {applicant.email} · {applicant.phone}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="font-semibold">Reputation:</span>
              <StarRating value={applicant.reputation ?? 0} />
            </div>
          </div>

          {/* ── 2. Rental history ── */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
              Rental History
              <span className="bg-secondary flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
                {applicant.rentalHistory.length}
              </span>
            </p>
            {applicant.rentalHistory.length === 0 ? (
              <p className="text-sm text-gray-400">No rental history available.</p>
            ) : (
              <div className="space-y-2">
                {applicant.rentalHistory.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-purple-100 bg-white px-4 py-2.5"
                  >
                    <div>
                      <p className="text-sm font-medium">{r.eventName}</p>
                      <p className="text-xs text-gray-400">
                        {r.venue} · {r.date}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-xs font-medium',
                        r.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-500',
                      )}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── 3. Compliance documents ── */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                Documents
                <span className="bg-secondary flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
                  {applicant.documents.length}
                </span>
              </p>

              {/* ── Credibility score fetched from users localStorage ── */}
              <CredibilityBadge value={credibility} />
            </div>

            {applicant.documents.length === 0 ? (
              <p className="text-sm text-gray-400">No documents uploaded.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {applicant.documents.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.url}
                    className="flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 transition-all hover:bg-purple-100"
                  >
                    <FileText size={13} className="shrink-0" />
                    {doc.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── 4 & 5. Comment + action buttons (hidden once resolved) ── */}
          {isResolved ? (
            <div
              className={cn(
                'rounded-2xl border px-4 py-3 text-sm',
                applicant.status === 'rejected'
                  ? 'border-red-100 bg-red-50 text-red-500'
                  : 'border-emerald-100 bg-emerald-50 text-emerald-600',
              )}
            >
              This application has been{' '}
              <strong className="font-semibold">{applicant.status}</strong>.
              {applicant.comment && <p className="mt-1 text-gray-800">"{applicant.comment}"</p>}
            </div>
          ) : (
            <>
              {/* ── Comment textarea ── */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold">Leave a Comment</label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="e.g. Please confirm catering requirements before arrival."
                  className="focus:border-secondary border-muted-foreground/30 w-full resize-none rounded-2xl border px-4 py-2 text-sm transition-all outline-none"
                />
              </div>

              {/* ── Approve / Reject buttons with Lucide icons ── */}
              <div className="flex gap-2">
                <Button
                  onClick={handleApprove}
                  className="bg-secondary hover:bg-secondary/90 cursor-pointer rounded-2xl text-xs! text-white"
                >
                  <CheckCircle size={14} />
                  Approve & Confirm Booking
                </Button>

                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="cursor-pointer rounded-2xl border-red-300 text-xs! text-red-500 hover:bg-red-50 hover:text-red-500"
                >
                  <XCircle size={14} />
                  Reject
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantDialog;
