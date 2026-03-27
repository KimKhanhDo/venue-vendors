import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className="bg-gradient-purple flex min-h-screen flex-col items-center justify-center p-4 md:py-30">
      <Outlet />

      {/* Legal */}
      <p className="text-muted-foreground mt-6 text-center text-xs font-medium text-balance">
        By creating an account, you agree to our{' '}
        <a href="#" className="hover:text-primary underline underline-offset-2">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="hover:text-primary underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};
export default AuthLayout;
