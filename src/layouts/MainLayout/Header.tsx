import { useState } from 'react';
import { createPortal } from 'react-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';

import Logo from '@/components/Logo';
import Navbar from './components/Navbar';
import UserDropdownMenu from './components/UserDropdownMenu';
import AuthButtons from './components/AuthButtons';
import MobileMenu from './components/MobileMenu';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useAuth();

  return (
    <header className="background-glass fixed top-0 z-10 w-dvw py-5">
      <div className="container">
        <div className="flex items-center justify-between">
          <Logo />

          <Navbar />

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 md:flex">
            {user ? <UserDropdownMenu user={user} logOut={logOut} /> : <AuthButtons />}
          </div>

          {/* Mobile toggle — shows avatar (logged in) or hamburger/close icon (guest) */}
          <div className="md:hidden">
            {user ? (
              // Logged in: show avatar button with first letter of username
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <div className="bg-primary ring-secondary/30 flex h-9 w-9 items-center justify-center rounded-full ring-2">
                  <span className="text-sm font-semibold text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </button>
            ) : (
              // Guest: show hamburger icon when closed, X icon when open
              <button
                className="text-primary hover:text-secondary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <IoCloseOutline size={24} /> : <RxHamburgerMenu size={24} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu content — render only when open; passes auth state to control inner content */}
        {/* createPortal - Render overlay directly into document.body to escape header's stacking context */}
        {isMobileMenuOpen &&
          createPortal(
            <div
              className="fixed inset-0 top-0 z-5 bg-black/10 backdrop-blur-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            />,
            document.body,
          )}

        {isMobileMenuOpen && (
          <MobileMenu
            isLoggedIn={!!user}
            onClose={() => setIsMobileMenuOpen(false)}
            onLogOut={logOut}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
