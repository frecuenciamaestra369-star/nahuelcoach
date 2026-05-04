import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Faltan variables de entorno en .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setup() {
  console.log('Creando usuario administrador...')
  
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@nahuelcoach.com',
    password: 'NahuelAdmin2026!',
    email_confirm: true
  })

  if (error) {
    if (error.message.includes('already registered')) {
      console.log('El usuario ya existe.')
    } else {
      console.error('Error al crear usuario:', error.message)
    }
  } else {
    console.log('Usuario admin@nahuelcoach.com creado con éxito.')
  }

  console.log('\n--- IMPORTANTE ---')
  console.log('Para ejecutar el SQL, por favor copia el contenido de supabase-schema.sql')
  console.log('y pégalo en el SQL Editor de tu Dashboard de Supabase.')
}

setup()
