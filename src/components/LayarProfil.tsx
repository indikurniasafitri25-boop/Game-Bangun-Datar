import { useState } from 'react'
import type { PlayerData, GameSettings } from '../data/gameState'
import { playCoin, playPop, playWood, toggleBgm } from '../utils/audio'

interface LayarProfilProps {
  onKembali: () => void
  player: PlayerData
  setPlayer: React.Dispatch<React.SetStateAction<PlayerData>>
  settings: GameSettings
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>
  onBukaPengaturan: () => void
}

export default function LayarProfil({
  onKembali,
  player,
  setPlayer,
  settings,
  setSettings,
  onBukaPengaturan,
}: LayarProfilProps) {
  const [namaTemp, setNamaTemp] = useState(player.nama)
  const [suksesSimpan, setSuksesSimpan] = useState(false)

  const avatars = [
    { id: 'boy1', icon: '👦', nama: 'Rizki' },
    { id: 'girl1', icon: '👧', nama: 'Siti' },
    { id: 'boy2', icon: '🧑‍🎓', nama: 'Budi' },
    { id: 'girl2', icon: '🧕', nama: 'Maya' },
  ]

  return (
    <div className="layar-sub-halaman profil-page">
      <div className="sub-header">
        <button className="btn-kembali" onClick={() => { playWood(settings.sfx); onKembali(); }}>
          ‹ Beranda
        </button>
        <h2>👤 Profil Siswa</h2>
        <button className="btn-gear-profil" onClick={() => { playPop(settings.sfx); onBukaPengaturan(); }}>
          ⚙️
        </button>
      </div>

      <div className="konten-scroll">
        <div className="kartu-profil-hero">
          <div className="avatar-lingkaran-besar">
            <span className="avatar-emoji">
              {player.avatar === 'boy1' && '👦'}
              {player.avatar === 'girl1' && '👧'}
              {player.avatar === 'boy2' && '🧑‍🎓'}
              {player.avatar === 'girl2' && '🧕'}
            </span>
            <div className="badge-level-avatar">Lvl {player.level}</div>
          </div>

          <h3>{player.nama}</h3>
          <span className="sekolah-label">Siswa Kelas 4 SD • Petualang Geometri</span>

          <div className="xp-container-hero">
            <div className="xp-text-hero">
              <span>Pengalaman (XP)</span>
              <span>{player.xp} / {player.maxXp} XP</span>
            </div>
            <div className="xp-track-hero">
              <div
                className="xp-bar-hero"
                style={{ width: `${Math.min(100, (player.xp / player.maxXp) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bagian-profil-section">
          <h4>Ganti Karakter Avatar:</h4>
          <div className="daftar-pilih-avatar">
            {avatars.map((av) => (
              <button
                key={av.id}
                className={`item-avatar-btn ${player.avatar === av.id ? 'terpilih' : ''}`}
                onClick={() => {
                  playPop(settings.sfx)
                  setPlayer((p) => ({ ...p, avatar: av.id }))
                }}
              >
                <span className="av-icon">{av.icon}</span>
                <span className="av-name">{av.nama}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bagian-profil-section">
          <h4>Ubah Nama Panggilan:</h4>
          <div className="ganti-nama-box">
            <input
              type="text"
              value={namaTemp}
              maxLength={15}
              onChange={(e) => setNamaTemp(e.target.value)}
              placeholder="Ketik namamu..."
            />
            <button
              className="btn-simpan-nama"
              onClick={() => {
                playCoin(settings.sfx)
                setPlayer((p) => ({ ...p, nama: namaTemp.trim() || 'Rizki' }))
                setSuksesSimpan(true)
                setTimeout(() => setSuksesSimpan(false), 2000)
              }}
            >
              {suksesSimpan ? 'Tersimpan ✓' : 'Simpan'}
            </button>
          </div>
        </div>

        <div className="bagian-profil-section">
          <h4>📊 Statistik Belajar Kamu:</h4>
          <div className="grid-statistik-profil">
            <div className="stat-card-profil">
              <span className="stat-ic">⭐</span>
              <div className="stat-val">{player.bintang}</div>
              <small>Total Bintang</small>
            </div>
            <div className="stat-card-profil">
              <span className="stat-ic">💎</span>
              <div className="stat-val">{player.permata}</div>
              <small>Total Permata</small>
            </div>
            <div className="stat-card-profil">
              <span className="stat-ic">🎯</span>
              <div className="stat-val">{player.skorKuis}</div>
              <small>Soal Terjawab</small>
            </div>
            <div className="stat-card-profil">
              <span className="stat-ic">🏆</span>
              <div className="stat-val">{player.akurasi}%</div>
              <small>Akurasi Jawaban</small>
            </div>
          </div>
        </div>

        <div className="bagian-profil-section">
          <h4>🎵 Kontrol Audio Cepat:</h4>
          <div className="audio-quick-toggle">
            <button
              className={`btn-quick-sound ${settings.sfx ? 'aktif' : ''}`}
              onClick={() => {
                playPop(!settings.sfx)
                setSettings((s) => ({ ...s, sfx: !s.sfx }))
              }}
            >
              {settings.sfx ? '🔊 Efek Suara ON' : '🔇 Efek Suara OFF'}
            </button>
            <button
              className={`btn-quick-sound ${settings.bgm ? 'aktif' : ''}`}
              onClick={() => {
                const newBgm = !settings.bgm
                toggleBgm(newBgm)
                playPop(settings.sfx)
                setSettings((s) => ({ ...s, bgm: newBgm }))
              }}
            >
              {settings.bgm ? '🎵 Musik BGM ON' : '🎵 Musik BGM OFF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
