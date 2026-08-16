import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Missing Supabase environment variables. Run with: node --env-file=.env.local test-rpc.mjs");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testRPC() {
  console.log("Calling RPC...");
  const { data, error } = await supabase.rpc('submit_appointment_request', {
    p_customer_name: "Test User",
    p_mobile_number: "+919876543210",
    p_pet_name: "Buddy",
    p_pet_type: "DOG",
    p_breed: "Golden Retriever",
    p_age_years: 2,
    p_age_months: 5,
    p_doctor_id: "1c1296b1-78a1-478b-8bf5-b12fa08ef697",
    p_preferred_date: null,
    p_preferred_time: null,
    p_latitude: 28.6265,
    p_longitude: 77.3649,
    p_location_text: null,
  });

  console.log("Result:", { data, error });
}

testRPC();
