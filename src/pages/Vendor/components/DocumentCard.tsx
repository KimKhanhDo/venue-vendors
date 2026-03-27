import { FileText } from 'lucide-react';

import CredibilityBadge from '@/components/CredibilityBadge';

interface Document {
  name: string;
  url: string;
}

interface DocumentCardProps {
  documents: Document[];
  credibility: number;
}

const DocumentCard = ({ documents, credibility }: DocumentCardProps) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-sm font-semibold">
          Documents
          <span className="bg-secondary flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
            {documents.length}
          </span>
        </p>
        {/* ── Credibility score fetched from users localStorage ── */}
        <CredibilityBadge value={credibility} />
      </div>
      {documents.length === 0 ? (
        <p className="text-sm text-gray-400">No documents uploaded.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {documents.map((doc, i) => (
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
  );
};

export default DocumentCard;