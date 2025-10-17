"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { GamemodeSelector } from "@/components/gamemode-selector"
import { TierList } from "@/components/tier-list"
import { PlayerForm } from "@/components/player-form"
import { SearchResults } from "@/components/search-results"
import { SearchBar } from "@/components/search-bar"
import { PlayerEditDialog } from "@/components/player-edit-dialog"

interface Player {
  id: string
  name: string
  username: string
  tier: string
  gamemode: string
  points: number
}

export default function AdminPage() {
  const params = useParams()
  const isAdminPath = params.slug === "cheekoissogood0324"

  const [players, setPlayers] = useState<Player[]>([])
  const [gamemode, setGamemode] = useState<"SMP" | "UHC" | "NETH" | "Crystal" | "Sword">("SMP")
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch players
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players")
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setPlayers(data)
      } catch (error) {
        console.error("Failed to fetch players:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
    const interval = setInterval(fetchPlayers, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleAddPlayer = async (data: any) => {
    try {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, gamemode }),
      })
      if (!response.ok) throw new Error("Failed to add player")
      const newPlayer = await response.json()
      setPlayers([...players, newPlayer])
      setShowForm(false)
    } catch (error) {
      console.error("Failed to add player:", error)
    }
  }

  const handleDeletePlayer = async (id: string) => {
    try {
      const response = await fetch(`/api/players/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")
      setPlayers(players.filter((p) => p.id !== id))
      setSelectedPlayer(null)
    } catch (error) {
      console.error("Failed to delete player:", error)
    }
  }

  const handleUpdatePlayer = async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/players/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error("Failed to update")
      const updated = await response.json()
      setPlayers(players.map((p) => (p.id === id ? updated : p)))
      setEditDialogOpen(false)
      setSelectedPlayer(null)
    } catch (error) {
      console.error("Failed to update player:", error)
    }
  }

  const filteredPlayers = players.filter((p) => p.gamemode === gamemode)

  const searchResults = searchQuery.trim()
    ? players.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.username.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  if (!isAdminPath) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Access denied</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h2>
          <p className="text-muted-foreground">Manage players and tiers</p>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition-colors"
          >
            + Add Player
          </button>
          <button
            onClick={() => {
              if (selectedPlayer) {
                setEditDialogOpen(true)
              }
            }}
            disabled={!selectedPlayer}
            className={`font-semibold px-6 py-2 rounded-md transition-colors ${
              selectedPlayer
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            Update
          </button>
          <button
            onClick={() => {
              if (selectedPlayer) {
                if (confirm(`Remove ${selectedPlayer.name}?`)) {
                  handleDeletePlayer(selectedPlayer.id)
                }
              }
            }}
            disabled={!selectedPlayer}
            className={`font-semibold px-6 py-2 rounded-md transition-colors ${
              selectedPlayer ? "bg-red-700 hover:bg-red-800 text-white" : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
          >
            Remove
          </button>
          {selectedPlayer && (
            <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/30 rounded-lg">
              <img
                src={`https://mc-heads.net/avatar/${selectedPlayer.username}/32`}
                alt={selectedPlayer.name}
                className="w-8 h-8 rounded"
              />
              <span className="text-sm font-medium text-foreground">{selectedPlayer.name}</span>
            </div>
          )}
        </div>

        {/* Add Player Form */}
        {showForm && <PlayerForm onSubmit={handleAddPlayer} onCancel={() => setShowForm(false)} />}

        {/* Search Bar */}
        <SearchBar onSearch={setSearchQuery} />

        {/* Search Results */}
        {searchResults.length > 0 && (
          <SearchResults
            results={searchResults}
            allPlayers={players}
            onDelete={handleDeletePlayer}
            onUpdate={handleUpdatePlayer}
          />
        )}

        {/* Gamemode Selector */}
        <GamemodeSelector gamemode={gamemode} onGamemodeChange={setGamemode} />

        {/* Tier List */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading players...</div>
        ) : (
          <TierList players={filteredPlayers} onDelete={handleDeletePlayer} onUpdate={handleUpdatePlayer} />
        )}

        {/* Edit Dialog */}
        {selectedPlayer && (
          <PlayerEditDialog
            player={selectedPlayer}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onUpdate={handleUpdatePlayer}
          />
        )}
      </main>
    </div>
  )
}
