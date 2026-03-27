import { LuLogOut, LuLayoutDashboard } from 'react-icons/lu';
import { NavLink, useLocation } from 'react-router';
import { LucideUserCircle } from 'lucide-react';

import { type User } from '@/types';
import Logo from '@/components/Logo';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

interface ISidebarProps {
  user: User;
  onLogOut: () => void;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium transition-colors',
    isActive
      ? 'text-secondary bg-purple-50'
      : 'text-foreground hover:text-secondary hover:bg-purple-50/60',
  );

const Sidebar = ({ user, onLogOut }: ISidebarProps) => {
  const { pathname } = useLocation();

  const role = pathname.split('/')[2]; // → 'hirer' or 'vendor'
  const isHirer = role === ROUTES.HIRER;

  return (
    <aside className="fixed top-0 left-0 z-20 flex h-full w-50 flex-col overflow-hidden border-r border-purple-100 bg-white lg:w-66">
      {/* Logo */}
      <div className="flex h-17 items-center border-b border-purple-100 px-6">
        <Logo />
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-4!">
        {isHirer ? (
          <>
            <NavLink to={ROUTES.HIRER_DASHBOARD} className={navLinkClass} end>
              <LuLayoutDashboard size={15} className="shrink-0" />
              <span className="truncate">Dashboard</span>
            </NavLink>
            <NavLink to={ROUTES.HIRER_PROFILE} className={navLinkClass} end>
              <LucideUserCircle size={15} className="shrink-0" />
              <span className="truncate">Profile</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to={ROUTES.VENDOR_DASHBOARD} className={navLinkClass} end>
              <LuLayoutDashboard size={15} className="shrink-0" />
              <span className="truncate">Dashboard</span>
            </NavLink>
            <NavLink to={ROUTES.VENDOR_PROFILE} className={navLinkClass} end>
              <LucideUserCircle size={15} className="shrink-0" />
              <span className="truncate">Profile</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* User info + logout */}
      <div className="border-t border-purple-100 py-10">
        <div className="mb-1 flex items-center gap-2.5 rounded-xl px-4">
          <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
            <span className="text-xs font-semibold text-white">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.username}</p>
            <p className="truncate text-xs text-gray-400">{user.email}</p>
          </div>
        </div>

        <button
          onClick={onLogOut}
          className="mt-1 flex w-full cursor-pointer items-center gap-2.5 rounded-md px-6 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <LuLogOut size={16} className="shrink-0" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
