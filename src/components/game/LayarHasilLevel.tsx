import { useEffect } from 'react'
import { MaskotSegitiga } from './Illustrations'
import { playFanfare, playCoin, playPop } from '../../utils/audio'

interface LayarHasilLevelProps {
  levelNumber?: number
  namaLevel?: string
  skorTotal: number
  koinTotal: number
  xpTotal: number
  jawabanBenar: number
  totalSoal: number
  onLanjutkan: () => void
  onKembaliKePeta?: () => void
  onUlangi: () => void
  sfxEnabled?: boolean
}

export default function LayarHasilLevel({
  levelNumber = 1,
  namaLevel = 'Pulau Bentuk',
  skorTotal,
  koinTotal,
  xpTotal,
  jawabanBenar,
  totalSoal,
  onLanjutkan,
  onKembaliKePeta,
  onUlangi,
  sfxEnabled = true,
}: LayarHasilLevelProps) {
  useEffect(() => {
    playFanfare(sfxEnabled)
  }, [sfxEnabled])

  // Hitung bintang berdasarkan skor (3 bintang jika >= 400, 2 bintang >= 250, 1 bintang < 250)
  const starsCount = skorTotal >= 400 ? 3 : skorTotal >= 250 ? 2 : 1

  return (
    <div className="layar-game-flow layar-hasil-level">
      {/* 1. CONFETTI CELEBRATION STREAMERS */}
      <div className="confetti-container">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className={`confetti-piece c-${(i % 6) + 1}`}
            style={{
              left: `${(i / 24) * 100}%`,
              animationDelay: `${(i % 5) * 0.25}s`,
            }}
          />
        ))}
      </div>

      <div className="victory-content-scrollable">
        {/* 2. THREE BIG 3D GLOWING GOLDEN STARS */}
        <div className="victory-stars-row">
          <span className={`victory-star star-1 ${starsCount >= 1 ? 'earned' : 'locked'}`}>
            ⭐
          </span>
          <span className={`victory-star star-center star-2 ${starsCount >= 2 ? 'earned' : 'locked'}`}>
            ⭐
          </span>
          <span className={`victory-star star-3 ${starsCount >= 3 ? 'earned' : 'locked'}`}>
            ⭐
          </span>
        </div>

        {/* 3. RIBBON BANNER: "Level X Selesai!" */}
        <div className="victory-ribbon-banner">
          <div className="ribbon-center">
            <h2>Level {levelNumber} Selesai!</h2>
            <span className="ribbon-subtext">{namaLevel}</span>
          </div>
        </div>

        {/* 4. CELEBRATING JUMPING MASCOT */}
        <div className="victory-mascot-wrapper">
          <MaskotSegitiga pose="senang" size={110} />
        </div>

        {/* 5. WHITE STATS SUMMARY CARD */}
        <div className="victory-stats-card">
          <div className="stats-grid-row">
            <div className="stat-item-box">
              <span className="stat-badge-icon">⭐</span>
              <div className="stat-text-col">
                <span className="stat-label">Skor</span>
                <strong className="stat-value">{skorTotal}</strong>
              </div>
            </div>

            <div className="stat-item-box">
              <span className="stat-badge-icon">🟡</span>
              <div className="stat-text-col">
                <span className="stat-label">Koin</span>
                <strong className="stat-value highlight-koin">+{koinTotal}</strong>
              </div>
            </div>
          </div>

          <div className="stats-grid-row">
            <div className="stat-item-box">
              <span className="stat-badge-icon">🟣</span>
              <div className="stat-text-col">
                <span className="stat-label">XP</span>
                <strong className="stat-value highlight-xp">+{xpTotal}</strong>
              </div>
            </div>

            <div className="stat-item-box wide">
              <span className="stat-badge-icon">📝</span>
              <div className="stat-text-col">
                <span className="stat-label">Jawaban Benar</span>
                <strong className="stat-value green-badge">
                  ✅ {jawabanBenar} benar / {totalSoal}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. ACTION BUTTONS: Lanjutkan, Peta, & Ulangi */}
      <div className="victory-action-buttons">
        <button
          className="btn-lanjutkan-hijau"
          onClick={() => {
            playCoin(sfxEnabled)
            onLanjutkan()
          }}
        >
          {levelNumber < 6 ? `Lanjut ke Level ${levelNumber + 1} ➔` : '🏆 Selesai & Ke Peta'}
        </button>

        <div className="victory-secondary-row">
          {onKembaliKePeta && (
            <button
              className="btn-peta-biru"
              onClick={() => {
                playPop(sfxEnabled)
                onKembaliKePeta()
              }}
            >
              🗺️ Peta Level
            </button>
          )}

          <button
            className="btn-ulangi-putih"
            onClick={() => {
              playPop(sfxEnabled)
              onUlangi()
            }}
          >
            🔄 Ulangi
          </button>
        </div>
      </div>
    </div>
  )
}
