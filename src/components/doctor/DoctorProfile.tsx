import Image from 'next/image';
import Link from 'next/link';
import { DoctorWhatsAppButton } from '@/components/whatsapp/DoctorWhatsAppButton';
import { ClockIcon, PinIcon, ShieldCheckIcon } from '@/components/ui/Icons';
import type { Doctor } from '@/types';

export function DoctorProfile({ doctor }: { doctor: Doctor }) {
  const { clinic } = doctor;

  return (
    <article>
      <div className="rounded-card border-cream-300/70 shadow-soft border bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <Image
            src={doctor.imageUrl}
            alt={`Portrait of ${doctor.name}, veterinary doctor at ${clinic.name}`}
            width={384}
            height={384}
            priority
            sizes="(min-width: 640px) 144px, 112px"
            className="bg-cream-200 h-28 w-28 shrink-0 rounded-2xl object-cover sm:h-36 sm:w-36"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-ink-900 text-2xl font-extrabold sm:text-3xl">{doctor.name}</h1>
              {doctor.isVerified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
                  <ShieldCheckIcon className="h-3.5 w-3.5" />
                  Verified
                </span>
              ) : null}
            </div>

            <p className="text-ink-500 mt-1.5">Veterinary Doctor · {doctor.qualifications}</p>
            <p className="text-ink-500 mt-1 text-[0.9375rem]">
              {doctor.yearsOfExperience} years of experience · Speaks {doctor.languages.join(', ')}
            </p>

            <p className="text-ink-800 mt-4 text-[1.0625rem] font-semibold">{doctor.headline}</p>
          </div>
        </div>

        <div className="border-cream-200 mt-7 border-t pt-6">
          <DoctorWhatsAppButton doctor={doctor} />
          <p className="text-ink-500 mt-3 flex items-center justify-center gap-2 text-center text-sm">
            <ClockIcon className="text-ink-400 h-4 w-4 shrink-0" />
            Contact doctor for appointment availability
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <section
            aria-labelledby="about-heading"
            className="rounded-card border-cream-300/70 shadow-soft border bg-white p-6 sm:p-7"
          >
            <h2 id="about-heading" className="text-ink-900 text-xl font-bold">
              About {doctor.name}
            </h2>
            <p className="text-ink-600 mt-3 leading-relaxed">{doctor.about}</p>
          </section>

          <section
            aria-labelledby="services-heading"
            className="rounded-card border-cream-300/70 shadow-soft border bg-white p-6 sm:p-7"
          >
            <h2 id="services-heading" className="text-ink-900 text-xl font-bold">
              Services
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {doctor.services.map((service) => (
                <li
                  key={service.id}
                  className="bg-cream-100 text-ink-700 rounded-full px-3.5 py-2 text-sm font-semibold"
                >
                  {service.name}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <section
            aria-labelledby="clinic-heading"
            className="rounded-card border-cream-300/70 shadow-soft border bg-white p-6 sm:p-7"
          >
            <h2 id="clinic-heading" className="text-ink-900 text-xl font-bold">
              Clinic
            </h2>
            <p className="text-ink-800 mt-3 font-semibold">{clinic.name}</p>
            <address className="text-ink-500 mt-1.5 flex gap-2 text-[0.9375rem] leading-relaxed not-italic">
              <PinIcon className="text-ink-400 mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {clinic.addressLine}
                <br />
                {clinic.locality}, {clinic.city}
                <br />
                {clinic.state}
                {clinic.postalCode ? ` ${clinic.postalCode}` : ''}
              </span>
            </address>

            {doctor.isVerified && typeof doctor.consultationFee === 'number' ? (
              <p className="border-cream-200 mt-5 border-t pt-4 text-[0.9375rem]">
                <span className="text-ink-500">Consultation fee</span>
                <br />
                <span className="text-ink-900 text-lg font-bold">₹{doctor.consultationFee}</span>
              </p>
            ) : null}
          </section>

          {clinic.openingHours?.length ? (
            <section
              aria-labelledby="hours-heading"
              className="rounded-card border-cream-300/70 shadow-soft border bg-white p-6 sm:p-7"
            >
              <h2 id="hours-heading" className="text-ink-900 text-xl font-bold">
                Opening hours
              </h2>
              <dl className="mt-3 space-y-2.5">
                {clinic.openingHours.map((hours) => (
                  <div key={hours.days.join()} className="text-[0.9375rem]">
                    <dt className="text-ink-800 font-semibold">
                      {hours.days.length > 2
                        ? `${hours.days[0].slice(0, 3)}–${hours.days[hours.days.length - 1].slice(0, 3)}`
                        : hours.days.map((d) => d.slice(0, 3)).join(', ')}
                    </dt>
                    <dd className="text-ink-500">
                      {hours.opens} – {hours.closes}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-ink-400 mt-4 text-sm">
                Hours can change. Please confirm with the clinic before visiting.
              </p>
            </section>
          ) : null}

          <div className="rounded-card border-cream-300/70 bg-cream-100 border p-6">
            <p className="text-ink-600 text-[0.9375rem] leading-relaxed">
              Looking for other options?{' '}
              <Link
                href="/find-a-doctor"
                className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800"
              >
                Find veterinary doctors near you
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
