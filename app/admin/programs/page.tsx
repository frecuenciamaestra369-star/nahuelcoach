'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Save, Plus, Trash2, CreditCard, Star, CheckCircle2, X } from 'lucide-react'
import { ImageUpload } from '@/components/admin/ImageUpload'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

export default function ProgramsAdmin() {
  const [loading, setLoading] = useState(true)
  const [programs, setPrograms] = useState<any[]>([])
  const [editingProgram, setEditingProgram] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchPrograms()
  }, [])

  async function fetchPrograms() {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setPrograms(data || [])
    } catch (error: any) {
      toast.error('Error al cargar programas')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('programs')
        .upsert(editingProgram)

      if (error) throw error
      
      toast.success('Programa guardado correctamente')
      setIsDialogOpen(false)
      fetchPrograms()
    } catch (error: any) {
      toast.error('Error al guardar: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro?')) return
    try {
      const { error } = await supabase.from('programs').delete().eq('id', id)
      if (error) throw error
      toast.success('Programa eliminado')
      fetchPrograms()
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  const openNew = () => {
    setEditingProgram({
      name: '',
      subtitle: '',
      description: '',
      price: '',
      old_price: '',
      features: [],
      button_text: 'Empezar ahora',
      button_url: '',
      image_url: '',
      is_featured: false,
      is_active: true,
      sort_order: programs.length + 1
    })
    setIsDialogOpen(true)
  }

  const openEdit = (program: any) => {
    setEditingProgram({
      ...program,
      features: Array.isArray(program.features) ? program.features : []
    })
    setIsDialogOpen(true)
  }

  const handleFeatureChange = (index: number, val: string) => {
    const newFeatures = [...editingProgram.features]
    newFeatures[index] = val
    setEditingProgram({...editingProgram, features: newFeatures})
  }

  const addFeature = () => {
    setEditingProgram({
      ...editingProgram, 
      features: [...editingProgram.features, '']
    })
  }

  const removeFeature = (index: number) => {
    const newFeatures = editingProgram.features.filter((_: any, i: number) => i !== index)
    setEditingProgram({...editingProgram, features: newFeatures})
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Programas y Precios</h2>
          <p className="text-zinc-400">Gestiona los planes que ofreces a tus alumnos.</p>
        </div>
        <Button onClick={openNew} className="bg-blue-600 hover:bg-blue-700 h-11 px-6 font-semibold">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Programa
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <Card key={program.id} className={`bg-zinc-900 border-zinc-800 relative overflow-hidden group ${program.is_featured ? 'ring-2 ring-blue-500/50' : ''}`}>
            {program.is_featured && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Destacado
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl text-white">{program.name}</CardTitle>
              <CardDescription className="text-zinc-500">{program.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">{program.price}</span>
                {program.old_price && <span className="text-sm text-zinc-600 line-through">{program.old_price}</span>}
              </div>
              
              <div className="space-y-2">
                {program.features?.slice(0, 3).map((f: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                    <span>{f}</span>
                  </div>
                ))}
                {program.features?.length > 3 && (
                  <p className="text-[10px] text-zinc-600">+{program.features.length - 3} beneficios más</p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-zinc-800">
                <Button variant="outline" size="sm" onClick={() => openEdit(program)} className="flex-1 bg-transparent border-zinc-800 text-zinc-300">
                  Editar
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(program.id)} className="text-zinc-600 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProgram?.id ? 'Editar Programa' : 'Nuevo Programa'}</DialogTitle>
          </DialogHeader>
          
          {editingProgram && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Nombre del Programa</Label>
                  <Input 
                    value={editingProgram.name} 
                    onChange={e => setEditingProgram({...editingProgram, name: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700"
                    placeholder="ej: Proceso Completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Subtítulo</Label>
                  <Input 
                    value={editingProgram.subtitle} 
                    onChange={e => setEditingProgram({...editingProgram, subtitle: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700"
                    placeholder="ej: Transformación 12 semanas"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Precio Actual</Label>
                  <Input 
                    value={editingProgram.price} 
                    onChange={e => setEditingProgram({...editingProgram, price: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700"
                    placeholder="ej: $900"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Precio Anterior (Opcional)</Label>
                  <Input 
                    value={editingProgram.old_price} 
                    onChange={e => setEditingProgram({...editingProgram, old_price: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700"
                    placeholder="ej: $1200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300 text-sm flex items-center justify-between">
                  Beneficios / Características
                  <Button type="button" variant="ghost" size="sm" onClick={addFeature} className="text-blue-500 h-7 px-2">
                    <Plus className="w-3 h-3 mr-1" /> Añadir
                  </Button>
                </Label>
                <div className="space-y-2">
                  {editingProgram.features.map((feature: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input 
                        value={feature} 
                        onChange={e => handleFeatureChange(index, e.target.value)}
                        className="bg-zinc-800/50 border-zinc-700"
                        placeholder="ej: Plan de alimentación"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeFeature(index)} className="text-zinc-600 hover:text-red-400">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800/30 border border-zinc-800">
                <div className="space-y-0.5">
                  <Label className="text-zinc-200">Destacar Programa</Label>
                  <p className="text-xs text-zinc-500">Aparecerá con un diseño especial en la web.</p>
                </div>
                <Switch 
                  checked={editingProgram.is_featured} 
                  onCheckedChange={val => setEditingProgram({...editingProgram, is_featured: val})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Texto Botón</Label>
                  <Input 
                    value={editingProgram.button_text} 
                    onChange={e => setEditingProgram({...editingProgram, button_text: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">URL Botón (WhatsApp/Meet)</Label>
                  <Input 
                    value={editingProgram.button_url} 
                    onChange={e => setEditingProgram({...editingProgram, button_url: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700"
                  />
                </div>
              </div>

              <ImageUpload 
                label="Imagen / Icono del Programa (Opcional)"
                value={editingProgram.image_url}
                onChange={url => setEditingProgram({...editingProgram, image_url: url})}
              />
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 w-full">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Guardar Programa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
