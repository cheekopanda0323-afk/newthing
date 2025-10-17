"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2 } from "lucide-react"
import { PlayerEditDialog } from "./player-edit-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Player {
  id: string
  name: string
  username: string
  tier: string
  gamemode: string
  points: number
}

interface PlayerCardProps {
  player: Player
  onDelete?: (id: string) => void
  onUpdate?: (id: string, data: any) => void
}

export function PlayerCard({ player, onDelete, onUpdate }: PlayerCardProps) {
  const [showEdit, setShowEdit] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const minecraftHeadUrl = `https://mc-heads.net/avatar/${player.username}/32`
  const isAdmin = onDelete && onUpdate

  const handleConfirmDelete = () => {
    onDelete?.(player.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-3 hover:border-primary/50 transition group">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 flex-1">
            <img
              src={minecraftHeadUrl || "/placeholder.svg"}
              alt={player.name}
              className="w-8 h-8 rounded"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate text-sm">{player.name}</p>
              <p className="text-xs text-muted-foreground">{player.points} pts</p>
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setShowEdit(true)}>
              <Edit2 className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>

      {isAdmin && <PlayerEditDialog player={player} open={showEdit} onOpenChange={setShowEdit} onUpdate={onUpdate!} />}

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Player</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold text-foreground">{player.name}</span>? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
