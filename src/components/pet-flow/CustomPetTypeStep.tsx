'use client';

import { TextQuestionStep } from '@/components/pet-flow/TextQuestionStep';

export function CustomPetTypeStep({
  initialValue,
  onSubmit,
  onBack,
}: {
  initialValue: string;
  onSubmit: (value: string) => void;
  onBack: () => void;
}) {
  return (
    <TextQuestionStep
      stepKey="customPetType"
      question="What kind of animal is it? 🐾"
      helper="Please specify the type of animal and optionally the breed."
      label="Type and breed"
      placeholder="e.g. Guinea Pig, Hamster (Syrian)"
      initialValue={initialValue}
      validate={(value) => {
        const trimmed = value.trim();
        if (!trimmed) {
          return { ok: false, error: 'Please enter the type of animal.' };
        }
        if (trimmed.length > 50) {
          return { ok: false, error: 'Please keep it under 50 characters.' };
        }
        return { ok: true, value: trimmed };
      }}
      onSubmit={onSubmit}
      onBack={onBack}
      canGoBack
    />
  );
}
