import { Outlet } from 'react-router';

import Footer from './Footer';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="bg-gradient-primary relative min-h-screen w-full">
      <Header />

      {/* Body */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
