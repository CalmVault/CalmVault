"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type SidebarLink = {
  icon: string;
  activeIcon: string;
  title: string;
  routePath: string;
};


interface AppSidebarProps {
  sideBarLinks: SidebarLink[];
}

export function AppSidebar({ sideBarLinks }: AppSidebarProps) {
  const route = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const sortedMenuItems = [...sideBarLinks].sort(
      (a, b) => b.routePath.length - a.routePath.length
    );
    const current = sortedMenuItems.find((item) =>
      pathname?.startsWith(item.routePath)
    );
    if (current) {
      setActiveItem(current.title);
    }
  }, [pathname, sideBarLinks]);

  return (
    <Sidebar className=" py-16 px-6 relative">
      <SidebarHeader>
        <Image src={"/logo-with-text.svg"} width={168} height={45} alt="logo" />
      </SidebarHeader>
      <SidebarContent className="w-full  flex flex-col gap-6 mt-12 px-4">
        <SidebarGroup>
          {sideBarLinks.map(({ title, icon, routePath, activeIcon }, index) => {
            const isActive = activeItem === title;
            return (
              <div
                key={index}
                onClick={() => {
                  route.push(routePath);
                }}
                className="w-full cursor-pointer mb-6"
              >
                <Image
                  src={isActive ? activeIcon : icon}
                  alt={title}
                  width={24}
                  height={24}
                />
                <p
                  className={`text-sm font-normal mt-1.5 ${
                    isActive ? "text-[#00A6A6]" : "text-white"
                  } cursor-pointer `}
                >
                  {title}
                </p>
              </div>
            );
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className=" my-6 px-12  absolute bottom-0 w-full left-0">
        <LogOut color="#EDEDED" className=" rotate-180" size={20} />
        <p className="mt-1 text-sm text-[#EDEDED]">Log out</p>
      </SidebarFooter>
    </Sidebar>
  );
}