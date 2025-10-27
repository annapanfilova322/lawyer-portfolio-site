import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqnrqqkgbrwpyhjsigt.supabase.co'
const supabaseKey = 'eyJhbGci0iJIUzI1NiIsInR5cCIGIkpXVCJ9.eyJpc3WioiJzdXf'

export const supabase = createClient(supabaseUrl, supabaseKey)
