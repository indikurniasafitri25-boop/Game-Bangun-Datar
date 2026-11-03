// High-quality SVG Vector Graphics & Illustrations for Petualangan Bangun Datar

export function MaskotSegitiga({
  pose = 'jalan',
  size = 120,
}: {
  pose?: 'jalan' | 'lompat' | 'senang' | 'diam'
  size?: number
}) {
  const isJumping = pose === 'lompat'
  const isHappy = pose === 'senang'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`maskot-svg ${isJumping ? 'pose-lompat' : ''} ${isHappy ? 'pose-senang' : ''}`}
    >
      <defs>
        <radialGradient id="gradBody" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffea75" />
          <stop offset="65%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <linearGradient id="gradStrap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="gradShoe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
        <filter id="shadowMaskot" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Shadow under character */}
      <ellipse cx="80" cy="148" rx={isJumping ? '20' : '42'} ry="7" fill="rgba(0,0,0,0.22)" />

      {/* Backpack on Left Side */}
      <rect
        x="36"
        y="75"
        width="26"
        height="38"
        rx="8"
        fill="#1e40af"
        stroke="#172554"
        strokeWidth="3"
        filter="url(#shadowMaskot)"
      />
      <rect x="42" y="85" width="14" height="6" rx="3" fill="#60a5fa" />
      <path d="M46 72 C46 62 60 62 60 74" stroke="#93c5fd" strokeWidth="3.5" fill="none" />

      {/* Main Body - 3D Triangle Prism */}
      <path
        d="M80 20 L132 118 C134 122 131 126 126 126 L34 126 C29 126 26 122 28 118 Z"
        fill="url(#gradBody)"
        stroke="#b45309"
        strokeWidth="4"
        strokeLinejoin="round"
        filter="url(#shadowMaskot)"
      />

      {/* Front Facet / Light reflection */}
      <path
        d="M80 23 L126 118 C127 120 126 122 124 122 L80 122 Z"
        fill="rgba(255,255,255,0.18)"
      />

      {/* Backpack Strap across chest */}
      <path d="M56 82 L72 108" stroke="url(#gradStrap)" strokeWidth="6" strokeLinecap="round" />
      <circle cx="72" cy="108" r="3.5" fill="#facc15" />

      {/* Big Expressive Cartoon Eyes */}
      <ellipse cx="68" cy="80" rx="7.5" ry="11" fill="#18181b" />
      <circle cx="66" cy="76" r="3.2" fill="#ffffff" />
      <circle cx="71" cy="84" r="1.5" fill="#ffffff" />

      <ellipse cx="94" cy="80" rx="7.5" ry="11" fill="#18181b" />
      <circle cx="92" cy="76" r="3.2" fill="#ffffff" />
      <circle cx="97" cy="84" r="1.5" fill="#ffffff" />

      {/* Rosy Cheeks */}
      <ellipse cx="56" cy="92" rx="6" ry="3.5" fill="#f87171" opacity="0.75" />
      <ellipse cx="106" cy="92" rx="6" ry="3.5" fill="#f87171" opacity="0.75" />

      {/* Mouth */}
      {isHappy ? (
        <path
          d="M72 94 Q81 112 90 94 Z"
          fill="#dc2626"
          stroke="#991b1b"
          strokeWidth="2"
        />
      ) : (
        <path
          d="M74 94 Q81 104 88 94"
          fill="none"
          stroke="#78350f"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      )}

      {/* Arms */}
      {isHappy ? (
        <>
          <path d="M42 90 Q28 65 34 50" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" />
          <circle cx="34" cy="49" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <path d="M118 90 Q132 65 126 50" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" />
          <circle cx="126" cy="49" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        </>
      ) : (
        <>
          <path d="M44 94 Q34 104 42 112" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" />
          <circle cx="42" cy="112" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          <path d="M116 94 Q126 102 120 112" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" />
          <circle cx="120" cy="112" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        </>
      )}

      {/* Legs & Explorer Hiking Boots */}
      <g>
        <rect x="58" y="124" width="7" height="15" rx="3" fill="#451a03" />
        <ellipse cx="58" cy="141" rx="10" ry="6" fill="url(#gradShoe)" stroke="#271003" strokeWidth="2" />
        <rect x="50" y="139" width="16" height="3" rx="1.5" fill="#facc15" />

        <rect x="94" y="124" width="7" height="15" rx="3" fill="#451a03" />
        <ellipse cx="98" cy="141" rx="10" ry="6" fill="url(#gradShoe)" stroke="#271003" strokeWidth="2" />
        <rect x="90" y="139" width="16" height="3" rx="1.5" fill="#facc15" />
      </g>
    </svg>
  )
}

// Ilustrasi Rumah untuk Level 1
export function IlustrasiRumah({ size = 180 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadowRumah" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.25" />
        </filter>
        <linearGradient id="gradAtap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="gradTembok" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>

      <ellipse cx="100" cy="168" rx="75" ry="8" fill="rgba(0,0,0,0.18)" />

      <rect x="136" y="28" width="22" height="36" rx="3" fill="#991b1b" stroke="#7f1d1d" strokeWidth="2.5" />
      <rect x="133" y="24" width="28" height="7" rx="2" fill="#7f1d1d" />

      {/* House Body (PERSEGI) */}
      <rect
        x="42"
        y="78"
        width="116"
        height="84"
        rx="6"
        fill="url(#gradTembok)"
        stroke="#d97706"
        strokeWidth="4"
        filter="url(#shadowRumah)"
      />

      {/* Roof (SEGITIGA) */}
      <path
        d="M100 18 L176 80 C178 82 176 86 172 86 L28 86 C24 86 22 82 24 80 Z"
        fill="url(#gradAtap)"
        stroke="#991b1b"
        strokeWidth="4"
        strokeLinejoin="round"
        filter="url(#shadowRumah)"
      />
      <path d="M100 24 L164 78" stroke="#fca5a5" strokeWidth="3" opacity="0.6" strokeLinecap="round" />

      {/* Door */}
      <rect x="58" y="106" width="30" height="56" rx="4" fill="#854d0e" stroke="#713f12" strokeWidth="3" />
      <circle cx="82" cy="134" r="3" fill="#facc15" />

      {/* Window */}
      <rect x="108" y="96" width="36" height="36" rx="4" fill="#60a5fa" stroke="#3b82f6" strokeWidth="3" />
      <line x1="126" y1="96" x2="126" y2="132" stroke="#ffffff" strokeWidth="3" />
      <line x1="108" y1="114" x2="144" y2="114" stroke="#ffffff" strokeWidth="3" />
    </svg>
  )
}

// Ilustrasi Jendela Kayu untuk Level 1
export function IlustrasiJendela({ size = 160 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadowJendela" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
        </filter>
        <linearGradient id="gradKayu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>

      <rect
        x="18"
        y="18"
        width="124"
        height="124"
        rx="8"
        fill="url(#gradKayu)"
        stroke="#451a03"
        strokeWidth="5"
        filter="url(#shadowJendela)"
      />

      <rect x="30" y="30" width="46" height="46" rx="4" fill="#93c5fd" />
      <rect x="84" y="30" width="46" height="46" rx="4" fill="#60a5fa" />
      <rect x="30" y="84" width="46" height="46" rx="4" fill="#60a5fa" />
      <rect x="84" y="84" width="46" height="46" rx="4" fill="#3b82f6" />

      <path d="M34 34 L72 34 L34 72 Z" fill="rgba(255,255,255,0.4)" />
      <path d="M88 34 L126 34 L88 72 Z" fill="rgba(255,255,255,0.4)" />

      <line x1="80" y1="22" x2="80" y2="138" stroke="#d97706" strokeWidth="8" strokeLinecap="round" />
      <line x1="22" y1="80" x2="138" y2="80" stroke="#d97706" strokeWidth="8" strokeLinecap="round" />
      <rect x="12" y="142" width="136" height="10" rx="4" fill="#92400e" stroke="#451a03" strokeWidth="2" />
    </svg>
  )
}

// Ilustrasi Segitiga dengan 3 Sisi Tertera (Level 1)
export function IlustrasiSegitigaSisi({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadowSegitiga" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2" />
        </filter>
        <linearGradient id="gradTri" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>

      <polygon
        points="80,24 140,126 20,126"
        fill="url(#gradTri)"
        stroke="#ca8a04"
        strokeWidth="5"
        strokeLinejoin="round"
        filter="url(#shadowSegitiga)"
      />

      <circle cx="44" cy="72" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />
      <text x="44" y="77" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">1</text>

      <circle cx="116" cy="72" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />
      <text x="116" y="77" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">2</text>

      <circle cx="80" cy="138" r="12" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />
      <text x="80" y="143" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">3</text>
    </svg>
  )
}

// LEVEL 2: Ilustrasi Persegi dengan Ciri 4 Sisi Sama & Sudut 90°
export function IlustrasiPersegiFitur({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="110" height="110" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="4" />
      {/* 4 sudut siku-siku */}
      <rect x="27" y="27" width="14" height="14" fill="none" stroke="#dc2626" strokeWidth="2.5" />
      <rect x="119" y="27" width="14" height="14" fill="none" stroke="#dc2626" strokeWidth="2.5" />
      <rect x="27" y="119" width="14" height="14" fill="none" stroke="#dc2626" strokeWidth="2.5" />
      <rect x="119" y="119" width="14" height="14" fill="none" stroke="#dc2626" strokeWidth="2.5" />
      {/* Tanda sisi sama panjang (//) */}
      <line x1="77" y1="21" x2="77" y2="29" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="83" y1="21" x2="83" y2="29" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="77" y1="131" x2="77" y2="139" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="83" y1="131" x2="83" y2="139" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="21" y1="77" x2="29" y2="77" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="21" y1="83" x2="29" y2="83" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="131" y1="77" x2="139" y2="77" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <line x1="131" y1="83" x2="139" y2="83" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      <text x="80" y="85" fill="#1e40af" fontSize="13" fontWeight="bold" textAnchor="middle">4 Sisi Sama</text>
    </svg>
  )
}

// LEVEL 2: Titik Sudut Segi Empat (A, B, C, D)
export function IlustrasiSudutSegiEmpat({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.85} viewBox="0 0 170 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="25" width="110" height="85" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="4" />
      {/* Points */}
      <circle cx="30" cy="25" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
      <text x="30" y="29" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">A</text>
      <circle cx="140" cy="25" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
      <text x="140" y="29" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">B</text>
      <circle cx="140" cy="110" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
      <text x="140" y="114" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">C</text>
      <circle cx="30" cy="110" r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" />
      <text x="30" y="114" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">D</text>
      <text x="85" y="73" fill="#0369a1" fontSize="13" fontWeight="bold" textAnchor="middle">4 Titik Sudut</text>
    </svg>
  )
}

// LEVEL 2: Papan Tulis Kelas
export function IlustrasiPapanTulis({ size = 160 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Frame Kayu */}
      <rect x="10" y="15" width="160" height="95" rx="8" fill="#78350f" stroke="#451a03" strokeWidth="4" />
      {/* Papan Hijau */}
      <rect x="18" y="23" width="144" height="79" rx="4" fill="#15803d" />
      <text x="90" y="55" fill="#fef08a" fontSize="14" fontWeight="bold" textAnchor="middle">Panjang: 8m</text>
      <text x="90" y="78" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">Lebar: 4m</text>
      {/* Tatakan kapur */}
      <rect x="50" y="110" width="80" height="7" rx="2" fill="#d97706" />
    </svg>
  )
}

// LEVEL 2: Ubin Lantai Persegi
export function IlustrasiUbinKeliling({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="35" width="90" height="90" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="4" />
      <path d="M35 35 L125 125 M35 125 L125 35" stroke="#fde68a" strokeWidth="2" strokeDasharray="3 3" />
      {/* Labels keliling */}
      <text x="80" y="25" fill="#b45309" fontSize="12" fontWeight="bold" textAnchor="middle">6 cm</text>
      <text x="80" y="145" fill="#b45309" fontSize="12" fontWeight="bold" textAnchor="middle">6 cm</text>
      <text x="18" y="85" fill="#b45309" fontSize="12" fontWeight="bold" textAnchor="middle">6 cm</text>
      <text x="142" y="85" fill="#b45309" fontSize="12" fontWeight="bold" textAnchor="middle">6 cm</text>
      <text x="80" y="85" fill="#78350f" fontSize="11" fontWeight="bold" textAnchor="middle">Keliling = ?</text>
    </svg>
  )
}

// LEVEL 3: Segitiga Sama Sisi
export function IlustrasiSegitigaSamaSisi({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="80,20 145,130 15,130" fill="#fef08a" stroke="#ca8a04" strokeWidth="4" strokeLinejoin="round" />
      {/* Tanda sisi sama */}
      <line x1="44" y1="72" x2="52" y2="76" stroke="#ca8a04" strokeWidth="3" />
      <line x1="108" y1="76" x2="116" y2="72" stroke="#ca8a04" strokeWidth="3" />
      <line x1="80" y1="126" x2="80" y2="134" stroke="#ca8a04" strokeWidth="3" />
      <text x="80" y="98" fill="#854d0e" fontSize="12" fontWeight="bold" textAnchor="middle">3 Sisi Sama</text>
    </svg>
  )
}

// LEVEL 3: Segitiga Sama Kaki
export function IlustrasiSegitigaSamaKaki({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="80,15 130,135 30,135" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" strokeLinejoin="round" />
      {/* Tanda hanya 2 sisi yang sama */}
      <line x1="52" y1="72" x2="58" y2="76" stroke="#16a34a" strokeWidth="3.5" />
      <line x1="102" y1="76" x2="108" y2="72" stroke="#16a34a" strokeWidth="3.5" />
      <text x="80" y="100" fill="#15803d" fontSize="11" fontWeight="bold" textAnchor="middle">2 Kaki Sama</text>
      <text x="80" y="148" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">Alas berbeda</text>
    </svg>
  )
}

// LEVEL 3: Segitiga Siku-Siku
export function IlustrasiSegitigaSikuSiku({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="35,25 35,130 135,130" fill="#ffedd5" stroke="#ea580c" strokeWidth="4" strokeLinejoin="round" />
      {/* Kotak sudut 90 */}
      <rect x="37" y="112" width="16" height="16" fill="none" stroke="#dc2626" strokeWidth="2.5" />
      <text x="44" y="105" fill="#dc2626" fontSize="11" fontWeight="bold">90°</text>
      <text x="75" y="80" fill="#c2410c" fontSize="12" fontWeight="bold">Siku-Siku</text>
    </svg>
  )
}

// LEVEL 3: Total Sudut Segitiga 180°
export function IlustrasiSegitigaSudut180({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="80,25 140,125 20,125" fill="#fae8ff" stroke="#a855f7" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="80" cy="40" r="4" fill="#9333ea" />
      <circle cx="40" cy="118" r="4" fill="#9333ea" />
      <circle cx="120" cy="118" r="4" fill="#9333ea" />
      <text x="80" y="82" fill="#7e22ce" fontSize="13" fontWeight="bold" textAnchor="middle">Total Sudut</text>
      <text x="80" y="102" fill="#7e22ce" fontSize="18" fontWeight="800" textAnchor="middle">= 180°</text>
    </svg>
  )
}

// LEVEL 4: Lingkaran Jari-Jari (r)
export function IlustrasiLingkaranJariJari({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="60" fill="#fce7f3" stroke="#ec4899" strokeWidth="4" />
      {/* Pusat */}
      <circle cx="80" cy="80" r="5" fill="#be185d" />
      <text x="75" y="72" fill="#be185d" fontSize="12" fontWeight="bold">O</text>
      {/* Garis r */}
      <line x1="80" y1="80" x2="140" y2="80" stroke="#be185d" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="140" cy="80" r="3.5" fill="#be185d" />
      <text x="110" y="73" fill="#be185d" fontSize="14" fontWeight="bold" textAnchor="middle">r (Jari-jari)</text>
    </svg>
  )
}

// LEVEL 4: Lingkaran Diameter (d)
export function IlustrasiLingkaranDiameter({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="60" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="4" />
      <circle cx="80" cy="80" r="4" fill="#3730a3" />
      {/* Diameter membelah */}
      <line x1="20" y1="80" x2="140" y2="80" stroke="#3730a3" strokeWidth="3.5" strokeDasharray="5 3" />
      <circle cx="20" cy="80" r="4" fill="#3730a3" />
      <circle cx="140" cy="80" r="4" fill="#3730a3" />
      <text x="80" y="70" fill="#312e81" fontSize="13" fontWeight="bold" textAnchor="middle">Diameter (d = 2r)</text>
      <text x="80" y="105" fill="#4338ca" fontSize="12" fontWeight="bold" textAnchor="middle">r = 14cm ➔ d = 28cm</text>
    </svg>
  )
}

// LEVEL 4: Garis Lengkung Lingkaran (Tanpa Sudut)
export function IlustrasiLingkaranGarisLengkung({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="58" fill="#ccfbf1" stroke="#0d9488" strokeWidth="4.5" />
      <text x="80" y="75" fill="#0f766e" fontSize="14" fontWeight="bold" textAnchor="middle">0 Titik Sudut</text>
      <text x="80" y="98" fill="#115e59" fontSize="12" fontWeight="bold" textAnchor="middle">1 Garis Lengkung</text>
    </svg>
  )
}

// LEVEL 4: Simetri Lipat Tak Terhingga
export function IlustrasiLingkaranSimetri({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="80" r="56" fill="#fef9c3" stroke="#eab308" strokeWidth="4" />
      <line x1="80" y1="24" x2="80" y2="136" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 3" />
      <line x1="24" y1="80" x2="136" y2="80" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 3" />
      <line x1="40" y1="40" x2="120" y2="120" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 3" />
      <line x1="120" y1="40" x2="40" y2="120" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 3" />
      <text x="80" y="85" fill="#854d0e" fontSize="13" fontWeight="800" textAnchor="middle">Simetri: ∞</text>
    </svg>
  )
}

// LEVEL 5: Trapesium
export function IlustrasiTrapesium({ size = 160 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,25 130,25 160,105 20,105" fill="#fed7aa" stroke="#f97316" strokeWidth="4" strokeLinejoin="round" />
      {/* Panah sisi sejajar atas & bawah */}
      <polygon points="90,19 96,25 90,31" fill="#c2410c" />
      <polygon points="90,99 96,105 90,111" fill="#c2410c" />
      <text x="90" y="65" fill="#9a3412" fontSize="13" fontWeight="bold" textAnchor="middle">Trapesium</text>
      <text x="90" y="82" fill="#c2410c" fontSize="11" fontWeight="600" textAnchor="middle">Sepasang Sisi Sejajar</text>
    </svg>
  )
}

// LEVEL 5: Jajar Genjang
export function IlustrasiJajarGenjang({ size = 160 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="55,25 160,25 125,105 20,105" fill="#e0e7ff" stroke="#6366f1" strokeWidth="4" strokeLinejoin="round" />
      <text x="90" y="65" fill="#4338ca" fontSize="14" fontWeight="bold" textAnchor="middle">Jajar Genjang</text>
      <text x="90" y="82" fill="#3730a3" fontSize="11" fontWeight="600" textAnchor="middle">Sudut Bukan 90°</text>
    </svg>
  )
}

// LEVEL 5: Belah Ketupat
export function IlustrasiBelahKetupat({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="80,18 142,80 80,142 18,80" fill="#fef08a" stroke="#eab308" strokeWidth="4" strokeLinejoin="round" />
      {/* Garis diagonal */}
      <line x1="80" y1="20" x2="80" y2="140" stroke="#ca8a04" strokeWidth="1.8" strokeDasharray="4 3" />
      <line x1="20" y1="80" x2="140" y2="80" stroke="#ca8a04" strokeWidth="1.8" strokeDasharray="4 3" />
      <text x="80" y="75" fill="#854d0e" fontSize="12" fontWeight="bold" textAnchor="middle">Belah</text>
      <text x="80" y="92" fill="#854d0e" fontSize="12" fontWeight="bold" textAnchor="middle">Ketupat</text>
    </svg>
  )
}

// LEVEL 5: Layang-Layang
export function IlustrasiLayangLayang({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="80,15 130,65 80,135 30,65" fill="#cffafe" stroke="#06b6d4" strokeWidth="4" strokeLinejoin="round" />
      <line x1="80" y1="15" x2="80" y2="135" stroke="#0891b2" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="30" y1="65" x2="130" y2="65" stroke="#0891b2" strokeWidth="2" strokeDasharray="3 3" />
      {/* Ekor layangan */}
      <path d="M80 135 Q75 145 85 152" stroke="#f43f5e" strokeWidth="2.5" fill="none" />
      <polygon points="85,150 90,154 83,156" fill="#f43f5e" />
      <text x="80" y="80" fill="#0e7490" fontSize="12" fontWeight="bold" textAnchor="middle">Layang-Layang</text>
    </svg>
  )
}

// LEVEL 6: Total Sudut Segi Empat = 360°
export function IlustrasiSudutTotal360({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="25" width="110" height="110" rx="6" fill="#fdf4ff" stroke="#d946ef" strokeWidth="4" />
      <circle cx="35" cy="35" r="8" fill="#a21caf" opacity="0.3" />
      <circle cx="125" cy="35" r="8" fill="#a21caf" opacity="0.3" />
      <circle cx="125" cy="125" r="8" fill="#a21caf" opacity="0.3" />
      <circle cx="35" cy="125" r="8" fill="#a21caf" opacity="0.3" />
      <text x="80" y="75" fill="#86198f" fontSize="13" fontWeight="bold" textAnchor="middle">Semua Segi Empat</text>
      <text x="80" y="100" fill="#c026d3" fontSize="20" fontWeight="800" textAnchor="middle">= 360°</text>
    </svg>
  )
}

// LEVEL 6: Taman Segitiga 12m
export function IlustrasiTamanSegitiga({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="80,20 145,130 15,130" fill="#bbf7d0" stroke="#16a34a" strokeWidth="4" strokeLinejoin="round" />
      {/* Bunga mini */}
      <circle cx="80" cy="85" r="8" fill="#f43f5e" />
      <circle cx="80" cy="85" r="4" fill="#facc15" />
      <text x="44" y="65" fill="#15803d" fontSize="12" fontWeight="bold">12m</text>
      <text x="115" y="65" fill="#15803d" fontSize="12" fontWeight="bold">12m</text>
      <text x="80" y="146" fill="#15803d" fontSize="12" fontWeight="bold" textAnchor="middle">12m</text>
      <text x="80" y="108" fill="#166534" fontSize="10" fontWeight="bold" textAnchor="middle">Keliling = ?</text>
    </svg>
  )
}

// LEVEL 6: Bangun Gabungan Rumah (5 Sisi Luar)
export function IlustrasiBangunGabungan({ size = 160 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dinding Persegi */}
      <rect x="45" y="65" width="90" height="70" fill="#fed7aa" stroke="#ea580c" strokeWidth="4" />
      {/* Atap Segitiga */}
      <polygon points="90,15 145,65 35,65" fill="#fecaca" stroke="#dc2626" strokeWidth="4" strokeLinejoin="round" />
      {/* Panah tanda 5 sisi luar */}
      <circle cx="60" cy="35" r="8" fill="#2563eb" />
      <text x="60" y="39" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">1</text>
      <circle cx="120" cy="35" r="8" fill="#2563eb" />
      <text x="120" y="39" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">2</text>
      <circle cx="140" cy="100" r="8" fill="#2563eb" />
      <text x="140" y="104" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">3</text>
      <circle cx="90" cy="140" r="8" fill="#2563eb" />
      <text x="90" y="144" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">4</text>
      <circle cx="40" cy="100" r="8" fill="#2563eb" />
      <text x="40" y="104" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">5</text>
      <text x="90" y="98" fill="#9a3412" fontSize="12" fontWeight="bold" textAnchor="middle">5 Sisi Luar</text>
    </svg>
  )
}

// LEVEL 6: Pizza Dipotong Tengah
export function IlustrasiPizzaTengah({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Setengah lingkaran */}
      <path d="M20 90 A60 60 0 0 1 140 90 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="4" />
      {/* Topping pepperoni */}
      <circle cx="60" cy="65" r="6" fill="#dc2626" />
      <circle cx="95" cy="55" r="6" fill="#dc2626" />
      <circle cx="80" cy="78" r="6" fill="#dc2626" />
      {/* Garis diameter lurus */}
      <line x1="20" y1="90" x2="140" y2="90" stroke="#991b1b" strokeWidth="4" />
      <text x="80" y="112" fill="#991b1b" fontSize="13" fontWeight="bold" textAnchor="middle">Diameter: 30 cm</text>
      <text x="80" y="130" fill="#64748b" fontSize="10" textAnchor="middle">(Garis Lurus Tengah)</text>
    </svg>
  )
}

// Ilustrasi Objek-objek dalam Kehidupan Nyata
export function IlustrasiBenda({
  tipe,
  size = 64,
}: {
  tipe:
    | 'bola'
    | 'tenda'
    | 'jam'
    | 'buku'
    | 'meja'
    | 'keju'
    | 'pintu'
    | 'buku_tulis'
    | 'penggaris'
    | 'pizza'
    | 'koin'
    | 'roda'
    | 'kancing'
    | 'donat'
    | 'layangan'
    | string
  size?: number
}) {
  switch (tipe) {
    case 'bola':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="32" fill="#ffffff" stroke="#18181b" strokeWidth="3" />
          <polygon points="40,26 49,33 46,43 34,43 31,33" fill="#18181b" />
          <path d="M40 26 L40 10 M49 33 L62 30 M46 43 L54 56 M34 43 L26 56 M31 33 L18 30" stroke="#18181b" strokeWidth="3" />
        </svg>
      )
    case 'tenda':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <polygon points="40,14 70,64 10,64" fill="#ef4444" stroke="#b91c1c" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="40,14 52,64 28,64" fill="#b91c1c" />
          <polygon points="40,24 47,64 33,64" fill="#fef08a" />
        </svg>
      )
    case 'jam':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="32" fill="#fed7aa" stroke="#ea580c" strokeWidth="4" />
          <circle cx="40" cy="40" r="26" fill="#ffffff" stroke="#c2410c" strokeWidth="2" />
          <circle cx="40" cy="40" r="3" fill="#c2410c" />
          <line x1="40" y1="40" x2="40" y2="22" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="40" y1="40" x2="54" y2="40" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="40" cy="18" r="1.5" fill="#78350f" />
          <circle cx="62" cy="40" r="1.5" fill="#78350f" />
          <circle cx="40" cy="62" r="1.5" fill="#78350f" />
          <circle cx="18" cy="40" r="1.5" fill="#78350f" />
        </svg>
      )
    case 'buku':
    case 'buku_tulis':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <rect x="14" y="16" width="52" height="48" rx="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
          <rect x="18" y="20" width="44" height="40" rx="3" fill="#eff6ff" />
          <line x1="24" y1="28" x2="48" y2="28" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="36" x2="54" y2="36" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="44" x2="42" y2="44" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M48 16 L48 30 L54 26 L60 30 L60 16 Z" fill="#ef4444" />
        </svg>
      )
    case 'meja':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <rect x="8" y="26" width="64" height="18" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="3" />
          <rect x="14" y="44" width="7" height="24" rx="2" fill="#78350f" />
          <rect x="59" y="44" width="7" height="24" rx="2" fill="#78350f" />
          <rect x="24" y="44" width="5" height="18" rx="1.5" fill="#92400e" opacity="0.6" />
          <rect x="51" y="44" width="5" height="18" rx="1.5" fill="#92400e" opacity="0.6" />
        </svg>
      )
    case 'keju':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <polygon points="12,58 70,58 40,20" fill="#facc15" stroke="#ca8a04" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="34" cy="46" r="4" fill="#eab308" />
          <circle cx="48" cy="48" r="5" fill="#eab308" />
          <circle cx="40" cy="32" r="3" fill="#eab308" />
        </svg>
      )
    case 'pintu':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <rect x="20" y="10" width="40" height="60" rx="3" fill="#92400e" stroke="#713f12" strokeWidth="3" />
          <rect x="25" y="16" width="30" height="22" rx="2" fill="#b45309" stroke="#713f12" strokeWidth="2" />
          <rect x="25" y="42" width="30" height="22" rx="2" fill="#b45309" stroke="#713f12" strokeWidth="2" />
          <circle cx="53" cy="40" r="3.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        </svg>
      )
    case 'penggaris':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <polygon points="15,15 15,68 68,68" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
          <polygon points="24,35 24,59 48,59" fill="#ffffff" stroke="#ca8a04" strokeWidth="2" />
        </svg>
      )
    case 'pizza':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <path d="M40 15 L68 65 A35 35 0 0 1 12 65 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
          <circle cx="40" cy="45" r="4.5" fill="#ef4444" />
          <circle cx="32" cy="58" r="4" fill="#ef4444" />
          <circle cx="50" cy="55" r="4" fill="#ef4444" />
        </svg>
      )
    case 'koin':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="28" fill="#facc15" stroke="#ca8a04" strokeWidth="3.5" />
          <circle cx="40" cy="40" r="21" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
          <text x="40" y="46" fill="#b45309" fontSize="16" fontWeight="bold" textAnchor="middle">★</text>
        </svg>
      )
    case 'roda':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="28" fill="#334155" stroke="#0f172a" strokeWidth="3.5" />
          <circle cx="40" cy="40" r="18" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          <circle cx="40" cy="40" r="6" fill="#0f172a" />
          <line x1="40" y1="12" x2="40" y2="68" stroke="#475569" strokeWidth="2" />
          <line x1="12" y1="40" x2="68" y2="40" stroke="#475569" strokeWidth="2" />
        </svg>
      )
    case 'kancing':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="26" fill="#ec4899" stroke="#be185d" strokeWidth="3.5" />
          <circle cx="33" cy="33" r="3" fill="#ffffff" />
          <circle cx="47" cy="33" r="3" fill="#ffffff" />
          <circle cx="33" cy="47" r="3" fill="#ffffff" />
          <circle cx="47" cy="47" r="3" fill="#ffffff" />
        </svg>
      )
    case 'donat':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="28" fill="#d97706" stroke="#92400e" strokeWidth="3" />
          <circle cx="40" cy="39" r="24" fill="#f472b6" />
          <circle cx="40" cy="40" r="11" fill="#ffffff" stroke="#92400e" strokeWidth="2.5" />
          <circle cx="30" cy="28" r="1.5" fill="#facc15" />
          <circle cx="52" cy="32" r="1.5" fill="#38bdf8" />
          <circle cx="48" cy="52" r="1.5" fill="#4ade80" />
        </svg>
      )
    case 'layangan':
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <polygon points="40,12 65,38 40,68 15,38" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2.5" />
          <line x1="40" y1="12" x2="40" y2="68" stroke="#6d28d9" strokeWidth="1.5" />
          <line x1="15" y1="38" x2="65" y2="38" stroke="#6d28d9" strokeWidth="1.5" />
        </svg>
      )
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="26" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
          <text x="40" y="46" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">?</text>
        </svg>
      )
  }
}
