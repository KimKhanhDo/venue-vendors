import { ShieldCheck } from 'lucide-react';

import type { ComplianceDocuments } from '@/types';
import DashboardSection from '@/components/DashboardSection';
import UploadRow from '@/components/UploadRow';
import { LuBuilding2, LuIdCard, LuShieldCheck, LuStar } from 'react-icons/lu';
import CredibilityBadge from '@/components/CredibilityBadge';

interface ComplianceSectionProps {
  docs: ComplianceDocuments;
  credibility: number;
  onUpdateDoc: (patch: Partial<ComplianceDocuments>) => void;
}

const ComplianceSection = ({ docs, credibility, onUpdateDoc }: ComplianceSectionProps) => {
  return (
    <DashboardSection
      number="ii"
      title="Compliance Documents"
      badge={<CredibilityBadge value={credibility} />}
    >
      <p className="mb-4 text-xs text-gray-400">
        Upload your compliance documents to strengthen your credibility. Each document increases
        your credibility score visible to vendors.
      </p>

      <div className="space-y-3">
        <UploadRow
          label="Driver's License"
          hint="JPG or JPEG · max 2 MB"
          accept=".jpg,.jpeg"
          stored={docs.driverLicense}
          onUpload={(f) => onUpdateDoc({ driverLicense: f })}
          onRemove={() => onUpdateDoc({ driverLicense: undefined })}
        />
        <UploadRow
          label="Public Liability Insurance"
          hint="PDF · max 2 MB"
          accept=".pdf"
          stored={docs.liabilityInsurance}
          onUpload={(f) => onUpdateDoc({ liabilityInsurance: f })}
          onRemove={() => onUpdateDoc({ liabilityInsurance: undefined })}
        />

        {/* Business checkbox */}
        <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={docs.isBusiness}
              onChange={(e) =>
                onUpdateDoc({
                  isBusiness: e.target.checked,
                  ...(!e.target.checked && { abnNumber: undefined, businessCert: undefined }),
                })
              }
              className="accent-secondary h-4 w-4 cursor-pointer rounded"
            />
            <span className="text-sm font-semibold text-gray-800">
              Applying on behalf of a business / organization
            </span>
          </label>

          <div
            style={{
              display: 'grid',
              gridTemplateRows: docs.isBusiness ? '1fr' : '0fr',
              transition: 'grid-template-rows 0.3s ease',
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
                <div>
                  <label className="text-primary mb-1.5 block text-xs font-semibold">
                    ABN Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 51 824 753 556"
                    value={docs.abnNumber ?? ''}
                    onChange={(e) => onUpdateDoc({ abnNumber: e.target.value })}
                    className="focus:border-secondary border-muted-foreground/30 w-full rounded-xl border px-4 py-2 text-sm transition-all outline-none"
                  />
                </div>
                <UploadRow
                  label="Certificate of Registration"
                  hint="PDF · max 2 MB"
                  accept=".pdf"
                  stored={docs.businessCert}
                  onUpload={(f) => onUpdateDoc({ businessCert: f })}
                  onRemove={() => onUpdateDoc({ businessCert: undefined })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-purple-100 bg-purple-50/50 p-3">
        <ShieldCheck size={15} className="text-secondary mt-0.5 shrink-0" />
        <div className="space-y-2">
          <p className="text-primary text-xs font-medium">How credibility is calculated:</p>
          <ul className="space-y-1.5 text-xs text-gray-500">
            <li className="flex items-center gap-1.5">
              <LuIdCard size={13} className="text-secondary shrink-0" />
              Driver's license —
              <span className="text-secondary font-xs flex items-center gap-0.5">
                +1 <LuStar size={10} className="fill-secondary text-secondary" />
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <LuShieldCheck size={13} className="text-secondary shrink-0" />
              Public liability insurance —{' '}
              <span className="text-secondary font-xs flex items-center gap-0.5">
                +2 <LuStar size={10} className="fill-secondary text-secondary" />
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <LuBuilding2 size={13} className="text-secondary shrink-0" />
              Business certificate —{' '}
              <span className="text-secondary font-xs flex items-center gap-0.5">
                +2 <LuStar size={10} className="fill-secondary text-secondary" />
              </span>
            </li>
            <li className="text-secondary flex items-center gap-1.5 pt-1 font-medium">
              <LuStar size={13} className="text-secondary shrink-0" />
              Maximum score:{' '}
              <span className="text-secondary font-xs flex items-center gap-0.5">
                5 <LuStar size={10} className="fill-secondary text-secondary" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardSection>
  );
};

export default ComplianceSection;
