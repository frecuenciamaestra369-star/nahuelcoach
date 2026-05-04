import { createClient } from './server'

export async function getHeroData() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'hero')
      .single()
    return data?.value || null
  } catch (error) {
    return null
  }
}

export async function getLinksData() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'links')
      .single()
    return data?.value || null
  } catch (error) {
    return null
  }
}

export async function getSectionsData() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('sections')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    return data || []
  } catch (error) {
    return []
  }
}

export async function getTestimonialsData() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    return data || []
  } catch (error) {
    return []
  }
}

export async function getProgramsData() {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    return data || []
  } catch (error) {
    return []
  }
}
