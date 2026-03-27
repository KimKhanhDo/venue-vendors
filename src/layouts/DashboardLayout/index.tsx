import { Outlet } from 'react-router';

import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import MobileAvatarDropdown from './components/MobileAvatarDropdown';
import Sidebar from './components/Sidebar';

const DashboardLayout = () => {
  const { user, logOut } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-background min-h-screen">
      <div className="hidden md:block">
        <Sidebar user={user} onLogOut={logOut} />
      </div>

      <header className="bg-background fixed top-0 right-0 left-0 z-20 flex h-14 items-center justify-between border-b border-purple-100 px-4 md:hidden">
        <Logo />
        <MobileAvatarDropdown user={user} onLogOut={logOut} />
      </header>

      <div className="pt-14 md:ml-50 md:pt-0 lg:ml-66">
        <div className="hidden h-17 items-center justify-between border-b border-purple-100 bg-white pl-10 md:fixed md:top-0 md:right-0 md:left-50 md:z-10 md:flex lg:left-66">
          <h2 className="text-primary text-xl font-medium capitalize">My Venue</h2>
        </div>

        <main className="md:pt-17">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
