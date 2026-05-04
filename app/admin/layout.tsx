import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { Toaster } from "@/components/ui/sonner"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-100">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <header className="flex h-16 items-center border-b border-zinc-800 px-6 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger className="mr-4 text-zinc-400 hover:text-white transition-colors" />
            <h1 className="text-lg font-semibold tracking-tight">Nahuel Coach Admin</h1>
          </header>
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster theme="dark" position="top-right" closeButton richColors />
    </SidebarProvider>
  )
}
