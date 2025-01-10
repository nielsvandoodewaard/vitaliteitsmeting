import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yplfhujkialnaphtjcqk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwbGZodWpraWFsbmFwaHRqY3FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTUxMTIsImV4cCI6MjA1MDE5MTExMn0.HU6_K_ItnfumGrvWUgQOWpdozWjcuEAvE6fAs3SMTCE';
export const supabase = createClient(supabaseUrl, supabaseKey);
