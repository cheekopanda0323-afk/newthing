"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GAMEMODE_ICONS, GAMEMODE_COLORS } from "./minecraft-icons"

interface Player {
  id: string
  name: string
  username: string
  tier: string
  gamemode: string
  points: number
}

interface PlayerDetailModalProps {
  username: string
  players: Player[]
  onClose: () => void
}

export function PlayerDetailModal({ username, players, onClose }: PlayerDetailModalProps) {
  const playerData = players.filter((p) => p.username === username)
  const firstPlayer = playerData[0]

  if (!firstPlayer) return null

  const getTierColor = (tier: string) => {
    if (tier.startsWith("HT")) {
      return "bg-red-950/40 border-red-700/60"
    }
    return "bg-slate-900/30 border-slate-700/40"
  }

  const totalPoints = playerData.reduce((sum, p) => sum + p.points, 0)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl max-w-md w-full overflow-hidden">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-700/50 hover:bg-slate-700 flex items-center justify-center transition"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="flex justify-center -mt-8 mb-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-red-600 bg-background flex items-center justify-center">
              <img
                src={`https://mc-heads.net/avatar/${username}/128`}
                alt={firstPlayer.name}
                className="w-full h-full rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-primary mb-1">{firstPlayer.name}</h2>
          <p className="text-sm text-muted-foreground">{username}</p>
        </div>

        <div className="bg-background/50 mx-4 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">POSITION</p>
                <p className="font-bold text-foreground">OVERALL</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-600">{totalPoints}</p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <p className="text-sm font-bold text-muted-foreground mb-3">TIERS</p>
          <div className="flex gap-2 flex-wrap">
            {["SMP", "UHC", "NETH", "Crystal", "Sword"].map((gamemode) => {
              const playerInGamemode = playerData.find((p) => p.gamemode === gamemode)
              return (
                <div
                  key={gamemode}
                  className={`flex flex-col items-center justify-center w-16 h-20 rounded-lg border ${getTierColor(playerInGamemode?.tier || "LT5")}`}
                >
                  <span className={`w-6 h-6 mb-1 ${GAMEMODE_COLORS[gamemode as keyof typeof GAMEMODE_COLORS]}`}>
                    {GAMEMODE_ICONS[gamemode as keyof typeof GAMEMODE_ICONS]}
                  </span>
                  <span className="text-xs font-bold text-primary">{playerInGamemode?.tier || "N/A"}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="px-4 mb-6 space-y-2">
          {playerData.map((player) => (
            <div key={player.gamemode} className={`rounded-lg p-3 border ${getTierColor(player.tier)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 ${GAMEMODE_COLORS[player.gamemode as keyof typeof GAMEMODE_COLORS]}`}>
                    {GAMEMODE_ICONS[player.gamemode as keyof typeof GAMEMODE_ICONS]}
                  </span>
                  <span className="font-semibold text-foreground">{player.gamemode}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{player.tier}</p>
                  <p className="text-xs text-muted-foreground">{player.points} pts</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 pb-4">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
