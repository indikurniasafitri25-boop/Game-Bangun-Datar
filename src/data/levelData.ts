// Data Soal, Tantangan, dan Aturan Scoring sesuai Design Doc Petualangan Bangun Datar

export interface ExplorationItem {
  id: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  tipe: 'bentuk' | 'koin'
  nama: string
  bentuk?: 'segitiga' | 'persegi' | 'lingkaran' | 'persegi_panjang'
  warna?: string
  poin: number
}

export type TipeSoal = 'pilihan_tunggal' | 'multi_select' | 'angka'

export interface OpsiSoal {
  id: string
  label: string
  ikonBentuk?: 'segitiga' | 'persegi' | 'persegi_panjang' | 'lingkaran'
  warnaIkon?: string
  gambarUrl?: string
  subteks?: string
}

export type IlustrasiTipe =
  | 'rumah'
  | 'jendela'
  | 'segitiga_sisi'
  | 'grid_lingkaran'
  | 'grid_persegi_panjang'
  | 'persegi_fitur'
  | 'sudut_segiempat'
  | 'papan_tulis'
  | 'ubin_keliling'
  | 'segitiga_sama_sisi'
  | 'segitiga_sama_kaki'
  | 'segitiga_siku_siku'
  | 'segitiga_sudut_180'
  | 'lingkaran_jari_jari'
  | 'lingkaran_diameter'
  | 'lingkaran_garis_lengkung'
  | 'lingkaran_simetri'
  | 'trapesium'
  | 'jajar_genjang'
  | 'belah_ketupat'
  | 'layang_layang'
  | 'sudut_total_360'
  | 'taman_segitiga'
  | 'bangun_gabungan_rumah'
  | 'pizza_tengah'
  | 'grid_multi'
  | 'benda_jam'
  | 'benda_roda'
  | 'benda_pintu'

export interface TantanganSoal {
  id: number
  judulKategori: string
  tipe: TipeSoal
  pertanyaan: string
  ilustrasiTipe: IlustrasiTipe
  opsi: OpsiSoal[]
  kunciJawaban: string | string[]
  pembahasan: string
  petunjuk?: string
}

export interface TargetBentukInfo {
  bentuk: 'segitiga' | 'persegi' | 'persegi_panjang' | 'lingkaran'
  label: string
  warna: string
  sublabel?: string
  isOutline?: boolean
}

export interface DetailLevelData {
  levelNumber: number
  namaLevel: string
  subjudulPulau: string
  duniaNama: string
  tujuan: string
  estimasiWaktu: string
  totalTantangan: number
  hadiahXp: number
  hadiahKoin: number
  waktuTimer?: number
  kesulitan?: 'Sangat Mudah' | 'Mudah' | 'Menengah' | 'Menengah-Mahir' | 'Mahir' | 'Master'
  misiPetualangan?: string
  targetBentuk?: TargetBentukInfo[]
  soalList: TantanganSoal[]
  explorationItems: ExplorationItem[]
}

// ============================================================================
// LEVEL 1: Pulau Bentuk (Difficulty: Sangat Mudah)
// ============================================================================
export const LEVEL_1_DATA: DetailLevelData = {
  levelNumber: 1,
  namaLevel: 'Pulau Bentuk',
  subjudulPulau: 'Mengenal bentuk dasar',
  duniaNama: 'Dunia 1 - Pulau Bentuk',
  tujuan: 'Mengenal dan mengidentifikasi bentuk dasar segitiga, persegi, dan lingkaran.',
  misiPetualangan: 'Temukan dan kumpulkan bentuk-bentuk dasar di sekitar Pulau Bentuk!',
  targetBentuk: [
    { bentuk: 'segitiga', label: 'Segitiga', warna: '#f59e0b', sublabel: '3 sisi' },
    { bentuk: 'persegi', label: 'Persegi', warna: '#3b82f6', sublabel: '4 sisi' },
    { bentuk: 'lingkaran', label: 'Lingkaran', warna: '#ec4899', sublabel: 'Bulat' },
  ],
  estimasiWaktu: '3-4 menit',
  totalTantangan: 5,
  hadiahXp: 100,
  hadiahKoin: 100,
  waktuTimer: 50,
  kesulitan: 'Sangat Mudah',
  explorationItems: [
    { id: 'shape_triangle', x: 14, y: 64, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Segitiga Kuning', warna: '#f59e0b', poin: 10 },
    { id: 'shape_square', x: 36, y: 52, tipe: 'bentuk', bentuk: 'persegi', nama: 'Persegi Biru', warna: '#3b82f6', poin: 10 },
    { id: 'shape_circle', x: 56, y: 38, tipe: 'bentuk', bentuk: 'lingkaran', nama: 'Lingkaran Pink', warna: '#ec4899', poin: 10 },
    { id: 'shape_rect', x: 76, y: 54, tipe: 'bentuk', bentuk: 'persegi_panjang', nama: 'Persegi Panjang Hijau', warna: '#10b981', poin: 10 },
    { id: 'shape_star', x: 92, y: 32, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Kristal Geometri', warna: '#8b5cf6', poin: 10 },
    { id: 'coin_1', x: 8, y: 66, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_2', x: 22, y: 64, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_3', x: 28, y: 58, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_4', x: 44, y: 48, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_5', x: 64, y: 39, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_6', x: 84, y: 54, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
  ],
  soalList: [
    {
      id: 1,
      judulKategori: '1. Mengenal Segitiga',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Manakah gambar yang berbentuk segitiga?',
      ilustrasiTipe: 'segitiga_sisi',
      opsi: [
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: 'Memiliki 3 sisi runcing' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: 'Kotak 4 sisi sama' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Bulat tanpa sudut' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981', subteks: 'Kotak panjang' },
      ],
      kunciJawaban: 'segitiga',
      pembahasan: 'Hebat! Segitiga adalah bangun datar yang dibatasi oleh 3 sisi garis lurus dan mempunyai 3 titik sudut.',
      petunjuk: 'Cari bangun datar yang memiliki 3 sisi garis lurus!',
    },
    {
      id: 2,
      judulKategori: '2. Mengenal Lingkaran',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bangun datar manakah yang berbentuk bulat?',
      ilustrasiTipe: 'lingkaran_garis_lengkung',
      opsi: [
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Melingkar bulat sempurna' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: 'Kotak dengan 4 sisi' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: 'Memiliki 3 sudut tajam' },
        { id: 'trapesium', label: 'Trapesium', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981', subteks: 'Segi empat miring' },
      ],
      kunciJawaban: 'lingkaran',
      pembahasan: 'Tepat sekali! Lingkaran adalah bangun datar yang berbentuk bulat karena hanya dibatasi oleh garis lengkung tertutup tanpa sudut.',
      petunjuk: 'Bentuknya melingkar bulat mulus seperti uang koin atau roda!',
    },
    {
      id: 3,
      judulKategori: '3. Mengenal Persegi',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Pilih gambar yang merupakan persegi.',
      ilustrasiTipe: 'persegi_fitur',
      opsi: [
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: 'Keempat sisinya sama panjang' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: 'Memiliki 3 sisi' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Bulat melingkar' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981', subteks: 'Sisi panjang & lebar berbeda' },
      ],
      kunciJawaban: 'persegi',
      pembahasan: 'Pintar! Persegi adalah bangun datar segi empat yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku (90°).',
      petunjuk: 'Cari kotak yang keempat sisinya berukuran sama persis!',
    },
    {
      id: 4,
      judulKategori: '4. Jumlah Sisi Segitiga',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bentuk apa yang memiliki tiga sisi?',
      ilustrasiTipe: 'segitiga_sisi',
      opsi: [
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: 'Tepat 3 sisi garis lurus' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: 'Memiliki 4 sisi sama' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Hanya 1 garis lengkung' },
        { id: 'segi_lima', label: 'Segi Lima', ikonBentuk: 'segitiga', warnaIkon: '#8b5cf6', subteks: 'Memiliki 5 sisi' },
      ],
      kunciJawaban: 'segitiga',
      pembahasan: 'Benar sekali! Segitiga adalah satu-satunya bangun datar dasar yang dibatasi oleh tepat 3 sisi garis lurus.',
      petunjuk: 'Perhatikan namanya: SEGI-TIGA memiliki 3 sisi!',
    },
    {
      id: 5,
      judulKategori: '5. Sisi Sama Panjang',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bangun datar apa yang memiliki empat sisi sama panjang?',
      ilustrasiTipe: 'persegi_fitur',
      opsi: [
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: 'Semua 4 sisinya sama panjang' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: 'Hanya memiliki 3 sisi' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Tidak memiliki sisi lurus' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981', subteks: 'Hanya sisi berhadapan yang sama' },
      ],
      kunciJawaban: 'persegi',
      pembahasan: 'Luar biasa! Persegi (bujur sangkar) adalah bangun segi empat yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku.',
      petunjuk: 'Perhatikan kata kuncinya: EMPAT sisi SAMA panjang!',
    },
  ],
}

// ============================================================================
// LEVEL 2: Lembah Bentuk (Difficulty: Mudah)
// ============================================================================
export const LEVEL_2_DATA: DetailLevelData = {
  levelNumber: 2,
  namaLevel: 'Lembah Bentuk',
  subjudulPulau: 'Pemahaman • Mengenali sisi dan titik sudut',
  duniaNama: 'Dunia 1 - Pulau Bentuk',
  tujuan: 'Siswa mampu menyebutkan jumlah sisi dan titik sudut pada bangun datar sederhana.',
  misiPetualangan: 'Kumpulkan bentuk dengan ciri berbeda: sisi, sudut, dan bentuk tanpa sudut.',
  targetBentuk: [
    { bentuk: 'segitiga', label: '3 sisi', warna: '#f59e0b', sublabel: 'Segitiga' },
    { bentuk: 'persegi', label: '4 sisi', warna: '#3b82f6', sublabel: 'Persegi' },
    { bentuk: 'lingkaran', label: 'Titik sudut', warna: '#ec4899', sublabel: 'Lingkaran' },
  ],
  estimasiWaktu: '3-4 menit',
  totalTantangan: 5,
  hadiahXp: 150,
  hadiahKoin: 150,
  waktuTimer: 50,
  kesulitan: 'Mudah',
  explorationItems: [
    { id: 'shape_triangle_yellow', x: 16, y: 64, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Segitiga (3 sisi)', warna: '#f59e0b', poin: 15 },
    { id: 'shape_square_blue', x: 45, y: 50, tipe: 'bentuk', bentuk: 'persegi', nama: 'Persegi (4 sisi)', warna: '#3b82f6', poin: 15 },
    { id: 'shape_circle_pink', x: 78, y: 40, tipe: 'bentuk', bentuk: 'lingkaran', nama: 'Lingkaran (Bentuk tanpa sudut)', warna: '#ec4899', poin: 15 },
    { id: 'coin_1', x: 8, y: 66, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_2', x: 28, y: 58, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_3', x: 62, y: 46, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_4', x: 90, y: 34, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
  ],
  soalList: [
    {
      id: 1,
      judulKategori: '1. Sisi Segitiga',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Berapa jumlah sisi pada segitiga?',
      ilustrasiTipe: 'segitiga_sisi',
      opsi: [
        { id: '3', label: '3 sisi', warnaIkon: '#f59e0b', ikonBentuk: 'segitiga' },
        { id: '4', label: '4 sisi', warnaIkon: '#3b82f6', ikonBentuk: 'persegi' },
        { id: '5', label: '5 sisi', warnaIkon: '#10b981' },
        { id: '6', label: '6 sisi', warnaIkon: '#8b5cf6' },
      ],
      kunciJawaban: '3',
      pembahasan: 'Hebat! Segitiga selalu memiliki tepat 3 sisi garis lurus dan 3 titik sudut.',
      petunjuk: 'Hitung garis-garis pembatas bernomor 1, 2, dan 3 pada gambar segitiga!',
    },
    {
      id: 2,
      judulKategori: '2. Titik Sudut Persegi',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Berapa jumlah titik sudut pada persegi?',
      ilustrasiTipe: 'sudut_segiempat',
      opsi: [
        { id: '3', label: '3 titik sudut', warnaIkon: '#f59e0b', ikonBentuk: 'segitiga' },
        { id: '4', label: '4 titik sudut', warnaIkon: '#3b82f6', ikonBentuk: 'persegi' },
        { id: '5', label: '5 titik sudut', warnaIkon: '#10b981' },
        { id: '0', label: '0 titik sudut', warnaIkon: '#ec4899', ikonBentuk: 'lingkaran' },
      ],
      kunciJawaban: '4',
      pembahasan: 'Tepat sekali! Persegi memiliki 4 titik sudut yang semuanya membentuk sudut siku-siku (90°).',
      petunjuk: 'Hitung setiap pojokan atau titik sudut A, B, C, dan D pada persegi!',
    },
    {
      id: 3,
      judulKategori: '3. Titik Sudut Lingkaran',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Berapa jumlah titik sudut pada lingkaran?',
      ilustrasiTipe: 'lingkaran_garis_lengkung',
      opsi: [
        { id: '0', label: '0 (Tidak ada titik sudut)', warnaIkon: '#ec4899', ikonBentuk: 'lingkaran' },
        { id: '1', label: '1 titik sudut', warnaIkon: '#3b82f6' },
        { id: '3', label: '3 titik sudut', warnaIkon: '#f59e0b', ikonBentuk: 'segitiga' },
        { id: '4', label: '4 titik sudut', warnaIkon: '#10b981', ikonBentuk: 'persegi' },
      ],
      kunciJawaban: '0',
      pembahasan: 'Pintar! Lingkaran dibatasi oleh satu kurva garis lengkung tertutup tanpa pertemuan dua garis lurus, sehingga tidak memiliki titik sudut sama sekali (0 titik sudut).',
      petunjuk: 'Lingkaran bundar mulus tanpa memiliki sudut atau pojokan runcing!',
    },
    {
      id: 4,
      judulKategori: '4. Bangun Empat Sisi',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bangun datar apa yang memiliki empat sisi?',
      ilustrasiTipe: 'persegi_fitur',
      opsi: [
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: '4 sisi sama panjang' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: '3 sisi' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: '1 garis lengkung' },
        { id: 'oval', label: 'Oval', ikonBentuk: 'lingkaran', warnaIkon: '#8b5cf6', subteks: 'Garis lengkung lonjong' },
      ],
      kunciJawaban: 'persegi',
      pembahasan: 'Benar sekali! Persegi adalah bangun segi empat yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku.',
      petunjuk: 'Perhatikan bangun datar yang memiliki 4 sisi garis lurus!',
    },
    {
      id: 5,
      judulKategori: '5. Bangun Tanpa Titik Sudut',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bangun datar apa yang tidak memiliki titik sudut?',
      ilustrasiTipe: 'lingkaran_garis_lengkung',
      opsi: [
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Bulat tanpa pojok' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: 'Memiliki 4 sudut' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: 'Memiliki 3 sudut' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981', subteks: 'Memiliki 4 sudut' },
      ],
      kunciJawaban: 'lingkaran',
      pembahasan: 'Luar biasa! Lingkaran adalah bangun datar yang tidak memiliki titik sudut karena seluruh sisinya merupakan satu garis lengkung melingkar tertutup.',
      petunjuk: 'Bentuknya bundar sempurna tanpa ada sudut atau pojokan!',
    },
  ],
}

// ============================================================================
// LEVEL 3: Hutan Bentuk (Difficulty: Mudah)
// ============================================================================
export const LEVEL_3_DATA: DetailLevelData = {
  levelNumber: 3,
  namaLevel: 'Hutan Bentuk',
  subjudulPulau: 'Penerapan • Menemukan bentuk di sekitar kita',
  duniaNama: 'Dunia 1 - Pulau Bentuk',
  tujuan: 'Siswa mampu mengidentifikasi bangun datar pada benda-benda sehari-hari.',
  misiPetualangan: 'Cari objek di hutan: jam, atap rumah, dan ubin dengan bentuk yang sesuai.',
  targetBentuk: [
    { bentuk: 'lingkaran', label: 'Jam', warna: '#ea580c', isOutline: true },
    { bentuk: 'segitiga', label: 'Atap rumah', warna: '#ea580c', isOutline: false },
    { bentuk: 'persegi', label: 'Ubin', warna: '#16a34a', isOutline: true },
  ],
  estimasiWaktu: '3-4 menit',
  totalTantangan: 5,
  hadiahXp: 200,
  hadiahKoin: 200,
  waktuTimer: 50,
  kesulitan: 'Mudah',
  explorationItems: [
    { id: 'item_jam', x: 18, y: 62, tipe: 'bentuk', bentuk: 'lingkaran', nama: 'Jam Dinding Bulat', warna: '#ea580c', poin: 20 },
    { id: 'item_atap', x: 48, y: 50, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Atap Rumah Segitiga', warna: '#ef4444', poin: 20 },
    { id: 'item_ubin', x: 78, y: 40, tipe: 'bentuk', bentuk: 'persegi', nama: 'Ubin Persegi', warna: '#16a34a', poin: 20 },
    { id: 'coin_1', x: 8, y: 66, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_2', x: 30, y: 58, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_3', x: 62, y: 46, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_4', x: 90, y: 34, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
  ],
  soalList: [
    {
      id: 1,
      judulKategori: '1. Benda Lingkaran',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Jam dinding berbentuk bulat menyerupai bangun datar apa?',
      ilustrasiTipe: 'benda_jam',
      opsi: [
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Melingkar bulat' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: 'Kotak 4 sisi' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: '3 sisi runcing' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981', subteks: 'Kotak panjang' },
      ],
      kunciJawaban: 'lingkaran',
      pembahasan: 'Jam dinding yang berbentuk bulat melingkar menyerupai bangun datar Lingkaran karena garis pembatasnya berupa kurva melingkar tanpa sudut.',
      petunjuk: 'Perhatikan bentuk bundar melingkar pada jam dinding!',
    },
    {
      id: 2,
      judulKategori: '2. Benda Segitiga',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Atap rumah pada gambar menyerupai bentuk apa?',
      ilustrasiTipe: 'rumah',
      opsi: [
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: 'Memiliki 3 sisi miring' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Bulat tanpa sudut' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: '4 sisi sama panjang' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981', subteks: 'Kotak panjang' },
      ],
      kunciJawaban: 'segitiga',
      pembahasan: 'Atap rumah pada gambar memiliki 3 sisi dan ujung lancip di atas, sehingga menyerupai bangun datar Segitiga.',
      petunjuk: 'Perhatikan bagian paling atas rumah yang berwarna merah kecokelatan!',
    },
    {
      id: 3,
      judulKategori: '3. Benda Persegi',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Ubin dengan empat sisi sama panjang menyerupai apa?',
      ilustrasiTipe: 'ubin_keliling',
      opsi: [
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: 'Keempat sisinya sama panjang' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: 'Hanya memiliki 3 sisi' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Bulat melingkar' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981', subteks: 'Sisi panjang dan lebar berbeda' },
      ],
      kunciJawaban: 'persegi',
      pembahasan: 'Ubin lantai yang memiliki 4 sisi sama panjang menyerupai bangun datar Persegi (bujur sangkar).',
      petunjuk: 'Ubin tersebut berbentuk kotak dengan keempat sisi yang sama ukurannya.',
    },
    {
      id: 4,
      judulKategori: '4. Benda Persegi Panjang',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Pintu berbentuk persegi panjang memiliki berapa sisi?',
      ilustrasiTipe: 'benda_pintu',
      opsi: [
        { id: '4', label: '4 sisi', warnaIkon: '#10b981', ikonBentuk: 'persegi_panjang' },
        { id: '3', label: '3 sisi', warnaIkon: '#f59e0b', ikonBentuk: 'segitiga' },
        { id: '5', label: '5 sisi', warnaIkon: '#3b82f6' },
        { id: '0', label: '0 sisi', warnaIkon: '#ec4899', ikonBentuk: 'lingkaran' },
      ],
      kunciJawaban: '4',
      pembahasan: 'Pintu yang berbentuk persegi panjang memiliki tepat 4 sisi garis lurus (sisi atas, bawah, kiri, dan kanan).',
      petunjuk: 'Hitung garis pembatas pada pintu: sisi kiri, kanan, atas, dan bawah!',
    },
    {
      id: 5,
      judulKategori: '5. Roda Sepeda',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Roda sepeda jika dilihat dari samping berbentuk apa?',
      ilustrasiTipe: 'benda_roda',
      opsi: [
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Bulat melingkar' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6', subteks: 'Kotak bersudut' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: '3 sudut lancip' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981', subteks: 'Kotak panjang' },
      ],
      kunciJawaban: 'lingkaran',
      pembahasan: 'Roda sepeda berputar lancar karena permukaannya berbentuk Lingkaran bulat sempurna tanpa sudut.',
      petunjuk: 'Roda berputar karena permukaannya bulat melingkar!',
    },
  ],
}

// ============================================================================
// LEVEL 4: Danau Lingkaran (Difficulty: Menengah - Mahir)
// ============================================================================
export const LEVEL_4_DATA: DetailLevelData = {
  levelNumber: 4,
  namaLevel: 'Danau Lingkaran',
  subjudulPulau: 'Jari-Jari, Diameter & Simetri',
  duniaNama: 'Dunia 1 - Pulau Bentuk',
  tujuan: 'Memahami titik pusat, jari-jari (r), diameter (d = 2r), simetri lipat tak hingga, dan ketiadaan sudut.',
  estimasiWaktu: '4-5 menit',
  totalTantangan: 5,
  hadiahXp: 250,
  hadiahKoin: 250,
  waktuTimer: 35,
  kesulitan: 'Menengah-Mahir',
  explorationItems: [
    { id: 'shape_cir_pink', x: 14, y: 64, tipe: 'bentuk', bentuk: 'lingkaran', nama: 'Mutiara Pink', warna: '#ec4899', poin: 25 },
    { id: 'shape_cir_blue', x: 36, y: 52, tipe: 'bentuk', bentuk: 'lingkaran', nama: 'Kristal Air Bulat', warna: '#38bdf8', poin: 25 },
    { id: 'shape_cir_purple', x: 56, y: 38, tipe: 'bentuk', bentuk: 'lingkaran', nama: 'Gelembung Ungu', warna: '#a855f7', poin: 25 },
    { id: 'shape_cir_gold', x: 76, y: 54, tipe: 'bentuk', bentuk: 'lingkaran', nama: 'Koin Danau Misteri', warna: '#eab308', poin: 25 },
    { id: 'shape_cir_teal', x: 92, y: 32, tipe: 'bentuk', bentuk: 'lingkaran', nama: 'Roda Geometri Danau', warna: '#14b8a6', poin: 25 },
    { id: 'coin_1', x: 8, y: 66, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_2', x: 22, y: 64, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_3', x: 28, y: 58, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_4', x: 44, y: 48, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_5', x: 64, y: 39, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
  ],
  soalList: [
    {
      id: 1,
      judulKategori: '1. Jari-Jari Lingkaran',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Garis lurus yang menghubungkan titik pusat ke garis lengkung tepi lingkaran disebut...',
      ilustrasiTipe: 'lingkaran_jari_jari',
      opsi: [
        { id: 'jari_jari', label: 'Jari-jari (r)', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899' },
        { id: 'diameter', label: 'Diameter (d)', ikonBentuk: 'lingkaran', warnaIkon: '#3b82f6' },
        { id: 'sudut', label: 'Sudut Pusat', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b' },
        { id: 'keliling', label: 'Garis Keliling', ikonBentuk: 'lingkaran', warnaIkon: '#10b981' },
      ],
      kunciJawaban: 'jari_jari',
      pembahasan: 'Jari-jari (radius / r) adalah jarak dari titik pusat lingkaran ke setiap titik pada garis lengkung luarnya.',
      petunjuk: 'Perhatikan garis merah dari titik tengah O menuju tepi lingkaran!',
    },
    {
      id: 2,
      judulKategori: '2. Hubungan Diameter',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Jika jari-jari (r) sebuah roda sepeda adalah 14 cm, berapakah panjang DIAMETER (d) roda tersebut? (d = 2 × r)',
      ilustrasiTipe: 'lingkaran_diameter',
      opsi: [
        { id: '7', label: '7 cm' },
        { id: '21', label: '21 cm' },
        { id: '28', label: '28 cm' },
        { id: '42', label: '42 cm' },
      ],
      kunciJawaban: '28',
      pembahasan: 'Diameter adalah dua kali panjang jari-jari: d = 2 × r = 2 × 14 cm = 28 cm. Jawabanmu tepat!',
      petunjuk: 'Kalikan panjang jari-jari dengan 2: 14 × 2 = ...',
    },
    {
      id: 3,
      judulKategori: '3. Sudut Lingkaran',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Berapakah jumlah titik sudut yang dimiliki oleh sebuah lingkaran?',
      ilustrasiTipe: 'lingkaran_garis_lengkung',
      opsi: [
        { id: '0', label: '0 (Tidak ada titik sudut)' },
        { id: '1', label: '1 titik sudut' },
        { id: '2', label: '2 titik sudut' },
        { id: '4', label: '4 titik sudut' },
      ],
      kunciJawaban: '0',
      pembahasan: 'Lingkaran dibatasi oleh satu kurva garis lengkung tertutup tanpa pertemuan dua garis lurus, sehingga tidak memiliki titik sudut sama sekali.',
      petunjuk: 'Lingkaran bulat mulus tanpa ujung tajam!',
    },
    {
      id: 4,
      judulKategori: '4. Benda Lingkaran Sehari-Hari',
      tipe: 'multi_select',
      pertanyaan: 'Pilih semua benda di bawah ini yang permukaannya berbentuk lingkaran bulat!',
      ilustrasiTipe: 'grid_multi',
      opsi: [
        { id: 'roda', label: 'Roda Sepeda', ikonBentuk: 'lingkaran', warnaIkon: '#334155' },
        { id: 'kancing', label: 'Kancing Baju Bulat', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899' },
        { id: 'donat', label: 'Kue Donat', ikonBentuk: 'lingkaran', warnaIkon: '#f59e0b' },
        { id: 'layangan', label: 'Layang-Layang', ikonBentuk: 'persegi', warnaIkon: '#8b5cf6' },
      ],
      kunciJawaban: ['roda', 'kancing', 'donat'],
      pembahasan: 'Roda sepeda, kancing baju, dan donat adalah benda berbentuk lingkaran, sedangkan layang-layang adalah bangun segi empat.',
      petunjuk: 'Pilih benda yang berputar atau melingkar bulat sempurna.',
    },
    {
      id: 5,
      judulKategori: '5. Simetri Lipat Lingkaran',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Berapa banyak simetri lipat yang dimiliki oleh bangun datar lingkaran?',
      ilustrasiTipe: 'lingkaran_simetri',
      opsi: [
        { id: '1', label: '1 simetri' },
        { id: '4', label: '4 simetri' },
        { id: '8', label: '8 simetri' },
        { id: 'tak_hingga', label: 'Tak terhingga (sangat banyak)' },
      ],
      kunciJawaban: 'tak_hingga',
      pembahasan: 'Lingkaran dapat dilipat melewati garis tengah mana pun dan selalu menutupi dengan pas, sehingga memiliki simetri lipat tak terhingga (tak terhitung banyaknya).',
      petunjuk: 'Lingkaran bisa dilipat dari sudut dan arah mana saja melewati titik pusatnya.',
    },
  ],
}

// ============================================================================
// LEVEL 5: Lembah Segi Banyak (Difficulty: Mahir)
// ============================================================================
export const LEVEL_5_DATA: DetailLevelData = {
  levelNumber: 5,
  namaLevel: 'Lembah Segi Banyak',
  subjudulPulau: 'Trapesium, Jajar Genjang & Belah Ketupat',
  duniaNama: 'Dunia 1 - Pulau Bentuk',
  tujuan: 'Menganalisis segi empat khusus: sifat sepasang sisi sejajar (trapesium) dan 2 pasang sisi sejajar (jajar genjang, belah ketupat, layang-layang).',
  estimasiWaktu: '4-5 menit',
  totalTantangan: 5,
  hadiahXp: 300,
  hadiahKoin: 300,
  waktuTimer: 35,
  kesulitan: 'Mahir',
  explorationItems: [
    { id: 'shape_trap', x: 14, y: 64, tipe: 'bentuk', bentuk: 'persegi_panjang', nama: 'Relik Trapesium', warna: '#f97316', poin: 30 },
    { id: 'shape_jajar', x: 36, y: 52, tipe: 'bentuk', bentuk: 'persegi_panjang', nama: 'Batu Jajar Genjang', warna: '#6366f1', poin: 30 },
    { id: 'shape_ketupat', x: 56, y: 38, tipe: 'bentuk', bentuk: 'persegi', nama: 'Kristal Belah Ketupat', warna: '#eab308', poin: 30 },
    { id: 'shape_kite', x: 76, y: 54, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Layang-Layang Kuno', warna: '#06b6d4', poin: 30 },
    { id: 'shape_special', x: 92, y: 32, tipe: 'bentuk', bentuk: 'persegi', nama: 'Artefak Lembah', warna: '#ec4899', poin: 30 },
    { id: 'coin_1', x: 8, y: 66, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_2', x: 22, y: 64, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_3', x: 28, y: 58, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_4', x: 44, y: 48, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_5', x: 64, y: 39, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
  ],
  soalList: [
    {
      id: 1,
      judulKategori: '1. Sisi Sejajar Trapesium',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bangun datar segi empat yang HANYA memiliki SEPASANG sisi sejajar yang berhadapan adalah...',
      ilustrasiTipe: 'trapesium',
      opsi: [
        { id: 'trapesium', label: 'Trapesium', ikonBentuk: 'persegi_panjang', warnaIkon: '#f97316' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6' },
        { id: 'jajar_genjang', label: 'Jajar Genjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#6366f1' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899' },
      ],
      kunciJawaban: 'trapesium',
      pembahasan: 'Ciri utama trapesium adalah memiliki tepat sepasang sisi berhadapan yang sejajar (sisi atas dan sisi bawah), sedangkan sisi miring lainnya tidak sejajar.',
      petunjuk: 'Perhatikan panah di sisi atas dan bawah yang sejajar pada gambar!',
    },
    {
      id: 2,
      judulKategori: '2. Sifat Jajar Genjang',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bangun segi empat yang memiliki 2 pasang sisi sejajar sama panjang, tetapi sudutnya BUKAN 90° adalah...',
      ilustrasiTipe: 'jajar_genjang',
      opsi: [
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981' },
        { id: 'jajar_genjang', label: 'Jajar Genjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#6366f1' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b' },
      ],
      kunciJawaban: 'jajar_genjang',
      pembahasan: 'Jajar genjang mirip dengan persegi panjang yang dimiringkan: sisi berhadapan sejajar dan sama panjang, namun sudutnya berupa sudut lancip dan sudut tumpul (bukan 90°).',
      petunjuk: 'Bangun ini terlihat seperti persegi panjang yang miring ke samping.',
    },
    {
      id: 3,
      judulKategori: '3. Belah Ketupat',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bangun datar yang KEEMPAT sisinya sama panjang seperti ketupat lebaran dinamakan...',
      ilustrasiTipe: 'belah_ketupat',
      opsi: [
        { id: 'trapesium', label: 'Trapesium', ikonBentuk: 'persegi_panjang', warnaIkon: '#f97316' },
        { id: 'belah_ketupat', label: 'Belah Ketupat', ikonBentuk: 'persegi', warnaIkon: '#eab308' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899' },
      ],
      kunciJawaban: 'belah_ketupat',
      pembahasan: 'Belah ketupat memiliki 4 sisi yang semuanya sama panjang dan diagonalnya saling berpotongan tegak lurus membentuk tanda tambah.',
      petunjuk: 'Bentuknya persis seperti anyaman ketupat atau berlian!',
    },
    {
      id: 4,
      judulKategori: '4. Layang-Layang',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bangun datar yang memiliki 2 pasang sisi berdekatan sama panjang dan biasa diterbangkan di pantai adalah...',
      ilustrasiTipe: 'layang_layang',
      opsi: [
        { id: 'layang_layang', label: 'Layang-Layang', ikonBentuk: 'persegi', warnaIkon: '#06b6d4' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6' },
        { id: 'jajar_genjang', label: 'Jajar Genjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#6366f1' },
        { id: 'trapesium', label: 'Trapesium', ikonBentuk: 'persegi_panjang', warnaIkon: '#f97316' },
      ],
      kunciJawaban: 'layang_layang',
      pembahasan: 'Layang-layang memiliki 2 pasang sisi berdekatan yang sama panjang (sepasang sisi atas pendek, sepasang sisi bawah panjang) dan 1 sumbu simetri.',
      petunjuk: 'Mainan anak-anak yang memiliki benang dan ekor pita di langit.',
    },
    {
      id: 5,
      judulKategori: '5. Klasifikasi 2 Pasang Sisi Sejajar',
      tipe: 'multi_select',
      pertanyaan: 'Pilih semua bangun segi empat yang memiliki 2 PASANG sisi sejajar berhadapan!',
      ilustrasiTipe: 'grid_multi',
      opsi: [
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981' },
        { id: 'jajar_genjang', label: 'Jajar Genjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#6366f1' },
        { id: 'trapesium', label: 'Trapesium', ikonBentuk: 'persegi_panjang', warnaIkon: '#f97316' },
      ],
      kunciJawaban: ['persegi', 'persegi_panjang', 'jajar_genjang'],
      pembahasan: 'Persegi, persegi panjang, dan jajar genjang memiliki 2 pasang sisi sejajar berhadapan. Trapesium hanya memiliki 1 pasang sisi sejajar.',
      petunjuk: 'Ingat bahwa trapesium hanya memiliki sepasang sisi sejajar, bukan dua pasang.',
    },
  ],
}

// ============================================================================
// LEVEL 6: Kastil Geometri (Difficulty: Master / Ujian Akbar)
// ============================================================================
export const LEVEL_6_DATA: DetailLevelData = {
  levelNumber: 6,
  namaLevel: 'Kastil Geometri',
  subjudulPulau: 'Ujian Akhir Raja Segi Banyak',
  duniaNama: 'Dunia 1 - Pulau Bentuk',
  tujuan: 'Menyelesaikan tantangan pemecahan masalah geometri terpadu: sudut 360°, bangun gabungan, keliling lanjutan, dan analisis logika bentuk.',
  estimasiWaktu: '5-6 menit',
  totalTantangan: 5,
  hadiahXp: 500,
  hadiahKoin: 500,
  waktuTimer: 30,
  kesulitan: 'Master',
  explorationItems: [
    { id: 'shape_star_gold', x: 14, y: 64, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Bintang Emas Kastil', warna: '#facc15', poin: 50 },
    { id: 'shape_gem_ruby', x: 36, y: 52, tipe: 'bentuk', bentuk: 'persegi', nama: 'Permata Rubik Merah', warna: '#ef4444', poin: 50 },
    { id: 'shape_orb_diamond', x: 56, y: 38, tipe: 'bentuk', bentuk: 'lingkaran', nama: 'Bola Kristal Berlian', warna: '#38bdf8', poin: 50 },
    { id: 'shape_emerald_shield', x: 76, y: 54, tipe: 'bentuk', bentuk: 'persegi_panjang', nama: 'Tameng Zamrud Raja', warna: '#10b981', poin: 50 },
    { id: 'shape_crown_shape', x: 92, y: 32, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Mahkota Geometri Master', warna: '#8b5cf6', poin: 50 },
    { id: 'coin_1', x: 8, y: 66, tipe: 'koin', nama: 'Koin Emas', poin: 10 },
    { id: 'coin_2', x: 22, y: 64, tipe: 'koin', nama: 'Koin Emas', poin: 10 },
    { id: 'coin_3', x: 28, y: 58, tipe: 'koin', nama: 'Koin Emas', poin: 10 },
    { id: 'coin_4', x: 44, y: 48, tipe: 'koin', nama: 'Koin Emas', poin: 10 },
    { id: 'coin_5', x: 64, y: 39, tipe: 'koin', nama: 'Koin Emas', poin: 10 },
  ],
  soalList: [
    {
      id: 1,
      judulKategori: '1. Total Sudut Segi Empat',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Jumlah SELURUH sudut dalam pada bangun datar segi empat (persegi, persegi panjang, trapesium, dll) selalu berjumlah...',
      ilustrasiTipe: 'sudut_total_360',
      opsi: [
        { id: '180', label: '180°' },
        { id: '270', label: '270°' },
        { id: '360', label: '360°' },
        { id: '450', label: '450°' },
      ],
      kunciJawaban: '360',
      pembahasan: 'Luar biasa! Setiap segi empat dapat dibagi menjadi 2 buah segitiga (2 × 180° = 360°), sehingga jumlah seluruh sudutnya selalu 360°.',
      petunjuk: 'Jika segitiga adalah 180°, maka segi empat adalah dua kali lipatnya.',
    },
    {
      id: 2,
      judulKategori: '2. Keliling Taman Segitiga',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Sebuah taman bunga berbentuk Segitiga Sama Sisi memiliki panjang tiap sisi 12 meter. Berapakah keliling taman tersebut? (12 + 12 + 12)',
      ilustrasiTipe: 'taman_segitiga',
      opsi: [
        { id: '24', label: '24 meter' },
        { id: '36', label: '36 meter' },
        { id: '48', label: '48 meter' },
        { id: '144', label: '144 meter' },
      ],
      kunciJawaban: '36',
      pembahasan: 'Keliling segitiga sama sisi = 3 × sisi = 12 + 12 + 12 = 36 meter. Perhitunganmu sangat cermat!',
      petunjuk: 'Jumlahkan angka 12 sebanyak 3 kali: 12 + 12 = 24, lalu tambah 12 lagi.',
    },
    {
      id: 3,
      judulKategori: '3. Analisis Bangun Gabungan',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Sebuah rumah mini digabungkan dari Atap Segitiga dan Dinding Persegi. Berapa banyak SISI LUAR bangun gabungan tersebut?',
      ilustrasiTipe: 'bangun_gabungan_rumah',
      opsi: [
        { id: '3', label: '3 sisi' },
        { id: '5', label: '5 sisi' },
        { id: '7', label: '7 sisi' },
        { id: '8', label: '8 sisi' },
      ],
      kunciJawaban: '5',
      pembahasan: 'Tepat sekali! Sisi luarnya terdiri dari 2 sisi miring atap ditambah 3 sisi dinding (kiri, kanan, dan bawah). Garis sambungan di dalam tidak dihitung sebagai sisi luar!',
      petunjuk: 'Hitung lingkaran nomor biru 1 sampai 5 yang mengelilingi batas luar rumah.',
    },
    {
      id: 4,
      judulKategori: '4. Penalaran Logika Geometri',
      tipe: 'multi_select',
      pertanyaan: 'Pilih semua pernyataan matematika yang BENAR di bawah ini!',
      ilustrasiTipe: 'grid_multi',
      opsi: [
        { id: 'a', label: 'Semua persegi adalah persegi panjang istimewa dengan 4 sisi sama' },
        { id: 'b', label: 'Segitiga selalu memiliki tepat 3 sisi dan 3 titik sudut' },
        { id: 'c', label: 'Lingkaran memiliki 4 sudut siku-siku' },
        { id: 'd', label: 'Jumlah sudut dalam suatu segitiga selalu 180°' },
      ],
      kunciJawaban: ['a', 'b', 'd'],
      pembahasan: 'Pernyataan a, b, dan d benar! Pernyataan c salah karena lingkaran tidak memiliki sudut siku-siku sama sekali.',
      petunjuk: 'Periksa fakta tentang sisi dan sudut pada masing-masing bangun datar.',
    },
    {
      id: 5,
      judulKategori: '5. Tantangan Akhir Diameter',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Sebuah pizza bundar berdiameter 30 cm dipotong tepat di tengah menjadi 2 bagian setengah lingkaran. Berapakah panjang garis lurus batas potongannya?',
      ilustrasiTipe: 'pizza_tengah',
      opsi: [
        { id: '15', label: '15 cm (Jari-jari)' },
        { id: '30', label: '30 cm (Diameter)' },
        { id: '60', label: '60 cm (Keliling)' },
        { id: '90', label: '90 cm' },
      ],
      kunciJawaban: '30',
      pembahasan: 'Selamat! Garis lurus yang membelah lingkaran dari ujung ke ujung melewati titik pusat adalah Diameter lingkaran, yaitu 30 cm! Kamu telah menyelesaikan Ujian Akbar Raja Geometri!',
      petunjuk: 'Garis pembatas lurus tersebut membentang sepanjang diameter lingkaran penuh.',
    },
  ],
}

// Map of all 6 levels
export const ALL_LEVELS_DATA: Record<number, DetailLevelData> = {
  1: LEVEL_1_DATA,
  2: LEVEL_2_DATA,
  3: LEVEL_3_DATA,
  4: LEVEL_4_DATA,
  5: LEVEL_5_DATA,
  6: LEVEL_6_DATA,
}

export function getLevelData(levelNumber: number): DetailLevelData {
  return ALL_LEVELS_DATA[levelNumber] || LEVEL_1_DATA
}
