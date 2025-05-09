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
    weight: ['400'],
    style: ['normal', 'italic'],
    subsets: ["latin"],
    variable: "--font-poly",
});

export const metadata: Metadata = {
    title: "Calm Vault",
    description: "",
};

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
                <AppSidebar />
                <main className="w-full bg-sidebar-bg" >
                    {/* /> */}
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}