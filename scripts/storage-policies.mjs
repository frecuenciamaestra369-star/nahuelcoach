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

async function setupStoragePolicies() {
  console.log('Configurando políticas de RLS para el storage...')
  
  // Nota: No podemos usar el cliente de JS para crear políticas SQL directamente de forma fácil
  // a menos que usemos RPC. Pero lo que sí podemos hacer es crear el usuario y asegurarnos
  // de que el bucket sea público. 
  // El error de RLS suele ser porque no hay políticas en 'storage.objects'.
  
  console.log('\n--- ACCIÓN REQUERIDA ---')
  console.log('Para arreglar esto definitivamente, copia y pega esto en tu SQL Editor de Supabase:')
  console.log(`
-- Permitir que cualquiera vea las fotos
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'landing-assets' );

-- Permitir que usuarios autenticados suban fotos
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'landing-assets' AND auth.role() = 'authenticated' );

-- Permitir que usuarios autenticados borren/editen sus fotos
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'landing-assets' AND auth.role() = 'authenticated' );
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'landing-assets' AND auth.role() = 'authenticated' );
  `)
}

setupStoragePolicies()
