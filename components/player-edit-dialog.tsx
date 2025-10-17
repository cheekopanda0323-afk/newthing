"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Player {
  id: string
  name: string
  username: string
  tier: string
  gamemode: string
  points: number
}

interface PlayerEditDialogProps {
  player: Player
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (id: string, data: any) => void
}

export function PlayerEditDialog({ player, open, onOpenChange, onUpdate }: PlayerEditDialogProps) {
  const [name, setName] = useState(player.name)
  const [username, setUsername] = useState(player.username)
  const [tier, setTier] = useState(player.tier)
  const [points, setPoints] = useState(player.points.toString())

  const handleSubmit = () => {
    onUpdate(player.id, {
      name,
      username,
      tier,
      points: Number.parseInt(points),
    })
    onOpenChange(false)
  }

  const tierOptions = ["HT1", "HT2", "HT3", "HT4", "HT5", "LT1", "LT2", "LT3", "LT4", "LT5"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Player</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Player Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-input border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Minecraft Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} className="bg-input border-border" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Tier</label>
            <Select value={tier} onValueChange={setTier}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tierOptions.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Points</label>
            <Input
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="bg-input border-border"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90" onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
