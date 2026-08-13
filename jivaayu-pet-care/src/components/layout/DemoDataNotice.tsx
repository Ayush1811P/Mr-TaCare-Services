import { AlertIcon } from '@/components/ui/Icons';
import { siteConfig } from '@/config/site';

/**
 * Honesty guard.
 *
 * While the app runs on sample listings, every page that shows doctors says so
 * plainly. Set NEXT_PUBLIC_DEMO_DATA="false" once verified provider data is in
 * place and this disappears everywhere at once.
 */
export function DemoDataNotice({ className }: { className?: string }) {
  if (!siteConfig.isDemoData) return null;

  return (
    <div
      className={`border-clay-300/60 bg-clay-50 flex items-start gap-3 rounded-2xl border px-4 py-3.5 ${className ?? ''}`}
    >
      <AlertIcon className="text-clay-600 mt-0.5 h-5 w-5 shrink-0" />
      <p className="text-ink-600 text-sm leading-relaxed">
        <strong className="text-ink-900 font-semibold">Sample listings.</strong> The doctors shown
        here are illustrative examples used while we onboard verified veterinary partners in Noida.
        They are not real practices, and the WhatsApp numbers are placeholders.
      </p>
    </div>
  );
}
