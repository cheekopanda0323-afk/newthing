"use client"

import { useState } from "react"
import { PlayerCard } from "./player-card"
import { PlayerDetailModal } from "./player-detail-modal"
import { GAMEMODE_ICONS, GAMEMODE_COLORS } from "./minecraft-icons"

interface Player {
  id: string
  name: string
  username: string
  tier: string
  gamemode: string
  points: number
}

interface SearchResultsProps {
  results: Player[]
  allPlayers: Player[]
  onDelete?: (id: string) => void
  onUpdate?: (id: string, data: any) => void
}

export function SearchResults({ results, allPlayers, onDelete, onUpdate }: SearchResultsProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)

  if (results.length === 0) {
    return null
  }

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      HT1: "bg-red-950/40 border-red-700/60",
      HT2: "bg-red-900/35 border-red-700/50",
      HT3: "bg-red-900/30 border-red-700/40",
      HT4: "bg-red-900/25 border-red-700/30",
      HT5: "bg-red-900/20 border-red-700/25",
      LT1: "bg-slate-900/30 border-slate-700/40",
      LT2: "bg-slate-900/25 border-slate-700/35",
      LT3: "bg-slate-900/20 border-slate-700/30",
      LT4: "bg-slate-900/15 border-slate-700/25",
      LT5: "bg-slate-900/10 border-slate-700/20",
    }
    return colors[tier] || "bg-slate-900/20 border-slate-700/30"
  }

  const getTierLabel = (tier: string) => {
    const labels: Record<string, string> = {
      HT1: "HIGH TIER 1",
      HT2: "HIGH TIER 2",
      HT3: "HIGH TIER 3",
      HT4: "HIGH TIER 4",
      HT5: "HIGH TIER 5",
      LT1: "LOW TIER 1",
      LT2: "LOW TIER 2",
      LT3: "LOW TIER 3",
      LT4: "LOW TIER 4",
      LT5: "LOW TIER 5",
    }
    return labels[tier] || tier
  }

  return (
    <>
      <div className="mb-8 border border-primary/30 rounded-lg p-6 bg-primary/5">
        <h2 className="text-xl font-bold text-primary mb-4">Search Results ({results.length})</h2>
        <div className="space-y-4">
          {results.map((player) => (
            <button
              key={player.id}
              onClick={() => setSelectedPlayer(player.username)}
              className={`w-full text-left border rounded-lg p-4 transition hover:border-primary/50 ${getTierColor(player.tier)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div>
                    <img
                      src={`https://mc-heads.net/avatar/${player.username}/48`}
                      alt={player.name}
                      className="w-12 h-12 rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-lg">{player.name}</p>
                    <p className="text-sm text-muted-foreground mb-1">{player.username}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-primary font-bold">
                        {player.tier} - {getTierLabel(player.tier)}
                      </span>
                      <span className="text-muted-foreground">{player.points} points</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <span className={`w-4 h-4 ${GAMEMODE_COLORS[player.gamemode as keyof typeof GAMEMODE_COLORS]}`}>
                          {GAMEMODE_ICONS[player.gamemode as keyof typeof GAMEMODE_ICONS]}
                        </span>
                        {player.gamemode}
                      </div>
                    </div>
                  </div>
                </div>
                {(onDelete || onUpdate) && <PlayerCard player={player} onDelete={onDelete} onUpdate={onUpdate} />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPlayer && (
        <PlayerDetailModal username={selectedPlayer} players={allPlayers} onClose={() => setSelectedPlayer(null)} />
      )}
    </>
  )
}
