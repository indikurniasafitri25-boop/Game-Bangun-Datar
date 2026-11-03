import { playPop } from '../../utils/audio'

interface ModalAturanSkorProps {
  onTutup: () => void
  sfxEnabled?: boolean
}

export default function ModalAturanSkor({
  onTutup,
  sfxEnabled = true,
}: ModalAturanSkorProps) {
  return (
    <div className="modal-aturan-overlay" onClick={onTutup}>
      <div className="modal-aturan-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-aturan-header">
          <div className="aturan-title-group">
            <span className="aturan-ikon">📜</span>
            <h3>Ringkasan Rule & Scoring</h3>
          </div>
          <button
            className="btn-tutup-aturan"
            onClick={() => {
              playPop(sfxEnabled)
              onTutup()
            }}
          >
            ×
          </button>
        </div>

        <div className="aturan-items-list">
          <div className="aturan-row">
            <span className="row-icon">📋</span>
            <div className="row-info">
              <strong>Soal per level</strong>
              <span>5 soal tantangan interaktif</span>
            </div>
            <span className="row-badge">5 Soal</span>
          </div>

          <div className="aturan-row hijau">
            <span className="row-icon">✅</span>
            <div className="row-info">
              <strong>Jawaban benar</strong>
              <span>Poin langsung ditambahkan ke skor</span>
            </div>
            <span className="row-badge">+100 poin</span>
          </div>

          <div className="aturan-row merah">
            <span className="row-icon">❌</span>
            <div className="row-info">
              <strong>Jawaban salah</strong>
              <span>Muncul penjelasan edukatif & kesempatan coba lagi</span>
            </div>
            <span className="row-badge">0 poin</span>
          </div>

          <div className="aturan-row kuning">
            <span className="row-icon">🏅</span>
            <div className="row-info">
              <strong>Bonus eksplorasi</strong>
              <span>Bentuk & koin yang dikumpulkan di fase platformer</span>
            </div>
            <span className="row-badge">+10 poin / item</span>
          </div>

          <div className="aturan-row emas">
            <span className="row-icon">⭐</span>
            <div className="row-info">
              <strong>Bonus tanpa petunjuk</strong>
              <span>Menyelesaikan tantangan tanpa petunjuk bantuan</span>
            </div>
            <span className="row-badge">+50 poin</span>
          </div>

          <div className="aturan-row bintang">
            <span className="row-icon">🌟</span>
            <div className="row-info">
              <strong>Bintang kelulusan</strong>
              <span>1 hingga 3 bintang berdasarkan skor akhir</span>
            </div>
            <span className="row-badge">1-3 Bintang</span>
          </div>

          <div className="aturan-row ungu">
            <span className="row-icon">🟣</span>
            <div className="row-info">
              <strong>XP Petualang</strong>
              <span>Diperoleh otomatis setelah level selesai</span>
            </div>
            <span className="row-badge">+100 XP</span>
          </div>

          <div className="aturan-row koin">
            <span className="row-icon">🟡</span>
            <div className="row-info">
              <strong>Koin Geometri</strong>
              <span>Hadiah untuk membeli aksesori karakter</span>
            </div>
            <span className="row-badge">+100 Koin</span>
          </div>

          <div className="aturan-row hati">
            <span className="row-icon">❤️</span>
            <div className="row-info">
              <strong>Nyawa & Checkpoint</strong>
              <span>Tidak ada hukuman permanen (respawn di checkpoint)</span>
            </div>
            <span className="row-badge">Bebas Main</span>
          </div>
        </div>

        <button
          className="btn-paham-aturan"
          onClick={() => {
            playPop(sfxEnabled)
            onTutup()
          }}
        >
          Siap Menjelajah! 🎒✨
        </button>
      </div>
    </div>
  )
}
