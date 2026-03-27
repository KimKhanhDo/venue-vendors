import { HiOutlineUserGroup, HiOutlineBuildingOffice2 } from 'react-icons/hi2';

import { HIRER_STEPS, VENDOR_STEPS } from '@/data';
import RoleCard from './RoleCard';

const HowItWoksSection = () => {
  return (
    <section id="how-it-works" className="container py-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-12 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="bg-secondary/12 border-secondary/25 mb-8 flex items-center gap-2 rounded-full border px-5 py-2">
            <span className="bg-secondary h-2 w-2 rounded-full" />
            <p className="text-secondary text-sm font-medium tracking-widest uppercase">How it works</p>
          </div>

          <h2 className="text-primary mb-4 text-3xl font-semibold">Built for hirers and vendors alike</h2>
          <p className="text-dark-100 text-md max-w-md leading-relaxed">
            Whether you're organizing an event or managing a venue, Venue Vendors makes the process fast and seamless.
          </p>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <RoleCard
            icon={<HiOutlineUserGroup size={22} className="text-secondary" />}
            title="For Hirers"
            subtitle="Event organizers & applicants"
            steps={HIRER_STEPS}
            ctaText="Apply as a hirer"
            ctaLink="/login"
          />

          <RoleCard
            icon={<HiOutlineBuildingOffice2 size={22} className="text-secondary" />}
            title="For Vendors"
            subtitle="Venue owners & managers"
            steps={VENDOR_STEPS}
            ctaText="Manage my venue"
            ctaLink="/login"
          />
        </div>
      </div>
    </section>
  );
};
export default HowItWoksSection;
