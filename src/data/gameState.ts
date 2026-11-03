// Game State and Persistence
export interface PlayerData {
  nama: string
  avatar: string
  level: number
  xp: number
  maxXp: number
  bintang: number
  permata: number
  koin: number
  misiProgres: number
  misiTotal: number
  levelTerbuka: number
  levelSelesai: number[]
  skorKuis: number
  akurasi: number
}

export interface GameSettings {
  sfx: boolean
  bgm: boolean
  getaran: boolean
}

export const INITIAL_PLAYER: PlayerData = {
  nama: 'Rizki',
  avatar: 'boy1',
  level: 3,
  xp: 320,
  maxXp: 500,
  bintang: 120,
  permata: 45,
  koin: 460,
  misiProgres: 1,
  misiTotal: 3,
  levelTerbuka: 2,
  levelSelesai: [1],
  skorKuis: 18,
  akurasi: 95,
}

export const INITIAL_SETTINGS: GameSettings = {
  sfx: true,
  bgm: false,
  getaran: true,
}

const STORAGE_KEY_PLAYER = 'geo_adventure_player_v1'
const STORAGE_KEY_SETTINGS = 'geo_adventure_settings_v1'

export function loadPlayer(): PlayerData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PLAYER)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...INITIAL_PLAYER,
        ...parsed,
        levelTerbuka: Math.max(parsed.levelTerbuka ?? 2, 2),
        levelSelesai: parsed.levelSelesai && parsed.levelSelesai.length > 0 ? parsed.levelSelesai : [1],
        koin: parsed.koin ?? INITIAL_PLAYER.koin,
      }
    }
  } catch {
    // fallback
  }
  return INITIAL_PLAYER
}

export function savePlayer(player: PlayerData) {
  try {
    localStorage.setItem(STORAGE_KEY_PLAYER, JSON.stringify(player))
  } catch {
    // ignore
  }
}

export function loadSettings(): GameSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS)
    if (saved) {
      return { ...INITIAL_SETTINGS, ...JSON.parse(saved) }
    }
  } catch {
    // fallback
  }
  return INITIAL_SETTINGS
}

export function saveSettings(settings: GameSettings) {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings))
  } catch {
    // ignore
  }
}
