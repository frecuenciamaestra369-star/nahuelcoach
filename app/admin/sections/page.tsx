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
import { Loader2, Save, Plus, Trash2, Layout, ArrowUpDown, Power } from 'lucide-react'
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

export default function SectionsAdmin() {
  const [loading, setLoading] = useState(true)
  const [sections, setSections] = useState<any[]>([])
  const [editingSection, setEditingSection] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchSections()
  }, [])

  async function fetchSections() {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setSections(data || [])
    } catch (error: any) {
      toast.error('Error al cargar secciones')
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveSection() {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('sections')
        .upsert(editingSection)

      if (error) throw error
      
      toast.success('Sección guardada correctamente')
      setIsDialogOpen(false)
      fetchSections()
    } catch (error: any) {
      toast.error('Error al guardar: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro de eliminar esta sección?')) return

    try {
      const { error } = await supabase
        .from('sections')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast.success('Sección eliminada')
      fetchSections()
    } catch (error: any) {
      toast.error('Error al eliminar')
    }
  }

  async function toggleActive(id: string, current: boolean) {
    try {
      const { error } = await supabase
        .from('sections')
        .update({ is_active: !current })
        .eq('id', id)

      if (error) throw error
      fetchSections()
    } catch (error) {
      toast.error('Error al actualizar estado')
    }
  }

  const openNew = () => {
    setEditingSection({
      section_key: '',
      title: '',
      subtitle: '',
      description: '',
      button_text: '',
      button_url: '',
      image_url: '',
      is_active: true,
      sort_order: sections.length + 1
    })
    setIsDialogOpen(true)
  }

  const openEdit = (section: any) => {
    setEditingSection(section)
    setIsDialogOpen(true)
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
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Secciones de la Página</h2>
          <p className="text-zinc-400">Gestiona las diferentes partes de tu landing (Problema, Transformación, etc.)</p>
        </div>
        <Button onClick={openNew} className="bg-blue-600 hover:bg-blue-700 h-11 px-6 font-semibold">
          <Plus className="mr-2 h-4 w-4" /> Nueva Sección
        </Button>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => (
          <Card key={section.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden group">
            <div className="flex items-center p-4 gap-4">
              <div className="flex flex-col items-center gap-1 text-zinc-600">
                 <ArrowUpDown className="w-4 h-4" />
                 <span className="text-xs font-bold">{section.sort_order}</span>
              </div>
              
              {section.image_url && (
                <div className="w-20 h-14 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-800 shrink-0">
                  <img src={section.image_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-zinc-100 truncate">{section.title || 'Sin Título'}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-500 uppercase tracking-wider">
                    {section.section_key}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 truncate">{section.subtitle || section.description || 'Sin descripción'}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 mr-2">
                  <Switch 
                    checked={section.is_active} 
                    onCheckedChange={() => toggleActive(section.id, section.is_active)}
                  />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${section.is_active ? 'text-emerald-500' : 'text-zinc-600'}`}>
                    {section.is_active ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
                
                <Button variant="outline" size="sm" onClick={() => openEdit(section)} className="bg-transparent border-zinc-800 hover:bg-zinc-800 text-zinc-300">
                  Editar
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(section.id)} className="text-zinc-600 hover:text-red-400 hover:bg-red-400/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {sections.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/30 text-zinc-500">
            <Layout className="w-12 h-12 mb-4 opacity-20" />
            <p>No hay secciones creadas aún.</p>
            <Button onClick={openNew} variant="link" className="text-blue-500">Crea la primera sección</Button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingSection?.id ? 'Editar Sección' : 'Nueva Sección'}</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Completa los datos de la sección. La clave debe ser única (ej: "problema").
            </DialogDescription>
          </DialogHeader>
          
          {editingSection && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Clave Identificadora (slug)</Label>
                  <Input 
                    value={editingSection.section_key} 
                    onChange={e => setEditingSection({...editingSection, section_key: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700"
                    placeholder="ej: transformación"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Orden</Label>
                  <Input 
                    type="number"
                    value={editingSection.sort_order} 
                    onChange={e => setEditingSection({...editingSection, sort_order: parseInt(e.target.value)})}
                    className="bg-zinc-800/50 border-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Título</Label>
                <Input 
                  value={editingSection.title} 
                  onChange={e => setEditingSection({...editingSection, title: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Subtítulo</Label>
                <Input 
                  value={editingSection.subtitle} 
                  onChange={e => setEditingSection({...editingSection, subtitle: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Descripción / Contenido</Label>
                <Textarea 
                  value={editingSection.description} 
                  onChange={e => setEditingSection({...editingSection, description: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Texto del Botón (Opcional)</Label>
                  <Input 
                    value={editingSection.button_text} 
                    onChange={e => setEditingSection({...editingSection, button_text: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">URL del Botón</Label>
                  <Input 
                    value={editingSection.button_url} 
                    onChange={e => setEditingSection({...editingSection, button_url: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700"
                  />
                </div>
              </div>

              <ImageUpload 
                label="Imagen de la Sección"
                value={editingSection.image_url}
                onChange={url => setEditingSection({...editingSection, image_url: url})}
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-zinc-400">Cancelar</Button>
            <Button onClick={handleSaveSection} disabled={saving} className="bg-blue-600 hover:bg-blue-700 min-w-[120px]">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
