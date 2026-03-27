import { Link } from 'react-router';

const AuthButtons = () => {
  return (
    <>
      <Link to="/signup" className="text-primary hover:text-secondary text-md font-medium">
        Sign Up
      </Link>
      <Link
        to="/login"
        className="bg-secondary hover:bg-secondary/80 text-md rounded-full px-6 py-1.5 font-medium text-white [transition:var(--transition-smooth)]"
      >
        Log In
      </Link>
    </>
  );
};
export default AuthButtons;
