import { Route, BrowserRouter as Router, Routes } from 'react-router';

import PublicRoute from './PublicRoute';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import AuthLayout from '@/layouts/AuthLayout';
import LogInPage from '@/pages/Auth/LogInPage';
import SignUpPage from '@/pages/Auth/SignUpPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { ROUTES } from '@/constants';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import HirerProfilePage from '@/pages/Hirer/HirerProfilePage';
import HirerDashboardPage from '@/pages/Hirer/HirerDashboardPage';
import VendorDashboardPage from '@/pages/Vendor/VendorDashboardPage';
import VendorProfilePage from '@/pages/Vendor/VendorProfilePage';
import ScrollToTop from '@/components/ScrollToTop';

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Everyone can access */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Route>

        {/* Public only — redirect away if already logged in */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<LogInPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignUpPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Protected — must be logged in */}
        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardLayout />}>
            <Route path={ROUTES.HIRER}>
              <Route index element={<HirerDashboardPage />} />
              <Route path={ROUTES.MY_PROFILE} element={<HirerProfilePage />} />
            </Route>

            <Route path={ROUTES.VENDOR}>
              <Route index element={<VendorDashboardPage />} />
              <Route path={ROUTES.MY_PROFILE} element={<VendorProfilePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
