import { Link } from 'react-router';
import { LuLayoutDashboard, LuLogOut, LuUser } from 'react-icons/lu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants';

interface IUserProp {
  user: {
    username: string;
  };
  logOut: () => void;
}

const UserDropdownMenu = ({ user: { username }, logOut }: IUserProp) => {
  const { user } = useAuth();
  const dashboardRoute = user?.role === 'vendor' ? ROUTES.VENDOR_DASHBOARD : ROUTES.HIRER_DASHBOARD;
  const profileRoute = user?.role === 'vendor' ? ROUTES.VENDOR_PROFILE : ROUTES.HIRER_PROFILE;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="hover:bg-secondary/8 flex cursor-pointer items-center gap-2.5 rounded-full px-2 py-1 [transition:var(--transition-smooth)]">
          <div className="bg-primary ring-secondary/30 flex h-8 w-8 items-center justify-center rounded-full ring-2">
            <span className="text-sm font-semibold text-white">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-primary text-sm font-medium">{username}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="shadow-soft w-52 rounded-2xl bg-white p-1.5 ring-0"
      >
        <DropdownMenuItem asChild>
          <Link
            to={dashboardRoute}
            className="text-primary hover:bg-secondary/8! flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none"
          >
            <LuLayoutDashboard size={15} />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            to={profileRoute}
            className="text-primary hover:bg-secondary/8! flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none"
          >
            <LuUser size={15} />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-primary/8 my-1" />

        <button
          className="flex w-full cursor-pointer! items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-500 outline-none hover:bg-transparent focus:bg-transparent"
          onClick={logOut}
        >
          <LuLogOut size={15} />
          Log Out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserDropdownMenu;
