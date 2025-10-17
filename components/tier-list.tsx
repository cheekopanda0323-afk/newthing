import { PlayerCard } from "./player-card"

const TIERS = ["HT1", "HT2", "HT3", "HT4", "HT5", "LT1", "LT2", "LT3", "LT4", "LT5"] as const

interface Player {
  id: string
  name: string
  username: string
  tier: string
  gamemode: string
  points: number
}

interface TierListProps {
  players: Player[]
  onDelete?: (id: string) => void
  onUpdate?: (id: string, data: any) => void
}

export function TierList({ players, onDelete, onUpdate }: TierListProps) {
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
    <div className="space-y-4">
      {TIERS.map((tier) => {
        const tierPlayers = players.filter((p) => p.tier === tier)
        return (
          <div key={tier} className={`border rounded-lg p-4 ${getTierColor(tier)}`}>
            <div className="flex items-start gap-4">
              <div className="w-24 flex-shrink-0">
                <div className="text-xl font-bold text-primary">{tier}</div>
                <div className="text-xs text-muted-foreground">{getTierLabel(tier)}</div>
              </div>
              <div className="flex-1">
                {tierPlayers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {tierPlayers.map((player) => (
                      <PlayerCard key={player.id} player={player} onDelete={onDelete} onUpdate={onUpdate} />
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm py-4">No players in this tier</div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
