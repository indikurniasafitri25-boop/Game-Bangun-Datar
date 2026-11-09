import { MaskotSegitiga } from './Illustrations'
import type { DetailLevelData } from '../../data/levelData'
import { playPop } from '../../utils/audio'

interface LayarDetailLevelProps {
  levelData: DetailLevelData
  onKembali: () => void
  onMulai: () => void
  sfxEnabled?: boolean
}

function ShapeTargetIcon({
  bentuk,
  warna,
  isOutline,
}: {
  bentuk: string
  warna: string
  isOutline?: boolean
}) {
  switch (bentuk) {
    case 'segitiga':
      return (
        <svg viewBox="0 0 100 90" width="48" height="44">
          <polygon
            points="50,8 94,82 6,82"
            fill={isOutline ? '#fff7ed' : warna}
            stroke={warna}
            strokeWidth={isOutline ? 5 : 0}
          />
        </svg>
      )
    case 'persegi':
      return (
        <svg viewBox="0 0 100 100" width="44" height="44">
          <rect
            x="12"
            y="12"
            width="76"
            height="76"
            rx="6"
            fill={isOutline ? '#dcfce7' : warna}
            stroke={warna}
            strokeWidth={isOutline ? 6 : 0}
          />
        </svg>
      )
    case 'lingkaran':
      return (
        <svg viewBox="0 0 100 100" width="46" height="46">
          <circle
            cx="50"
            cy="50"
            r={isOutline ? 36 : 42}
            fill={isOutline ? '#ffffff' : warna}
            stroke={warna}
            strokeWidth={isOutline ? 7 : 0}
          />
        </svg>
      )
    case 'persegi_panjang':
      return (
        <svg viewBox="0 0 120 80" width="52" height="36">
          <rect
            x="10"
            y="10"
            width="100"
            height="60"
            rx="8"
            fill={isOutline ? '#ffffff' : warna}
            stroke={warna}
            strokeWidth={isOutline ? 5 : 0}
          />
        </svg>
      )
    default:
      return <span style={{ fontSize: 32 }}>⭐</span>
  }
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
            <h2>Level {levelData.levelNumber} - {levelData.namaLevel}</h2>
          </div>
          <div className="blue-sub-pill">
            <span>{levelData.subjudulPulau}</span>
          </div>
        </div>

        {/* Main Info Card */}
        <div className="detail-card-white">
          {/* 1. CAPAIAN PEMBELAJARAN */}
          <div className="card-section-capaian">
            <span className="badge-capaian">CAPAIAN PEMBELAJARAN</span>
            <h3 className="teks-capaian-besar">{levelData.tujuan}</h3>
          </div>

          <div className="detail-card-divider" />

          {/* 2. MISI PETUALANGAN */}
          <div className="card-section-misi">
            <span className="badge-misi">MISI PETUALANGAN</span>
            <p className="teks-misi-deskripsi">
              {levelData.misiPetualangan || 'Kumpulkan target bentuk dan jawab tantangan soal untuk membuka level berikutnya!'}
            </p>

            {/* Target Shapes Row (Matches User Design) */}
            {levelData.targetBentuk && levelData.targetBentuk.length > 0 && (
              <div className="target-shapes-row-container">
                <div className="target-shapes-row">
                  {levelData.targetBentuk.map((target, idx) => (
                    <div key={idx} className="target-shape-card">
                      <div className="target-shape-icon-wrap">
                        <ShapeTargetIcon
                          bentuk={target.bentuk}
                          warna={target.warna}
                          isOutline={target.isOutline}
                        />
                      </div>
                      <span className="target-shape-label">{target.label}</span>
                    </div>
                  ))}
                </div>
                <p className="teks-instruksi-target">
                  ✨ Kumpulkan semua target untuk membuka gerbang soal.
                </p>
              </div>
            )}
          </div>

          {/* Meta Info Pills */}
          <div className="meta-pills-row">
            <div className="meta-pill nyawa-meta-pill">
              <span className="meta-icon">❤️</span>
              <span><strong>3 Nyawa</strong></span>
            </div>
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

        {/* Character Scenery Illustration */}
        <div className="detail-hero-scenery">
          <div className="scenery-backdrop">
            <div className="castle-silhouette">🏰</div>
            <div className="clouds-floating c1" />
            <div className="clouds-floating c2" />
          </div>

          <div className="maskot-standing-hero">
            <MaskotSegitiga pose="jalan" size={110} />
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
