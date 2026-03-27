import { ROUTES } from '@/constants';
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link to={ROUTES.HOME} className="flex items-center gap-2">
      <img src="/logo.svg" alt="logo" className="w-7 md:w-9" />
      <span className="text-primary text-lg font-medium md:text-xl">VenueHQ</span>
    </Link>
  );
};
export default Logo;
