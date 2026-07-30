const SUPABASE_URL = "https://ebwsnsrqihxtpbjasbhv.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVid3Nuc3JxaWh4dHBiamFzYmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwOTA0NjksImV4cCI6MjEwMDY2NjQ2OX0.1Fh7O38nEh3hh7CSPopl1lGe0rOe0k_kOKgrQAbFQns";

// Create the client
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

// Make it globally available
window.supabaseClient = supabaseClient;