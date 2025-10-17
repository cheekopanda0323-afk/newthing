import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const PLAYERS_KEY = "players"

export async function getPlayers() {
  try {
    const data = await redis.get(PLAYERS_KEY)
    if (!data) {
      return []
    }
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("[v0] Error getting players from Redis:", error)
    return []
  }
}

export async function setPlayers(players: any[]) {
  try {
    await redis.set(PLAYERS_KEY, JSON.stringify(players))
    return players
  } catch (error) {
    console.error("[v0] Error setting players in Redis:", error)
    throw error
  }
}

export async function addPlayer(player: any) {
  try {
    const players = await getPlayers()
    players.push(player)
    await redis.set(PLAYERS_KEY, JSON.stringify(players))
    return player
  } catch (error) {
    console.error("[v0] Error adding player to Redis:", error)
    throw error
  }
}

export async function updatePlayer(id: string, data: any) {
  try {
    const players = await getPlayers()
    const index = players.findIndex((p) => p.id === id)
    if (index === -1) return null
    players[index] = { ...players[index], ...data }
    await redis.set(PLAYERS_KEY, JSON.stringify(players))
    return players[index]
  } catch (error) {
    console.error("[v0] Error updating player in Redis:", error)
    throw error
  }
}

export async function deletePlayer(id: string) {
  try {
    const players = await getPlayers()
    const index = players.findIndex((p) => p.id === id)
    if (index === -1) return false
    players.splice(index, 1)
    await redis.set(PLAYERS_KEY, JSON.stringify(players))
    return true
  } catch (error) {
    console.error("[v0] Error deleting player from Redis:", error)
    throw error
  }
}
