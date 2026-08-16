-- Run this SQL in your Supabase SQL Editor to create the pet_food_cache table

CREATE TABLE IF NOT EXISTS public.pet_food_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cache_key TEXT UNIQUE NOT NULL,
    animal TEXT NOT NULL,
    breed TEXT,
    life_stage TEXT NOT NULL,
    products JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_pet_food_cache_key ON public.pet_food_cache(cache_key);

-- Optional: Enable Row Level Security (RLS) if needed, but for server-side cache it's fine without policies, or restrict to service role
ALTER TABLE public.pet_food_cache ENABLE ROW LEVEL SECURITY;
