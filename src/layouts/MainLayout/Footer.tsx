import Logo from '@/components/Logo';
import { FOOTER_COMPANY_LINKS, FOOTER_LEGAL_LINKS, FOOTER_PRODUCT_LINKS } from '@/constants';

const Footer = () => {
  return (
    <footer className="bg-footer border-secondary/20 text-foreground border-t pt-10">
      <div className="container">
        {/* Top grid */}
        <div className="border-secondary/15 grid grid-cols-1 gap-8 border-b pb-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo />
            <p className="text-dark-100 mt-4 max-w-64 text-sm leading-relaxed">
              Melbourne's trusted platform for finding and hiring event venues — fast and seamless.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="text-secondary mb-3 text-sm font-semibold tracking-widest uppercase">
              Product
            </p>
            <ul className="flex flex-col gap-2 leading-6">
              {FOOTER_PRODUCT_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-dark-100 text-sm transition-colors hover:text-violet-500"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-secondary mb-3 text-sm font-semibold tracking-widest uppercase">
              Company
            </p>
            <ul className="flex flex-col gap-2 leading-6">
              {FOOTER_COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-dark-100 text-sm transition-colors hover:text-violet-500"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-secondary mb-3 text-sm font-semibold tracking-widest uppercase">
              Stay Updated
            </p>
            <p className="text-dark-100 mb-4 text-sm leading-relaxed">
              Get the latest venues and deals straight to your inbox.
            </p>
            <div className="border-secondary/20 overflow-hidden rounded-lg border">
              <input
                type="email"
                placeholder="your@email.com"
                className="border-secondary/15 text-primary placeholder:text-dark-300 bg-secondary/8 w-full border-b px-3 py-2 text-sm outline-none"
              />
              <button className="bg-secondary hover:bg-secondary/80 w-full cursor-pointer py-2 text-sm font-semibold text-white [transition:var(--transition-smooth)]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-3 py-5 md:flex-row md:justify-between">
          <p className="text-dark-100 text-xs">
            © {new Date().getFullYear()}{' '}
            <span className="text-secondary font-medium">Venue Vendors</span>. All rights reserved.
          </p>
          <div className="flex gap-6">
            {FOOTER_LEGAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-dark-100 hover:text-primary text-xs transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
