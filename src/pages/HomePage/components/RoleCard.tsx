import { Link } from 'react-router';
import type { ReactNode } from 'react';

import type { IStep } from '@/constants';

type RoleCardProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  steps: IStep[];
  ctaText: string;
  ctaLink: string;
};

const RoleCard = ({ icon, title, subtitle, steps, ctaText, ctaLink }: RoleCardProps) => {
  return (
    <div className="bg-background border-secondary/18 flex flex-col overflow-hidden rounded-2xl border shadow-sm shadow-black/5 hover:shadow-md">
      {/* Accent bar */}
      <div className="from-secondary to-secondary/50 h-1 w-full bg-linear-to-r" />

      <div className="flex flex-1 flex-col px-6 py-8 md:px-12 md:py-10">
        {/* Card head */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-secondary/10 flex h-12 w-12 items-center justify-center rounded-xl">{icon}</div>
          <div>
            <h3 className="text-primary text-xl font-semibold">{title}</h3>
            <p className="text-dark-100 text-sm">{subtitle}</p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-1 flex-col">
          {steps.map((step, idex, arr) => (
            <div key={step.id} className="flex gap-4">
              {/* Left: number + connector line */}
              <div className="flex flex-col items-center">
                <span className="bg-secondary/12 text-secondary flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                  {idex + 1}
                </span>

                {idex < arr.length - 1 && <div className="bg-secondary/20 my-1 w-px flex-1" />}
              </div>

              {/* Right: content */}
              <div className={idex < arr.length - 1 ? 'pb-6' : ''}>
                <p className="text-primary pt-0.5 text-sm font-semibold">{step.title}</p>
                <p className="text-dark-100 mt-0.5 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="border-secondary/12 mt-8 border-t pt-6">
          <Link
            to={ctaLink}
            className="bg-secondary/8 text-secondary hover:bg-secondary/16 block w-full cursor-pointer rounded-xl py-3 text-center text-sm font-semibold [transition:var(--transition-smooth)] hover:-translate-y-0.5"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RoleCard;
