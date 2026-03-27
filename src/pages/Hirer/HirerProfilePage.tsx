import { useState, useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import type { ComplianceDocuments } from '@/types';
import ProfileSection from './components/ProfileSection';
import ComplianceSection from './components/ComplianceSection';

const STORAGE_KEY = 'compliance_docs';

const calcCredibility = (docs: ComplianceDocuments): number => {
  let score = 0;
  if (docs.driverLicense) score += 1;
  if (docs.liabilityInsurance) score += 2;
  if (docs.isBusiness && docs.businessCert) score += 2;
  return Math.min(score, 5);
};

const getInitialDocs = (email: string | undefined): ComplianceDocuments => {
  const defaultDocs: ComplianceDocuments = { hirerId: email ?? '', isBusiness: false };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultDocs;

  const all: ComplianceDocuments[] = JSON.parse(raw);
  return all.find((d) => d.hirerId === email) ?? defaultDocs;
};

const HirerProfilePage = () => {
  const { user, updateUser, isLoading } = useAuth();
  const [docs, setDocs] = useState<ComplianceDocuments>(() => getInitialDocs(user?.email));
  const credibility = calcCredibility(docs);

  // Sync hirerId once user is loaded
  useEffect(() => {
    if (user && docs.hirerId !== user.email) {
      setDocs(getInitialDocs(user.email));
    }
  }, [user, docs.hirerId]);

  if (isLoading || !user) return null;

  const persistDocs = (updated: ComplianceDocuments) => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const all: ComplianceDocuments[] = raw ? JSON.parse(raw) : [];
    const idx = all.findIndex((d) => d.hirerId === updated.hirerId);

    if (idx >= 0) {
      all[idx] = updated;
    } else {
      all.push(updated);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    updateUser({ ...user, credibilityScore: calcCredibility(updated) });
    setDocs(updated);
  };

  const updateDoc = (patch: Partial<ComplianceDocuments>) => persistDocs({ ...docs, ...patch });

  return (
    <div className="bg-dashboard min-h-screen">
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-10">
        <div className="pb-1">
          <h1 className="text-primary text-2xl font-semibold">My Profile</h1>
          <p className="mt-2 text-sm text-gray-500">
            Update your personal details and manage compliance documents.
          </p>
        </div>

        <ProfileSection />
        <ComplianceSection docs={docs} credibility={credibility} onUpdateDoc={updateDoc} />
      </div>
    </div>
  );
};

export default HirerProfilePage;
