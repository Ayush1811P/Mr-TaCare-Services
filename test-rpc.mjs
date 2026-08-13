import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tmhzokqwbqzhfbyhbakm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaHpva3F3YnF6aGZieWhiYWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2NDY3NTcsImV4cCI6MjEwMjIyMjc1N30.28U9UV_5lls2TOEvaDVqEWvQdqMpmK1OMie7KFQMVms';

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
