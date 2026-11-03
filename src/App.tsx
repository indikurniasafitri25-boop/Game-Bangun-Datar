import { useState, useEffect } from 'react'
import './App.css'
import bgTampilanUtama from './assets/tampilan_utama.jpg'
import {
  loadPlayer,
  savePlayer,
  loadSettings,
  saveSettings,
  type PlayerData,
  type GameSettings,
} from './data/gameState'
import {
  playPop,
  playCoin,
  playGem,
  playBoing,
  playWood,
  playRumble,
} from './utils/audio'
import Modals from './components/Modals'
import LayarPeta from './components/LayarPeta'
import LayarPrestasi from './components/LayarPrestasi'
import LayarMateri from './components/LayarMateri'
import LayarProfil from './components/LayarProfil'
import PetualanganFlow from './components/game/PetualanganFlow'
import { LEVELS, type LevelInfo } from './data/levels'
import { getLevelData } from './data/levelData'

const MASCOT_DIALOGUES = [
  'Halo! Aku Segitiga si Petualang! Ayo jelajahi dunia bangun datar! 🏕️',
  'Tahukah kamu? Jumlah ketiga sudut dalam segitiga selalu 180° lho! 📐',
  'Ketuk tombol kuning "Mulai Petualangan" untuk mendaki Pegunungan Segitiga! ⛰️',
  'Sepatuku sudah siap! Ayo cari rumus luas dan keliling bersama! 🥾',
  'Lihat kawan-kawan di belakang, jangan biarkan mereka mengalahkanmu! 💥',
]

const ENEMY_DIALOGUES = [
  '🔴 Bulat Merah: Kami bangun datar penantangmu! Hitung sudutku kalau bisa!',
  '🟦 Kotak Biru: Keempat sisiku sama panjang dan sudutku tegak lurus 90°!',
  '🟪 Prisma Ungu: Taklukkan kami dengan menjawab kuis di Pulau Geometri!',
]

// High quality SVG icons for navigation
const NAV_ICONS = {
  beranda: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ),
  peta: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  prestasi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
      <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  materi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  profil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
}

export default function App() {
  const [tab, setTab] = useState<string>('peta')
  const [player, setPlayer] = useState<PlayerData>(loadPlayer)
  const [settings, setSettings] = useState<GameSettings>(loadSettings)
  const [modalAktif, setModalAktif] = useState<string | null>(null)
  const [levelDipilih, setLevelDipilih] = useState<LevelInfo | null>(null)
  const [levelNumberAktif, setLevelNumberAktif] = useState<number>(1)
  const [gameFlowActive, setGameFlowActive] = useState<boolean>(false)
  const [pulauDipilih, setPulauDipilih] = useState<{
    id: number
    nama: string
    subjudul: string
    topik: string
    totalLevel: number
  } | null>(null)

  // Interactive animations & Speech bubble state
  const [mascotJumping, setMascotJumping] = useState(false)
  const [signWobbling, setSignWobbling] = useState(false)
  const [enemyShaking, setEnemyShaking] = useState(false)
  const [speechBubble, setSpeechBubble] = useState<{
    visible: boolean
    text: string
    position: 'maskot' | 'enemy'
  }>({ visible: false, text: '', position: 'maskot' })

  // Auto save player & settings whenever changed
  useEffect(() => {
    savePlayer(player)
  }, [player])

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  // Mascot tap handler
  const handleTapMaskot = () => {
    playBoing(settings.sfx)
    setMascotJumping(true)
    const randomLine = MASCOT_DIALOGUES[Math.floor(Math.random() * MASCOT_DIALOGUES.length)]
    setSpeechBubble({ visible: true, text: randomLine, position: 'maskot' })

    setTimeout(() => setMascotJumping(false), 600)
    setTimeout(() => {
      setSpeechBubble((prev) => (prev.position === 'maskot' ? { ...prev, visible: false } : prev))
    }, 4500)
  }

  // Enemy tap handler
  const handleTapMusuh = () => {
    playRumble(settings.sfx)
    setEnemyShaking(true)
    const randomLine = ENEMY_DIALOGUES[Math.floor(Math.random() * ENEMY_DIALOGUES.length)]
    setSpeechBubble({ visible: true, text: randomLine, position: 'enemy' })

    setTimeout(() => setEnemyShaking(false), 500)
    setTimeout(() => {
      setSpeechBubble((prev) => (prev.position === 'enemy' ? { ...prev, visible: false } : prev))
    }, 4500)
  }

  // Signpost tap handler ("Kenali Bangun Datar")
  const handleTapPapan = () => {
    playWood(settings.sfx)
    setSignWobbling(true)
    setTimeout(() => {
      setSignWobbling(false)
      setTab('materi')
    }, 400)
  }

  return (
    <main className="game-viewport">
      <section className="layar-game">
        {/* ================= 1. BERANDA (HOME SCREEN) ================= */}
        {tab === 'beranda' && (
          <div className="beranda-container">
            {/* Background Image: The exact visual matching user's design */}
            <img
              src={bgTampilanUtama}
              alt="Petualangan Bangun Datar"
              className="bg-tampilan-utama"
            />

            {/* --- INTERACTIVE ELEMENT 1: PROFIL SISWA --- */}
            <button
              className="hotspot hotspot-profil"
              title="Buka Profil Siswa"
              aria-label="Profil Siswa"
              onClick={() => {
                playPop(settings.sfx)
                setModalAktif('profil')
              }}
            >
              {player.nama !== 'Rizki' && (
                <div className="live-profil-overlay">
                  <span className="live-nama">{player.nama}</span>
                </div>
              )}
            </button>

            {/* --- INTERACTIVE ELEMENT 2: BINTANG COUNTER --- */}
            <button
              className="hotspot hotspot-bintang"
              title="Toko Bintang & Hadiah"
              aria-label="Bintang"
              onClick={() => {
                playCoin(settings.sfx)
                setModalAktif('bintang')
              }}
            >
              {player.bintang !== 120 && (
                <span className="live-counter-star">{player.bintang}</span>
              )}
            </button>

            {/* --- INTERACTIVE ELEMENT 3: PERMATA COUNTER --- */}
            <button
              className="hotspot hotspot-permata"
              title="Koleksi Permata Ajaib"
              aria-label="Permata"
              onClick={() => {
                playGem(settings.sfx)
                setModalAktif('permata')
              }}
            >
              {player.permata !== 45 && (
                <span className="live-counter-gem">{player.permata}</span>
              )}
            </button>

            {/* --- INTERACTIVE ELEMENT 4: PENGATURAN (GEAR) --- */}
            <button
              className="hotspot hotspot-pengaturan"
              title="Pengaturan Suara & Game"
              aria-label="Pengaturan"
              onClick={() => {
                playPop(settings.sfx)
                setModalAktif('pengaturan')
              }}
            />

            {/* --- INTERACTIVE ELEMENT 5: MISI HARI INI CARD --- */}
            <button
              className="hotspot hotspot-misi"
              title="Misi Harian"
              aria-label="Misi Hari Ini"
              onClick={() => {
                playPop(settings.sfx)
                setModalAktif('misi')
              }}
            >
              {player.misiProgres !== 1 && (
                <span className="live-misi-progres">{player.misiProgres}/3</span>
              )}
            </button>

            {/* --- INTERACTIVE ELEMENT 6: MULAI PETUALANGAN --- */}
            <button
              className="hotspot hotspot-play"
              title="Mulai Petualangan Bangun Datar"
              aria-label="Mulai Petualangan"
              onClick={() => {
                playPop(settings.sfx)
                setTab('peta')
              }}
            >
              <div className="play-btn-shine" />
            </button>

            {/* --- INTERACTIVE ELEMENT 7: PAPAN KENALI BANGUN DATAR --- */}
            <button
              className={`hotspot hotspot-papan ${signWobbling ? 'anim-wobble' : ''}`}
              title="Kenali Bangun Datar (Buka Materi)"
              aria-label="Kenali Bangun Datar"
              onClick={handleTapPapan}
            />

            {/* --- INTERACTIVE ELEMENT 8: MASKOT SEGITIGA --- */}
            <button
              className={`hotspot hotspot-maskot ${mascotJumping ? 'anim-jump' : ''}`}
              title="Sentuh Maskot Segitiga"
              aria-label="Maskot Segitiga"
              onClick={handleTapMaskot}
            />

            {/* --- INTERACTIVE ELEMENT 9: MUSUH BANGUN DATAR --- */}
            <button
              className={`hotspot hotspot-musuh ${enemyShaking ? 'anim-shake' : ''}`}
              title="Sentuh Musuh Bangun Datar"
              aria-label="Musuh Bangun Datar"
              onClick={handleTapMusuh}
            />

            {/* Interactive Speech Bubble */}
            {speechBubble.visible && (
              <div
                className={`speech-bubble ${
                  speechBubble.position === 'maskot' ? 'maskot-pos' : 'enemy-pos'
                }`}
                onClick={() => setSpeechBubble((p) => ({ ...p, visible: false }))}
              >
                {speechBubble.text}
              </div>
            )}
          </div>
        )}

        {/* ================= 2. PETA (MAP VIEW) ================= */}
        {tab === 'peta' && (
          <LayarPeta
            onPilihLevel={(lvlNum) => {
              playPop(settings.sfx)
              setLevelNumberAktif(lvlNum)
              setGameFlowActive(true)
            }}
            onKembali={() => setTab('beranda')}
            levelTerbuka={player.levelTerbuka}
            player={player}
            settings={settings}
            onBukaModal={(modal, data) => {
              if (modal === 'infoPulau' && data) {
                setPulauDipilih(data)
              }
              setModalAktif(modal)
            }}
          />
        )}

        {/* ================= 3. PRESTASI (ACHIEVEMENTS VIEW) ================= */}
        {tab === 'prestasi' && (
          <LayarPrestasi
            onKembali={() => setTab('beranda')}
            player={player}
            setPlayer={setPlayer}
            sfx={settings.sfx}
          />
        )}

        {/* ================= 4. MATERI (LEARNING / ENCYCLOPEDIA VIEW) ================= */}
        {tab === 'materi' && (
          <LayarMateri onKembali={() => setTab('beranda')} sfx={settings.sfx} />
        )}

        {/* ================= 5. PROFIL (STUDENT PROFILE VIEW) ================= */}
        {tab === 'profil' && (
          <LayarProfil
            onKembali={() => setTab('beranda')}
            player={player}
            setPlayer={setPlayer}
            settings={settings}
            setSettings={setSettings}
            onBukaPengaturan={() => setModalAktif('pengaturan')}
          />
        )}

        {/* ================= 6. GAMEPLAY FLOW (5 SCREENS FLOW) ================= */}
        {gameFlowActive && (
          <PetualanganFlow
            levelData={getLevelData(levelNumberAktif)}
            player={player}
            setPlayer={setPlayer}
            settings={settings}
            onKembaliKePeta={() => {
              setGameFlowActive(false)
              setTab('peta')
            }}
            onSelesaiDanLanjut={(nextLvlNum) => {
              if (nextLvlNum && nextLvlNum <= 6) {
                setLevelNumberAktif(nextLvlNum)
              } else {
                setGameFlowActive(false)
                setTab('peta')
              }
            }}
          />
        )}

        {/* ================= BOTTOM NAVIGATION BAR ================= */}
        {!gameFlowActive && (
          <nav
            className={`bottom-nav-container ${tab !== 'beranda' && tab !== 'peta' ? 'sub-page-nav' : ''}`}
            aria-label="Navigasi Utama"
          >
            {[
              { id: 'beranda', label: 'Beranda' },
              { id: 'peta', label: 'Peta' },
              { id: 'prestasi', label: 'Prestasi' },
              { id: 'materi', label: 'Materi' },
              { id: 'profil', label: 'Profil' },
            ].map((item) => (
              <button
                key={item.id}
                className={`nav-tab-btn ${tab === item.id ? 'aktif' : ''}`}
                onClick={() => {
                  playPop(settings.sfx)
                  setTab(item.id)
                }}
                aria-label={item.label}
              >
                {tab !== 'beranda' && tab !== 'peta' && (
                  <>
                    <span className="nav-tab-icon">
                      {NAV_ICONS[item.id as keyof typeof NAV_ICONS]}
                    </span>
                    <span className="nav-tab-label">{item.label}</span>
                  </>
                )}
              </button>
            ))}
          </nav>
        )}

        {/* ================= ACTIVE MODALS (POPUPS) ================= */}
        <Modals
          modalAktif={modalAktif}
          onTutup={() => setModalAktif(null)}
          player={player}
          setPlayer={setPlayer}
          settings={settings}
          setSettings={setSettings}
          onBukaTab={(newTab) => {
            if (newTab.startsWith('petualangan_')) {
              const lvlId = parseInt(newTab.replace('petualangan_', ''), 10)
              const found = LEVELS.find((l) => l.id === lvlId) || null
              setLevelDipilih(found)
              setLevelNumberAktif(lvlId || 1)
              setGameFlowActive(true)
              setModalAktif(null)
            } else {
              setTab(newTab)
            }
          }}
          levelDipilih={levelDipilih}
          pulauDipilih={pulauDipilih}
        />
      </section>
    </main>
  )
}
