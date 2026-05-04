'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Upload, X, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  description?: string
}

export function ImageUpload({ value, onChange, label, description }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('landing-assets')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('landing-assets')
        .getPublicUrl(filePath)

      onChange(publicUrl)
      toast.success('Imagen subida correctamente')
    } catch (error: any) {
      toast.error('Error al subir imagen: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    onChange('')
  }

  return (
    <div className="space-y-4">
      {label && <Label className="text-zinc-300">{label}</Label>}
      {description && <p className="text-xs text-zinc-500">{description}</p>}
      
      <div className="relative group">
        {value ? (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={removeImage}
                className="h-8"
              >
                <X className="w-4 h-4 mr-1" /> Eliminar
              </Button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-blue-500/50 transition-all cursor-pointer">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="p-3 rounded-full bg-zinc-800 mb-3">
                <Upload className="w-5 h-5 text-zinc-400" />
              </div>
              <p className="mb-2 text-sm text-zinc-400">
                <span className="font-semibold text-blue-400">Haz clic para subir</span> o arrastra y suelta
              </p>
              <p className="text-xs text-zinc-500">PNG, JPG o WEBP (Máx. 5MB)</p>
            </div>
            <Input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        )}
        
        {uploading && (
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center rounded-xl z-20">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-sm text-zinc-300">Subiendo imagen...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
