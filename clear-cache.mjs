import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);

async function clearCache() {
  console.log('Clearing pet_food_cache...');
  // Delete all rows where id is not null (which means all rows)
  const { error } = await supabaseServer.from('pet_food_cache').delete().neq('animal', 'non-existent-animal');
  if (error) {
    console.error('Failed to clear cache:', error);
  } else {
    console.log('Cache cleared successfully!');
  }
}

clearCache();
