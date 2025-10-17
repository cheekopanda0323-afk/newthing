"use client"

import { Button } from "@/components/ui/button"
import { GAMEMODE_ICONS, GAMEMODE_COLORS } from "./minecraft-icons"

const GAMEMODES = [
  { id: "SMP", label: "SMP" },
  { id: "UHC", label: "UHC" },
  { id: "NETH", label: "NETH" },
  { id: "Crystal", label: "Crystal" },
  { id: "Sword", label: "Sword" },
] as const

interface GamemodeSelectorProps {
  gamemode: "SMP" | "UHC" | "NETH" | "Crystal" | "Sword"
  onGamemodeChange: (gamemode: "SMP" | "UHC" | "NETH" | "Crystal" | "Sword") => void
}

export function GamemodeSelector({ gamemode, onGamemodeChange }: GamemodeSelectorProps) {
  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
      {GAMEMODES.map((mode) => (
        <Button
          key={mode.id}
          onClick={() => onGamemodeChange(mode.id as any)}
          variant={gamemode === mode.id ? "default" : "outline"}
          className={`gap-2 whitespace-nowrap ${
            gamemode === mode.id ? "bg-primary text-primary-foreground" : "border-border hover:bg-card"
          }`}
        >
          <span className={GAMEMODE_COLORS[mode.id as keyof typeof GAMEMODE_COLORS]}>
            {GAMEMODE_ICONS[mode.id as keyof typeof GAMEMODE_ICONS]}
          </span>
          {mode.label}
        </Button>
      ))}
    </div>
  )
}
