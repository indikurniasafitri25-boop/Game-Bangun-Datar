export interface ShapeData {
  id: string
  nama: string
  deskripsi: string
  warna: string
  sisi: number | string
  sudut: number | string
  simetriLipat: number | string
  simetriPutar: number | string
  rumusLuas: string
  rumusKeliling: string
  contohBenda: string[]
  kalkulator: {
    inputs: { id: string; label: string; def: number; satuan: string }[]
    hitung: (vals: Record<string, number>) => { luas: number; keliling: number; rumusL: string; rumusK: string }
  }
}

export const SHAPES_DATA: ShapeData[] = [
  {
    id: 'segitiga',
    nama: 'Segitiga',
    deskripsi: 'Bangun datar yang dibatasi oleh 3 sisi dan memiliki 3 buah titik sudut. Jumlah sudut dalamnya selalu 180°.',
    warna: '#f4c430',
    sisi: 3,
    sudut: 3,
    simetriLipat: '3 (Sama Sisi) / 1 (Sama Kaki)',
    simetriPutar: '3 (Sama Sisi) / 1 (Sama Kaki)',
    rumusLuas: 'L = ½ × alas × tinggi',
    rumusKeliling: 'K = sisi₁ + sisi₂ + sisi₃',
    contohBenda: ['Potongan Pizza', 'Atap Rumah', 'Rambu Peringatan', 'Penggaris Segitiga'],
    kalkulator: {
      inputs: [
        { id: 'alas', label: 'Alas (a)', def: 8, satuan: 'cm' },
        { id: 'tinggi', label: 'Tinggi (t)', def: 6, satuan: 'cm' },
        { id: 'sisi', label: 'Sisi Miring / Sama Sisi', def: 8, satuan: 'cm' },
      ],
      hitung: (v) => {
        const a = v.alas || 0
        const t = v.tinggi || 0
        const s = v.sisi || 0
        return {
          luas: 0.5 * a * t,
          keliling: a + s + s,
          rumusL: `½ × ${a} × ${t} = ${0.5 * a * t} cm²`,
          rumusK: `${a} + ${s} + ${s} = ${a + s + s} cm`,
        }
      },
    },
  },
  {
    id: 'persegi',
    nama: 'Persegi',
    deskripsi: 'Bangun datar segi empat yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku (90°).',
    warna: '#4da6ff',
    sisi: 4,
    sudut: '4 (semua 90°)',
    simetriLipat: 4,
    simetriPutar: 4,
    rumusLuas: 'L = sisi × sisi (s²)',
    rumusKeliling: 'K = 4 × sisi',
    contohBenda: ['Ubin Lantai', 'Papan Catur', 'Kertas Origami', 'Biskuit Persegi'],
    kalkulator: {
      inputs: [{ id: 'sisi', label: 'Panjang Sisi (s)', def: 7, satuan: 'cm' }],
      hitung: (v) => {
        const s = v.sisi || 0
        return {
          luas: s * s,
          keliling: 4 * s,
          rumusL: `${s} × ${s} = ${s * s} cm²`,
          rumusK: `4 × ${s} = ${4 * s} cm`,
        }
      },
    },
  },
  {
    id: 'persegi-panjang',
    nama: 'Persegi Panjang',
    deskripsi: 'Bangun datar segi empat dengan sisi yang berhadapan sejajar dan sama panjang, serta 4 sudut siku-siku.',
    warna: '#57c785',
    sisi: 4,
    sudut: '4 (semua 90°)',
    simetriLipat: 2,
    simetriPutar: 2,
    rumusLuas: 'L = panjang × lebar (p × l)',
    rumusKeliling: 'K = 2 × (panjang + lebar)',
    contohBenda: ['Pintu Rumah', 'Layar HP', 'Papan Tulis', 'Buku Pelajaran'],
    kalkulator: {
      inputs: [
        { id: 'panjang', label: 'Panjang (p)', def: 10, satuan: 'cm' },
        { id: 'lebar', label: 'Lebbar (l)', def: 5, satuan: 'cm' },
      ],
      hitung: (v) => {
        const p = v.panjang || 0
        const l = v.lebar || 0
        return {
          luas: p * l,
          keliling: 2 * (p + l),
          rumusL: `${p} × ${l} = ${p * l} cm²`,
          rumusK: `2 × (${p} + ${l}) = ${2 * (p + l)} cm`,
        }
      },
    },
  },
  {
    id: 'lingkaran',
    nama: 'Lingkaran',
    deskripsi: 'Bangun datar yang dibentuk oleh sekumpulan titik yang memiliki jarak sama (jari-jari) terhadap titik pusat.',
    warna: '#ff5c5c',
    sisi: '1 garis lengkung',
    sudut: 'Tak hingga (0 titik sudut)',
    simetriLipat: 'Tak terhingga',
    simetriPutar: 'Tak terhingga',
    rumusLuas: 'L = π × r² (atau ¼ × π × d²)',
    rumusKeliling: 'K = 2 × π × r (atau π × d)',
    contohBenda: ['Roda Sepeda', 'Uang Logam', 'Jam Dinding Bulat', 'Piring'],
    kalkulator: {
      inputs: [{ id: 'r', label: 'Jari-jari (r)', def: 7, satuan: 'cm' }],
      hitung: (v) => {
        const r = v.r || 0
        const pi = 22 / 7
        const l = Math.round(pi * r * r * 100) / 100
        const k = Math.round(2 * pi * r * 100) / 100
        return {
          luas: l,
          keliling: k,
          rumusL: `22/7 × ${r}² ≈ ${l} cm²`,
          rumusK: `2 × 22/7 × ${r} ≈ ${k} cm`,
        }
      },
    },
  },
  {
    id: 'trapesium',
    nama: 'Trapesium',
    deskripsi: 'Bangun datar segi empat yang mempunyai tepat sepasang sisi yang saling berhadapan sejajar.',
    warna: '#a855f7',
    sisi: 4,
    sudut: 4,
    simetriLipat: '1 (Sama Kaki) / 0',
    simetriPutar: 1,
    rumusLuas: 'L = ½ × (a + b) × tinggi',
    rumusKeliling: 'K = a + b + c + d',
    contohBenda: ['Atap Gazebo', 'Perahu Kayu', 'Pot Bunga'],
    kalkulator: {
      inputs: [
        { id: 'a', label: 'Sisi Sejajar Atas (a)', def: 6, satuan: 'cm' },
        { id: 'b', label: 'Sisi Sejajar Bawah (b)', def: 10, satuan: 'cm' },
        { id: 't', label: 'Tinggi (t)', def: 4, satuan: 'cm' },
      ],
      hitung: (v) => {
        const a = v.a || 0
        const b = v.b || 0
        const t = v.t || 0
        const l = 0.5 * (a + b) * t
        return {
          luas: l,
          keliling: a + b + 2 * t,
          rumusL: `½ × (${a} + ${b}) × ${t} = ${l} cm²`,
          rumusK: `Perkiraan sisi keliling ≈ ${a + b + 2 * t} cm`,
        }
      },
    },
  },
  {
    id: 'jajar-genjang',
    nama: 'Jajar Genjang',
    deskripsi: 'Bangun datar segi empat yang memiliki 2 pasang sisi berhadapan yang sejajar dan sama panjang, dengan sudut berhadapan sama besar.',
    warna: '#f97316',
    sisi: 4,
    sudut: 4,
    simetriLipat: 0,
    simetriPutar: 2,
    rumusLuas: 'L = alas × tinggi',
    rumusKeliling: 'K = 2 × (alas + sisi miring)',
    contohBenda: ['Motif Batik Parang', 'Penghapus Miring', 'Titian Jembatan'],
    kalkulator: {
      inputs: [
        { id: 'alas', label: 'Alas (a)', def: 8, satuan: 'cm' },
        { id: 'tinggi', label: 'Tinggi (t)', def: 5, satuan: 'cm' },
        { id: 'miring', label: 'Sisi Miring (b)', def: 6, satuan: 'cm' },
      ],
      hitung: (v) => {
        const a = v.alas || 0
        const t = v.tinggi || 0
        const b = v.miring || 0
        return {
          luas: a * t,
          keliling: 2 * (a + b),
          rumusL: `${a} × ${t} = ${a * t} cm²`,
          rumusK: `2 × (${a} + ${b}) = ${2 * (a + b)} cm`,
        }
      },
    },
  },
]
