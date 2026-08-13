import type { ReactNode } from 'react';
import { FlowProvider } from '@/components/pet-flow/FlowProvider';

/**
 * The flow and the results page share one provider, so answers survive the
 * navigation from /find-a-doctor to /doctors.
 */
export default function FindADoctorLayout({ children }: { children: ReactNode }) {
  return <FlowProvider>{children}</FlowProvider>;
}
