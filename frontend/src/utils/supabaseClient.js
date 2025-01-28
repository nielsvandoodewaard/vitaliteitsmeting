import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://grkoxdnrxntjdddfcmpg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdya294ZG5yeG50amRkZGZjbXBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5NjQ4MDQsImV4cCI6MjA1MzU0MDgwNH0.LKsidPwSutUedwZ3nZJ9F2uWAyhWPPlatqg3BxRK6Tc';
export const supabase = createClient(supabaseUrl, supabaseKey);

