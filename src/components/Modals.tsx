import { useState } from 'react'
import type { PlayerData, GameSettings } from '../data/gameState'
import { playPop, playCoin, playGem, playFanfare, playWrong, toggleBgm } from '../utils/audio'
import { LEVELS, type LevelInfo } from '../data/levels'
import { KOLEKSI_BENTUK } from '../data/koleksi'

interface ModalsProps {
  modalAktif: string | null
  onTutup: () => void
  player: PlayerData
  setPlayer: React.Dispatch<React.SetStateAction<PlayerData>>
  settings: GameSettings
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>
  onBukaTab: (tab: string) => void
  levelDipilih?: LevelInfo | null
  onLevelSelesai?: (levelId: number, bintang: number) => void
  pulauDipilih?: { id: number; nama: string; subjudul: string; topik: string; totalLevel: number } | null
}

export default function Modals({
  modalAktif,
  onTutup,
  player,
  setPlayer,
  settings,
  setSettings,
  onBukaTab,
  levelDipilih,
  onLevelSelesai,
  pulauDipilih,
}: ModalsProps) {
  // Modal Profil Local State
  const [namaTemp, setNamaTemp] = useState(player.nama)
  const [avatarTemp, setAvatarTemp] = useState(player.avatar)
  const [profilTersimpan, setProfilTersimpan] = useState(false)

  // Daily bonus claim flags for session
  const [bintangDiklaim, setBintangDiklaim] = useState(false)
  const [permataDiklaim, setPermataDiklaim] = useState(false)
  const [misi3Diklaim, setMisi3Diklaim] = useState(false)

  // Floating notification toast
  const [notif, setNotif] = useState<string | null>(null)

  const showNotif = (pesan: string) => {
    setNotif(pesan)
    setTimeout(() => setNotif(null), 2500)
  }

  // Quiz Game State (Modal Petualangan)
  const targetLevel = levelDipilih || LEVELS.find((l) => l.id === player.levelTerbuka) || LEVELS[2]
  const [soalIndex, setSoalIndex] = useState(0)
  const [pilihanTerpilih, setPilihanTerpilih] = useState<number | null>(null)
  const [jawabanBenar, setJawabanBenar] = useState<boolean | null>(null)
  const [skor, setSkor] = useState(0)
  const [kuisSelesai, setKuisSelesai] = useState(false)

  const resetKuis = () => {
    setSoalIndex(0)
    setPilihanTerpilih(null)
    setJawabanBenar(null)
    setSkor(0)
    setKuisSelesai(false)
  }

  const handleJawab = (index: number) => {
    if (pilihanTerpilih !== null) return
    setPilihanTerpilih(index)
    const isCorrect = index === targetLevel.pertanyaan[soalIndex].kunci
    setJawabanBenar(isCorrect)

    if (isCorrect) {
      playCoin(settings.sfx)
      setSkor((s) => s + 1)
    } else {
      playWrong(settings.sfx)
    }

    setTimeout(() => {
      if (soalIndex + 1 < targetLevel.pertanyaan.length) {
        setSoalIndex((i) => i + 1)
        setPilihanTerpilih(null)
        setJawabanBenar(null)
      } else {
        // Kuis Selesai!
        playFanfare(settings.sfx)
        setKuisSelesai(true)

        // Award rewards
        const rewardBintang = 30
        const rewardPermata = 10
        const rewardXp = 100

        setPlayer((prev) => {
          const newXp = prev.xp + rewardXp
          let newLevel = prev.level
          let remainingXp = newXp
          let newMaxXp = prev.maxXp

          if (newXp >= prev.maxXp) {
            newLevel += 1
            remainingXp = newXp - prev.maxXp
            newMaxXp = prev.maxXp + 200
          }

          const nextLevelTerbuka = Math.min(5, Math.max(prev.levelTerbuka, targetLevel.id + 1))
          const newMisi = Math.min(prev.misiTotal, prev.misiProgres + 1)

          return {
            ...prev,
            bintang: prev.bintang + rewardBintang,
            permata: prev.permata + rewardPermata,
            xp: remainingXp,
            level: newLevel,
            maxXp: newMaxXp,
            levelTerbuka: nextLevelTerbuka,
            misiProgres: newMisi,
            skorKuis: prev.skorKuis + 1,
          }
        })

        if (onLevelSelesai) {
          onLevelSelesai(targetLevel.id, 3)
        }
      }
    }, 1200)
  }

  if (!modalAktif) return null

  return (
    <div className="overlay-modal" onClick={onTutup}>
      {notif && <div className="toast-notif">{notif}</div>}

      <div className="kontainer-modal" onClick={(e) => e.stopPropagation()}>
        {/* ================= MODAL PROFIL ================= */}
        {modalAktif === 'profil' && (
          <div className="isi-modal">
            <div className="modal-header">
              <h3>Profil Siswa</h3>
              <button className="btn-tutup-x" onClick={onTutup}>×</button>
            </div>

            <div className="kartu-profil-modal">
              <div className="avatar-besar">
                <span className="avatar-ikon">
                  {avatarTemp === 'boy1' && '👦'}
                  {avatarTemp === 'girl1' && '👧'}
                  {avatarTemp === 'boy2' && '🧑‍🎓'}
                  {avatarTemp === 'girl2' && '🧕'}
                </span>
              </div>

              <div className="pilih-avatar">
                <p>Pilih Avatar Karakter:</p>
                <div className="daftar-avatar">
                  {[
                    { id: 'boy1', icon: '👦', label: 'Rizki' },
                    { id: 'girl1', icon: '👧', label: 'Siti' },
                    { id: 'boy2', icon: '🧑‍🎓', label: 'Budi' },
                    { id: 'girl2', icon: '🧕', label: 'Maya' },
                  ].map((av) => (
                    <button
                      key={av.id}
                      className={`btn-avatar ${avatarTemp === av.id ? 'aktif' : ''}`}
                      onClick={() => {
                        playPop(settings.sfx)
                        setAvatarTemp(av.id)
                      }}
                    >
                      {av.icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label>Nama Siswa:</label>
                <input
                  type="text"
                  value={namaTemp}
                  maxLength={16}
                  onChange={(e) => setNamaTemp(e.target.value)}
                  placeholder="Masukkan nama"
                />
              </div>

              <div className="xp-card">
                <div className="xp-header">
                  <span>Level {player.level}</span>
                  <span>{player.xp} / {player.maxXp} XP</span>
                </div>
                <div className="xp-bar">
                  <div className="xp-fill" style={{ width: `${Math.min(100, (player.xp / player.maxXp) * 100)}%` }} />
                </div>
              </div>

              <div className="stat-grid">
                <div className="stat-box">
                  <span className="stat-ikon">⭐</span>
                  <strong>{player.bintang}</strong>
                  <small>Bintang</small>
                </div>
                <div className="stat-box">
                  <span className="stat-ikon">💎</span>
                  <strong>{player.permata}</strong>
                  <small>Permata</small>
                </div>
                <div className="stat-box">
                  <span className="stat-ikon">🎯</span>
                  <strong>{player.skorKuis}</strong>
                  <small>Kuis Lolos</small>
                </div>
                <div className="stat-box">
                  <span className="stat-ikon">🏆</span>
                  <strong>{player.akurasi}%</strong>
                  <small>Akurasi</small>
                </div>
              </div>

              <button
                className="btn-utama"
                onClick={() => {
                  playCoin(settings.sfx)
                  setPlayer((p) => ({ ...p, nama: namaTemp.trim() || 'Rizki', avatar: avatarTemp }))
                  setProfilTersimpan(true)
                  showNotif('Profil berhasil disimpan! ✨')
                  setTimeout(() => {
                    setProfilTersimpan(false)
                    onTutup()
                  }, 800)
                }}
              >
                {profilTersimpan ? 'Tersimpan! ✓' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        )}

        {/* ================= MODAL BINTANG ================= */}
        {modalAktif === 'bintang' && (
          <div className="isi-modal">
            <div className="modal-header">
              <h3>Toko & Hadiah Bintang</h3>
              <button className="btn-tutup-x" onClick={onTutup}>×</button>
            </div>

            <div className="saldo-hero emas">
              <span className="ikon-hero-besar">⭐</span>
              <div className="saldo-angka">{player.bintang}</div>
              <p>Bintang Petualang Dimiliki</p>
            </div>

            <div className="klaim-box">
              <div className="klaim-info">
                <strong>Bonus Bintang Harian</strong>
                <p>Ambil bintang gratis setiap hari!</p>
              </div>
              <button
                className={`btn-klaim ${bintangDiklaim ? 'nonaktif' : ''}`}
                disabled={bintangDiklaim}
                onClick={() => {
                  playCoin(settings.sfx)
                  setBintangDiklaim(true)
                  setPlayer((p) => ({ ...p, bintang: p.bintang + 20 }))
                  showNotif('+20 ⭐ Bintang berhasil diklaim!')
                }}
              >
                {bintangDiklaim ? 'Sudah Diambil' : '+20 ⭐ Klaim'}
              </button>
            </div>

            <h4 className="subjudul-modal">Tukar Bintang dengan Hadiah:</h4>
            <div className="daftar-item-toko">
              {[
                { nama: 'Petunjuk Soal Kuis', harga: 15, ikon: '💡', ket: 'Bocoran jawaban di level sulit' },
                { nama: 'Topi Petualang Kuning', harga: 50, ikon: '🤠', ket: 'Kostum keren untuk Segitiga' },
                { nama: 'Latar Belakang Kastil Malam', harga: 100, ikon: '🌌', ket: 'Tema visual baru untuk peta' },
              ].map((item, idx) => (
                <div key={idx} className="item-toko">
                  <span className="item-ikon">{item.ikon}</span>
                  <div className="item-teks">
                    <strong>{item.nama}</strong>
                    <small>{item.ket}</small>
                  </div>
                  <button
                    className="btn-beli"
                    onClick={() => {
                      if (player.bintang >= item.harga) {
                        playCoin(settings.sfx)
                        setPlayer((p) => ({ ...p, bintang: p.bintang - item.harga }))
                        showNotif(`Berhasil menukar ${item.nama}! 🎉`)
                      } else {
                        playWrong(settings.sfx)
                        showNotif('Bintang kamu belum mencukupi! ⭐')
                      }
                    }}
                  >
                    ⭐ {item.harga}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= MODAL PERMATA ================= */}
        {modalAktif === 'permata' && (
          <div className="isi-modal">
            <div className="modal-header">
              <h3>Permata Ajaib</h3>
              <button className="btn-tutup-x" onClick={onTutup}>×</button>
            </div>

            <div className="saldo-hero biru">
              <span className="ikon-hero-besar">💎</span>
              <div className="saldo-angka">{player.permata}</div>
              <p>Permata Kristal Dimiliki</p>
            </div>

            <div className="klaim-box">
              <div className="klaim-info">
                <strong>Bonus Permata Harian</strong>
                <p>Klaim kristal ajaib untuk membuka jalan rahasia!</p>
              </div>
              <button
                className={`btn-klaim ${permataDiklaim ? 'nonaktif' : ''}`}
                disabled={permataDiklaim}
                onClick={() => {
                  playGem(settings.sfx)
                  setPermataDiklaim(true)
                  setPlayer((p) => ({ ...p, permata: p.permata + 10 }))
                  showNotif('+10 💎 Permata kristal ditambahkan!')
                }}
              >
                {permataDiklaim ? 'Sudah Diambil' : '+10 💎 Klaim'}
              </button>
            </div>

            <h4 className="subjudul-modal">Gunakan Permata:</h4>
            <div className="daftar-item-toko">
              {[
                { nama: 'Buka Danau Lingkaran Cepat', harga: 20, ikon: '🌊', ket: 'Akses instan tanpa tunggu level 3' },
                { nama: 'Kunci Gerbang Kastil Boss', harga: 40, ikon: '🗝️', ket: 'Akses ke tantangan pamungkas' },
                { nama: 'Piala Master Kristal', harga: 30, ikon: '🏆', ket: 'Pajang di lemari prestasimu' },
              ].map((item, idx) => (
                <div key={idx} className="item-toko">
                  <span className="item-ikon">{item.ikon}</span>
                  <div className="item-teks">
                    <strong>{item.nama}</strong>
                    <small>{item.ket}</small>
                  </div>
                  <button
                    className="btn-beli biru"
                    onClick={() => {
                      if (player.permata >= item.harga) {
                        playGem(settings.sfx)
                        setPlayer((p) => ({ ...p, permata: p.permata - item.harga }))
                        showNotif(`Berhasil menukar ${item.nama}! 💎`)
                      } else {
                        playWrong(settings.sfx)
                        showNotif('Permata belum mencukupi! 💎')
                      }
                    }}
                  >
                    💎 {item.harga}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= MODAL PENGATURAN ================= */}
        {modalAktif === 'pengaturan' && (
          <div className="isi-modal">
            <div className="modal-header">
              <h3>Pengaturan Game</h3>
              <button className="btn-tutup-x" onClick={onTutup}>×</button>
            </div>

            <div className="daftar-pengaturan">
              <div className="baris-setting">
                <div className="setting-label">
                  <span className="setting-ikon">🔊</span>
                  <div>
                    <strong>Efek Suara (SFX)</strong>
                    <small>Suara tombol, koin, dan lompatan</small>
                  </div>
                </div>
                <button
                  className={`toggle-switch ${settings.sfx ? 'on' : 'off'}`}
                  onClick={() => {
                    playPop(!settings.sfx)
                    setSettings((s) => ({ ...s, sfx: !s.sfx }))
                  }}
                >
                  <span className="toggle-thumb" />
                </button>
              </div>

              <div className="baris-setting">
                <div className="setting-label">
                  <span className="setting-ikon">🎵</span>
                  <div>
                    <strong>Musik Latar (BGM)</strong>
                    <small>Melodi riang petualangan bangun datar</small>
                  </div>
                </div>
                <button
                  className={`toggle-switch ${settings.bgm ? 'on' : 'off'}`}
                  onClick={() => {
                    const newBgm = !settings.bgm
                    toggleBgm(newBgm)
                    playPop(settings.sfx)
                    setSettings((s) => ({ ...s, bgm: newBgm }))
                  }}
                >
                  <span className="toggle-thumb" />
                </button>
              </div>

              <div className="baris-setting">
                <div className="setting-label">
                  <span className="setting-ikon">📳</span>
                  <div>
                    <strong>Getaran (Haptik)</strong>
                    <small>Respon sentuhan tombol</small>
                  </div>
                </div>
                <button
                  className={`toggle-switch ${settings.getaran ? 'on' : 'off'}`}
                  onClick={() => {
                    playPop(settings.sfx)
                    setSettings((s) => ({ ...s, getaran: !s.getaran }))
                  }}
                >
                  <span className="toggle-thumb" />
                </button>
              </div>
            </div>

            <div className="info-edukasi-game">
              <h4>📖 Tentang Game Ini</h4>
              <p>
                <strong>Petualangan Bangun Datar</strong> adalah game edukasi interaktif matematika sekolah dasar yang mengajarkan konsep sisi, sudut, rumus keliling, dan luas dengan visual 3D yang seru dan menyenangkan.
              </p>
              <small>Versi Aplikasi: 1.0.0 (Capacitor + React)</small>
            </div>

            <button
              className="btn-reset"
              onClick={() => {
                if (window.confirm('Apakah kamu yakin ingin mengulang kemajuan dari awal?')) {
                  localStorage.clear()
                  window.location.reload()
                }
              }}
            >
              Reset Data Kemajuan
            </button>
          </div>
        )}

        {/* ================= MODAL MISI HARI INI ================= */}
        {modalAktif === 'misi' && (
          <div className="isi-modal">
            <div className="modal-header">
              <h3>Misi Hari Ini</h3>
              <button className="btn-tutup-x" onClick={onTutup}>×</button>
            </div>

            <p className="deskripsi-misi-intro">Selesaikan misi harian berikut untuk mendapatkan banyak bintang dan permata!</p>

            <div className="daftar-misi-harian">
              {/* Misi 1 */}
              <div className="kartu-misi-item">
                <span className="misi-badge">📋 Misi 1</span>
                <div className="misi-isi">
                  <strong>Selesaikan 3 level dengan nilai sempurna</strong>
                  <p>Taklukkan tantangan di Pulau Bentuk dan sekitarnya</p>
                  <div className="progres-misi-bar">
                    <div className="bar-track">
                      <div className="bar-val" style={{ width: `${(player.misiProgres / 3) * 100}%` }} />
                    </div>
                    <span>{player.misiProgres}/3</span>
                  </div>
                </div>
                <button
                  className="btn-aksi-misi"
                  onClick={() => {
                    playPop(settings.sfx)
                    onTutup()
                    onBukaTab('peta')
                  }}
                >
                  Mainkan
                </button>
              </div>

              {/* Misi 2 */}
              <div className="kartu-misi-item">
                <span className="misi-badge">📐 Misi 2</span>
                <div className="misi-isi">
                  <strong>Pelajari rumus di menu Materi</strong>
                  <p>Buka ensiklopedia bangun datar dan coba kalkulator ajaib</p>
                  <div className="progres-misi-bar">
                    <div className="bar-track">
                      <div className="bar-val" style={{ width: '100%' }} />
                    </div>
                    <span>1/1 Selesai!</span>
                  </div>
                </div>
                <button
                  className="btn-aksi-misi hijau"
                  onClick={() => {
                    playPop(settings.sfx)
                    onTutup()
                    onBukaTab('materi')
                  }}
                >
                  Buka Materi
                </button>
              </div>

              {/* Misi 3 */}
              <div className="kartu-misi-item">
                <span className="misi-badge">⭐ Misi 3</span>
                <div className="misi-isi">
                  <strong>Hadiah Login Harian</strong>
                  <p>Klaim bonus kesetiaan petualang setiap hari!</p>
                  <div className="hadiah-preview">Hadiah: ⭐ 25 + 💎 5</div>
                </div>
                <button
                  className={`btn-aksi-misi emas ${misi3Diklaim ? 'nonaktif' : ''}`}
                  disabled={misi3Diklaim}
                  onClick={() => {
                    playFanfare(settings.sfx)
                    setMisi3Diklaim(true)
                    setPlayer((p) => ({ ...p, bintang: p.bintang + 25, permata: p.permata + 5 }))
                    showNotif('Selamat! ⭐ 25 & 💎 5 berhasil diklaim!')
                  }}
                >
                  {misi3Diklaim ? 'Sudah Diklaim' : 'Klaim Hadiah'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL KUIS PETUALANGAN ================= */}
        {modalAktif === 'petualangan' && (
          <div className="isi-modal petualangan">
            <div className="modal-header">
              <div>
                <h3>{targetLevel.nama}</h3>
                <small className="sub-lvl">{targetLevel.subjudul}</small>
              </div>
              <button className="btn-tutup-x" onClick={() => { resetKuis(); onTutup(); }}>×</button>
            </div>

            {!kuisSelesai ? (
              <div className="area-kuis">
                <div className="status-kuis">
                  <span>Soal {soalIndex + 1} dari {targetLevel.pertanyaan.length}</span>
                  <div className="hati-lives">❤️❤️❤️</div>
                </div>

                <div className="kartu-soal">
                  <div className="soal-nomor">Pertanyaan #{soalIndex + 1}</div>
                  <p className="soal-teks">{targetLevel.pertanyaan[soalIndex].pertanyaan}</p>
                </div>

                <div className="daftar-opsi">
                  {targetLevel.pertanyaan[soalIndex].opsi.map((opsi, idx) => {
                    let statusClass = ''
                    if (pilihanTerpilih !== null) {
                      if (idx === targetLevel.pertanyaan[soalIndex].kunci) {
                        statusClass = 'benar'
                      } else if (idx === pilihanTerpilih) {
                        statusClass = 'salah'
                      }
                    }

                    return (
                      <button
                        key={idx}
                        className={`opsi-kuis ${statusClass}`}
                        disabled={pilihanTerpilih !== null}
                        onClick={() => handleJawab(idx)}
                      >
                        <span className="opsi-huruf">{String.fromCharCode(65 + idx)}</span>
                        <span className="opsi-teks">{opsi}</span>
                      </button>
                    )
                  })}
                </div>

                {jawabanBenar !== null && (
                  <div className={`pembahasan-box ${jawabanBenar ? 'benar' : 'salah'}`}>
                    <strong>{jawabanBenar ? '🎉 Hebat, Jawaban Benar!' : '💡 Kurang Tepat, Perhatikan Ini:'}</strong>
                    <p>{targetLevel.pertanyaan[soalIndex].pembahasan}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="hasil-kuis-menang">
                <div className="bintang-animasi">
                  <span className="star s1">⭐</span>
                  <span className="star s2">⭐</span>
                  <span className="star s3">⭐</span>
                </div>
                <h2>Level Berhasil Ditaklukkan!</h2>
                <p>Kamu menjawab {skor} dari {targetLevel.pertanyaan.length} pertanyaan dengan sangat baik!</p>

                <div className="reward-list">
                  <div className="reward-pill">⭐ +30 Bintang</div>
                  <div className="reward-pill biru">💎 +10 Permata</div>
                  <div className="reward-pill ungu">⚡ +100 XP</div>
                </div>

                <div className="tombol-aksi-kuis">
                  <button
                    className="btn-utama"
                    onClick={() => {
                      resetKuis()
                      onTutup()
                      onBukaTab('peta')
                    }}
                  >
                    🗺️ Lihat Peta Petualangan
                  </button>
                  <button
                    className="btn-sekunder"
                    onClick={() => {
                      resetKuis()
                      onTutup()
                    }}
                  >
                    Kembali ke Beranda
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {/* ================= MODAL KOLEKSI BENTUK ================= */}
        {modalAktif === 'koleksi' && (
          <div className="isi-modal">
            <div className="modal-header">
              <h3>📦 Koleksi Bentuk Geometri</h3>
              <button className="btn-tutup-x" onClick={onTutup}>×</button>
            </div>

            <div className="saldo-hero emas">
              <span className="ikon-hero-besar">🪙</span>
              <div className="saldo-angka">8 / 24</div>
              <p>Bentuk Geometri Telah Ditemukan</p>
            </div>

            <div className="klaim-box">
              <div className="klaim-info">
                <strong>Hadiah Album Koleksi</strong>
                <p>Kumpulkan 12 bentuk untuk mendapatkan bonus 50 ⭐ Bintang!</p>
              </div>
              <span className="badge-berjalan">4 Lagi</span>
            </div>

            <h4 className="subjudul-modal">Daftar Album Bentuk:</h4>
            <div className="grid-album-koleksi">
              {KOLEKSI_BENTUK.map((item) => (
                <div
                  key={item.id}
                  className={`kartu-item-koleksi ${item.terbuka ? 'terbuka' : 'terkunci'}`}
                  onClick={() => {
                    if (item.terbuka) {
                      playPop(settings.sfx)
                      showNotif(`${item.nama}: ${item.deskripsi}`)
                    } else {
                      playWrong(settings.sfx)
                      showNotif(`🔒 ${item.nama}: ${item.deskripsi}`)
                    }
                  }}
                >
                  <span className="ikon-koleksi">{item.terbuka ? item.ikon : '🔒'}</span>
                  <strong className="nama-koleksi">{item.terbuka ? item.nama : '???'}</strong>
                  <small className="kategori-koleksi">{item.terbuka ? item.kategori : 'Terkunci'}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= MODAL INFO PULAU ================= */}
        {modalAktif === 'infoPulau' && pulauDipilih && (
          <div className="isi-modal">
            <div className="modal-header">
              <div>
                <h3>{pulauDipilih.nama}</h3>
                <small className="sub-lvl">{pulauDipilih.subjudul}</small>
              </div>
              <button className="btn-tutup-x" onClick={onTutup}>×</button>
            </div>

            <div className="pulau-info-box">
              <div className="pulau-info-banner">
                <span className="pulau-nomor-hero">Pulau #{pulauDipilih.id}</span>
                <h4>Materi Utama:</h4>
                <p>{pulauDipilih.topik}</p>
              </div>

              <div className="stat-grid" style={{ margin: '10px 0' }}>
                <div className="stat-box">
                  <span className="stat-ikon">🎯</span>
                  <strong>{pulauDipilih.totalLevel} Level</strong>
                  <small>Tantangan</small>
                </div>
                <div className="stat-box">
                  <span className="stat-ikon">⭐</span>
                  <strong>3 Bintang</strong>
                  <small>Tiap Level</small>
                </div>
                <div className="stat-box">
                  <span className="stat-ikon">💎</span>
                  <strong>+10</strong>
                  <small>Bonus Kristal</small>
                </div>
                <div className="stat-box">
                  <span className="stat-ikon">🏆</span>
                  <strong>Piala</strong>
                  <small>Tamat Pulau</small>
                </div>
              </div>

              <button
                className="btn-utama"
                onClick={() => {
                  playPop(settings.sfx)
                  onTutup()
                  // Launch current active level on that island
                  const foundLvl = LEVELS.find((l) => l.id === pulauDipilih.id) || LEVELS[0]
                  onBukaTab('petualangan_' + foundLvl.id)
                }}
              >
                ▶ Mulai Tantangan Pulau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
