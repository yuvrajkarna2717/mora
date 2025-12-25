const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ouslxpufrgmcequhfand.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91c2x4cHVmcmdtY2VxdWhmYW5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDMzNDEsImV4cCI6MjA4MTIxOTM0MX0.irLMePCLM8PlEYHLIe8GYMO8mGZgovvFgePAOjdVww8'
);

module.exports = supabase;