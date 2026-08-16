import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing Supabase environment variables. Run with: node --env-file=.env.local test-update.mjs");
  process.exit(1);
}

const supabaseServer = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function testFlow() {
  const requestId = '0df38153-6588-4376-9974-145d0539a167'; // From previous test
  console.log("Updating status for", requestId);
  
  const { error } = await supabaseServer
      .from('appointment_requests')
      .update({ status: 'WHATSAPP_OPENED' })
      .eq('id', requestId);

  if (error) {
    console.error('Update error:', error);
    return;
  }
  
  console.log("Inserting event...");
  const { error: eventError } = await supabaseServer.from('appointment_events').insert({
      appointment_request_id: requestId,
      event_type: 'WHATSAPP_OPENED',
  });

  if (eventError) {
      console.error('Event error:', eventError);
  }
  
  console.log("DONE");
}
testFlow();
