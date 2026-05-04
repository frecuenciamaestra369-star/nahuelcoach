'use client'

import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  MessageSquare, 
  PlayCircle, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronRight,
  Sparkles,
  Layout
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/client"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "sonner"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Hero / Banner",
    url: "/admin/hero",
    icon: Sparkles,
  },
  {
    title: "Secciones",
    url: "/admin/sections",
    icon: Layout,
  },
  {
    title: "Testimonios",
    url: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    title: "Videos",
    url: "/admin/videos",
    icon: PlayCircle,
  },
  {
    title: "Programas",
    url: "/admin/programs",
    icon: CreditCard,
  },
  {
    title: "Configuración",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.info("Sesión cerrada")
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <Sidebar className="border-r border-zinc-800 bg-zinc-900/50">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/20">
            N
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Admin Panel</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-zinc-500 uppercase text-[10px] font-bold tracking-wider mb-2">
            Gestión
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20 shadow-sm' 
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                        }
                      `}
                    >
                      <a href={item.url}>
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : ''}`} />
                        <span>{item.title}</span>
                        {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-zinc-800 mt-auto">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
