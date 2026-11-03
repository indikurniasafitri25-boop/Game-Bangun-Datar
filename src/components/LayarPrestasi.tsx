import { useState } from 'react'
import { INITIAL_ACHIEVEMENTS, type Achievement } from '../data/achievements'
import { playFanfare, playPop } from '../utils/audio'
import type { PlayerData } from '../data/gameState'

interface LayarPrestasiProps {
  onKembali: () => void
  player: PlayerData
  setPlayer: React.Dispatch<React.SetStateAction<PlayerData>>
  sfx: boolean
}

export default function LayarPrestasi({ onKembali, setPlayer, sfx }: LayarPrestasiProps) {
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS)
  const [pesanKlaim, setPesanKlaim] = useState<string | null>(null)

  const handleKlaim = (ach: Achievement) => {
    playFanfare(sfx)
    setAchievements((prev) =>
      prev.map((a) => (a.id === ach.id ? { ...a, diklaim: true } : a))
    )

    if (ach.hadiahTipe === 'bintang') {
      setPlayer((p) => ({ ...p, bintang: p.bintang + ach.hadiahJumlah }))
      setPesanKlaim(`+${ach.hadiahJumlah} ⭐ Bintang berhasil diperoleh!`)
    } else {
      setPlayer((p) => ({ ...p, permata: p.permata + ach.hadiahJumlah }))
      setPesanKlaim(`+${ach.hadiahJumlah} 💎 Permata berhasil diperoleh!`)
    }

    setTimeout(() => setPesanKlaim(null), 2500)
  }

  return (
    <div className="layar-sub-halaman prestasi-page">
      <div className="sub-header">
        <button className="btn-kembali" onClick={() => { playPop(sfx); onKembali(); }}>
          ‹ Beranda
        </button>
        <h2>🏆 Prestasi & Piala</h2>
        <div style={{ width: '48px' }} />
      </div>

      {pesanKlaim && <div className="toast-notif">{pesanKlaim}</div>}

      <div className="konten-scroll">
        <div className="banner-piala">
          <span className="trofi-besar">🏆</span>
          <div className="banner-teks">
            <h3>Papan Medali Juara</h3>
            <p>Selesaikan berbagai tantangan untuk mengoleksi hadiah eksklusif!</p>
          </div>
        </div>

        <div className="daftar-prestasi">
          {achievements.map((ach) => {
            const selesai = ach.progres >= ach.target
            const persen = Math.min(100, Math.round((ach.progres / ach.target) * 100))

            return (
              <div key={ach.id} className={`kartu-prestasi ${selesai ? 'selesai' : ''}`}>
                <div className="ach-ikon">{ach.ikon}</div>
                <div className="ach-konten">
                  <h4>{ach.judul}</h4>
                  <p>{ach.deskripsi}</p>

                  <div className="ach-bar-wrap">
                    <div className="ach-bar-track">
                      <div className="ach-bar-fill" style={{ width: `${persen}%` }} />
                    </div>
                    <span className="ach-bar-text">
                      {ach.progres} / {ach.target} ({persen}%)
                    </span>
                  </div>
                </div>

                <div className="ach-aksi">
                  {ach.diklaim ? (
                    <span className="badge-diklaim">Terklaim ✓</span>
                  ) : selesai ? (
                    <button className="btn-klaim-ach" onClick={() => handleKlaim(ach)}>
                      Klaim {ach.hadiahTipe === 'bintang' ? '⭐' : '💎'} {ach.hadiahJumlah}
                    </button>
                  ) : (
                    <span className="badge-berjalan">Berjalan</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
