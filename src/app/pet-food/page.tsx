import type { Metadata } from 'next';
import { PetFoodProvider } from '@/components/pet-food/PetFoodProvider';
import { PetFoodFlow } from '@/components/pet-food/PetFoodFlow';

export const metadata: Metadata = {
  title: 'Find Pet Food | Jivaayu Pet Care',
  description: 'Discover the best food options tailored for your pet’s breed and age.',
};

export default function PetFoodPage() {
  return (
    <main className="flex min-h-screen flex-col bg-cream-50 pt-24 pb-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 text-center">
        <h1 className="text-4xl font-bold text-teal-900 md:text-5xl">Find the Perfect Food</h1>
        <p className="mt-4 text-lg text-gray-600">
          Tell us about your companion, and we'll recommend the best options.
        </p>
      </div>

      <PetFoodProvider>
        <PetFoodFlow />
      </PetFoodProvider>
    </main>
  );
}
