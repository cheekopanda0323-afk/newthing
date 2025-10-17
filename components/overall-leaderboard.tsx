"use client"

import { useState } from "react"
import { Trophy } from "lucide-react"
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

interface OverallLeaderboardProps {
  players: Player[]
}

export function OverallLeaderboard({ players }: OverallLeaderboardProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)

  const playerStats = new Map<string, any>()

  players.forEach((player) => {
    if (!playerStats.has(player.username)) {
      playerStats.set(player.username, {
        id: player.id,
        name: player.name,
        username: player.username,
        totalPoints: 0,
        gamemodes: {},
      })
    }

    const stats = playerStats.get(player.username)
    stats.totalPoints += player.points
    stats.gamemodes[player.gamemode] = {
      tier: player.tier,
      points: player.points,
    }
  })

  const topPlayers = Array.from(playerStats.values())
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 5)

  const getTierColor = (tier: string) => {
    if (tier.startsWith("HT")) {
      return "text-red-400"
    }
    return "text-slate-400"
  }

  return (
    <>
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-red-600" />
          <h2 className="text-3xl font-bold text-foreground">Overall Rankings</h2>
        </div>

        <div className="space-y-3">
          {topPlayers.map((player, index) => (
            <button
              key={player.username}
              onClick={() => setSelectedPlayer(player.username)}
              className="w-full text-left bg-card border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-card/80 transition group"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{index + 1}</span>
                </div>

                <div className="flex-shrink-0">
                  <img
                    src={`https://mc-heads.net/avatar/${player.username}/64`}
                    alt={player.name}
                    className="w-16 h-16 rounded-lg border-2 border-red-600"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                </div>

                <div className="flex-1">
                  <p className="text-xl font-bold text-foreground group-hover:text-primary transition">{player.name}</p>
                  <p className="text-sm text-muted-foreground mb-2">{player.username}</p>

                  <div className="flex gap-2 flex-wrap">
                    {["SMP", "UHC", "NETH", "Crystal", "Sword"].map((gamemode) => {
                      const tierInfo = player.gamemodes[gamemode]
                      return (
                        <div
                          key={gamemode}
                          className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded text-xs"
                        >
                          <span className={`w-4 h-4 ${GAMEMODE_COLORS[gamemode as keyof typeof GAMEMODE_COLORS]}`}>
                            {GAMEMODE_ICONS[gamemode as keyof typeof GAMEMODE_ICONS]}
                          </span>
                          <span className={`font-bold ${getTierColor(tierInfo?.tier || "LT5")}`}>
                            {tierInfo?.tier || "N/A"}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <div className="text-2xl font-bold text-red-600">{player.totalPoints}</div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPlayer && (
        <PlayerDetailModal username={selectedPlayer} players={players} onClose={() => setSelectedPlayer(null)} />
      )}
    </>
  )
}
