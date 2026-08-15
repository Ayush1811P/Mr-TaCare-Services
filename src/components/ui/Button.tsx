import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-55 active:scale-[0.985] motion-reduce:active:scale-100';

const variants: Record<Variant, string> = {
  primary: 'bg-teal-700 text-cream-50 shadow-soft hover:bg-teal-800 disabled:hover:bg-teal-700',
  secondary:
    'border border-teal-700/25 bg-white text-teal-800 hover:border-teal-700/50 hover:bg-teal-50',
  ghost: 'text-teal-800 hover:bg-teal-50',
  whatsapp: 'bg-whatsapp text-white shadow-soft hover:bg-whatsapp-hover',
  /*
   * For placement on a dark teal surface. A real variant rather than passing
   * override classes: `className` and the variant string carry equal CSS
   * specificity, so an override would win or lose on stylesheet order alone.
   */
  inverse: 'bg-cream-50 text-teal-900 shadow-soft hover:bg-white',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-12 px-6 text-[0.975rem]',
  lg: 'min-h-14 px-8 text-base sm:text-lg',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  href,
  external,
  ...props
}: CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { href: string; external?: boolean }) {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        // Prevents the opened tab from touching window.opener.
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
