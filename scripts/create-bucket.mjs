import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Faltan variables de entorno en .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createBucket() {
  console.log('Creando bucket "landing-assets"...')
  
  const { data, error } = await supabase.storage.createBucket('landing-assets', {
    public: true,
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
    fileSizeLimit: 5242880 // 5MB
  })

  if (error) {
    if (error.message.includes('already exists')) {
      console.log('El bucket ya existe.')
    } else {
      console.error('Error al crear el bucket:', error.message)
    }
  } else {
    console.log('Bucket "landing-assets" creado con éxito y configurado como PÚBLICO.')
  }
}

createBucket()
