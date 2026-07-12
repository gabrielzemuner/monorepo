import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type NavItem } from "@/types";
import { Link, useLocation } from "react-router-dom";

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const location = useLocation();

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              render={
                <Link to={item.href}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              }
              isActive={location.pathname.startsWith(item.href)}
              tooltip={{ children: item.title }}
            ></SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
