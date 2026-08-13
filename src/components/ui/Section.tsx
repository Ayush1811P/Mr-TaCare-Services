import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function Section({
  children,
  className,
  id,
  as: Tag = 'section',
  ariaLabelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div';
  ariaLabelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn('py-16 sm:py-20 lg:py-24', className)}
    >
      <div className="container-page">{children}</div>
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = 'center',
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left')}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-teal-600 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className="text-3xl font-bold sm:text-4xl">
        {title}
      </Tag>
      {description ? (
        <p className="text-ink-500 mt-4 text-lg leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
