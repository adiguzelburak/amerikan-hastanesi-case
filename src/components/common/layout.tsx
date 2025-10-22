import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/common/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="w-full h-full px-6 py-3 flex flex-col gap-6">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  )
}
