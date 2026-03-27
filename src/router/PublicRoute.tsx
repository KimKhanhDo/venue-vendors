import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants';

const PublicRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Outlet />;
  }

  return <Navigate to={ROUTES.HOME} />;
};

export default PublicRoute;
