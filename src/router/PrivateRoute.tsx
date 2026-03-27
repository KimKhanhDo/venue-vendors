import Loading from '@/components/Loading';
import { ROUTES } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    return <Outlet />;
  }

  return <Navigate to={ROUTES.LOGIN} />;
};

export default PrivateRoute;
