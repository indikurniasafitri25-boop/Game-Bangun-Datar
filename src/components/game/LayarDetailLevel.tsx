import { MaskotSegitiga } from './Illustrations'
import type { DetailLevelData } from '../../data/levelData'
import { playPop } from '../../utils/audio'

interface LayarDetailLevelProps {
  levelData: DetailLevelData
  onKembali: () => void
  onMulai: () => void
  sfxEnabled?: boolean
}

export default function LayarDetailLevel({
  levelData,
  onKembali,
  onMulai,
  sfxEnabled = true,
}: LayarDetailLevelProps) {
  return (
    <div className="layar-game-flow layar-detail-level">
      {/* Top Bar with Back button & Resources */}
      <div className="flow-top-bar">
        <button
          className="btn-circle-back"
          onClick={() => {
            playPop(sfxEnabled)
            onKembali()
          }}
          aria-label="Kembali ke Peta"
        >
          ‹
        </button>

        <div className="top-counters-group">
          {levelData.kesulitan && (
            <span className={`badge-kesulitan badge-${levelData.kesulitan.toLowerCase().replace(/\s+/g, '-')}`}>
              Tingkat: {levelData.kesulitan}
            </span>
          )}
          <div className="pill-counter coin-pill">
            <span className="pill-icon">🟡</span>
            <span className="pill-val">+{levelData.hadiahKoin}</span>
          </div>
        </div>
      </div>

      <div className="detail-level-body-scroll">
        {/* Level Header Banner: Wood Plank */}
        <div className="wood-banner-container">
          <div className="wood-plank">
            <h2>Level {levelData.levelNumber}</h2>
          </div>
          <div className="blue-sub-pill">
            <span>{levelData.namaLevel}</span>
          </div>
        </div>

        {/* Main Info Card */}
        <div className="detail-card-white">
          <div className="card-section-tujuan">
            <span className="label-tujuan">🎯 Target Belajar:</span>
            <p className="teks-tujuan">{levelData.tujuan}</p>
          </div>

          {/* Meta Info Pills */}
          <div className="meta-pills-row">
            <div className="meta-pill">
              <span className="meta-icon">⏱️</span>
              <span>{levelData.estimasiWaktu}</span>
            </div>
            <div className="meta-pill">
              <span className="meta-icon">📝</span>
              <span>{levelData.totalTantangan} tantangan</span>
            </div>
            <div className="meta-pill">
              <span className="meta-icon">🟣</span>
              <span>+{levelData.hadiahXp} XP</span>
            </div>
          </div>
        </div>

        {/* Center Character Scenery Illustration */}
        <div className="detail-hero-scenery">
          <div className="scenery-backdrop">
            <div className="castle-silhouette">🏰</div>
            <div className="clouds-floating c1" />
            <div className="clouds-floating c2" />
          </div>

          <div className="maskot-standing-hero">
            <MaskotSegitiga pose="jalan" size={120} />
          </div>
        </div>
      </div>

      {/* Big Action Button: Mulai */}
      <div className="detail-bottom-action">
        <button
          className="btn-mulai-kuning"
          onClick={() => {
            playPop(sfxEnabled)
            onMulai()
          }}
        >
          Mulai Petualangan 🚀
        </button>
      </div>
    </div>
  )
}
