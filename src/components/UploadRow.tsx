import { useRef } from 'react';
import { toast } from 'sonner';

interface UploadRowProps {
  label: string;
  hint: string;
  accept: string;
  maxMB?: number;
  stored?: { fileName: string; base64: string };
  onUpload: (file: { fileName: string; base64: string }) => void;
  onRemove: () => void;
}

const UploadRow = ({
  label,
  hint,
  accept,
  maxMB = 2,
  stored,
  onUpload,
  onRemove,
}: UploadRowProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxMB * 1024 * 1024) {
      toast.error(`File too large. Maximum size is ${maxMB} MB.`);
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onUpload({ fileName: file.name, base64: reader.result as string });
      toast.success(`${label} uploaded successfully.`);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!stored) return;
    const a = document.createElement('a');
    a.href = stored.base64;
    a.download = stored.fileName;
    a.click();
  };

  return (
    <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="mt-0.5 text-xs text-gray-400">{hint}</p>
        </div>

        {stored ? (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            Uploaded
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-400">
            Not uploaded
          </span>
        )}
      </div>

      {stored ? (
        <div className="flex items-center gap-2">
          <p className="min-w-0 flex-1 truncate text-xs text-gray-500">{stored.fileName}</p>
          <button
            type="button"
            onClick={handleDownload}
            className="text-secondary shrink-0 rounded-lg border border-purple-200 bg-white px-3 py-1 text-xs font-medium transition-all hover:shadow-sm"
          >
            Download
          </button>
          <button
            type="button"
            onClick={() => {
              onRemove();
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="shrink-0 rounded-lg border border-rose-200 bg-white px-3 py-1 text-xs font-medium text-rose-500 transition-all hover:shadow-sm"
          >
            Remove
          </button>
        </div>
      ) : (
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFile}
          className="file:text-secondary w-full cursor-pointer text-xs text-gray-500 file:mr-3 file:cursor-pointer file:rounded-lg file:border file:border-purple-200 file:bg-white file:px-3 file:py-1 file:text-xs file:font-medium file:transition-all hover:file:shadow-sm"
        />
      )}
    </div>
  );
};

export default UploadRow;
