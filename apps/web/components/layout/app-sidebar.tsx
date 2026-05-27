"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ROUTES } from "~/lib/routes"

import {
 Sidebar,
 SidebarContent,
 SidebarHeader,
 SidebarMenu,
 SidebarMenuButton,
 SidebarMenuItem,
} from "~/components/ui/sidebar"

const items = [

 {
  title:"Dashboard",
  url:ROUTES.DASHBOARD,
 },

 {
  title:"Forms",
  url:ROUTES.CREATE_FORM,
 },

 {
  title:"Profile",
  url:ROUTES.PROFILE,
 },

]

export function AppSidebar(){

 const pathname =
  usePathname()

 return(

  <Sidebar>

   <SidebarHeader
    className="
    p-6
    text-xl
    font-bold
    "
   >

    Parcha

   </SidebarHeader>

   <SidebarContent>

    <SidebarMenu>

     {

      items.map(
       item=>(

       <SidebarMenuItem
        key={
         item.title
        }
       >

        <SidebarMenuButton
         asChild
         isActive={
          pathname===
          item.url
         }
        >

         <Link
          href={
           item.url
          }
         >

          {item.title}

         </Link>

        </SidebarMenuButton>

       </SidebarMenuItem>

      ))

     }

    </SidebarMenu>

   </SidebarContent>

  </Sidebar>

 )

}