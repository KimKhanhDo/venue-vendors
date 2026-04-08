import { Link } from 'react-router';
import { LuLayoutDashboard, LuUserPlus, LuLogOut, LuLogIn, LuUser } from 'react-icons/lu';
import { ROUTES } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';

interface IMobileMenuProps {
  isLoggedIn: boolean;
  onClose: () => void;
  onLogOut?: () => void;
}

const MobileMenu = ({ isLoggedIn, onClose, onLogOut }: IMobileMenuProps) => {
  const { user } = useAuth();
  const dashboardRoute = user?.role === 'vendor' ? ROUTES.VENDOR_DASHBOARD : ROUTES.HIRER_DASHBOARD;
  const profileRoute = user?.role === 'vendor' ? ROUTES.VENDOR_PROFILE : ROUTES.HIRER_PROFILE;

  return (
    <div className="border-primary/10 mt-4 flex flex-col gap-1 border-t pt-4 md:hidden">
      {isLoggedIn ? (
        <>
          <Link
            to={dashboardRoute}
            className="text-foreground hover:bg-primary/5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium"
            onClick={onClose}
          >
            <LuLayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link
            to={profileRoute}
            className="text-foreground hover:bg-primary/5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium"
            onClick={onClose}
          >
            <LuUser size={18} />
            Profile
          </Link>
          <button
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500"
            onClick={() => {
              onClose();
              onLogOut?.();
            }}
          >
            <LuLogOut size={18} />
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link
            to={ROUTES.SIGNUP}
            className="text-foreground hover:bg-primary/5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium"
            onClick={onClose}
          >
            <LuUserPlus size={18} />
            Sign Up
          </Link>
          <Link
            to={ROUTES.LOGIN}
            className="text-foreground hover:bg-primary/5 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium"
            onClick={onClose}
          >
            <LuLogIn size={18} />
            Log In
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
