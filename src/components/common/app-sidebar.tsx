import logo from "@/assets/images/logo.png"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { HomeIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { ModeToggle } from "./mode-toggle"
import { Field, Label } from "@headlessui/react"

const pages = [
  {
    title: "User Management",
    url: "/",
    icon: HomeIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <img
          src={logo}
          alt="Company Logo - Amerikan Hastanesi"
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
                        "bg-accent-foreground text-primary-foreground rounded-lg transition-all duration-300",
                    )}
                  >
                    <Link
                      to={page.url}
                      aria-current={
                        page.url === window.location.pathname
                          ? "page"
                          : undefined
                      }
                    >
                      <page.icon aria-hidden="true" />
                      <span>{page.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Field className="flex items-center gap-2 px-4">
          <Label className="text-sm/6 font-medium text-accent-foreground">
            Theme
          </Label>
          <ModeToggle />
        </Field>
      </SidebarFooter>
    </Sidebar>
  )
}
