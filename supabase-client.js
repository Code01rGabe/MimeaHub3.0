// supabase-client.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://yiixsswqprogbnysoezr.supabase.co';        // ← Replace
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpaXhzc3dxcHJvZ2JueXNvZXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NTkwODMsImV4cCI6MjA5NTQzNTA4M30.kozhJLAnpBAlxXWS6Kbdq0JG_wnshtR1WP5hW9i7MLA';       // ← Replace

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test connection
export async function testSupabaseConnection() {
    try {
        const { error } = await supabase.from('outbreaks').select('*').limit(1);
        if (error) throw error;
        console.log('✅ Supabase connected successfully');
        return true;
    } catch (err) {
        console.error('❌ Supabase connection failed:', err.message);
        return false;
    }
}