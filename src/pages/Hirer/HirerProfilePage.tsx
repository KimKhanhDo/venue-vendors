import { useState, useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import type { ComplianceDocuments } from '@/types';
import { savePDF, deletePDF, getPDF } from '@/utils';
import ProfileSection from './components/ProfileSection';
import ComplianceSection from './components/ComplianceSection';

const STORAGE_KEY = 'compliance_docs';

// calculates credibility score based on uploaded documents
const calcCredibility = (docs: ComplianceDocuments): number => {
  let score = 0;
  if (docs.driverLicense) score += 1; // +1 for driver's license
  if (docs.liabilityInsurance) score += 2; // +2 for liability insurance
  if (docs.isBusiness && docs.businessCert) score += 2; // +2 for business cert
  return Math.min(score, 5); // max 5 stars
};

// reads this hirer's compliance docs from localStorage on initial render
const getInitialDocs = (email: string | undefined) => {
  // fallback object — used when localStorage is empty or no entry found for this hirer
  const defaultDocs: ComplianceDocuments = { hirerId: email ?? '', isBusiness: false };

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultDocs;

  // parse the array of all hirers' docs
  const all: ComplianceDocuments[] = JSON.parse(raw);

  // find this hirer's entry by email, fall back to defaultDocs if not found
  return all.find((d) => d.hirerId === email) ?? defaultDocs;
};

const HirerProfilePage = () => {
  const { user, updateUser, isLoading } = useAuth();
  const [docs, setDocs] = useState<ComplianceDocuments>(() => getInitialDocs(user?.email));
  const credibility = calcCredibility(docs);

  // re-reads docs when user email changes (e.g. after login)
  useEffect(() => {
    if (!user?.email) return;

    const loadDocs = async () => {
      // step 1: read metadata from localStorage (fileName exists, but PDF base64 = '' )
      const base = getInitialDocs(user.email);

      // step 2: fetch both PDFs from IndexedDB at the same time
      // returns undefined for each if the key doesn't exist
      const [liabilityBase64, businessCertBase64] = await Promise.all([
        getPDF(`${user.email}_liabilityInsurance`),
        getPDF(`${user.email}_businessCert`),
      ]);

      // step 3: merge base64 back into docs — only if both IndexedDB and localStorage confirm the file exists
      // both conditions required:
      // - liabilityBase64          → IndexedDB has the PDF content
      // - base.liabilityInsurance  → localStorage has the metadata (fileName)
      // if either is undefined → && short-circuits → spread undefined → no override
      setDocs({
        ...base,
        ...(liabilityBase64 &&
          base.liabilityInsurance && {
            // before merge: { fileName: 'insurance.pdf', base64: '' }
            // after merge:  { fileName: 'insurance.pdf', base64: 'data:application/pdf;base64,...' }
            liabilityInsurance: { ...base.liabilityInsurance, base64: liabilityBase64 },
          }),
        ...(businessCertBase64 &&
          base.businessCert && {
            businessCert: { ...base.businessCert, base64: businessCertBase64 },
          }),
      });
    };

    loadDocs();
  }, [user?.email]);

  if (isLoading || !user) return null;

  // saves updated docs to localStorage (metadata only) and IndexedDB (PDF content)
  // then syncs credibility score to user profile
  const persistDocs = async (updated: ComplianceDocuments) => {
    // read all hirers' docs from localStorage (stored as an array)
    const raw = localStorage.getItem(STORAGE_KEY);
    const all: ComplianceDocuments[] = raw ? JSON.parse(raw) : [];

    // find this hirer's existing entry by email
    const idx = all.findIndex((doc) => doc.hirerId === updated.hirerId);

    // PDFs are too large to store in localStorage (5MB limit)
    // strip base64 from PDF fields, only keep fileName as reference
    // before: { fileName: 'insurance.pdf', base64: 'data:application/pdf;base64,ABCD...(very long)' }
    // after:  { fileName: 'insurance.pdf', base64: '' }
    // note: driver's license (JPG) is NOT stripped — it stays in localStorage as base64
    const forStorage: ComplianceDocuments = {
      ...updated,
      liabilityInsurance: updated.liabilityInsurance
        ? { fileName: updated.liabilityInsurance.fileName, base64: '' }
        : undefined,
      businessCert: updated.businessCert
        ? { fileName: updated.businessCert.fileName, base64: '' }
        : undefined,
    };

    if (idx >= 0) {
      all[idx] = forStorage; // replace existing entry
    } else {
      all.push(forStorage); // first time — append new entry
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); // save metadata to localStorage

    // sync PDF content to IndexedDB — 3 possible cases for each PDF field:
    // 1. has base64  → user just uploaded → save to IndexedDB
    // 2. undefined   → user just removed  → delete from IndexedDB
    // 3. base64 = '' → unchanged (loaded from localStorage) → do nothing
    if (updated.liabilityInsurance?.base64) {
      await savePDF(`${user.email}_liabilityInsurance`, updated.liabilityInsurance.base64);
    } else if (!updated.liabilityInsurance) {
      await deletePDF(`${user.email}_liabilityInsurance`); // removed — clean up IndexedDB
    }

    if (updated.businessCert?.base64) {
      await savePDF(`${user.email}_businessCert`, updated.businessCert.base64);
    } else if (!updated.businessCert) {
      await deletePDF(`${user.email}_businessCert`); // removed — clean up IndexedDB
    }

    updateUser({ ...user, credibilityScore: calcCredibility(updated) }); // sync score to user profile
    setDocs(updated); // update local state to trigger re-render
  };

  // merges a partial field update into the current docs object, then persists
  // e.g. updateDoc({ driverLicense: file }) — only the changed field is passed in
  // persistDocs is async but updateDoc doesn't await it — UI updates immediately via setDocs
  const updateDoc = (patch: Partial<ComplianceDocuments>) => persistDocs({ ...docs, ...patch });

  return (
    <div className="bg-dashboard min-h-screen">
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-10">
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
