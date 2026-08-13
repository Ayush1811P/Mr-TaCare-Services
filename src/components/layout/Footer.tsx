import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';
import { defaultServiceArea, footerNav, siteConfig } from '@/config/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-cream-300/70 bg-cream-100 border-t">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="text-ink-500 mt-4 max-w-sm text-[0.9375rem] leading-relaxed">
              Jivaayu Pet Care helps pet owners in {defaultServiceArea.city} find nearby veterinary
              doctors and start a conversation on WhatsApp — no account, no call centre.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-ink-400 text-sm font-semibold tracking-[0.14em] uppercase">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-600 text-[0.9375rem] transition-colors hover:text-teal-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-ink-400 text-sm font-semibold tracking-[0.14em] uppercase">
              Service area
            </h2>
            <p className="text-ink-600 mt-4 text-[0.9375rem] leading-relaxed">
              {defaultServiceArea.city}, {defaultServiceArea.state}
              <br />
              {defaultServiceArea.country}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 inline-block text-[0.9375rem] font-medium text-teal-700 transition-colors hover:text-teal-800"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="border-cream-300/80 mt-12 space-y-4 border-t pt-7">
          <p className="text-ink-400 text-sm leading-relaxed">
            Jivaayu Pet Care helps you contact veterinary doctors. It does not provide medical
            advice, diagnosis or treatment, and does not confirm appointments on a doctor&apos;s
            behalf. In an emergency, contact a veterinary hospital directly.
          </p>
          <p className="text-ink-400 text-sm">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
