"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

interface Player {
  id: string
  name: string
  username: string
  tier: string
  gamemode: string
  points: number
}

interface SearchBarProps {
  players: Player[]
  onSearch: (results: Player[]) => void
}

export function SearchBar({ players, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim() === "") {
      onSearch([])
    } else {
      const results = players.filter(
        (player) =>
          player.name.toLowerCase().includes(value.toLowerCase()) ||
          player.username.toLowerCase().includes(value.toLowerCase()),
      )
      onSearch(results)
    }
  }

  const handleClear = () => {
    setQuery("")
    onSearch([])
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search player IGN..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
