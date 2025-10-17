"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PlayerFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function PlayerForm({ onSubmit, onCancel }: PlayerFormProps) {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [tier, setTier] = useState("HT1")
  const [points, setPoints] = useState("0")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && username.trim()) {
      onSubmit({
        name,
        username,
        tier,
        points: Number.parseInt(points),
      })
      setName("")
      setUsername("")
      setTier("HT1")
      setPoints("0")
    }
  }

  const tierOptions = ["HT1", "HT2", "HT3", "HT4", "HT5", "LT1", "LT2", "LT3", "LT4", "LT5"]

  return (
    <Card className="bg-card border-border p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Player Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Display name"
              className="bg-input border-border"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Minecraft Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Minecraft username"
              className="bg-input border-border"
            />
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
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Add Player
          </Button>
        </div>
      </form>
    </Card>
  )
}
