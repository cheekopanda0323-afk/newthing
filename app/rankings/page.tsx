"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { GamemodeSelector } from "@/components/gamemode-selector"
import { TierList } from "@/components/tier-list"

const STORAGE_KEY = "aliveTierListPlayers"

export default function RankingsPage() {
  const [gamemode, setGamemode] = useState<"SMP" | "UHC" | "NETH" | "Crystal" | "Sword">("SMP")
  const [players, setPlayers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players")
        const data = await response.json()
        setPlayers(data)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch (error) {
        console.error("Failed to fetch players:", error)
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          setPlayers(JSON.parse(stored))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
    const interval = setInterval(fetchPlayers, 2000)
    return () => clearInterval(interval)
  }, [])

  const filteredPlayers = players.filter((p) => p.gamemode === gamemode)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Rankings</h1>
          <p className="text-muted-foreground">View tier lists by gamemode</p>
        </div>

        <GamemodeSelector gamemode={gamemode} onGamemodeChange={setGamemode} />

        <TierList players={filteredPlayers} />
      </main>
    </div>
  )
}
