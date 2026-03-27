import { Link } from 'react-router';
import notFoundImg from '@/assets/images/notFound-img.jpg';

const NotFoundPage = () => {
  return (
    <div className="bg-gradient-purple flex min-h-screen flex-col items-center justify-center gap-4">
      <img src={notFoundImg} alt="404 - Page not found" className="w-full max-w-2xl object-contain drop-shadow-md" />

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-primary text-2xl font-bold">Oops! Page not found</h1>
        <p className="text-muted-foreground max-w-xs text-sm text-balance">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <Link
        to="/"
        className="bg-secondary hover:bg-secondary/80 shadow-soft mt-2 rounded-xl px-8 py-2.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98]"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
