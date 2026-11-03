import { useState, useRef } from 'react'
import { SHAPES_DATA, type ShapeData } from '../data/shapes'
import { playPop, playWood, playCoin } from '../utils/audio'

interface LayarMateriProps {
  onKembali: () => void
  sfx: boolean
}

const SHAPE_ICONS: Record<string, string> = {
  segitiga: '▲',
  persegi: '■',
  'persegi-panjang': '▬',
  lingkaran: '●',
  trapesium: '⏢',
  'jajar-genjang': '▱',
}

export default function LayarMateri({ onKembali, sfx }: LayarMateriProps) {
  const [bentukTerpilih, setBentukTerpilih] = useState<ShapeData>(SHAPES_DATA[0])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [inputVals, setInputVals] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {}
    SHAPES_DATA[0].kalkulator.inputs.forEach((inp) => {
      initial[inp.id] = inp.def
    })
    return initial
  })

  const [hasilKalkulator, setHasilKalkulator] = useState<{
    luas: number
    keliling: number
    rumusL: string
    rumusK: string
  }>(() => SHAPES_DATA[0].kalkulator.hitung(inputVals))

  const handlePilihBentuk = (shape: ShapeData, e?: React.MouseEvent<HTMLButtonElement>) => {
    playPop(sfx)
    setBentukTerpilih(shape)
    const newVals: Record<string, number> = {}
    shape.kalkulator.inputs.forEach((inp) => {
      newVals[inp.id] = inp.def
    })
    setInputVals(newVals)
    setHasilKalkulator(shape.kalkulator.hitung(newVals))

    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }
  }

  const scrollLeft = () => {
    playPop(sfx)
    scrollContainerRef.current?.scrollBy({ left: -180, behavior: 'smooth' })
  }

  const scrollRight = () => {
    playPop(sfx)
    scrollContainerRef.current?.scrollBy({ left: 180, behavior: 'smooth' })
  }

  const handleInputChange = (id: string, val: number) => {
    const updated = { ...inputVals, [id]: val }
    setInputVals(updated)
    setHasilKalkulator(bentukTerpilih.kalkulator.hitung(updated))
  }

  return (
    <div className="layar-sub-halaman materi-page">
      <div className="sub-header">
        <button className="btn-kembali" onClick={() => { playWood(sfx); onKembali(); }}>
          ‹ Beranda
        </button>
        <h2>📖 Kenali Bangun Datar</h2>
        <div style={{ width: '48px' }} />
      </div>

      <div className="konten-scroll">
        <p className="intro-materi">
          Pilih salah satu bangun datar untuk melihat sifat, rumus, dan coba kalkulator ajaibnya!
        </p>

        {/* Tab Selector Bangun Datar dengan Navigasi Scroll Rapi */}
        <div className="pilihan-bentuk-wrapper">
          <button
            type="button"
            className="btn-scroll-arrow left"
            onClick={scrollLeft}
            title="Geser pilihan ke kiri"
            aria-label="Geser pilihan ke kiri"
          >
            ‹
          </button>

          <div className="pilihan-bentuk-horizontal" ref={scrollContainerRef}>
            {SHAPES_DATA.map((shape) => {
              const isSelected = bentukTerpilih.id === shape.id
              return (
                <button
                  key={shape.id}
                  className={`pill-bentuk ${isSelected ? 'aktif' : ''}`}
                  onClick={(e) => handlePilihBentuk(shape, e)}
                  title={`Lihat materi ${shape.nama}`}
                >
                  <span
                    className="pill-icon-bentuk"
                    style={{ color: isSelected ? '#ffffff' : shape.warna }}
                  >
                    {SHAPE_ICONS[shape.id] || '◆'}
                  </span>
                  <span className="pill-nama-bentuk">{shape.nama}</span>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            className="btn-scroll-arrow right"
            onClick={scrollRight}
            title="Geser pilihan ke kanan"
            aria-label="Geser pilihan ke kanan"
          >
            ›
          </button>
        </div>

        {/* Kartu Detail Bangun Datar */}
        <div className="kartu-materi-detail">
          <div className="header-kartu-materi" style={{ backgroundColor: bentukTerpilih.warna }}>
            <h3>{bentukTerpilih.nama}</h3>
          </div>

          <div className="badan-materi">
            <p className="deskripsi-materi">{bentukTerpilih.deskripsi}</p>

            <div className="grid-sifat">
              <div className="kotak-sifat">
                <span className="label-sifat">Sisi</span>
                <strong>{bentukTerpilih.sisi}</strong>
              </div>
              <div className="kotak-sifat">
                <span className="label-sifat">Sudut</span>
                <strong>{bentukTerpilih.sudut}</strong>
              </div>
              <div className="kotak-sifat">
                <span className="label-sifat">Simetri Lipat</span>
                <strong>{bentukTerpilih.simetriLipat}</strong>
              </div>
              <div className="kotak-sifat">
                <span className="label-sifat">Simetri Putar</span>
                <strong>{bentukTerpilih.simetriPutar}</strong>
              </div>
            </div>

            <div className="kotak-rumus">
              <h4>📐 Rumus Matematika:</h4>
              <div className="baris-rumus">
                <span className="tag-rumus">Luas</span>
                <code>{bentukTerpilih.rumusLuas}</code>
              </div>
              <div className="baris-rumus">
                <span className="tag-rumus keliling">Keliling</span>
                <code>{bentukTerpilih.rumusKeliling}</code>
              </div>
            </div>

            <div className="benda-sekitar">
              <h4>🏠 Contoh di Sekitar Kita:</h4>
              <div className="tags-benda">
                {bentukTerpilih.contohBenda.map((benda, idx) => (
                  <span key={idx} className="tag-benda-item">
                    ✓ {benda}
                  </span>
                ))}
              </div>
            </div>

            {/* Kalkulator Ajaib */}
            <div className="area-kalkulator">
              <div className="kalkulator-header">
                <h4>✨ Kalkulator Ajaib {bentukTerpilih.nama}</h4>
                <small>Ubah angka untuk menghitung luas & keliling seketika!</small>
              </div>

              <div className="input-kalkulator-list">
                {bentukTerpilih.kalkulator.inputs.map((inp) => (
                  <div key={inp.id} className="baris-input-calc">
                    <label>{inp.label}</label>
                    <div className="calc-input-wrapper">
                      <input
                        type="number"
                        min="1"
                        max="999"
                        value={inputVals[inp.id] ?? inp.def}
                        onChange={(e) => handleInputChange(inp.id, Number(e.target.value))}
                      />
                      <span className="satuan-calc">{inp.satuan}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hasil-kalkulator-card">
                <div className="hasil-item">
                  <span className="hasil-label">Hasil Luas (L):</span>
                  <span className="hasil-nilai">{hasilKalkulator.luas} cm²</span>
                  <small className="hasil-langkah">{hasilKalkulator.rumusL}</small>
                </div>
                <div className="garis-pemisah-calc" />
                <div className="hasil-item">
                  <span className="hasil-label">Hasil Keliling (K):</span>
                  <span className="hasil-nilai">{hasilKalkulator.keliling} cm</span>
                  <small className="hasil-langkah">{hasilKalkulator.rumusK}</small>
                </div>
              </div>

              <button
                className="btn-suara-calc"
                onClick={() => {
                  playCoin(sfx)
                  alert(`Kalkulasi ${bentukTerpilih.nama}: Luas = ${hasilKalkulator.luas} cm², Keliling = ${hasilKalkulator.keliling} cm. Keren! 👏`)
                }}
              >
                🎉 Cek Kebenaran Hitungan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}