import type { Applicant } from '@/types';

const StatusBadge = ({ status }: { status: Applicant['status'] }) => {
  const map = {
    pending: 'bg-gray-100 text-gray-500',
    approved: 'bg-purple-100 text-purple-700',
    rejected: 'bg-red-100 text-red-500',
  };

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
4;
