import Link from 'next/link';
import { DoctorCard } from '@/components/doctor/DoctorCard';
import { DoctorResults } from '@/components/doctor/DoctorResults';
import { StartFlowPrompt } from '@/components/doctor/StartFlowPrompt';
import { DemoDataNotice } from '@/components/layout/DemoDataNotice';
import { JsonLd } from '@/components/seo/JsonLd';
import { WhatsAppIcon } from '@/components/ui/Icons';
import { defaultServiceArea } from '@/config/site';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/structuredData';
import { searchDoctors } from '@/services/doctors';

export const metadata = buildPageMetadata({
  title: `Veterinary Doctors in ${defaultServiceArea.city}`,
  description: `Browse veterinary doctors across ${defaultServiceArea.city} — clinics, services and consultation details — and send an appointment request on WhatsApp.`,
  path: '/doctors',
});

/**
 * Two audiences, one URL.
 *
 * A visitor who completed the flow sees personalised, distance-sorted results
 * (client-rendered, because their answers are session-only). A crawler or a
 * direct visitor gets the server-rendered directory below — so the page has
 * real indexable content and never depends on client interaction for SEO.
 */
export default async function DoctorsPage() {
  const doctors = await searchDoctors({
    origin: defaultServiceArea.center,
    radiusKm: 25,
    limit: 12,
  });

  const { city, state } = defaultServiceArea;

  return (
    <>
      <div className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          {/*
            The single H1 is server-rendered so the page has a crawlable
            primary heading without depending on client hydration. The
            personalised greeting below it is an H2.
          */}
          <h1 className="text-ink-900 text-3xl font-extrabold sm:text-4xl">
            Veterinary doctors in {city}
          </h1>
          <p className="text-ink-500 mt-3 leading-relaxed">
            Find a veterinary doctor near you and send an appointment request on WhatsApp.
          </p>

          {/*
            The prompt is server-rendered and handed to DoctorResults as
            children, so this slot has real content and a stable height in the
            initial HTML. Visitors who completed the flow get their
            personalised results swapped in on hydration instead.
          */}
          <div className="mt-10">
            <DoctorResults>
              <StartFlowPrompt />
            </DoctorResults>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="directory-heading"
        className="border-cream-300/70 border-t bg-white"
      >
        <div className="container-page py-14 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 id="directory-heading" className="text-ink-900 text-2xl font-bold sm:text-3xl">
              Browse veterinary doctors across {city}
            </h2>
            <p className="text-ink-500 mt-3 leading-relaxed">
              A look at veterinary doctors and clinics across {city}, {state}. Share your location
              in the{' '}
              <Link
                href="/find-a-doctor"
                className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
              >
                doctor finder
              </Link>{' '}
              to see who is closest to you, along with distances.
            </p>

            <DemoDataNotice className="mt-6" />

            <ul className="mt-8 space-y-4">
              {doctors.map((doctor) => (
                <li key={doctor.id}>
                  <DoctorCard
                    doctor={doctor}
                    action={
                      <Link
                        href={`/doctors/${doctor.slug}`}
                        className="shadow-soft bg-whatsapp hover:bg-whatsapp-hover inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-[0.975rem] font-semibold text-white transition-colors"
                      >
                        <WhatsAppIcon className="h-5 w-5" />
                        Book via WhatsApp
                      </Link>
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: `Veterinary Doctors in ${city}`, path: '/doctors' },
        ])}
      />
    </>
  );
}
