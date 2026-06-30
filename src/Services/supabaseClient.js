import { createClient } from '@supabase/supabase-js';

// Gunakan URL utama (tanpa /rest/v1/)
const supabaseUrl = 'https://pfpegonxqfrdtrbzdfsd.supabase.co';
// Gunakan API Key yang kamu berikan
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmcGVnb254cWZyZHRyYnpkZnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNjc4NjksImV4cCI6MjA5Nzk0Mzg2OX0.DEy8OeuII5tDEw9RfrY_vrPZlnANjZOJwIPiGBy23Yg';

export const supabase = createClient(supabaseUrl, supabaseKey);