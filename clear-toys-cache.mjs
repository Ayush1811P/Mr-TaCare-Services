import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual simple dotenv parser
const envLocal = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8');
envLocal.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0 && !key.startsWith('#')) {
    process.env[key.trim()] = values.join('=').trim().replace(/['"]/g, '');
  }
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);

async function clearCache() {
  console.log('Clearing pet_toys_cache...');
  // Delete all rows where animal is not null (which means all rows)
  const { error } = await supabaseServer.from('pet_toys_cache').delete().neq('animal', 'non-existent-animal');
  if (error) {
    console.error('Failed to clear cache:', error);
  } else {
    console.log('Cache cleared successfully!');
  }
}

clearCache();
