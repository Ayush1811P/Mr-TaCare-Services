'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AgeStep } from '@/components/pet-flow/AgeStep';
import { BreedStep } from '@/components/pet-flow/BreedStep';
import { MobileStep } from '@/components/pet-flow/MobileStep';
import { PetTypeStep } from '@/components/pet-flow/PetTypeStep';
import { CustomPetTypeStep } from '@/components/pet-flow/CustomPetTypeStep';
import { ProgressBar } from '@/components/pet-flow/ProgressBar';
import { TextQuestionStep } from '@/components/pet-flow/TextQuestionStep';
import { LocationStep } from '@/components/location/LocationStep';
import { useFlow } from '@/components/pet-flow/FlowProvider';
import { progressFor } from '@/components/pet-flow/flowMachine';
import { Logo } from '@/components/layout/Logo';
import { CloseIcon } from '@/components/ui/Icons';
import { LoadingState } from '@/components/ui/States';
import { getPetTypes } from '@/services/pets';
import { nameQuestion } from '@/lib/utils/pet';
import { validatePersonName, validatePetName } from '@/lib/utils/validation';
import type { PetType } from '@/types';

/**
 * Orchestrates the question flow.
 *
 * Renders one question at a time from the state machine, then routes to
 * /doctors once a location is resolved.
 */
export function DoctorFlow() {
  const router = useRouter();
  const { state, dispatch, isReady } = useFlow();
  const [petTypes, setPetTypes] = useState<PetType[] | null>(null);

  useEffect(() => {
    getPetTypes().then(setPetTypes);
  }, []);

  // Prefetch results so the transition after the location step feels instant.
  useEffect(() => {
    if (state.step === 'location') router.prefetch('/doctors');
  }, [state.step, router]);

  const progress = progressFor(state);

  const body = () => {
    if (!isReady || petTypes === null) {
      return <LoadingState title="Just a moment..." />;
    }

    switch (state.step) {
      case 'name':
        return (
          <TextQuestionStep
            stepKey="name"
            question="What's your name? 👋"
            helper="So the doctor knows who's getting in touch."
            label="Your name"
            placeholder="Enter your name"
            initialValue={state.customerName}
            autoComplete="name"
            validate={validatePersonName}
            onSubmit={(value) => dispatch({ type: 'SET_NAME', value })}
            onBack={() => router.push('/')}
            canGoBack={false}
          />
        );

      case 'mobile':
        return (
          <MobileStep
            initialValue={state.mobile}
            onSubmit={(value) => dispatch({ type: 'SET_MOBILE', value })}
            onBack={() => dispatch({ type: 'BACK' })}
          />
        );

      case 'petType':
        return (
          <PetTypeStep
            petTypes={petTypes}
            selected={state.petType}
            onSelect={(value) => dispatch({ type: 'SET_PET_TYPE', value })}
            onBack={() => dispatch({ type: 'BACK' })}
          />
        );

      case 'customPetType':
        return (
          <CustomPetTypeStep
            initialValue={state.customPetType || ''}
            onSubmit={(value) => dispatch({ type: 'SET_CUSTOM_PET_TYPE', value })}
            onBack={() => dispatch({ type: 'BACK' })}
          />
        );

      case 'age':
        if (!state.petType) return null;
        return (
          <AgeStep
            petType={state.petType}
            initialYears={state.ageYears}
            initialMonths={state.ageMonths}
            onSubmit={(years, months) => dispatch({ type: 'SET_AGE', years, months })}
            onBack={() => dispatch({ type: 'BACK' })}
          />
        );

      case 'breed':
        if (!state.petType) return null;
        return (
          <BreedStep
            petType={state.petType}
            selected={state.breed}
            onSubmit={(value, skipped) => dispatch({ type: 'SET_BREED', value, skipped })}
            onBack={() => dispatch({ type: 'BACK' })}
          />
        );

      case 'petName':
        if (!state.petType) return null;
        return (
          <TextQuestionStep
            stepKey="petName"
            question={nameQuestion(state.petType)}
            helper="We'll use it to personalise your request."
            label={`Your ${state.petType.noun}'s name`}
            placeholder="Enter a name"
            initialValue={state.petName}
            validate={validatePetName}
            onSubmit={(value) => dispatch({ type: 'SET_PET_NAME', value })}
            onBack={() => dispatch({ type: 'BACK' })}
            canGoBack
          />
        );

      case 'location':
        return (
          <LocationStep
            petName={state.petName}
            onResolved={(value) => {
              dispatch({ type: 'SET_LOCATION', value });
              router.push('/doctors');
            }}
            onBack={() => dispatch({ type: 'BACK' })}
            onStartOver={() => {
              import('@/components/pet-flow/FlowProvider').then(({ clearStoredFlow }) => {
                clearStoredFlow();
                dispatch({ type: 'RESET' });
              });
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-cream-50 flex min-h-dvh flex-col">
      <header className="border-cream-300/60 bg-cream-50/90 sticky top-0 z-30 border-b backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Logo />
          <Link
            href="/"
            className="text-ink-500 hover:bg-cream-200 hover:text-ink-800 flex h-11 w-11 items-center justify-center rounded-full transition-colors"
          >
            <CloseIcon className="h-5 w-5" />
            <span className="sr-only">Exit and return to the homepage</span>
          </Link>
        </div>
        <div className="container-page pb-3">
          <ProgressBar current={progress.current} total={progress.total} />
        </div>
      </header>

      <div className="container-page flex flex-1 items-start py-10 sm:py-16">{body()}</div>
    </div>
  );
}
