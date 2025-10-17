"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { SearchResults } from "@/components/search-results"
import { OverallLeaderboard } from "@/components/overall-leaderboard"
import { InfoSection } from "@/components/info-section"

const STORAGE_KEY = "aliveTierListPlayers"

export default function Home() {
  const [players, setPlayers] = useState<any[]>([])
  const [searchResults, setSearchResults] = useState<any[]>([])
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">AliveTierList</h1>
            <p className="text-muted-foreground">Minecraft Player Rankings</p>
          </div>
        </div>

        <div className="mb-8">
          <SearchBar players={players} onSearch={setSearchResults} />
        </div>

        {searchResults.length > 0 && <SearchResults results={searchResults} allPlayers={players} />}

        <InfoSection />

        <OverallLeaderboard players={players} />
      </main>
    </div>
  )
}
