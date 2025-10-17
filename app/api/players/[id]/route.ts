import { type NextRequest, NextResponse } from "next/server"
import { updatePlayer, deletePlayer } from "@/lib/players-store"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    const updated = await updatePlayer(params.id, body)

    if (!updated) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error("[v0] PUT error:", error)
    return NextResponse.json({ error: "Failed to update player" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deletePlayer(params.id)

    if (!deleted) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete player" }, { status: 500 })
  }
}
