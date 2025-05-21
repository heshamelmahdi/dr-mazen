import { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  
  // Redirect unauthenticated users to login
  if (!session) {
    redirect("/login");
  }
  
  // Check if user is admin
  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <Link href="/dashboard" className="text-xl font-bold text-gray-800">
              Admin Portal
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto py-4 px-3">
            <nav className="flex-1 space-y-1">
              <NavItem href="/dashboard" exact>
                Dashboard
              </NavItem>
              <NavItem href="/dashboard/user-management">
                User Management
              </NavItem>
              <NavItem href="/dashboard/program">
                Program Videos
              </NavItem>
              <NavItem href="/dashboard/recipes">
                Recipes
              </NavItem>
              <NavItem href="/dashboard/qna">
                Q&A
              </NavItem>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b">
          <div className="flex items-center px-4 h-16">
            <Link href="/dashboard" className="text-xl font-bold text-gray-800">
              Admin Portal
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex overflow-x-auto md:hidden border-b bg-white py-3 px-4 space-x-4">
          <NavPill href="/dashboard" exact>
            Dashboard
          </NavPill>
          <NavPill href="/dashboard/user-management">
            Users
          </NavPill>
          <NavPill href="/dashboard/program">
            Videos
          </NavPill>
          <NavPill href="/dashboard/recipes">
            Recipes
          </NavPill>
          <NavPill href="/dashboard/qna">
            Q&A
          </NavPill>
        </div>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  href: string;
  children: ReactNode;
  exact?: boolean;
}

function NavItem({ href, children, exact = false }: NavItemProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 group",
        {
          "bg-gray-100 text-gray-900 font-medium": 
            exact ? href === "/dashboard" : href.startsWith("/dashboard")
        }
      )}
    >
      {children}
    </Link>
  );
}

function NavPill({ href, children, exact = false }: NavItemProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "px-4 py-2 rounded-full text-sm whitespace-nowrap",
        {
          "bg-gray-100 text-gray-900 font-medium": 
            exact ? href === "/dashboard" : href.startsWith("/dashboard"),
          "text-gray-600 hover:text-gray-900": 
            !(exact ? href === "/dashboard" : href.startsWith("/dashboard"))
        }
      )}
    >
      {children}
    </Link>
  );
}
