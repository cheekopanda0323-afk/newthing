"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export function Header() {
  const pathname = usePathname()
  const isAdminPath = pathname.includes("cheekoissogood0324")

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">⚔️</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">AliveTierList</h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/rankings" className="text-muted-foreground hover:text-foreground transition">
            Rankings
          </Link>
          <a
            href="https://discord.gg/RS2whNU29e"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Discord
          </a>
          {isAdminPath && <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Admin</span>}
        </nav>
      </div>
    </header>
  )
}
