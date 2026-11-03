import { useState, useEffect, useRef, useCallback } from 'react'
import { MaskotSegitiga } from './Illustrations'
import type { DetailLevelData, ExplorationItem } from '../../data/levelData'
import { playCoin, playGem, playBoing, playFanfare, playPop } from '../../utils/audio'

interface LayarEksplorasiProps {
  levelData: DetailLevelData
  onSelesaiEksplorasi: (stats: { koinDikumpulkan: number; bentukDikumpulkan: number; skorEksplorasi: number }) => void
  onJeda: () => void
  sfxEnabled?: boolean
}

interface Platform {
  x: number
  y: number
  width: number
  height: number
  label?: string
}

export default function LayarEksplorasi({
  levelData,
  onSelesaiEksplorasi,
  onJeda,
  sfxEnabled = true,
}: LayarEksplorasiProps) {
  // Game world dimensions
  const WORLD_WIDTH = 1000
  const WORLD_HEIGHT = 500

  // Platforms (Floating islands)
  const PLATFORMS: Platform[] = [
    { x: 20, y: 390, width: 220, height: 70, label: 'Pulau Awal' },
    { x: 280, y: 330, width: 170, height: 60, label: 'Batu Apung 1' },
    { x: 480, y: 260, width: 190, height: 60, label: 'Batu Apung 2' },
    { x: 700, y: 340, width: 160, height: 60, label: 'Batu Apung 3' },
    { x: 860, y: 230, width: 210, height: 80, label: 'Kastil Akhir' },
  ]

  // Player physics state
  const [playerX, setPlayerX] = useState(60)
  const [playerY, setPlayerY] = useState(320)
  const [velocityY, setVelocityY] = useState(0)
  const [isGrounded, setIsGrounded] = useState(true)
  const [facingLeft, setFacingLeft] = useState(false)
  const [isMoving, setIsMoving] = useState(false)

  // Input states
  const keysDown = useRef<{ left: boolean; right: boolean; up: boolean }>({
    left: false,
    right: false,
    up: false,
  })

  // Items remaining in world
  const [items, setItems] = useState<ExplorationItem[]>(levelData.explorationItems)
  const [collectedShapes, setCollectedShapes] = useState<string[]>([])
  const [collectedCoins, setCollectedCoins] = useState(0)
  const [skorEksplorasi, setSkorEksplorasi] = useState(0)
  const [popupScore, setPopupScore] = useState<{ x: number; y: number; text: string } | null>(null)
  const [transisiSelesai, setTransisiSelesai] = useState(false)

  // Reset when level changes
  useEffect(() => {
    setItems(levelData.explorationItems)
    setCollectedShapes([])
    setCollectedCoins(0)
    setSkorEksplorasi(0)
    setPlayerX(60)
    setPlayerY(320)
    setVelocityY(0)
    setTransisiSelesai(false)
  }, [levelData.levelNumber])

  // Camera viewport offset
  const [cameraX, setCameraX] = useState(0)

  // Total target shapes
  const totalShapes = levelData.explorationItems.filter((i) => i.tipe === 'bentuk').length

  // Jump trigger
  const handleJump = useCallback(() => {
    if (isGrounded) {
      setVelocityY(-14.5)
      setIsGrounded(false)
      playBoing(sfxEnabled)
    }
  }, [isGrounded, sfxEnabled])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        keysDown.current.left = true
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        keysDown.current.right = true
      }
      if (['ArrowUp', 'Space', 'KeyW'].includes(e.code)) {
        keysDown.current.up = true
        handleJump()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        keysDown.current.left = false
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        keysDown.current.right = false
      }
      if (['ArrowUp', 'Space', 'KeyW'].includes(e.code)) {
        keysDown.current.up = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleJump])

  // Game physics loop
  useEffect(() => {
    let animId: number

    const updatePhysics = () => {
      let nextX = playerX
      let moving = false

      if (keysDown.current.left) {
        nextX -= 4.5
        setFacingLeft(true)
        moving = true
      }
      if (keysDown.current.right) {
        nextX += 4.5
        setFacingLeft(false)
        moving = true
      }

      nextX = Math.max(30, Math.min(WORLD_WIDTH - 40, nextX))

      let nextY = playerY + velocityY
      let nextVelY = velocityY + 0.75

      const characterWidth = 50
      const characterHeight = 70
      let onPlatform = false

      for (const plat of PLATFORMS) {
        const platTop = plat.y
        const platLeft = plat.x
        const platRight = plat.x + plat.width

        if (
          nextX + characterWidth * 0.5 > platLeft &&
          nextX - characterWidth * 0.5 < platRight &&
          playerY + characterHeight <= platTop + 14 &&
          nextY + characterHeight >= platTop
        ) {
          nextY = platTop - characterHeight
          nextVelY = 0
          onPlatform = true
          break
        }
      }

      if (nextY > WORLD_HEIGHT + 20) {
        nextX = 70
        nextY = 280
        nextVelY = 0
        onPlatform = true
      }

      setPlayerX(nextX)
      setPlayerY(nextY)
      setVelocityY(nextVelY)
      setIsGrounded(onPlatform)
      setIsMoving(moving)

      const targetCamX = Math.max(0, Math.min(WORLD_WIDTH - 540, nextX - 180))
      setCameraX((prev) => prev + (targetCamX - prev) * 0.1)

      const playerCenterX = nextX
      const playerCenterY = nextY + characterHeight * 0.5

      setItems((prevItems) => {
        let itemsChanged = false
        const remaining = prevItems.filter((item) => {
          const itemWorldX = (item.x / 100) * WORLD_WIDTH
          const itemWorldY = (item.y / 100) * WORLD_HEIGHT
          const itemCenterX = itemWorldX + 17
          const itemCenterY = itemWorldY + 17

          const dx = Math.abs(playerCenterX - itemCenterX)
          const dy = Math.abs(playerCenterY - itemCenterY)
          if (dx < 48 && dy < 55) {
            itemsChanged = true
            if (item.tipe === 'bentuk') {
              playGem(sfxEnabled)
              setCollectedShapes((prev) => [...prev, item.id])
              setSkorEksplorasi((s) => s + item.poin)
              setPopupScore({ x: itemWorldX, y: itemWorldY - 20, text: `+${item.poin} Poin` })
            } else {
              playCoin(sfxEnabled)
              setCollectedCoins((c) => c + 1)
              setSkorEksplorasi((s) => s + 5)
              setPopupScore({ x: itemWorldX, y: itemWorldY - 20, text: '+5' })
            }
            setTimeout(() => setPopupScore(null), 900)
            return false
          }
          return true
        })

        return itemsChanged ? remaining : prevItems
      })

      if (nextX >= 900 && !transisiSelesai) {
        setTransisiSelesai(true)
        playFanfare(sfxEnabled)
        setTimeout(() => {
          onSelesaiEksplorasi({
            koinDikumpulkan: collectedCoins,
            bentukDikumpulkan: collectedShapes.length,
            skorEksplorasi: skorEksplorasi + 50,
          })
        }, 1200)
      }

      animId = requestAnimationFrame(updatePhysics)
    }

    animId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(animId)
  }, [playerX, playerY, velocityY, collectedCoins, collectedShapes, skorEksplorasi, transisiSelesai, sfxEnabled, onSelesaiEksplorasi])

  useEffect(() => {
    if (collectedShapes.length >= totalShapes && totalShapes > 0 && !transisiSelesai) {
      setTransisiSelesai(true)
      playFanfare(sfxEnabled)
      setTimeout(() => {
        onSelesaiEksplorasi({
          koinDikumpulkan: collectedCoins,
          bentukDikumpulkan: collectedShapes.length,
          skorEksplorasi: skorEksplorasi + 50,
        })
      }, 1200)
    }
  }, [collectedShapes.length, totalShapes, transisiSelesai, collectedCoins, skorEksplorasi, sfxEnabled, onSelesaiEksplorasi])

  return (
    <div className="layar-game-flow layar-eksplorasi">
      {/* 1. TOP BAR */}
      <div className="flow-top-bar">
        <button
          className="btn-circle-pause"
          onClick={() => {
            playPop(sfxEnabled)
            onJeda()
          }}
          aria-label="Jeda Game"
        >
          ⏸️
        </button>

        <div className="top-counters-group">
          <div className="pill-counter coin-pill">
            <span className="pill-icon">🟡</span>
            <span className="pill-val">{collectedCoins}</span>
          </div>
          <div className="top-stars-group">
            <span className="star-lit">⭐</span>
            <span className={`star-lit ${collectedShapes.length >= Math.ceil(totalShapes * 0.5) ? '' : 'star-dim'}`}>⭐</span>
            <span className={`star-lit ${collectedShapes.length >= totalShapes ? '' : 'star-dim'}`}>⭐</span>
          </div>
        </div>
      </div>

      {/* 2. GOAL BANNER CARD */}
      <div className="goal-banner-card">
        <span className="goal-title">Kumpulkan bentuk & koin!</span>
        <div className="goal-shapes-row">
          {levelData.explorationItems
            .filter((i) => i.tipe === 'bentuk')
            .map((shape) => {
              const isCollected = collectedShapes.includes(shape.id)
              return (
                <div
                  key={shape.id}
                  className={`shape-badge ${isCollected ? 'collected' : ''}`}
                  style={{
                    backgroundColor: shape.warna || '#f59e0b',
                    opacity: isCollected ? 1 : 0.35,
                  }}
                  title={shape.nama}
                >
                  {shape.bentuk === 'segitiga' && '▲'}
                  {shape.bentuk === 'persegi' && '■'}
                  {shape.bentuk === 'lingkaran' && '●'}
                  {shape.bentuk === 'persegi_panjang' && '▬'}
                </div>
              )
            })}
          <div className="goal-counter-pill">
            {collectedShapes.length}/{totalShapes}
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE PLATFORMER WORLD VIEWPORT */}
      <div className="eksplorasi-viewport">
        <div
          className="eksplorasi-world"
          style={{
            transform: `translateX(-${cameraX}px)`,
            width: `${WORLD_WIDTH}px`,
            height: `${WORLD_HEIGHT}px`,
          }}
        >
          <div className="world-backdrop-decorations">
            <div className="distant-mountain m1" />
            <div className="distant-mountain m2" />
            <div className="distant-waterfall w1" />
            <div className="distant-castle-tower" />
          </div>

          {PLATFORMS.map((plat, idx) => (
            <div
              key={idx}
              className={`platform-island plat-${idx}`}
              style={{
                left: `${plat.x}px`,
                top: `${plat.y}px`,
                width: `${plat.width}px`,
                height: `${plat.height}px`,
              }}
            >
              <div className="island-grass-top" />
              <div className="island-rock-body" />
              {idx === 0 && <div className="island-tree" />}
              {idx === 2 && <div className="island-waterfall-drop" />}
            </div>
          ))}

          <div className="checkpoint-flag" style={{ left: '940px', top: '158px' }}>
            <div className="flag-cloth">🚩</div>
            <div className="flag-pole" />
          </div>

          {items.map((item) => {
            const itemX = (item.x / 100) * WORLD_WIDTH
            const itemY = (item.y / 100) * WORLD_HEIGHT

            if (item.tipe === 'bentuk') {
              return (
                <div
                  key={item.id}
                  className={`world-item-shape item-${item.bentuk}`}
                  style={{
                    left: `${itemX}px`,
                    top: `${itemY}px`,
                    backgroundColor: item.warna || '#3b82f6',
                  }}
                >
                  <div className="shape-sparkle-glow" />
                  <span className="shape-char">
                    {item.bentuk === 'segitiga' && '▲'}
                    {item.bentuk === 'persegi' && '■'}
                    {item.bentuk === 'lingkaran' && '●'}
                    {item.bentuk === 'persegi_panjang' && '▬'}
                  </span>
                </div>
              )
            } else {
              return (
                <div
                  key={item.id}
                  className="world-item-coin"
                  style={{ left: `${itemX}px`, top: `${itemY}px` }}
                >
                  <div className="coin-spin">🟡</div>
                </div>
              )
            }
          })}

          {popupScore && (
            <div
              className="popup-score-float"
              style={{ left: `${popupScore.x}px`, top: `${popupScore.y}px` }}
            >
              {popupScore.text}
            </div>
          )}

          <div
            className={`world-player ${facingLeft ? 'face-left' : ''}`}
            style={{
              left: `${playerX - 35}px`,
              top: `${playerY}px`,
              width: '70px',
              height: '75px',
            }}
          >
            <MaskotSegitiga
              pose={!isGrounded ? 'lompat' : isMoving ? 'jalan' : 'diam'}
              size={72}
            />
          </div>
        </div>
      </div>

      {transisiSelesai && (
        <div className="overlay-banner-transisi">
          <div className="banner-transisi-card">
            <h3>🎉 Jelajah Selesai!</h3>
            <p>Bentuk berhasil dikumpulkan. Bersiap untuk kuis tantangan!</p>
          </div>
        </div>
      )}

      {/* 4. ON-SCREEN TOUCH CONTROLS */}
      <div className="touch-controls-bar">
        <div className="dpad-horizontal">
          <button
            className="btn-touch-dpad left"
            onTouchStart={(e) => {
              e.preventDefault()
              keysDown.current.left = true
            }}
            onTouchEnd={() => {
              keysDown.current.left = false
            }}
            onTouchCancel={() => {
              keysDown.current.left = false
            }}
            onMouseDown={() => {
              keysDown.current.left = true
            }}
            onMouseUp={() => {
              keysDown.current.left = false
            }}
            onMouseLeave={() => {
              keysDown.current.left = false
            }}
            aria-label="Gerak Kiri"
          >
            ⬅️
          </button>
          <button
            className="btn-touch-dpad right"
            onTouchStart={(e) => {
              e.preventDefault()
              keysDown.current.right = true
            }}
            onTouchEnd={() => {
              keysDown.current.right = false
            }}
            onTouchCancel={() => {
              keysDown.current.right = false
            }}
            onMouseDown={() => {
              keysDown.current.right = true
            }}
            onMouseUp={() => {
              keysDown.current.right = false
            }}
            onMouseLeave={() => {
              keysDown.current.right = false
            }}
            aria-label="Gerak Kanan"
          >
            ➡️
          </button>
        </div>

        <button
          className="btn-touch-jump"
          onTouchStart={(e) => {
            e.preventDefault()
            handleJump()
          }}
          onMouseDown={handleJump}
          aria-label="Lompat"
        >
          ⬆️
        </button>
      </div>
    </div>
  )
}
