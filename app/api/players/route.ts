import { type NextRequest, NextResponse } from "next/server"
import { getPlayers, addPlayer } from "@/lib/players-store"

export async function GET() {
  try {
    const players = await getPlayers()
    return NextResponse.json(players)
  } catch (error) {
    console.error("[v0] GET error:", error)
    return NextResponse.json({ error: "Failed to fetch players" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newPlayer = {
      id: Date.now().toString(),
      ...body,
    }

    await addPlayer(newPlayer)
    return NextResponse.json(newPlayer, { status: 201 })
  } catch (error) {
    console.error("[v0] POST error:", error)
    return NextResponse.json({ error: "Failed to add player" }, { status: 500 })
  }
}
