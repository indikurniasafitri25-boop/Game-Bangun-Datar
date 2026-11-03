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
  soalList: TantanganSoal[]
  explorationItems: ExplorationItem[]
}

// ============================================================================
// LEVEL 1: Gerbang Pulau Bentuk (Difficulty: Sangat Mudah)
// ============================================================================
export const LEVEL_1_DATA: DetailLevelData = {
  levelNumber: 1,
  namaLevel: 'Gerbang Pulau Bentuk',
  subjudulPulau: 'Mengenali Bentuk Dasar',
  duniaNama: 'Dunia 1 - Pulau Bentuk',
  tujuan: 'Mengenali segitiga, persegi, persegi panjang, dan lingkaran dalam kehidupan nyata.',
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
      judulKategori: '1. Identifikasi bentuk',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Manakah benda yang berbentuk lingkaran?',
      ilustrasiTipe: 'grid_lingkaran',
      opsi: [
        { id: 'bola', label: 'Bola Sepak', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899', subteks: 'Bulat sempurna' },
        { id: 'tenda', label: 'Tenda Kemah', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b', subteks: 'Memiliki 3 sisi' },
        { id: 'jam', label: 'Jam Dinding', ikonBentuk: 'lingkaran', warnaIkon: '#3b82f6', subteks: 'Melingkar bulat' },
        { id: 'buku', label: 'Buku Cerita', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981', subteks: 'Memiliki 4 sisi' },
      ],
      kunciJawaban: 'jam',
      pembahasan: 'Jam dinding dan bola adalah contoh benda yang berbentuk lingkaran karena garis pembatasnya melengkung bulat tanpa sudut.',
      petunjuk: 'Cari benda yang permukaannya bulat dan tidak memiliki sudut!',
    },
    {
      id: 2,
      judulKategori: '2. Klasifikasi bentuk',
      tipe: 'multi_select',
      pertanyaan: 'Pilih semua benda yang berbentuk persegi panjang!',
      ilustrasiTipe: 'grid_persegi_panjang',
      opsi: [
        { id: 'meja', label: 'Meja Belajar', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981' },
        { id: 'keju', label: 'Potongan Keju', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b' },
        { id: 'pintu', label: 'Pintu Rumah', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981' },
        { id: 'buku_tulis', label: 'Buku Tulis', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981' },
      ],
      kunciJawaban: ['meja', 'pintu', 'buku_tulis'],
      pembahasan: 'Meja, pintu, dan buku tulis adalah contoh persegi panjang karena memiliki 2 pasang sisi berhadapan yang sama panjang.',
      petunjuk: 'Persegi panjang memiliki sisi yang berhadapan sama panjang dan 4 sudut siku-siku.',
    },
    {
      id: 3,
      judulKategori: '3. Ciri-ciri bentuk',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Berapa banyak sisi yang dimiliki oleh segitiga?',
      ilustrasiTipe: 'segitiga_sisi',
      opsi: [
        { id: '3', label: '3 sisi' },
        { id: '4', label: '4 sisi' },
        { id: '5', label: '5 sisi' },
        { id: '6', label: '6 sisi' },
      ],
      kunciJawaban: '3',
      pembahasan: 'Hebat! Segitiga selalu dibatasi oleh tepat 3 sisi garis lurus dan mempunyai 3 titik sudut.',
      petunjuk: 'Hitung garis-garis pembatas bernomor 1, 2, dan 3 pada gambar segitiga!',
    },
    {
      id: 4,
      judulKategori: '4. Penerapan dalam kehidupan',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Dinding utama rumah ini berbentuk apa?',
      ilustrasiTipe: 'rumah',
      opsi: [
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899' },
      ],
      kunciJawaban: 'persegi',
      pembahasan: 'Dinding utama rumah berwarna krem pada ilustrasi memiliki 4 sisi sama panjang, sehingga berbentuk Persegi.',
      petunjuk: 'Perhatikan bentuk kotak dinding di bawah atap rumah!',
    },
    {
      id: 5,
      judulKategori: '5. Bingkai dan Sudut',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bentuk bangun datar apa yang tepat untuk bingkai jendela kayu ini?',
      ilustrasiTipe: 'jendela',
      opsi: [
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981' },
      ],
      kunciJawaban: 'persegi',
      pembahasan: 'Benar sekali! Bingkai luar jendela kayu tersebut berbentuk Persegi dengan keempat sisinya berukuran sama panjang.',
      petunjuk: 'Keempat sisi bingkai jendela kayu tersebut berukuran sama.',
    },
  ],
}

// ============================================================================
// LEVEL 2: Hutan Segi Empat (Difficulty: Mudah - Menengah)
// ============================================================================
export const LEVEL_2_DATA: DetailLevelData = {
  levelNumber: 2,
  namaLevel: 'Hutan Segi Empat',
  subjudulPulau: 'Sifat Persegi & Persegi Panjang',
  duniaNama: 'Dunia 1 - Pulau Bentuk',
  tujuan: 'Memahami sisi sama panjang, sisi berhadapan sejajar, 4 sudut siku-siku (90°), dan keliling dasar.',
  estimasiWaktu: '3-4 menit',
  totalTantangan: 5,
  hadiahXp: 150,
  hadiahKoin: 150,
  waktuTimer: 45,
  kesulitan: 'Mudah',
  explorationItems: [
    { id: 'shape_sq_blue', x: 14, y: 64, tipe: 'bentuk', bentuk: 'persegi', nama: 'Persegi Biru', warna: '#3b82f6', poin: 15 },
    { id: 'shape_sq_yellow', x: 36, y: 52, tipe: 'bentuk', bentuk: 'persegi', nama: 'Persegi Kuning', warna: '#eab308', poin: 15 },
    { id: 'shape_rec_green', x: 56, y: 38, tipe: 'bentuk', bentuk: 'persegi_panjang', nama: 'Persegi Panjang Hijau', warna: '#10b981', poin: 15 },
    { id: 'shape_rec_purple', x: 76, y: 54, tipe: 'bentuk', bentuk: 'persegi_panjang', nama: 'Persegi Panjang Ungu', warna: '#8b5cf6', poin: 15 },
    { id: 'shape_sq_amber', x: 92, y: 32, tipe: 'bentuk', bentuk: 'persegi', nama: 'Kotak Kayu Hutan', warna: '#f59e0b', poin: 15 },
    { id: 'coin_1', x: 8, y: 66, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_2', x: 22, y: 64, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_3', x: 28, y: 58, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_4', x: 44, y: 48, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_5', x: 64, y: 39, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
  ],
  soalList: [
    {
      id: 1,
      judulKategori: '1. Sifat Persegi',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Bangun datar yang memiliki 4 sisi SAMA PANJANG dan 4 sudut siku-siku (90°) adalah...',
      ilustrasiTipe: 'persegi_fitur',
      opsi: [
        { id: 'persegi', label: 'Persegi (Bujur Sangkar)', ikonBentuk: 'persegi', warnaIkon: '#3b82f6' },
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899' },
      ],
      kunciJawaban: 'persegi',
      pembahasan: 'Persegi memiliki 4 sisi yang berukuran sama panjang persis, dan keempat sudutnya tegak lurus membentuk 90° (siku-siku).',
      petunjuk: 'Cari bangun datar yang keempat sisinya tidak ada yang lebih panjang atau lebih pendek!',
    },
    {
      id: 2,
      judulKategori: '2. Ciri Persegi Panjang',
      tipe: 'multi_select',
      pertanyaan: 'Pilih semua ciri-ciri yang dimiliki oleh PERSEGI PANJANG!',
      ilustrasiTipe: 'grid_multi',
      opsi: [
        { id: 'siku', label: 'Memiliki 4 sudut siku-siku (90°)' },
        { id: 'sejajar', label: 'Sisi yang berhadapan sama panjang & sejajar' },
        { id: 'semua_sama', label: 'Keempat sisinya selalu sama panjang' },
        { id: 'empat_sisi', label: 'Memiliki tepat 4 sisi garis lurus' },
      ],
      kunciJawaban: ['siku', 'sejajar', 'empat_sisi'],
      pembahasan: 'Persegi panjang memiliki 4 sisi dan 4 sudut siku-siku 90°, dengan 2 pasang sisi berhadapan yang sama panjang (panjang dan lebar).',
      petunjuk: 'Ingat bahwa pada persegi panjang, ukuran panjang berbeda dengan ukuran lebarnya.',
    },
    {
      id: 3,
      judulKategori: '3. Titik Sudut Segi Empat',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Berapakah jumlah titik sudut pada bangun segi empat (A, B, C, D) di bawah ini?',
      ilustrasiTipe: 'sudut_segiempat',
      opsi: [
        { id: '3', label: '3 titik sudut' },
        { id: '4', label: '4 titik sudut' },
        { id: '5', label: '5 titik sudut' },
        { id: '6', label: '6 titik sudut' },
      ],
      kunciJawaban: '4',
      pembahasan: 'Semua jenis segi empat selalu memiliki tepat 4 titik sudut, yaitu titik pertemuan dua sisi yang berdekatan.',
      petunjuk: 'Hitung lingkaran merah bertuliskan huruf A, B, C, dan D!',
    },
    {
      id: 4,
      judulKategori: '4. Aplikasi Persegi Panjang',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Sebuah papan tulis sekolah berukuran panjang 8 meter dan lebar 4 meter. Bangun datar apakah itu?',
      ilustrasiTipe: 'papan_tulis',
      opsi: [
        { id: 'persegi_panjang', label: 'Persegi Panjang', ikonBentuk: 'persegi_panjang', warnaIkon: '#10b981' },
        { id: 'persegi', label: 'Persegi', ikonBentuk: 'persegi', warnaIkon: '#3b82f6' },
        { id: 'segitiga', label: 'Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b' },
        { id: 'lingkaran', label: 'Lingkaran', ikonBentuk: 'lingkaran', warnaIkon: '#ec4899' },
      ],
      kunciJawaban: 'persegi_panjang',
      pembahasan: 'Karena panjangnya (8 meter) berbeda dengan lebarnya (4 meter) dan memiliki 4 sudut siku-siku, maka papan tulis tersebut berbentuk Persegi Panjang.',
      petunjuk: 'Panjang 8m lebih besar daripada lebar 4m, sehingga sisinya tidak sama panjang.',
    },
    {
      id: 5,
      judulKategori: '5. Keliling Bangun Datar',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Sebuah ubin lantai berbentuk persegi memiliki panjang sisi 6 cm. Berapakah kelilingnya jika keempat sisinya dijumlahkan? (6 + 6 + 6 + 6)',
      ilustrasiTipe: 'ubin_keliling',
      opsi: [
        { id: '18', label: '18 cm' },
        { id: '24', label: '24 cm' },
        { id: '36', label: '36 cm' },
        { id: '12', label: '12 cm' },
      ],
      kunciJawaban: '24',
      pembahasan: 'Keliling persegi = 4 × sisi = 6 + 6 + 6 + 6 = 24 cm. Pintar sekali!',
      petunjuk: 'Jumlahkan angka 6 sebanyak 4 kali: 6 + 6 = 12, lalu tambahkan 6 lagi...',
    },
  ],
}

// ============================================================================
// LEVEL 3: Pegunungan Segitiga (Difficulty: Menengah)
// ============================================================================
export const LEVEL_3_DATA: DetailLevelData = {
  levelNumber: 3,
  namaLevel: 'Pegunungan Segitiga',
  subjudulPulau: 'Ragam Segitiga & Sudut 180°',
  duniaNama: 'Dunia 1 - Pulau Bentuk',
  tujuan: 'Menjelajahi segitiga sama sisi, sama kaki, siku-siku, serta aturan total sudut dalam segitiga = 180°.',
  estimasiWaktu: '4-5 menit',
  totalTantangan: 5,
  hadiahXp: 200,
  hadiahKoin: 200,
  waktuTimer: 40,
  kesulitan: 'Menengah',
  explorationItems: [
    { id: 'shape_tri_sisi', x: 14, y: 64, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Segitiga Sama Sisi', warna: '#f59e0b', poin: 20 },
    { id: 'shape_tri_kaki', x: 36, y: 52, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Segitiga Sama Kaki', warna: '#10b981', poin: 20 },
    { id: 'shape_tri_siku', x: 56, y: 38, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Segitiga Siku-Siku', warna: '#ef4444', poin: 20 },
    { id: 'shape_tri_purp', x: 76, y: 54, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Kristal Puncak Gunung', warna: '#8b5cf6', poin: 20 },
    { id: 'shape_tri_gold', x: 92, y: 32, tipe: 'bentuk', bentuk: 'segitiga', nama: 'Segitiga Emas Kuno', warna: '#eab308', poin: 20 },
    { id: 'coin_1', x: 8, y: 66, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_2', x: 22, y: 64, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_3', x: 28, y: 58, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_4', x: 44, y: 48, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
    { id: 'coin_5', x: 64, y: 39, tipe: 'koin', nama: 'Koin Emas', poin: 5 },
  ],
  soalList: [
    {
      id: 1,
      judulKategori: '1. Jenis Segitiga',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Segitiga yang KETIGA sisinya memiliki panjang yang sama dinamakan segitiga...',
      ilustrasiTipe: 'segitiga_sama_sisi',
      opsi: [
        { id: 'sama_sisi', label: 'Segitiga Sama Sisi', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b' },
        { id: 'sama_kaki', label: 'Segitiga Sama Kaki', ikonBentuk: 'segitiga', warnaIkon: '#10b981' },
        { id: 'siku_siku', label: 'Segitiga Siku-Siku', ikonBentuk: 'segitiga', warnaIkon: '#ef4444' },
        { id: 'sembarang', label: 'Segitiga Sembarang', ikonBentuk: 'segitiga', warnaIkon: '#64748b' },
      ],
      kunciJawaban: 'sama_sisi',
      pembahasan: 'Segitiga Sama Sisi memiliki 3 sisi yang sama panjang dan ketiga sudutnya juga berukuran sama besar yaitu 60°.',
      petunjuk: 'Kata kuncinya: ketiga sisinya SAMA panjang.',
    },
    {
      id: 2,
      judulKategori: '2. Segitiga Sama Kaki',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Segitiga Sama Kaki memiliki berapa sisi yang berukuran sama panjang?',
      ilustrasiTipe: 'segitiga_sama_kaki',
      opsi: [
        { id: '1', label: '1 sisi' },
        { id: '2', label: '2 sisi' },
        { id: '3', label: '3 sisi' },
        { id: '0', label: 'Tidak ada' },
      ],
      kunciJawaban: '2',
      pembahasan: 'Benar! Seperti manusia yang memiliki 2 kaki sama panjang, segitiga sama kaki memiliki tepat 2 sisi kaki yang sama panjang.',
      petunjuk: 'Lihat tanda garis pada 2 sisi tegak segitiga tersebut.',
    },
    {
      id: 3,
      judulKategori: '3. Sudut Siku-Siku',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Segitiga yang salah satu sudutnya tepat berukuran 90° (tegak lurus) disebut segitiga...',
      ilustrasiTipe: 'segitiga_siku_siku',
      opsi: [
        { id: 'lancip', label: 'Segitiga Lancip', ikonBentuk: 'segitiga', warnaIkon: '#3b82f6' },
        { id: 'tumpul', label: 'Segitiga Tumpul', ikonBentuk: 'segitiga', warnaIkon: '#a855f7' },
        { id: 'siku_siku', label: 'Segitiga Siku-Siku', ikonBentuk: 'segitiga', warnaIkon: '#ea580c' },
        { id: 'sembarang', label: 'Segitiga Sembarang', ikonBentuk: 'segitiga', warnaIkon: '#64748b' },
      ],
      kunciJawaban: 'siku_siku',
      pembahasan: 'Sudut 90° adalah sudut siku-siku. Jadi segitiga yang memiliki sudut 90° disebut Segitiga Siku-Siku.',
      petunjuk: 'Perhatikan tanda kotak merah tegak lurus di sudut bawah segitiga.',
    },
    {
      id: 4,
      judulKategori: '4. Benda Segitiga',
      tipe: 'multi_select',
      pertanyaan: 'Pilih semua benda di bawah ini yang permukaannya berbentuk segitiga!',
      ilustrasiTipe: 'grid_multi',
      opsi: [
        { id: 'penggaris', label: 'Penggaris Segitiga', ikonBentuk: 'segitiga', warnaIkon: '#f59e0b' },
        { id: 'pizza', label: 'Potongan Pizza', ikonBentuk: 'segitiga', warnaIkon: '#ea580c' },
        { id: 'tenda', label: 'Tenda Kemah', ikonBentuk: 'segitiga', warnaIkon: '#ef4444' },
        { id: 'koin', label: 'Koin Emas Bulat', ikonBentuk: 'lingkaran', warnaIkon: '#eab308' },
      ],
      kunciJawaban: ['penggaris', 'pizza', 'tenda'],
      pembahasan: 'Penggaris segitiga, potongan pizza, dan tenda kemah semuanya memiliki 3 sisi berbentuk segitiga, sedangkan koin berbentuk lingkaran.',
      petunjuk: 'Pilih benda yang memiliki 3 sisi miring dan sudut lancip.',
    },
    {
      id: 5,
      judulKategori: '5. Hukum Sudut Segitiga',
      tipe: 'pilihan_tunggal',
      pertanyaan: 'Berapakah jumlah SELURUH ketiga sudut dalam pada setiap bangun datar segitiga?',
      ilustrasiTipe: 'segitiga_sudut_180',
      opsi: [
        { id: '90', label: '90°' },
        { id: '180', label: '180°' },
        { id: '270', label: '270°' },
        { id: '360', label: '360°' },
      ],
      kunciJawaban: '180',
      pembahasan: 'Hebat! Salah satu rumus emas geometri adalah jumlah seluruh sudut dalam segitiga jenis apa pun selalu 180°!',
      petunjuk: 'Jika sudut segitiga dipotong dan digabungkan, akan membentuk garis lurus setengah putaran (180°).',
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
