"use client"

export function MinecraftIcons() {
  return null
}

export const GAMEMODE_ICONS = {
  SMP: <img src="/icons/smp-kit.jpg" alt="SMP Kit" className="w-5 h-5 object-contain" />,
  UHC: <img src="/icons/uhc-heart.jpg" alt="UHC Heart" className="w-5 h-5 object-contain" />,
  NETH: <img src="/icons/netherite-pot.png" alt="Netherite Pot" className="w-5 h-5 object-contain" />,
  Crystal: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2L2 8v8l10 6 10-6V8l-10-6zm0 2.5L20 8v6l-8 4.8-8-4.8V8l8-3.5z" />
    </svg>
  ),
  Sword: <span className="text-lg">🗡️</span>,
}

export const GAMEMODE_COLORS = {
  SMP: "text-amber-500",
  UHC: "text-red-500",
  NETH: "text-orange-500",
  Crystal: "text-cyan-400",
  Sword: "text-purple-500",
}
