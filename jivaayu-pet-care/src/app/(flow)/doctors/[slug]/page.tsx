import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DoctorProfile } from '@/components/doctor/DoctorProfile';
import { DemoDataNotice } from '@/components/layout/DemoDataNotice';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, veterinaryCareSchema } from '@/lib/seo/structuredData';
import { getDoctorBySlug, listIndexableDoctorSlugs } from '@/services/doctors';

type PageProps = { params: Promise<{ slug: string }> };

/**
 * Only verified profiles are prerendered and indexed. Unverified listings
 * still render on demand for anyone with the link, but carry noindex — thin,
 * near-duplicate provider pages are exactly what we do not want in the index.
 */
export async function generateStaticParams() {
  const slugs = await listIndexableDoctorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);

  if (!doctor) {
    return buildPageMetadata({
      title: 'Doctor not found',
      description: 'This veterinary doctor profile is not available.',
      path: `/doctors/${slug}`,
      index: false,
    });
  }

  const location = `${doctor.clinic.locality}, ${doctor.clinic.city}`;

  return buildPageMetadata({
    title: `${doctor.name} — Veterinary Doctor in ${location}`,
    description: `${doctor.name}, ${doctor.qualifications}, practises at ${doctor.clinic.name} in ${location}. ${doctor.headline}. Request an appointment on WhatsApp through Jivaayu Pet Care.`,
    path: `/doctors/${doctor.slug}`,
    index: doctor.isVerified,
    type: 'profile',
  });
}

export default async function DoctorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);

  if (!doctor) notFound();

  const location = `${doctor.clinic.locality}, ${doctor.clinic.city}`;

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="text-ink-500 flex flex-wrap items-center gap-1.5 text-sm">
            <li>
              <Link href="/" className="transition-colors hover:text-teal-700">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-cream-300">
              /
            </li>
            <li>
              <Link href="/doctors" className="transition-colors hover:text-teal-700">
                Veterinary Doctors
              </Link>
            </li>
            <li aria-hidden="true" className="text-cream-300">
              /
            </li>
            <li>
              <span aria-current="page" className="text-ink-700 font-semibold">
                {doctor.name}
              </span>
            </li>
          </ol>
        </nav>

        <DemoDataNotice className="mb-6" />

        <DoctorProfile doctor={doctor} />
      </div>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Veterinary Doctors', path: '/doctors' },
            { name: doctor.name, path: `/doctors/${doctor.slug}` },
          ]),
          // Structured data only for verified listings — see the schema builder.
          ...(doctor.isVerified ? [veterinaryCareSchema(doctor)] : []),
        ]}
      />

      <p className="sr-only">
        {doctor.name} is listed on Jivaayu Pet Care as a veterinary doctor practising in {location}.
      </p>
    </div>
  );
}
