"use client"

import { Sparkles, Users, Trophy, Zap } from "lucide-react"

export function InfoSection() {
  return (
    <div className="mb-12 bg-gradient-to-r from-red-950/20 to-red-900/10 border border-red-900/30 rounded-xl p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-red-600" />
          <h2 className="text-3xl font-bold text-foreground">Welcome to AliveTierList</h2>
        </div>

        <p className="text-lg text-muted-foreground mb-8">
          The ultimate Minecraft player ranking system. Track your performance across multiple gamemodes and compete
          with the best players in the community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-600/20 border border-red-600/40">
                <Trophy className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">5 Gamemodes</h3>
              <p className="text-sm text-muted-foreground">Compete in SMP, UHC, NETH, Crystal, and Sword</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-600/20 border border-red-600/40">
                <Users className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Global Rankings</h3>
              <p className="text-sm text-muted-foreground">See where you stand against other players</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-600/20 border border-red-600/40">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Real-time Updates</h3>
              <p className="text-sm text-muted-foreground">Rankings update instantly as players compete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
