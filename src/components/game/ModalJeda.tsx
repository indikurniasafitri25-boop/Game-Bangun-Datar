import { playPop, playWood } from '../../utils/audio'

interface ModalJedaProps {
  onLanjut: () => void
  onUlangi: () => void
  onKeluar: () => void
  sfxEnabled?: boolean
}

export default function ModalJeda({
  onLanjut,
  onUlangi,
  onKeluar,
  sfxEnabled = true,
}: ModalJedaProps) {
  return (
    <div className="modal-jeda-overlay">
      <div className="modal-jeda-card">
        <div className="modal-jeda-header">
          <span className="jeda-icon">⏸️</span>
          <h3>Game Dijeda</h3>
        </div>

        <p className="jeda-sub">Tarik napas sejenak sebelum melanjutkan petualanganmu!</p>

        <div className="jeda-buttons-list">
          <button
            className="btn-jeda hijau"
            onClick={() => {
              playPop(sfxEnabled)
              onLanjut()
            }}
          >
            ▶️ Lanjutkan Game
          </button>

          <button
            className="btn-jeda kuning"
            onClick={() => {
              playPop(sfxEnabled)
              onUlangi()
            }}
          >
            🔄 Ulangi dari Awal
          </button>

          <button
            className="btn-jeda merah"
            onClick={() => {
              playWood(sfxEnabled)
              onKeluar()
            }}
          >
            🗺️ Keluar ke Peta
          </button>
        </div>
      </div>
    </div>
  )
}
