import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import Stat from './Stat';
import { STATS } from '@/data';
import { ROUTES } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/Auth/AuthModal';

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleHirerClick = () => {
    if (!user) return setShowModal(true);
    if (user.role !== 'hirer') {
      toast.error('Access denied. Please open a Hirer account to continue.');
      return;
    }
    navigate(ROUTES.HIRER_DASHBOARD);
  };

  const handleVendorClick = () => {
    if (!user) return setShowModal(true);
    if (user.role !== 'vendor') {
      toast.error('Access denied. Please open a Vendor account to continue.');
      return;
    }
    navigate(ROUTES.VENDOR_DASHBOARD);
  };

  return (
    <section className="mt-2 flex min-h-screen flex-col items-center justify-center gap-10 pt-[calc(var(--header-height)+2rem)] pb-16 md:gap-16 md:pb-8">
      <div className="container flex flex-col items-center gap-10 md:gap-16">
        {/* Badge */}
        <div className="bg-secondary/12 border-secondary/25 shadow-primary/30 flex items-center gap-2 rounded-full border px-5 py-2 md:gap-3 md:px-8">
          <span className="bg-secondary h-2 w-2 rounded-full md:h-2.5 md:w-2.5" />
          <p className="text-secondary text-sm leading-relaxed font-medium tracking-widest uppercase md:text-lg">
            Melbourne's top event venues
          </p>
        </div>

        <div className="flex flex-col items-center gap-10 md:gap-12">
          <h1 className="max-w-5xl text-center text-4xl leading-tight font-semibold text-balance md:text-6xl md:leading-17">
            Find the perfect <span className="text-secondary font-semibold">venue</span> for every
            occasion
          </h1>

          <p className="text-primary max-w-2xl text-center text-xl leading-relaxed font-normal tracking-wide text-balance">
            Browse curated venues, submit your application, and connect with trusted vendors — all
            in one seamless platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <button
              onClick={handleHirerClick}
              className="bg-secondary hover:bg-secondary/85 shadow-secondary/40 hover:shadow-secondary/50 text-md w-full min-w-40 cursor-pointer rounded-xl px-4 py-2 text-center font-medium whitespace-nowrap text-white shadow-lg [transition:var(--transition-smooth)] hover:-translate-y-1 hover:shadow-xl active:translate-y-0 sm:w-auto md:px-8 md:py-3"
            >
              I'm a Hirer
            </button>

            <button
              onClick={handleVendorClick}
              className="border-secondary/40 text-primary text-md w-full min-w-40 cursor-pointer rounded-xl border px-4 py-2 text-center font-medium whitespace-nowrap shadow-lg backdrop-blur-sm [transition:var(--transition-smooth)] hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:scale-95 sm:w-auto md:px-8 md:py-3"
            >
              I'm a Vendor
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-background border-muted-foreground/30 divide-muted-foreground/30 flex w-78 flex-col items-center divide-y rounded-2xl border px-8 py-4 shadow-2xl md:w-auto md:flex-row md:divide-x md:divide-y-0 md:px-0 md:py-4">
          {STATS.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>

      {showModal && <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </section>
  );
};
export default HeroSection;
