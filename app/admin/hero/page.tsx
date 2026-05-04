'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ImageUpload } from '@/components/admin/ImageUpload'
import { toast } from 'sonner'
import { Loader2, Save, Sparkles } from 'lucide-react'

export default function HeroAdmin() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({
    bsl: '',
    bsl_detail: '',
    title: '',
    subtitle: '',
    primary_btn: '',
    primary_url: '',
    secondary_btn: '',
    secondary_url: '',
    bg_desktop: '',
    bg_mobile: '',
    coach_img: ''
  })

  const supabase = createClient()

  useEffect(() => {
    fetchHero()
  }, [])

  async function fetchHero() {
    try {
      const { data: heroData, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'hero')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      if (heroData) {
        setData(heroData.value)
      }
    } catch (error: any) {
      toast.error('Error al cargar datos del Hero')
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
          key: 'hero', 
          value: data,
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' })

      if (error) throw error
      toast.success('Hero actualizado correctamente')
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
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Hero / Banner Principal</h2>
          <p className="text-zinc-400">Personaliza el primer impacto visual de tu landing page.</p>
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

      <div className="grid gap-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Textos Principales
            </CardTitle>
            <CardDescription className="text-zinc-400">El mensaje que verá el usuario apenas entre.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-zinc-300">BSL (Texto superior pequeño)</Label>
                <Input 
                  value={data.bsl} 
                  onChange={e => setData({...data, bsl: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 text-white"
                  placeholder="Ej: UN PROCESO DE TRANSFORMACIÓN"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-zinc-300">BSL Detalle</Label>
                <Input 
                  value={data.bsl_detail} 
                  onChange={e => setData({...data, bsl_detail: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 text-white"
                  placeholder="Ej: ORDEN • ESTRUCTURA • ACCIÓN"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Título Principal</Label>
              <Textarea 
                value={data.title} 
                onChange={e => setData({...data, title: e.target.value})}
                className="bg-zinc-800/50 border-zinc-700 text-white min-h-[100px]"
                placeholder="Ej: SABÉS QUÉ HACER… PERO NO LO SOSTENÉS."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Subtítulo / Bajada</Label>
              <Textarea 
                value={data.subtitle} 
                onChange={e => setData({...data, subtitle: e.target.value})}
                className="bg-zinc-800/50 border-zinc-700 text-white"
                placeholder="Explica brevemente tu propuesta de valor."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Botones y Llamados a la Acción</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4 border-r border-zinc-800 pr-6">
                <h4 className="font-semibold text-blue-400 text-sm uppercase tracking-wider">Botón Primario</h4>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Texto</Label>
                  <Input 
                    value={data.primary_btn} 
                    onChange={e => setData({...data, primary_btn: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Enlace (URL)</Label>
                  <Input 
                    value={data.primary_url} 
                    onChange={e => setData({...data, primary_url: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-zinc-400 text-sm uppercase tracking-wider">Botón Secundario</h4>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Texto</Label>
                  <Input 
                    value={data.secondary_btn} 
                    onChange={e => setData({...data, secondary_btn: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Enlace (URL)</Label>
                  <Input 
                    value={data.secondary_url} 
                    onChange={e => setData({...data, secondary_url: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700 text-white"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Imágenes del Hero</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8 md:grid-cols-2">
            <ImageUpload 
              label="Fondo Desktop"
              description="Imagen de fondo para pantallas grandes."
              value={data.bg_desktop}
              onChange={url => setData({...data, bg_desktop: url})}
            />
            <ImageUpload 
              label="Fondo Mobile"
              description="Imagen optimizada para celulares."
              value={data.bg_mobile}
              onChange={url => setData({...data, bg_mobile: url})}
            />
            <ImageUpload 
              label="Imagen del Coach (Opcional)"
              description="Imagen recortada del coach Nahuel."
              value={data.coach_img}
              onChange={url => setData({...data, coach_img: url})}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
