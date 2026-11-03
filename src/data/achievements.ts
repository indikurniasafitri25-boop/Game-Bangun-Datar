export interface Achievement {
  id: string
  judul: string
  deskripsi: string
  ikon: string
  target: number
  progres: number
  hadiahTipe: 'bintang' | 'permata'
  hadiahJumlah: number
  diklaim: boolean
}

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_1',
    judul: 'Penjelajah Pemula',
    deskripsi: 'Selesaikan level pertama di Pulau Bentuk',
    ikon: '🏝️',
    target: 1,
    progres: 1,
    hadiahTipe: 'bintang',
    hadiahJumlah: 25,
    diklaim: false,
  },
  {
    id: 'ach_2',
    judul: 'Master Segitiga',
    deskripsi: 'Jawab 3 pertanyaan seputar segitiga dengan tepat',
    ikon: '📐',
    target: 3,
    progres: 2,
    hadiahTipe: 'permata',
    hadiahJumlah: 10,
    diklaim: false,
  },
  {
    id: 'ach_3',
    judul: 'Kolektor Bintang',
    deskripsi: 'Kumpulkan total 120 bintang petualangan',
    ikon: '⭐',
    target: 120,
    progres: 120,
    hadiahTipe: 'permata',
    hadiahJumlah: 15,
    diklaim: false,
  },
  {
    id: 'ach_4',
    judul: 'Pakar Rumus Geometri',
    deskripsi: 'Gunakan kalkulator ajaib di menu Materi',
    ikon: '🧮',
    target: 1,
    progres: 1,
    hadiahTipe: 'bintang',
    hadiahJumlah: 30,
    diklaim: false,
  },
  {
    id: 'ach_5',
    judul: 'Raja Bangun Datar',
    deskripsi: 'Buka dan taklukkan semua 5 pulau dunia geometri',
    ikon: '👑',
    target: 5,
    progres: 2,
    hadiahTipe: 'permata',
    hadiahJumlah: 50,
    diklaim: false,
  },
]
