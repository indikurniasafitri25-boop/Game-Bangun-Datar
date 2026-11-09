import { useState, useEffect } from 'react'
import type { DetailLevelData } from '../../data/levelData'
import {
  IlustrasiRumah,
  IlustrasiJendela,
  IlustrasiSegitigaSisi,
  IlustrasiBenda,
  IlustrasiPersegiFitur,
  IlustrasiSudutSegiEmpat,
  IlustrasiPapanTulis,
  IlustrasiUbinKeliling,
  IlustrasiSegitigaSamaSisi,
  IlustrasiSegitigaSamaKaki,
  IlustrasiSegitigaSikuSiku,
  IlustrasiSegitigaSudut180,
  IlustrasiLingkaranJariJari,
  IlustrasiLingkaranDiameter,
  IlustrasiLingkaranGarisLengkung,
  IlustrasiLingkaranSimetri,
  IlustrasiTrapesium,
  IlustrasiJajarGenjang,
  IlustrasiBelahKetupat,
  IlustrasiLayangLayang,
  IlustrasiSudutTotal360,
  IlustrasiTamanSegitiga,
  IlustrasiBangunGabungan,
  IlustrasiPizzaTengah,
} from './Illustrations'
import { playCorrect, playWrong, playPop } from '../../utils/audio'

interface LayarTantanganSoalProps {
  levelData: DetailLevelData
  skorEksplorasi: number
  koinEksplorasi: number
  onSelesaiKuis: (stats: {
    skorTotal: number
    jawabanBenarCount: number
    totalSoal: number
    koinTotal: number
    xpTotal: number
    sisaNyawa: number
  }) => void
  onJeda: () => void
  onKembaliKePeta?: () => void
  onUlangiLevel?: () => void
  sfxEnabled?: boolean
}

export default function LayarTantanganSoal({
  levelData,
  skorEksplorasi,
  koinEksplorasi,
  onSelesaiKuis,
  onJeda,
  onKembaliKePeta,
  onUlangiLevel,
  sfxEnabled = true,
}: LayarTantanganSoalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSingle, setSelectedSingle] = useState<string | null>(null)
  const [selectedMulti, setSelectedMulti] = useState<string[]>([])
  const [isAnswerChecked, setIsAnswerChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [pembahasanVisible, setPembahasanVisible] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [currentScore, setCurrentScore] = useState(skorEksplorasi)

  // 3 Nyawa (Lives) System
  const [nyawa, setNyawa] = useState(3)
  const [heartAnim, setHeartAnim] = useState<number | null>(null)
  const [isGameOver, setIsGameOver] = useState(false)

  const defaultTimer = levelData.waktuTimer || 50
  const [timerSeconds, setTimerSeconds] = useState(defaultTimer)

  const currentSoal = levelData.soalList[currentIndex]
  const totalSoal = levelData.soalList.length

  // Timer countdown
  useEffect(() => {
    if (isGameOver) return
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [isGameOver])

  // Handle timer run out
  useEffect(() => {
    if (timerSeconds === 0 && !isAnswerChecked && !isGameOver) {
      setIsAnswerChecked(true)
      setIsCorrect(false)
      playWrong(sfxEnabled)
      const nextNyawa = Math.max(0, nyawa - 1)
      setNyawa(nextNyawa)
      setHeartAnim(nyawa)
      setTimeout(() => setHeartAnim(null), 800)

      if (nextNyawa <= 0) {
        setIsGameOver(true)
      } else {
        setPembahasanVisible(true)
      }
    }
  }, [timerSeconds, isAnswerChecked, isGameOver, nyawa, sfxEnabled])

  // Handle single choice selection
  const handleSelectOption = (optId: string) => {
    if (isAnswerChecked || isGameOver) return
    setSelectedSingle(optId)
    playPop(sfxEnabled)

    const correct = optId === currentSoal.kunciJawaban
    setIsAnswerChecked(true)
    setIsCorrect(correct)

    if (correct) {
      playCorrect(sfxEnabled)
      setCorrectCount((prev) => prev + 1)
      setCurrentScore((s) => s + 100)
      setTimeout(() => {
        handleNextSoal(true)
      }, 1200)
    } else {
      playWrong(sfxEnabled)
      const nextNyawa = Math.max(0, nyawa - 1)
      setNyawa(nextNyawa)
      setHeartAnim(nyawa)
      setTimeout(() => setHeartAnim(null), 800)

      if (nextNyawa <= 0) {
        setIsGameOver(true)
      } else {
        setPembahasanVisible(true)
      }
    }
  }

  // Handle multi-select toggle
  const handleToggleMulti = (optId: string) => {
    if (isAnswerChecked || isGameOver) return
    playPop(sfxEnabled)
    setSelectedMulti((prev) =>
      prev.includes(optId) ? prev.filter((id) => id !== optId) : [...prev, optId]
    )
  }

  // Check multi-select answer
  const handleCheckMulti = () => {
    if (selectedMulti.length === 0 || isAnswerChecked || isGameOver) return

    const correctList = currentSoal.kunciJawaban as string[]
    const isAllCorrect =
      selectedMulti.length === correctList.length &&
      selectedMulti.every((val) => correctList.includes(val))

    setIsAnswerChecked(true)
    setIsCorrect(isAllCorrect)

    if (isAllCorrect) {
      playCorrect(sfxEnabled)
      setCorrectCount((prev) => prev + 1)
      setCurrentScore((s) => s + 100)
      setTimeout(() => {
        handleNextSoal(true)
      }, 1200)
    } else {
      playWrong(sfxEnabled)
      const nextNyawa = Math.max(0, nyawa - 1)
      setNyawa(nextNyawa)
      setHeartAnim(nyawa)
      setTimeout(() => setHeartAnim(null), 800)

      if (nextNyawa <= 0) {
        setIsGameOver(true)
      } else {
        setPembahasanVisible(true)
      }
    }
  }

  // Retry when answer is wrong
  const handleCobaLagi = () => {
    setIsAnswerChecked(false)
    setIsCorrect(null)
    setPembahasanVisible(false)
    setSelectedSingle(null)
    setSelectedMulti([])
  }

  // Reset quiz from beginning after Game Over
  const handleUlangiKuis = () => {
    setNyawa(3)
    setIsGameOver(false)
    setCurrentIndex(0)
    setSelectedSingle(null)
    setSelectedMulti([])
    setIsAnswerChecked(false)
    setIsCorrect(null)
    setPembahasanVisible(false)
    setCorrectCount(0)
    setCurrentScore(skorEksplorasi)
    setTimerSeconds(defaultTimer)
  }

  // Move to next question or finish
  const handleNextSoal = (wasCorrectJustNow = false) => {
    if (currentIndex + 1 < totalSoal) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedSingle(null)
      setSelectedMulti([])
      setIsAnswerChecked(false)
      setIsCorrect(null)
      setPembahasanVisible(false)
      setTimerSeconds(defaultTimer)
    } else {
      const finalCorrect = correctCount + (wasCorrectJustNow ? 1 : 0)
      onSelesaiKuis({
        skorTotal: currentScore + (wasCorrectJustNow ? 100 : 0) + 50,
        jawabanBenarCount: finalCorrect,
        totalSoal,
        koinTotal: koinEksplorasi + levelData.hadiahKoin,
        xpTotal: levelData.hadiahXp,
        sisaNyawa: nyawa,
      })
    }
  }

  // Render question illustration based on illustration type
  const renderIlustrasi = () => {
    switch (currentSoal.ilustrasiTipe) {
      case 'rumah':
        return <IlustrasiRumah size={145} />
      case 'jendela':
        return <IlustrasiJendela size={135} />
      case 'segitiga_sisi':
        return <IlustrasiSegitigaSisi size={135} />
      case 'persegi_fitur':
        return <IlustrasiPersegiFitur size={135} />
      case 'sudut_segiempat':
        return <IlustrasiSudutSegiEmpat size={140} />
      case 'papan_tulis':
        return <IlustrasiPapanTulis size={145} />
      case 'ubin_keliling':
        return <IlustrasiUbinKeliling size={135} />
      case 'segitiga_sama_sisi':
        return <IlustrasiSegitigaSamaSisi size={135} />
      case 'segitiga_sama_kaki':
        return <IlustrasiSegitigaSamaKaki size={135} />
      case 'segitiga_siku_siku':
        return <IlustrasiSegitigaSikuSiku size={135} />
      case 'segitiga_sudut_180':
        return <IlustrasiSegitigaSudut180 size={135} />
      case 'lingkaran_jari_jari':
        return <IlustrasiLingkaranJariJari size={135} />
      case 'lingkaran_diameter':
        return <IlustrasiLingkaranDiameter size={135} />
      case 'lingkaran_garis_lengkung':
        return <IlustrasiLingkaranGarisLengkung size={135} />
      case 'lingkaran_simetri':
        return <IlustrasiLingkaranSimetri size={135} />
      case 'trapesium':
        return <IlustrasiTrapesium size={145} />
      case 'jajar_genjang':
        return <IlustrasiJajarGenjang size={145} />
      case 'belah_ketupat':
        return <IlustrasiBelahKetupat size={135} />
      case 'layang_layang':
        return <IlustrasiLayangLayang size={135} />
      case 'sudut_total_360':
        return <IlustrasiSudutTotal360 size={135} />
      case 'taman_segitiga':
        return <IlustrasiTamanSegitiga size={135} />
      case 'bangun_gabungan_rumah':
        return <IlustrasiBangunGabungan size={145} />
      case 'pizza_tengah':
        return <IlustrasiPizzaTengah size={135} />
      case 'benda_jam':
        return <IlustrasiBenda tipe="jam" size={135} />
      case 'benda_roda':
        return <IlustrasiBenda tipe="roda" size={135} />
      case 'benda_pintu':
        return <IlustrasiBenda tipe="pintu" size={135} />
      case 'grid_lingkaran':
        return (
          <div className="grid-benda-4">
            <div className="benda-item-card">
              <IlustrasiBenda tipe="bola" size={48} />
              <span>Bola</span>
            </div>
            <div className="benda-item-card">
              <IlustrasiBenda tipe="tenda" size={48} />
              <span>Tenda</span>
            </div>
            <div className="benda-item-card">
              <IlustrasiBenda tipe="jam" size={48} />
              <span>Jam</span>
            </div>
            <div className="benda-item-card">
              <IlustrasiBenda tipe="buku" size={48} />
              <span>Buku</span>
            </div>
          </div>
        )
      case 'grid_persegi_panjang':
      case 'grid_multi':
        return (
          <div className="grid-benda-4 multi-grid">
            {currentSoal.opsi.map((opt) => {
              const isSelected = selectedMulti.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  className={`benda-item-card selectable ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleToggleMulti(opt.id)}
                >
                  <div className="card-checkbox">{isSelected ? '✓' : ''}</div>
                  <IlustrasiBenda tipe={opt.id} size={46} />
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="layar-game-flow layar-soal-tantangan">
      {/* 1. TOP BAR */}
      <div className="flow-top-bar">
        <button
          className="btn-circle-pause"
          onClick={() => {
            playPop(sfxEnabled)
            onJeda()
          }}
          aria-label="Jeda"
        >
          ⏸️
        </button>

        {/* 3 NYAWA (LIVES) INDICATOR */}
        <div className="nyawa-hud-container" title={`Sisa Nyawa: ${nyawa}/3`}>
          <span className="nyawa-hud-label">Nyawa:</span>
          <div className="nyawa-hearts-row">
            {[1, 2, 3].map((num) => {
              const isAlive = num <= nyawa
              const isLostNow = heartAnim === num
              return (
                <span
                  key={num}
                  className={`nyawa-heart-hud ${isAlive ? 'alive' : 'lost'} ${isLostNow ? 'anim-lose-heart' : ''}`}
                >
                  {isAlive ? '❤️' : '🖤'}
                </span>
              )
            })}
          </div>
        </div>

        <div className="timer-track-wrapper">
          <span className="timer-number">{timerSeconds}s</span>
          <div className="timer-track-bar">
            <div
              className="timer-fill-bar"
              style={{ width: `${(timerSeconds / defaultTimer) * 100}%` }}
            />
          </div>
        </div>

        <div className="step-indicator-pill">
          {currentIndex + 1}/{totalSoal}
        </div>
      </div>

      {/* 2. QUESTION & ILLUSTRATION CARD */}
      <div className="soal-main-card">
        <div className="soal-meta-header">
          <span className="soal-category-label">{currentSoal.judulKategori}</span>
          {levelData.kesulitan && (
            <span className={`badge-kesulitan badge-${levelData.kesulitan.toLowerCase().replace(/\s+/g, '-')}`}>
              {levelData.kesulitan}
            </span>
          )}
        </div>

        <h3 className="soal-pertanyaan-text">{currentSoal.pertanyaan}</h3>

        <div className="soal-illustration-container">{renderIlustrasi()}</div>
      </div>

      {/* 3. ANSWER OPTIONS LIST */}
      {currentSoal.tipe !== 'multi_select' ? (
        <div className="soal-options-list">
          {currentSoal.opsi.map((opt) => {
            const isSelected = selectedSingle === opt.id
            let statusClass = ''
            if (isAnswerChecked) {
              if (opt.id === currentSoal.kunciJawaban) {
                statusClass = 'jawaban-benar'
              } else if (isSelected) {
                statusClass = 'jawaban-salah'
              }
            }

            return (
              <button
                key={opt.id}
                className={`btn-opsi-soal ${statusClass} ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelectOption(opt.id)}
                disabled={isAnswerChecked && isCorrect === true}
              >
                <div
                  className="opsi-shape-badge"
                  style={{ backgroundColor: opt.warnaIkon || '#3b82f6' }}
                >
                  {opt.ikonBentuk === 'segitiga' && '▲'}
                  {opt.ikonBentuk === 'persegi' && '■'}
                  {opt.ikonBentuk === 'persegi_panjang' && '▬'}
                  {opt.ikonBentuk === 'lingkaran' && '●'}
                  {!opt.ikonBentuk && opt.id.toUpperCase().slice(0, 2)}
                </div>
                <div className="opsi-text-group">
                  <span className="opsi-label-text">{opt.label}</span>
                  {opt.subteks && <span className="opsi-subteks">{opt.subteks}</span>}
                </div>
                {statusClass === 'jawaban-benar' && <span className="opsi-check-icon">✓</span>}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="multi-select-action-bar">
          <button
            className="btn-periksa-jawaban"
            onClick={handleCheckMulti}
            disabled={selectedMulti.length === 0 || isAnswerChecked}
          >
            ✓ Periksa Jawaban ({selectedMulti.length} dipilih)
          </button>
        </div>
      )}

      {/* 4. EXPLANATION MODAL / POPUP IF WRONG (NYAWA BERKURANG) */}
      {pembahasanVisible && !isGameOver && (
        <div className="pembahasan-popup-overlay">
          <div className="pembahasan-card">
            <div className="nyawa-lost-warning-badge">
              <span className="warning-icon">💔</span>
              <span>Jawaban Salah! <strong>-1 Nyawa</strong> (Sisa: {nyawa}/3 ❤️)</span>
            </div>

            <div className="pembahasan-header">
              <span className="pembahasan-icon">💡</span>
              <h4>Penjelasan Edukasi</h4>
            </div>
            <p className="pembahasan-body">{currentSoal.pembahasan}</p>
            <div className="pembahasan-actions">
              <button className="btn-coba-lagi" onClick={handleCobaLagi}>
                🔄 Coba Lagi
              </button>
              <button className="btn-lewati-soal" onClick={() => handleNextSoal(false)}>
                Lanjutkan ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. GAME OVER MODAL (NYAWA HABIS = 0) */}
      {isGameOver && (
        <div className="game-over-popup-overlay">
          <div className="game-over-card">
            <div className="game-over-icon-broken">💔</div>
            <h3 className="game-over-title">Nyawa Habis!</h3>
            <p className="game-over-message">
              Kamu telah kehabisan 3 nyawa pada tantangan ini.
              Jangan berkecil hati, ayo coba lagi dari awal dan taklukkan semua soal!
            </p>
            <div className="game-over-actions">
              <button
                className="btn-game-over-retry"
                onClick={() => {
                  if (onUlangiLevel) {
                    onUlangiLevel()
                  } else {
                    handleUlangiKuis()
                  }
                }}
              >
                🔄 Coba Lagi
              </button>
              <button
                className="btn-game-over-map"
                onClick={() => {
                  if (onKembaliKePeta) {
                    onKembaliKePeta()
                  } else {
                    onJeda()
                  }
                }}
              >
                🗺️ Kembali ke Peta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
