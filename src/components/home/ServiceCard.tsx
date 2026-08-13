import Image from 'next/image';
import type { ReactNode } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils/cn';

type ServiceCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: ReactNode;
} & (
  | { status: 'active'; ctaLabel: string; ctaHref: string }
  | { status: 'coming-soon'; ctaLabel?: never; ctaHref?: never }
);

export function ServiceCard(props: ServiceCardProps) {
  const { title, description, imageSrc, imageAlt, icon, status } = props;
  const isActive = status === 'active';

  return (
    <article
      className={cn(
        'group rounded-card shadow-soft relative flex flex-col overflow-hidden border bg-white transition-shadow',
        isActive ? 'border-cream-300/80 hover:shadow-lift' : 'border-cream-300 border-dashed',
      )}
    >
      <div className="bg-cream-200 relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={512}
          height={512}
          loading="lazy"
          sizes="(min-width: 768px) 42vw, 100vw"
          className={cn(
            'h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none',
            isActive ? 'group-hover:scale-[1.03]' : 'opacity-70 saturate-[0.65]',
          )}
        />
        {!isActive ? (
          <span className="bg-ink-900/85 text-cream-50 absolute top-4 right-4 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase">
            Coming soon
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-xl',
            isActive ? 'bg-teal-50 text-teal-700' : 'bg-cream-200 text-ink-400',
          )}
        >
          {icon}
        </span>

        <h3 className="text-ink-900 mt-4 text-xl font-bold sm:text-2xl">{title}</h3>
        <p className="text-ink-500 mt-2.5 flex-1 leading-relaxed">{description}</p>

        <div className="mt-6">
          {isActive ? (
            <ButtonLink href={props.ctaHref} size="md" className="group/cta w-full sm:w-auto">
              {props.ctaLabel}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5 motion-reduce:transition-none" />
            </ButtonLink>
          ) : (
            <p className="bg-cream-100 text-ink-500 inline-flex min-h-12 items-center rounded-full px-5 text-sm font-semibold">
              We&apos;re working on it — grooming opens soon
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
