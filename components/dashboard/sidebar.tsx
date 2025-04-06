"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, BookOpen, Home, MessageSquare, PieChart, Settings, User } from "lucide-react"

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  title: string
}

function SidebarLink({ href, icon, title }: SidebarLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
      )}
    >
      {icon}
      {title}
    </Link>
  )
}

export function Sidebar() {
  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            <SidebarLink href="/dashboard" icon={<Home className="h-4 w-4" />} title="Dashboard" />
            <SidebarLink href="https://app.inciteai.com/chat" icon={<MessageSquare className="h-4 w-4" />} title="AI Assistant" />
            <SidebarLink href="/dashboard/investments" icon={<PieChart className="h-4 w-4" />} title="Investments" />
            <SidebarLink href="/dashboard/market" icon={<BarChart3 className="h-4 w-4" />} title="Market Insights" />
            <SidebarLink href="/dashboard/learn" icon={<BookOpen className="h-4 w-4" />} title="Learn" />
            <SidebarLink href="/dashboard/profile" icon={<User className="h-4 w-4" />} title="Profile" />
            <SidebarLink href="/dashboard/settings" icon={<Settings className="h-4 w-4" />} title="Settings" />
          </nav>
        </div>
      </div>
    </div>
  ) 
}

