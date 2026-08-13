import { DoctorCardSkeleton } from '@/components/ui/States';

export default function DoctorsLoading() {
  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="skeleton h-9 w-3/5 rounded-full" />
        <div className="skeleton mt-3 h-4 w-2/5 rounded-full" />
        <p
          role="status"
          aria-live="polite"
          className="text-ink-900 mt-8 mb-5 text-base font-semibold"
        >
          Finding doctors near you...
        </p>
        <div className="space-y-4">
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
        </div>
      </div>
    </div>
  );
}
