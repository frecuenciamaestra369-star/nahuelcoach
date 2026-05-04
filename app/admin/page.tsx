import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Layout, MessageSquare, CreditCard } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { title: "Secciones", value: "8", icon: Layout, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Testimonios", value: "12", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Programas", value: "3", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Elementos", value: "24", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-500/10" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Panel de Control</h2>
        <p className="text-zinc-400">Bienvenido de nuevo. Gestiona el contenido de tu landing page de forma dinámica.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Acciones Rápidas</CardTitle>
            <CardDescription className="text-zinc-400">Accede directamente a las tareas más comunes.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <a href="/admin/hero" className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 hover:bg-zinc-800/50 transition-all group">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-zinc-200">Editar Hero</p>
                <p className="text-sm text-zinc-500">Actualiza el banner principal y los textos de impacto.</p>
              </div>
            </a>
            <a href="/admin/pricing" className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 hover:bg-zinc-800/50 transition-all group">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-zinc-200">Gestionar Programas</p>
                <p className="text-sm text-zinc-500">Cambia precios, descripciones y beneficios de tus planes.</p>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Estado de la Landing</CardTitle>
            <CardDescription className="text-zinc-400">Resumen del estado actual.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-400">Conexión Supabase</span>
                  <span className="text-emerald-500 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Activa
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-400">Última actualización</span>
                  <span className="text-zinc-300">Hoy, 18:45</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-zinc-400">Bucket Storage</span>
                  <span className="text-zinc-300">landing-assets</span>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
