import { PawIcon } from '@/components/ui/Icons';
import { siteConfig } from '@/config/site';

export function Logo({ href = '/' }: { href?: string }) {
  return (
    <a
      href={href}
      className="group inline-flex shrink-0 items-center gap-2.5 rounded-lg"
      aria-label={`${siteConfig.name} — home`}
    >
      <span className="text-cream-50 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-700 transition-colors group-hover:bg-teal-800">
        <PawIcon className="h-5 w-5" />
      </span>
      {/* nowrap keeps the wordmark on one line down to 320px viewports. */}
      <span className="text-ink-900 text-base leading-none font-bold tracking-tight whitespace-nowrap sm:text-[1.0625rem]">
        Jivaayu<span className="text-teal-700"> Pet Care</span>
      </span>
    </a>
  );
}
