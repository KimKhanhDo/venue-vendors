import { LuLogOut, LuLayoutDashboard } from 'react-icons/lu';
import { LucideUserCircle } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type User } from '@/types';
import { ROUTES } from '@/constants';
import { cn } from '@/lib/utils';

interface IMobileAvatarDropdownProps {
  user: User;
  onLogOut: () => void;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'text-secondary bg-purple-50'
      : 'text-foreground hover:text-secondary hover:bg-purple-50/60',
  );

const MobileAvatarDropdown = ({ user, onLogOut }: IMobileAvatarDropdownProps) => {
  const { pathname } = useLocation();
  const isHirer = pathname.split('/')[2] === ROUTES.HIRER;

  const dashboardRoute = isHirer ? ROUTES.HIRER_DASHBOARD : ROUTES.VENDOR_DASHBOARD;
  const profileRoute = isHirer ? ROUTES.HIRER_PROFILE : ROUTES.VENDOR_PROFILE;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="bg-primary ring-secondary/30 flex h-9 w-9 items-center justify-center rounded-full ring-2 focus:outline-none">
          <span className="text-sm font-bold text-white">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="shadow-soft w-52 rounded-2xl bg-white p-1.5 ring-0"
      >
        <div className="mb-1 px-3 py-2">
          <p className="truncate text-sm font-semibold text-gray-900">{user.username}</p>
          <p className="truncate text-xs text-gray-400">{user.email}</p>
        </div>

        <DropdownMenuSeparator className="bg-primary/8 my-1" />

        <NavLink to={dashboardRoute} className={navLinkClass} end>
          <LuLayoutDashboard size={15} />
          Dashboard
        </NavLink>
        <NavLink to={profileRoute} className={navLinkClass} end>
          <LucideUserCircle size={15} />
          Profile
        </NavLink>

        <DropdownMenuSeparator className="bg-primary/8 my-1" />

        <button
          onClick={onLogOut}
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-500 outline-none hover:bg-transparent focus:bg-transparent"
        >
          <LuLogOut size={15} />
          Log Out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileAvatarDropdown;
