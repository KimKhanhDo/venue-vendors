import { FileText } from 'lucide-react';

import CredibilityBadge from '@/components/CredibilityBadge';
import type { StoredFile } from '@/types';
import { downloadFile } from '@/utils';

interface DocumentCardProps {
  documents: StoredFile[];
  credibility: number;
}

const DocumentCard = ({ documents, credibility }: DocumentCardProps) => (
  <div>
    <div className="mb-2 flex items-center justify-between">
      <p className="flex items-center gap-1.5 text-sm font-semibold">
        Documents
        <span className="bg-secondary flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
          {documents.length}
        </span>
      </p>
      <CredibilityBadge value={credibility} />
    </div>

    {documents.length === 0 ? (
      <p className="text-sm text-gray-400">No documents uploaded.</p>
    ) : (
      <div className="flex flex-wrap gap-2">
        {documents.map((doc, i) => (
          <button
            key={i}
            type="button"
            onClick={() => downloadFile(doc.fileName, doc.base64)}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 transition-all hover:border-purple-400 hover:shadow-sm"
          >
            <FileText size={13} className="shrink-0" />
            {doc.fileName}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default DocumentCard;
