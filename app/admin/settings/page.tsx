'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Save, Link as LinkIcon, Instagram, Phone, Video } from 'lucide-react'

export default function SettingsAdmin() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({
    whatsapp: '',
    whatsapp_message: '',
    google_meet: '',
    instagram: '',
    contact_email: ''
  })

  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      const { data: settingsData, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'links')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      if (settingsData) {
        setData(settingsData.value)
      }
    } catch (error: any) {
      toast.error('Error al cargar ajustes')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ 
          key: 'links', 
          value: data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' })

      if (error) throw error
      toast.success('Ajustes actualizados')
    } catch (error: any) {
      toast.error('Error al guardar: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Configuración General</h2>
          <p className="text-zinc-400">Gestiona enlaces externos y redes sociales.</p>
        </div>
        <Button 
          onClick={handleSubmit} 
          className="bg-blue-600 hover:bg-blue-700 h-11 px-6 font-semibold"
          disabled={saving}
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Guardar Cambios
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Phone className="w-5 h-5 text-emerald-500" />
              WhatsApp
            </CardTitle>
            <CardDescription className="text-zinc-400">Configuración para contacto directo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">Número de WhatsApp (con código de país)</Label>
              <Input 
                value={data.whatsapp} 
                onChange={e => setData({...data, whatsapp: e.target.value})}
                className="bg-zinc-800/50 border-zinc-700 text-white"
                placeholder="Ej: 5491112345678"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Mensaje Predeterminado</Label>
              <Textarea 
                value={data.whatsapp_message} 
                onChange={e => setData({...data, whatsapp_message: e.target.value})}
                className="bg-zinc-800/50 border-zinc-700 text-white"
                placeholder="Ej: Hola Nahuel! Quiero empezar mi transformación..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <LinkIcon className="w-5 h-5 text-blue-500" />
              Enlaces Externos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-zinc-300">
                <Video className="w-4 h-4 text-rose-500" /> Google Meet / Calendly
              </Label>
              <Input 
                value={data.google_meet} 
                onChange={e => setData({...data, google_meet: e.target.value})}
                className="bg-zinc-800/50 border-zinc-700 text-white"
                placeholder="https://meet.google.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-zinc-300">
                <Instagram className="w-4 h-4 text-pink-500" /> Instagram URL
              </Label>
              <Input 
                value={data.instagram} 
                onChange={e => setData({...data, instagram: e.target.value})}
                className="bg-zinc-800/50 border-zinc-700 text-white"
                placeholder="https://instagram.com/nahuelcoach"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
