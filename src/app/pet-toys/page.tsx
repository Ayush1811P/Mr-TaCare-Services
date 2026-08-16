import type { Metadata } from 'next';
import { PetToysProvider } from '@/components/pet-toys/PetToysProvider';
import { PetToysFlow } from '@/components/pet-toys/PetToysFlow';

export const metadata: Metadata = {
  title: 'Find Pet Toys | Jivaayu Pet Care',
  description: 'Discover the best toy options tailored for your pet’s breed and age.',
};

export default function PetToysPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream-50 pt-24 pb-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 text-center">
        <h1 className="text-4xl font-bold text-teal-900 md:text-5xl">Find the Perfect Toys</h1>
        <p className="mt-4 text-lg text-gray-600">
          Tell us about your companion, and we'll recommend the best options.
        </p>
      </div>

      <PetToysProvider>
        <PetToysFlow />
      </PetToysProvider>
    </main>
  );
}
