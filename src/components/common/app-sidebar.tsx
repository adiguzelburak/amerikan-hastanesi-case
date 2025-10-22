import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { HomeIcon, InboxIcon } from "lucide-react"
import { Link } from "react-router-dom"
import logo from "@/assets/images/images.png"

const pages = [
  {
    title: "Dashboard",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Test",
    url: "/test",
    icon: InboxIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-contain py-8"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map(page => (
                <SidebarMenuItem key={page.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      page.url === window.location.pathname &&
                        "bg-sidebar-foreground text-sidebar-primary-foreground rounded-lg transition-all duration-300",
                    )}
                  >
                    <Link to={page.url}>
                      <page.icon />
                      <span>{page.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
