import { useState, useEffect } from 'react'
import LayarDetailLevel from './LayarDetailLevel'
import LayarEksplorasi from './LayarEksplorasi'
import LayarTantanganSoal from './LayarTantanganSoal'
import LayarHasilLevel from './LayarHasilLevel'
import ModalJeda from './ModalJeda'
import { LEVEL_1_DATA, type DetailLevelData } from '../../data/levelData'
import type { PlayerData, GameSettings } from '../../data/gameState'

export type FlowScreen = 'detail' | 'eksplorasi' | 'soal' | 'hasil'

interface PetualanganFlowProps {
  levelData?: DetailLevelData
  player: PlayerData
  setPlayer: React.Dispatch<React.SetStateAction<PlayerData>>
  settings: GameSettings
  onKembaliKePeta: () => void
  onSelesaiDanLanjut?: (nextLevelNumber?: number) => void
}

export default function PetualanganFlow({
  levelData = LEVEL_1_DATA,
  player: _player,
  setPlayer,
  settings,
  onKembaliKePeta,
  onSelesaiDanLanjut,
}: PetualanganFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<FlowScreen>('detail')
  const [isPaused, setIsPaused] = useState(false)

  // Tracking game progress across screens
  const [skorEksplorasi, setSkorEksplorasi] = useState(0)
  const [koinEksplorasi, setKoinEksplorasi] = useState(0)

  // Final victory stats
  const [finalStats, setFinalStats] = useState({
    skorTotal: 460,
    koinTotal: 100,
    xpTotal: 100,
    jawabanBenar: 5,
    totalSoal: 5,
    sisaNyawa: 3,
  })

  // Reset when level changes
  useEffect(() => {
    setCurrentScreen('detail')
    setIsPaused(false)
    setSkorEksplorasi(0)
    setKoinEksplorasi(0)
  }, [levelData.levelNumber])

  // 1. From Detail Level -> Start Exploration
  const handleMulaiGame = () => {
    setCurrentScreen('eksplorasi')
  }

  // 2. From Exploration -> Start Quiz
  const handleSelesaiEksplorasi = (stats: {
    koinDikumpulkan: number
    bentukDikumpulkan: number
    skorEksplorasi: number
  }) => {
    setSkorEksplorasi(stats.skorEksplorasi)
    setKoinEksplorasi(stats.koinDikumpulkan * 10)
    setCurrentScreen('soal')
  }

  // 3. From Quiz -> View Victory Results
  const handleSelesaiKuis = (stats: {
    skorTotal: number
    jawabanBenarCount: number
    totalSoal: number
    koinTotal: number
    xpTotal: number
    sisaNyawa: number
  }) => {
    setFinalStats({
      skorTotal: stats.skorTotal,
      koinTotal: stats.koinTotal,
      xpTotal: stats.xpTotal,
      jawabanBenar: stats.jawabanBenarCount,
      totalSoal: stats.totalSoal,
      sisaNyawa: stats.sisaNyawa,
    })

    // Update global player state (XP, Koin, Level Terbuka, Level Selesai)
    setPlayer((prev) => {
      const nextUnlocked = Math.max(prev.levelTerbuka, levelData.levelNumber + 1)
      const isAlreadyCompleted = prev.levelSelesai.includes(levelData.levelNumber)
      const nextSelesai = isAlreadyCompleted
        ? prev.levelSelesai
        : [...prev.levelSelesai, levelData.levelNumber]

      return {
        ...prev,
        bintang: prev.bintang + 3,
        koin: prev.koin + stats.koinTotal,
        xp: prev.xp + stats.xpTotal,
        skorKuis: prev.skorKuis + stats.jawabanBenarCount,
        levelTerbuka: nextUnlocked,
        levelSelesai: nextSelesai,
      }
    })

    setCurrentScreen('hasil')
  }

  // 4. From Results -> Continue to Next Level or Map
  const handleLanjutkan = () => {
    const nextLevelNum = levelData.levelNumber + 1
    if (nextLevelNum <= 6 && onSelesaiDanLanjut) {
      onSelesaiDanLanjut(nextLevelNum)
    } else {
      onKembaliKePeta()
    }
  }

  // 5. From Results or Pause -> Restart current level
  const handleUlangi = () => {
    setIsPaused(false)
    setSkorEksplorasi(0)
    setKoinEksplorasi(0)
    setCurrentScreen('detail')
  }

  return (
    <div className="petualangan-flow-container">
      {/* SCREEN 2: DETAIL LEVEL */}
      {currentScreen === 'detail' && (
        <LayarDetailLevel
          levelData={levelData}
          onKembali={onKembaliKePeta}
          onMulai={handleMulaiGame}
          sfxEnabled={settings.sfx}
        />
      )}

      {/* SCREEN 3: EKSPLORASI & KUMPULKAN */}
      {currentScreen === 'eksplorasi' && (
        <LayarEksplorasi
          levelData={levelData}
          onSelesaiEksplorasi={handleSelesaiEksplorasi}
          onJeda={() => setIsPaused(true)}
          sfxEnabled={settings.sfx}
        />
      )}

      {/* SCREEN 4: SOAL / TANTANGAN */}
      {currentScreen === 'soal' && (
        <LayarTantanganSoal
          levelData={levelData}
          skorEksplorasi={skorEksplorasi}
          koinEksplorasi={koinEksplorasi}
          onSelesaiKuis={handleSelesaiKuis}
          onJeda={() => setIsPaused(true)}
          onKembaliKePeta={onKembaliKePeta}
          onUlangiLevel={handleUlangi}
          sfxEnabled={settings.sfx}
        />
      )}

      {/* SCREEN 5: HASIL LEVEL */}
      {currentScreen === 'hasil' && (
        <LayarHasilLevel
          levelNumber={levelData.levelNumber}
          namaLevel={levelData.namaLevel}
          skorTotal={finalStats.skorTotal}
          koinTotal={finalStats.koinTotal}
          xpTotal={finalStats.xpTotal}
          jawabanBenar={finalStats.jawabanBenar}
          totalSoal={finalStats.totalSoal}
          sisaNyawa={finalStats.sisaNyawa}
          onLanjutkan={handleLanjutkan}
          onKembaliKePeta={onKembaliKePeta}
          onUlangi={handleUlangi}
          sfxEnabled={settings.sfx}
        />
      )}

      {/* PAUSE MODAL */}
      {isPaused && (
        <ModalJeda
          onLanjut={() => setIsPaused(false)}
          onUlangi={handleUlangi}
          onKeluar={() => {
            setIsPaused(false)
            onKembaliKePeta()
          }}
          sfxEnabled={settings.sfx}
        />
      )}
    </div>
  )
}
