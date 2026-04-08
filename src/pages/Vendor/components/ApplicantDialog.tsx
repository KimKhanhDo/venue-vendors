import { useEffect, useState } from 'react';
import { CheckCircle, Save, XCircle } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Application, ComplianceDocuments, HireHistory, StoredFile } from '@/types';
import RentalHistoryCard from './RentalHistoryCard';
import SummaryCard from './SummaryCard';
import DocumentCard from './DocumentCard';

interface ApplicantDialogProps {
  applicant: Application | null;
  open: boolean;
  onClose: () => void;
  onApprove: (id: string, comment: string) => void;
  onReject: (id: string) => void;
  onSaveComment: (id: string, comment: string) => void;
}

// Reads hire history for a specific hirer from localStorage
const getHireHistory = (hirerId: string) => {
  const raw = localStorage.getItem('hire_history');
  const all: HireHistory[] = raw ? JSON.parse(raw) : [];

  return all.filter((history) => history.hirerId === hirerId);
};

// Calculates average reputation from hire history ratings
const calcReputation = (history: HireHistory[]) => {
  if (history.length === 0) return 0;
  return history.reduce((sum, h) => sum + h.rating, 0) / history.length;
};

// Reads compliance docs for a specific hirer from localStorage
const getComplianceDocs = (hirerId: string) => {
  const raw = localStorage.getItem('compliance_docs');
  const all: ComplianceDocuments[] = raw ? JSON.parse(raw) : [];

  return all.find((document) => document.hirerId === hirerId) ?? null;
};

// Calculates credibility score from uploaded compliance documents
const calcCredibility = (docs: ComplianceDocuments | null) => {
  if (!docs) return 0;

  let score = 0;
  if (docs.driverLicense) score += 1;
  if (docs.liabilityInsurance) score += 2;
  if (docs.isBusiness && docs.businessCert) score += 2;

  return Math.min(score, 5);
};

// Builds a flat list of uploaded documents from ComplianceDocuments
const buildDocList = (docs: ComplianceDocuments | null) => {
  if (!docs) return [];

  const result: StoredFile[] = [];
  if (docs.driverLicense) result.push(docs.driverLicense);
  if (docs.liabilityInsurance) result.push(docs.liabilityInsurance);
  if (docs.isBusiness && docs.businessCert) result.push(docs.businessCert);

  return result;
};

// Maps HireHistory to the shape RentalHistoryCard expects
const mapToRentalHistory = (history: HireHistory[]) =>
  history.map((h) => ({
    venue: h.venueName,
    location: h.location,
    eventName: h.eventName,
    date: h.dateOfHire,
    rating: h.rating,
    status: 'completed' as const,
  }));

const ApplicantDialog = ({
  applicant,
  open,
  onClose,
  onApprove,
  onReject,
  onSaveComment,
}: ApplicantDialogProps) => {
  const [comment, setComment] = useState('');

  // Pre-fill comment from saved application data when dialog opens
  useEffect(() => {
    if (open) {
      setComment(applicant?.comment ?? '');
    } else {
      setComment('');
    }
  }, [open, applicant?.comment]);

  if (!applicant) return null;

  // Read directly from localStorage each time the dialog opens
  const history = getHireHistory(applicant.hirerId);
  const reputation = calcReputation(history);
  const docs = getComplianceDocs(applicant.hirerId);
  const credibility = calcCredibility(docs);
  const docList = buildDocList(docs);

  const isResolved = applicant.status !== 'pending';

  const handleApprove = () => {
    onApprove(applicant.id, comment);
    setComment('');
  };

  const handleReject = () => {
    onReject(applicant.id);
    setComment('');
  };

  // Save updated comment without changing status
  const handleSaveComment = () => {
    onSaveComment(applicant.id, comment);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] w-full max-w-4xl! overflow-y-auto rounded-2xl p-4! md:left-[calc(50%+100px)] lg:left-[calc(50%+132px)]">
        <DialogTitle className="sr-only">Applicant Details</DialogTitle>
        <DialogDescription className="sr-only">
          Review applicant details and take action
        </DialogDescription>

        <div className="space-y-5 px-4 py-5.5">
          {/* 1. Applicant summary  */}
          <SummaryCard applicant={applicant} reputation={reputation} />

          {/* 2. Rental history */}
          <RentalHistoryCard history={mapToRentalHistory(history)} />

          {/* 3. Compliance documents */}
          <DocumentCard documents={docList} credibility={credibility} />

          {/* 4. Comment + action buttons  */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Vendor Notes</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Please confirm catering requirements before arrival."
              className="focus:border-secondary border-muted-foreground/30 w-full resize-none rounded-2xl border px-4 py-2 text-sm transition-all outline-none"
            />
          </div>

          {/* Status banner for resolved applications */}
          {isResolved && (
            <div
              className={cn(
                '-mt-4 rounded-2xl! border px-4 py-2 text-xs',
                applicant.status === 'rejected'
                  ? 'border-red-100 bg-red-50 text-red-500'
                  : 'border-emerald-500 bg-emerald-50 text-emerald-600',
              )}
            >
              This application has been{' '}
              <strong className="font-semibold">{applicant.status}</strong>.
            </div>
          )}

          <div className="-mt-2 flex gap-2">
            {/* Save comment button — always visible */}
            <Button
              onClick={handleSaveComment}
              variant="outline"
              className="border-secondary text-secondary hover:text-secondary cursor-pointer rounded-2xl text-xs! hover:bg-purple-50"
            >
              <Save size={14} />
              Save Note
            </Button>

            {/* Approve & Reject only for pending applications */}
            {!isResolved && (
              <>
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
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantDialog;
