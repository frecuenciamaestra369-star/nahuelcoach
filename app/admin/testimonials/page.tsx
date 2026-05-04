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
import { Loader2, Save, Plus, Trash2, MessageSquare, Video, User } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function TestimonialsAdmin() {
  const [loading, setLoading] = useState(true)
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [editingItem, setEditingItem] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    fetchTestimonials()
  }, [])

  async function fetchTestimonials() {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error: any) {
      toast.error('Error al cargar testimonios')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('testimonials')
        .upsert(editingItem)

      if (error) throw error
      
      toast.success('Testimonio guardado')
      setIsDialogOpen(false)
      fetchTestimonials()
    } catch (error: any) {
      toast.error('Error al guardar: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar testimonio?')) return
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id)
      if (error) throw error
      toast.success('Eliminado')
      fetchTestimonials()
    } catch (error) {
      toast.error('Error al eliminar')
    }
  }

  const openNew = () => {
    setEditingItem({
      name: '',
      description: '',
      image_url: '',
      video_url: '',
      type: 'text',
      is_active: true,
      sort_order: testimonials.length + 1
    })
    setIsDialogOpen(true)
  }

  const openEdit = (item: any) => {
    setEditingItem(item)
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
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Testimonios</h2>
          <p className="text-zinc-400">Gestiona los comentarios y videos de tus alumnos.</p>
        </div>
        <Button onClick={openNew} className="bg-blue-600 hover:bg-blue-700 h-11 px-6 font-semibold">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Testimonio
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <Card key={item.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden group">
            <div className="flex p-5 gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-800 shrink-0 border-2 border-zinc-800 group-hover:border-blue-500/30 transition-colors">
                {item.image_url ? (
                  <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-zinc-100 truncate">{item.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${item.type === 'video' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'}`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 line-clamp-2 italic">"{item.description}"</p>
                
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={item.is_active} 
                      onCheckedChange={() => {}} // Handle toggle
                      className="scale-75"
                    />
                    <span className="text-[10px] font-bold uppercase text-zinc-600 tracking-wider">Activo</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(item)} className="text-zinc-400 hover:text-white h-8">
                      Editar
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-zinc-600 hover:text-red-400 h-8 w-8">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem?.id ? 'Editar Testimonio' : 'Nuevo Testimonio'}</DialogTitle>
          </DialogHeader>
          
          {editingItem && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Tipo de Testimonio</Label>
                  <Select 
                    value={editingItem.type} 
                    onValueChange={val => setEditingItem({...editingItem, type: val})}
                  >
                    <SelectTrigger className="bg-zinc-800/50 border-zinc-700">
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      <SelectItem value="text">Texto</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Orden</Label>
                  <Input 
                    type="number"
                    value={editingItem.sort_order} 
                    onChange={e => setEditingItem({...editingItem, sort_order: parseInt(e.target.value)})}
                    className="bg-zinc-800/50 border-zinc-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Nombre del Alumno</Label>
                <Input 
                  value={editingItem.name} 
                  onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700"
                  placeholder="ej: Juan Pérez"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Testimonio / Descripción</Label>
                <Textarea 
                  value={editingItem.description} 
                  onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                  className="bg-zinc-800/50 border-zinc-700 min-h-[100px]"
                  placeholder="Escribe lo que dice el alumno..."
                />
              </div>

              {editingItem.type === 'video' && (
                <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                  <Label className="text-zinc-300 flex items-center gap-2">
                    <Video className="w-4 h-4 text-rose-500" /> URL del Video (YouTube/Panda)
                  </Label>
                  <Input 
                    value={editingItem.video_url} 
                    onChange={e => setEditingItem({...editingItem, video_url: e.target.value})}
                    className="bg-zinc-800/50 border-zinc-700"
                    placeholder="https://..."
                  />
                </div>
              )}

              <ImageUpload 
                label="Foto del Alumno"
                value={editingItem.image_url}
                onChange={url => setEditingItem({...editingItem, image_url: url})}
              />
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 w-full">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Guardar Testimonio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
