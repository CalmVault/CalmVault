import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poly } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poly = Poly({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-poly",
});

export const metadata: Metadata = {
  title: "Calm Vault",
  description: "",
};

const sideBarLinks = [
  {
    icon: "/physio-therapist.svg",
    activeIcon: "/physio-therapist-active.svg",
    title: "Sessions",
    routePath: "/sessions",
  },
  {
    icon: "/chat-icon.svg",
    activeIcon: "/chat-active-icon.svg",
    title: "Chats",
    routePath: "/therapist-chats",
  },
  {
    icon: "/earnings-icon.png",
    activeIcon: "/earnings-active-icon.png",
    title: "Earnings",
    routePath: "/earnings",
  },
  {
    icon: "/rep-score-icon.png",
    activeIcon: "/rep-score-active-icon.png",
    title: "Reputation score",
    routePath: "/reputation-score",
  },
  {
    icon: "/calendar-icon.svg",
    activeIcon: "/calendar-active-icon.svg",
    title: "Calendar",
    routePath: "/therapist-calender",
  },
  {
    icon: "/dao-gov-icon.png",
    activeIcon: "/dao-gov-active-icon.png",
    title: "DAO Governance",
    routePath: "/dao-governance",
  },
  {
    icon: "/settings-icon.svg",
    activeIcon: "/settings-active-icon.svg",
    title: "Settings",
    routePath: "/therapist-settings",
  },
  {
    icon: "/profile-icon.svg",
    activeIcon: "/profile-active-icon.svg",
    title: "Profile",
    routePath: "/therapist-profile",
  },
];

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${poly.variable} antialiased bg-sidebar-bg`}
    >
      <SidebarProvider>
        <AppSidebar sideBarLinks={sideBarLinks} />
        <main className="w-full bg-sidebar-bg">{children}</main>
      </SidebarProvider>
    </div>
  );
}
