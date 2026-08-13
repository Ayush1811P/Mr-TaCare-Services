import { DoctorFlow } from '@/components/pet-flow/DoctorFlow';
import { buildPageMetadata } from '@/lib/seo/metadata';

/**
 * The flow itself is an interactive, personal, per-session experience with no
 * standalone content value, so it is deliberately kept out of the index. The
 * pages that should rank — home, /doctors, /how-it-works — all link into it.
 */
export const metadata = buildPageMetadata({
  title: 'Find a Veterinary Doctor',
  description:
    'Tell us about your pet and share your location to see veterinary doctors near you in Noida.',
  path: '/find-a-doctor',
  index: false,
});

export default function FindADoctorPage() {
  return <DoctorFlow />;
}
