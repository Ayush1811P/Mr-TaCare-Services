'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { CloseIcon, MenuIcon } from '@/components/ui/Icons';
import { mainNav } from '@/config/site';

/**
 * Mobile navigation drawer.
 *
 * Client component because it needs open/closed state. Handles Escape,
 * restores focus to the trigger on close, and locks background scroll.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the panel so the next Tab stays inside it.
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
        className="text-ink-700 hover:bg-cream-200/80 flex h-11 w-11 items-center justify-center rounded-full transition-colors md:hidden"
      >
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={close}
            className="bg-ink-900/35 animate-fade-in absolute inset-0 h-full w-full cursor-default"
          />
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="bg-cream-50 shadow-lift animate-fade-in absolute inset-x-0 top-0 rounded-b-3xl p-5"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-ink-400 text-sm font-semibold tracking-[0.14em] uppercase">
                Menu
              </span>
              <button
                type="button"
                onClick={close}
                className="text-ink-700 hover:bg-cream-200 flex h-11 w-11 items-center justify-center rounded-full transition-colors"
              >
                <CloseIcon className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="text-ink-800 hover:bg-cream-200/80 flex min-h-13 items-center rounded-2xl px-4 text-lg font-semibold transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ButtonLink href="/find-a-doctor" size="lg" fullWidth className="mt-5" onClick={close}>
              See a Doctor
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </>
  );
}
