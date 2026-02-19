const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.supabase_Url
const supabaseKey = process.env.supabase_Key

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase