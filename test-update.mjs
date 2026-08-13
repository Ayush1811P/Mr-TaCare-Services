import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tmhzokqwbqzhfbyhbakm.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaHpva3F3YnF6aGZieWhiYWttIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY0Njc1NywiZXhwIjoyMTAyMjIyNzU3fQ.-wSV6duIdNEHBoeTv3SyKxGh8PqDg7SxFAX_lyv-nk4';

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
