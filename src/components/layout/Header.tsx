import { Logo } from '@/components/layout/Logo';
import { MobileNav } from '@/components/layout/MobileNav';
import { mainNav } from '@/config/site';

/**
 * Server component. Only the mobile drawer ships JavaScript, so the header
 * costs essentially nothing on desktop.
 */
export function Header() {
  return (
    <header className="border-cream-300/60 bg-cream-50/85 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-18">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-ink-600 hover:bg-cream-200/70 hover:text-ink-900 rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/*
            Wrapped rather than applying `hidden` to the button itself: the
            Button base class sets `inline-flex`, and two same-specificity
            display utilities would leave the winner up to stylesheet order.
          */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
