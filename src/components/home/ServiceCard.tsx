import Image from 'next/image';
import type { ReactNode } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRightIcon } from '@/components/ui/Icons';

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
    <article className="group relative flex flex-col overflow-hidden rounded-[1.5rem] bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:shadow-teal-900/10 border border-gray-100">
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0 z-10 transition-opacity duration-300 group-hover:opacity-90" />
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={512}
          height={512}
          loading="lazy"
          sizes="(min-width: 768px) 42vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
        />
        
        <div className="absolute top-4 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 shadow-sm backdrop-blur-md text-teal-700 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

        {!isActive && (
          <span className="absolute top-4 right-4 z-20 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white uppercase shadow-sm">
            Coming soon
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
           <h3 className="text-2xl font-bold text-white drop-shadow-md">{title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5 bg-gradient-to-b from-white to-gray-50/50">
        <p className="text-gray-600 flex-1 leading-relaxed">{description}</p>

        <div className="mt-8">
          {isActive ? (
            <ButtonLink href={props.ctaHref} size="md" className="group/cta w-full shadow-sm hover:shadow-md transition-all">
              {props.ctaLabel}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/cta:translate-x-1 motion-reduce:transition-none" />
            </ButtonLink>
          ) : (
            <div className="inline-flex min-h-[44px] items-center rounded-xl bg-gray-100/80 px-4 text-sm font-medium text-gray-500 w-full justify-center border border-gray-200/60">
              Launching soon
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
