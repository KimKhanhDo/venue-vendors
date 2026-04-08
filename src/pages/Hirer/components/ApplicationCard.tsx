import { CalendarDays, Clock, Users, MapPin, Timer, MessagesSquare } from 'lucide-react';

import type { Application } from '@/types';
import StatusBadge from '@/components/StatusBadge';

interface ApplicationCardProps {
  app: Application;
}

const ApplicationCard = ({ app }: ApplicationCardProps) => {
  return (
    <div className="rounded-2xl border border-purple-100 bg-purple-50/60 px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          {/* Event name */}
          <p className="text-sm font-semibold text-gray-900">{app.eventName}</p>

          {/* Event details */}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-primary flex items-center gap-1 text-xs">
              <MapPin size={12} className="text-secondary" />
              {app.venueName} · {app.location}
            </span>
            <span className="text-primary flex items-center gap-1 text-xs">
              <CalendarDays size={12} className="text-secondary" />
              {app.date}
            </span>
            {app.time && (
              <span className="text-primary flex items-center gap-1 text-xs">
                <Clock size={12} className="text-secondary" />
                {app.time}
              </span>
            )}
            <span className="text-primary flex items-center gap-1 text-xs">
              <Timer size={12} className="text-secondary" />
              {app.duration}h
            </span>
            <span className="text-primary flex items-center gap-1 text-xs">
              <Users size={12} className="text-secondary" />
              {app.guestCount} guests
            </span>
          </div>
        </div>

        {/* Status */}
        <StatusBadge status={app.status} />
      </div>
    </div>
  );
};

export default ApplicationCard;
