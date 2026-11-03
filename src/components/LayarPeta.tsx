import { useState } from 'react'
import bgTampilanPeta from '../assets/tampilan_peta.jpg'
import pulauBentukImg from '../assets/01_pulau_bentuk.png'
import { MaskotSegitiga } from './game/Illustrations'
import ModalAturanSkor from './game/ModalAturanSkor'
import { ALL_LEVELS_DATA } from '../data/levelData'
import { playPop, playWood, playBoing, playCoin, playGem } from '../utils/audio'
import type { PlayerData, GameSettings } from '../data/gameState'

interface LayarPetaProps {
  onPilihLevel: (lvlNum: number) => void
  onKembali: () => void
  levelTerbuka: number
  player: PlayerData
  settings: GameSettings
  onBukaModal: (
    modal: string,
    pulauData?: {
      id: number
      nama: string
      subjudul: string
      topik: string
      totalLevel: number
    }
  ) => void
}

const PULAU_DATA_MAP: Record<
  number,
  { id: number; nama: string; subjudul: string; topik: string; totalLevel: number }
> = {
  1: {
    id: 1,
    nama: 'Pulau Bentuk',
    subjudul: 'Mengenal bentuk dasar',
    topik: 'Pengenalan segitiga, persegi, persegi panjang, dan lingkaran.',
    totalLevel: 6,
  },
  2: {
    id: 2,
    nama: 'Hutan Segi Empat',
    subjudul: 'Sisi, sudut dan jenis-jenisnya',
    topik: 'Mendalami aneka jenis bangun segi empat: persegi, persegi panjang, trapesium, dan jajar genjang.',
    totalLevel: 6,
  },
  3: {
    id: 3,
    nama: 'Pegunungan Segitiga',
    subjudul: 'Jenis segitiga dan keliling',
    topik: 'Eksplorasi segitiga sama sisi, sama kaki, siku-siku, dan cara menghitung keliling segitiga.',
    totalLevel: 6,
  },
  4: {
    id: 4,
    nama: 'Danau Lingkaran',
    subjudul: 'Jari-jari, diameter dan luas',
    topik: 'Memahami konsep titik pusat, jari-jari (r), diameter (d), keliling, dan luas lingkaran.',
    totalLevel: 6,
  },
  5: {
    id: 5,
    nama: 'Kastil Geometri',
    subjudul: 'Gabungan bentuk dan luas',
    topik: 'Tantangan akhir: Menghitung luas gabungan bangun datar, menemukan simetri lipat dan teka-teki kastil.',
    totalLevel: 6,
  },
}

const MASCOT_QUOTES = [
  'Ayo kita jelajahi Pulau Bentuk! Sentuh Level 1 atau Level 2! 🎒✨',
  'Tahukah kamu? Segitiga memiliki 3 sisi dan jumlah sudutnya 180°! 📐',
  'Sepatu petualangku sudah siap! Ayo kumpulkan semua bintang emas! 🥾⭐',
  'Selesaikan Misi Hari Ini di pojok kanan atas untuk dapat bonus permata! 💎',
  'Buka peti Koleksi Bentuk di pojok bawah untuk melihat hasil koleksimu! 🏆',
  'Tiap pulau punya rahasia bangun datar yang unik dan seru! 🗺️',
]

export default function LayarPeta({
  onPilihLevel,
  onKembali,
  player,
  settings,
  onBukaModal,
}: LayarPetaProps) {
  const [toastPeta, setToastPeta] = useState<string | null>(null)
  const [mascotJumping, setMascotJumping] = useState(false)
  const [speechBubble, setSpeechBubble] = useState<string | null>(null)
  const [bannerWobble, setBannerWobble] = useState(false)
  const [viewMode, setViewMode] = useState<'peta_utama' | 'pulau_detail'>('peta_utama')
  const [modalAturanOpen, setModalAturanOpen] = useState(false)

  const showToast = (pesan: string) => {
    setToastPeta(pesan)
    setTimeout(() => setToastPeta(null), 2500)
  }

  const handleKlikLevel = (lvlNum: number) => {
    if (player.levelTerbuka >= lvlNum) {
      playPop(settings.sfx)
      onPilihLevel(lvlNum)
    } else {
      playWood(settings.sfx)
      const prevLvl = lvlNum > 1 ? lvlNum - 1 : 1
      showToast(`🔒 Level ${lvlNum} masih terkunci! Selesaikan Level ${prevLvl} terlebih dahulu.`)
    }
  }

  const handleTapMaskotPeta = () => {
    playBoing(settings.sfx)
    setMascotJumping(true)
    const quote = MASCOT_QUOTES[Math.floor(Math.random() * MASCOT_QUOTES.length)]
    setSpeechBubble(quote)
    setTimeout(() => setMascotJumping(false), 550)
    setTimeout(() => setSpeechBubble(null), 4000)
  }

  const handleTapBanner = () => {
    playWood(settings.sfx)
    setBannerWobble(true)
    showToast('🗺️ Peta Petualangan: Jelajahi 5 Pulau Geometri dan kumpulkan semua bangun datar!')
    setTimeout(() => setBannerWobble(false), 600)
  }

  const handleKlikPulau = (pulauId: number) => {
    playPop(settings.sfx)
    const data = PULAU_DATA_MAP[pulauId]
    if (data) {
      onBukaModal('infoPulau', data)
    }
  }

  const currentActiveLevel = Math.min(6, Math.max(1, player.levelTerbuka))

  return (
    <div className="peta-screen-container">
      {/* Toast Notification */}
      {toastPeta && <div className="toast-notif-peta">{toastPeta}</div>}

      {/* MODAL RULE & SCORING */}
      {modalAturanOpen && (
        <ModalAturanSkor
          onTutup={() => setModalAturanOpen(false)}
          sfxEnabled={settings.sfx}
        />
      )}

      {/* ================= MODE 1: TAMPILAN AWAL PETA UTAMA (5 PULAU) ================= */}
      {viewMode === 'peta_utama' ? (
        <div className="peta-overview-mode">
          {/* Base Background: Full 5-Island Adventure Map */}
          <img
            src={bgTampilanPeta}
            alt="Peta Petualangan Bangun Datar"
            className="bg-tampilan-peta"
          />

          {/* Floating Stars Sparkle above Level 1 */}
          <div className="stars-above-level-1" aria-hidden="true">
            <span className="star-gold-sparkle">⭐</span>
            <span className="star-gold-sparkle">⭐</span>
            <span className="star-gold-sparkle">⭐</span>
          </div>

          {/* --- TOP BAR: TOMBOL KEMBALI (‹) --- */}
          <button
            className="hotspot hotspot-peta-back"
            title="Kembali ke Beranda"
            aria-label="Kembali"
            onClick={() => {
              playPop(settings.sfx)
              onKembali()
            }}
          />

          {/* --- TOP BAR: PROFIL SISWA --- */}
          <button
            className="hotspot hotspot-profil"
            title="Buka Profil Siswa"
            aria-label="Profil Siswa"
            onClick={() => {
              playPop(settings.sfx)
              onBukaModal('profil')
            }}
          >
            {(player.nama !== 'Rizki' || player.level !== 3) && (
              <div className="live-profil-overlay">
                <span className="live-nama">{player.nama}</span>
              </div>
            )}
          </button>

          {/* --- TOP BAR: BINTANG COUNTER --- */}
          <button
            className="hotspot hotspot-bintang"
            title="Toko Bintang & Hadiah"
            aria-label="Bintang"
            onClick={() => {
              playCoin(settings.sfx)
              onBukaModal('bintang')
            }}
          >
            {player.bintang !== 120 && (
              <span className="live-counter-star">{player.bintang}</span>
            )}
          </button>

          {/* --- TOP BAR: PERMATA COUNTER --- */}
          <button
            className="hotspot hotspot-permata"
            title="Koleksi Permata Ajaib"
            aria-label="Permata"
            onClick={() => {
              playGem(settings.sfx)
              onBukaModal('permata')
            }}
          >
            {player.permata !== 45 && (
              <span className="live-counter-gem">{player.permata}</span>
            )}
          </button>

          {/* --- TOP BAR: PENGATURAN (GEAR) --- */}
          <button
            className="hotspot hotspot-pengaturan"
            title="Pengaturan Suara & Game"
            aria-label="Pengaturan"
            onClick={() => {
              playPop(settings.sfx)
              onBukaModal('pengaturan')
            }}
          />

          {/* --- BANNER JUDUL: PETA PETUALANGAN --- */}
          <button
            className={`hotspot hotspot-peta-banner ${bannerWobble ? 'anim-wobble' : ''}`}
            title="Peta Petualangan: Jelajahi Dunia, Temukan Bentuknya!"
            aria-label="Peta Petualangan"
            onClick={handleTapBanner}
          />

          {/* --- CARD MISI HARI INI --- */}
          <button
            className="hotspot hotspot-peta-misi"
            title="Misi Hari Ini: Selesaikan 3 level dengan nilai sempurna"
            aria-label="Misi Hari Ini"
            onClick={() => {
              playPop(settings.sfx)
              onBukaModal('misi')
            }}
          >
            {player.misiProgres !== 1 && (
              <span className="live-misi-progres">{player.misiProgres}/3</span>
            )}
          </button>

          {/* --- 5 BADGE PULAU (INTERAKTIF) --- */}
          <button
            className="hotspot hotspot-badge-pulau-1"
            title="Pulau 1: Pulau Bentuk"
            aria-label="Pulau 1: Pulau Bentuk"
            onClick={() => handleKlikPulau(1)}
          />
          <button
            className="hotspot hotspot-badge-pulau-2"
            title="Pulau 2: Hutan Segi Empat"
            aria-label="Pulau 2: Hutan Segi Empat"
            onClick={() => handleKlikPulau(2)}
          />
          <button
            className="hotspot hotspot-badge-pulau-3"
            title="Pulau 3: Pegunungan Segitiga"
            aria-label="Pulau 3: Pegunungan Segitiga"
            onClick={() => handleKlikPulau(3)}
          />
          <button
            className="hotspot hotspot-badge-pulau-4"
            title="Pulau 4: Danau Lingkaran"
            aria-label="Pulau 4: Danau Lingkaran"
            onClick={() => handleKlikPulau(4)}
          />
          <button
            className="hotspot hotspot-badge-pulau-5"
            title="Pulau 5: Kastil Geometri"
            aria-label="Pulau 5: Kastil Geometri"
            onClick={() => handleKlikPulau(5)}
          />

          {/* --- MASKOT SEGITIGA DI PULAU 1 --- */}
          <button
            className={`hotspot hotspot-maskot-pulau-1 ${mascotJumping ? 'anim-jump' : ''}`}
            title="Maskot Segitiga si Petualang (Sentuh aku!)"
            aria-label="Maskot Segitiga"
            onClick={handleTapMaskotPeta}
          />

          {/* Comic Speech Bubble */}
          {speechBubble && (
            <div
              className="speech-bubble maskot-peta-pos"
              onClick={() => setSpeechBubble(null)}
            >
              {speechBubble}
            </div>
          )}

          {/* --- LEVEL NODES: PULAU 1 (PULAU BENTUK) --- */}
          <button
            className="hotspot hotspot-node node-1-1 node-completed-glow"
            title="Level 1: Mengenal Bangun Datar Dasar"
            aria-label="Level 1 Selesai (3 Bintang)"
            onClick={() => handleKlikLevel(1)}
          >
            <span className="node-completed-ring" />
          </button>

          <button
            className={`hotspot hotspot-node node-1-2 ${player.levelTerbuka === 2 ? 'aktif-pulsing' : ''}`}
            title="Level 2: Sisi & Sudut Bangun Datar"
            aria-label="Level 2"
            onClick={() => handleKlikLevel(2)}
          >
            {player.levelTerbuka === 2 && <span className="node-active-ring" />}
          </button>

          <button
            className={`hotspot hotspot-node node-1-3 ${player.levelTerbuka === 3 ? 'aktif-pulsing' : ''}`}
            title="Level 3: Eksplorasi Segitiga"
            aria-label="Level 3"
            onClick={() => handleKlikLevel(3)}
          >
            {player.levelTerbuka === 3 && <span className="node-active-ring" />}
          </button>

          {/* --- LEVEL NODES: PULAU 2 (HUTAN SEGI EMPAT) --- */}
          <button
            className={`hotspot hotspot-node node-2-7 ${player.levelTerbuka === 7 ? 'aktif-pulsing' : ''}`}
            title="Level 7: Mengenal Persegi"
            aria-label="Level 7"
            onClick={() => handleKlikLevel(7)}
          />
          <button
            className={`hotspot hotspot-node node-2-8 ${player.levelTerbuka === 8 ? 'aktif-pulsing' : ''}`}
            title="Level 8: Persegi Panjang"
            aria-label="Level 8"
            onClick={() => handleKlikLevel(8)}
          />
          <button
            className={`hotspot hotspot-node node-2-9 ${player.levelTerbuka === 9 ? 'aktif-pulsing' : ''}`}
            title="Level 9: Jajar Genjang"
            aria-label="Level 9"
            onClick={() => handleKlikLevel(9)}
          />
          <button
            className={`hotspot hotspot-node node-2-10 ${player.levelTerbuka === 10 ? 'aktif-pulsing' : ''}`}
            title="Level 10: Trapesium"
            aria-label="Level 10"
            onClick={() => handleKlikLevel(10)}
          />
          <button
            className={`hotspot hotspot-node node-2-11 ${player.levelTerbuka === 11 ? 'aktif-pulsing' : ''}`}
            title="Level 11: Belah Ketupat"
            aria-label="Level 11"
            onClick={() => handleKlikLevel(11)}
          />
          <button
            className={`hotspot hotspot-node node-2-12 ${player.levelTerbuka === 12 ? 'aktif-pulsing' : ''}`}
            title="Level 12: Layang-Layang"
            aria-label="Level 12"
            onClick={() => handleKlikLevel(12)}
          />

          {/* --- LEVEL NODES: PULAU 3 (PEGUNUNGAN SEGITIGA) --- */}
          <button
            className={`hotspot hotspot-node node-3-13 ${player.levelTerbuka === 13 ? 'aktif-pulsing' : ''}`}
            title="Level 13: Segitiga Sama Sisi"
            aria-label="Level 13"
            onClick={() => handleKlikLevel(13)}
          />
          <button
            className={`hotspot hotspot-node node-3-14 ${player.levelTerbuka === 14 ? 'aktif-pulsing' : ''}`}
            title="Level 14: Segitiga Sama Kaki"
            aria-label="Level 14"
            onClick={() => handleKlikLevel(14)}
          />
          <button
            className={`hotspot hotspot-node node-3-15 ${player.levelTerbuka === 15 ? 'aktif-pulsing' : ''}`}
            title="Level 15: Segitiga Siku-Siku"
            aria-label="Level 15"
            onClick={() => handleKlikLevel(15)}
          />
          <button
            className={`hotspot hotspot-node node-3-16 ${player.levelTerbuka === 16 ? 'aktif-pulsing' : ''}`}
            title="Level 16: Sudut Segitiga 180°"
            aria-label="Level 16"
            onClick={() => handleKlikLevel(16)}
          />
          <button
            className={`hotspot hotspot-node node-3-17 ${player.levelTerbuka === 17 ? 'aktif-pulsing' : ''}`}
            title="Level 17: Keliling Segitiga"
            aria-label="Level 17"
            onClick={() => handleKlikLevel(17)}
          />
          <button
            className={`hotspot hotspot-node node-3-18 ${player.levelTerbuka === 18 ? 'aktif-pulsing' : ''}`}
            title="Level 18: Luas Segitiga"
            aria-label="Level 18"
            onClick={() => handleKlikLevel(18)}
          />

          {/* --- LEVEL NODES: PULAU 4 (DANAU LINGKARAN) --- */}
          <button
            className={`hotspot hotspot-node node-4-19 ${player.levelTerbuka === 19 ? 'aktif-pulsing' : ''}`}
            title="Level 19: Titik Pusat Lingkaran"
            aria-label="Level 19"
            onClick={() => handleKlikLevel(19)}
          />
          <button
            className={`hotspot hotspot-node node-4-20 ${player.levelTerbuka === 20 ? 'aktif-pulsing' : ''}`}
            title="Level 20: Jari-Jari Lingkaran (r)"
            aria-label="Level 20"
            onClick={() => handleKlikLevel(20)}
          />
          <button
            className={`hotspot hotspot-node node-4-21 ${player.levelTerbuka === 21 ? 'aktif-pulsing' : ''}`}
            title="Level 21: Diameter Lingkaran (d)"
            aria-label="Level 21"
            onClick={() => handleKlikLevel(21)}
          />
          <button
            className={`hotspot hotspot-node node-4-22 ${player.levelTerbuka === 22 ? 'aktif-pulsing' : ''}`}
            title="Level 22: Garis Lengkung Lingkaran"
            aria-label="Level 22"
            onClick={() => handleKlikLevel(22)}
          />
          <button
            className={`hotspot hotspot-node node-4-23 ${player.levelTerbuka === 23 ? 'aktif-pulsing' : ''}`}
            title="Level 23: Keliling Lingkaran"
            aria-label="Level 23"
            onClick={() => handleKlikLevel(23)}
          />
          <button
            className={`hotspot hotspot-node node-4-24 ${player.levelTerbuka === 24 ? 'aktif-pulsing' : ''}`}
            title="Level 24: Luas Lingkaran"
            aria-label="Level 24"
            onClick={() => handleKlikLevel(24)}
          />

          {/* --- LEVEL NODES: PULAU 5 (KASTIL GEOMETRI) --- */}
          <button
            className={`hotspot hotspot-node node-5-25 ${player.levelTerbuka === 25 ? 'aktif-pulsing' : ''}`}
            title="Level 25: Simetri Lipat"
            aria-label="Level 25"
            onClick={() => handleKlikLevel(25)}
          />
          <button
            className={`hotspot hotspot-node node-5-26 ${player.levelTerbuka === 26 ? 'aktif-pulsing' : ''}`}
            title="Level 26: Sumbu Simetri"
            aria-label="Level 26"
            onClick={() => handleKlikLevel(26)}
          />
          <button
            className={`hotspot hotspot-node node-5-27 ${player.levelTerbuka === 27 ? 'aktif-pulsing' : ''}`}
            title="Level 27: Bangun Gabungan Rumah"
            aria-label="Level 27"
            onClick={() => handleKlikLevel(27)}
          />
          <button
            className={`hotspot hotspot-node node-5-28 ${player.levelTerbuka === 28 ? 'aktif-pulsing' : ''}`}
            title="Level 28: Menghitung Luas Gabungan"
            aria-label="Level 28"
            onClick={() => handleKlikLevel(28)}
          />
          <button
            className={`hotspot hotspot-node node-5-29 ${player.levelTerbuka === 29 ? 'aktif-pulsing' : ''}`}
            title="Level 29: Teka-Teki Kastil"
            aria-label="Level 29"
            onClick={() => handleKlikLevel(29)}
          />
          <button
            className={`hotspot hotspot-node node-5-30 ${player.levelTerbuka === 30 ? 'aktif-pulsing' : ''}`}
            title="Level 30: Ujian Agung Geometri"
            aria-label="Level 30"
            onClick={() => handleKlikLevel(30)}
          />

          {/* --- CARD KOLEKSI BENTUK (POJOK KIRI BAWAH) --- */}
          <button
            className="hotspot hotspot-koleksi-bentuk"
            title="Buka Album Koleksi Bentuk (8/24)"
            aria-label="Koleksi Bentuk"
            onClick={() => {
              playPop(settings.sfx)
              onBukaModal('koleksi')
            }}
          />
        </div>
      ) : (
        /* ================= MODE 2: SUB-VIEW DETAIL PULAU BENTUK ================= */
        <div className="pulau-detail-view-screen">
          {/* Top Bar */}
          <div className="screen-1-top-bar">
            <button
              className="btn-circle-back-peta"
              title="Kembali ke Peta 5 Pulau"
              aria-label="Kembali ke Peta 5 Pulau"
              onClick={() => {
                playPop(settings.sfx)
                setViewMode('peta_utama')
              }}
            >
              ‹
            </button>

            {/* Profile badge */}
            <button
              className="peta-top-profil-badge"
              onClick={() => {
                playPop(settings.sfx)
                onBukaModal('profil')
              }}
              title="Buka Profil Siswa"
            >
              <div className="peta-avatar-circle">👦</div>
              <div className="peta-profil-texts">
                <span className="peta-label-siswa">Siswa</span>
                <span className="peta-nama-siswa">{player.nama}</span>
                <div className="peta-xp-micro-bar">
                  <div
                    className="peta-xp-micro-fill"
                    style={{
                      width: `${Math.min(100, Math.round((player.xp / player.maxXp) * 100))}%`,
                    }}
                  />
                </div>
                <span className="peta-lvl-text">Level {player.level}</span>
              </div>
            </button>

            {/* Resources (Stars & Gems) */}
            <div className="peta-top-resources">
              <button
                className="resource-pill star"
                onClick={() => {
                  playCoin(settings.sfx)
                  onBukaModal('bintang')
                }}
              >
                <span className="r-icon">⭐</span>
                <span className="r-val">{player.bintang}</span>
              </button>

              <button
                className="resource-pill gem"
                onClick={() => {
                  playGem(settings.sfx)
                  onBukaModal('permata')
                }}
              >
                <span className="r-icon">💎</span>
                <span className="r-val">{player.permata}</span>
              </button>
            </div>
          </div>

          {/* Wood Plank Banner */}
          <div className="screen-1-header-banner">
            <div className="wood-banner-plank-map">
              <h2>Pulau Bentuk</h2>
              <span className="subtext-banner-map">Petualangan Bangun Datar Dasar</span>
            </div>
          </div>

          {/* Floating Island Center Stage */}
          <div className="screen-1-island-stage">
            <img
              src={pulauBentukImg}
              alt="Pulau Bentuk"
              className="pulau-bentuk-hero-img"
            />

            {/* DYNAMIC NODES LEVEL 1 - 6 */}
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const isUnlocked = player.levelTerbuka >= num
              const isCompleted = player.levelSelesai.includes(num)
              const isCurrent = player.levelTerbuka === num
              const lvlInfo = ALL_LEVELS_DATA[num]

              return (
                <div key={num} className={`level-node-wrapper node-pos-${num}`}>
                  <button
                    className={`btn-level-node node-${num} ${
                      isCurrent
                        ? 'active-glow'
                        : isCompleted
                        ? 'completed-node'
                        : isUnlocked
                        ? 'unlocked-node'
                        : 'node-locked'
                    }`}
                    onClick={() => handleKlikLevel(num)}
                    title={`Level ${num}: ${lvlInfo?.namaLevel || ''}`}
                  >
                    {!isUnlocked ? <span className="lock-icon">🔒</span> : <span>{num}</span>}
                  </button>
                  <div className="node-stars-row">
                    <span className={isCompleted ? 'star-gold' : 'star-grey'}>⭐</span>
                    <span className={isCompleted ? 'star-gold' : 'star-grey'}>⭐</span>
                    <span className={isCompleted ? 'star-gold' : 'star-grey'}>⭐</span>
                  </div>
                </div>
              )
            })}

            {/* Mascot Character next to current unlocked level */}
            <div
              className={`peta-mascot-island pos-lvl-${currentActiveLevel} ${mascotJumping ? 'anim-jump' : ''}`}
              onClick={handleTapMaskotPeta}
              title="Karakter Segitiga"
            >
              <MaskotSegitiga pose={mascotJumping ? 'lompat' : 'senang'} size={65} />
            </div>

            {speechBubble && (
              <div
                className="speech-bubble speech-island-pos"
                onClick={() => setSpeechBubble(null)}
              >
                {speechBubble}
              </div>
            )}
          </div>

          {/* Bottom Card: "Hadiah Dunia" */}
          <div className="screen-1-bottom-card">
            <div className="hadiah-header-row">
              <span className="hadiah-label-title">
                {player.levelSelesai.length >= 6
                  ? '🏆 Pulau Bentuk Takluk!'
                  : 'Progres Hadiah Dunia'}
              </span>
              <button
                className="btn-open-rules-pill"
                onClick={() => {
                  playPop(settings.sfx)
                  setModalAturanOpen(true)
                }}
              >
                📋 Aturan & Skor
              </button>
            </div>

            <div className="hadiah-shapes-progress-row">
              <div className="hadiah-shapes-icons">
                <span className="hadiah-shape-item triangle">▲</span>
                <span className="hadiah-shape-item square">■</span>
                <span className="hadiah-shape-item circle">●</span>
              </div>

              <div className="hadiah-progress-track">
                <div
                  className="hadiah-progress-fill"
                  style={{
                    width: `${Math.max(16, (player.levelSelesai.length / 6) * 100)}%`,
                  }}
                />
              </div>

              <span className="hadiah-count-ratio">
                {player.levelSelesai.length}/6 Level Selesai
              </span>
            </div>
          </div>

          {/* Back button to overview map */}
          <button
            className="btn-toggle-overview-map"
            onClick={() => {
              playPop(settings.sfx)
              setViewMode('peta_utama')
            }}
          >
            🗺️ Kembali ke Peta 5 Pulau
          </button>
        </div>
      )}
    </div>
  )
}