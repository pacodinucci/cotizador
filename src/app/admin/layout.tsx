import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/global/admin-sidebar";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { ThemeProvider } from "@/components/global/theme-provider";
import { ModeToggle } from "@/components/global/mode-toggle";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 h-screen flex flex-col overflow-hidden">
            <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-2">
              <SidebarTrigger />
              <ModeToggle />
            </div>

            <main className="flex-1 overflow-auto main-content">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
