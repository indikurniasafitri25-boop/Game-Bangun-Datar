import pulau1 from '../assets/01_pulau_bentuk.png'
import pulau2 from '../assets/02_hutan_segi_empat.png'
import pulau3 from '../assets/03_pegunungan_segitiga.png'
import pulau4 from '../assets/04_danau_lingkaran.png'
import pulau5 from '../assets/05_kastil_geometri.png'

export interface LevelQuestion {
  pertanyaan: string
  opsi: string[]
  kunci: number
  pembahasan: string
  gambarBentuk?: string
}

export interface LevelInfo {
  id: number
  nama: string
  subjudul: string
  gambar: string
  bintang: number
  terbuka: boolean
  totalSoal: number
  pertanyaan: LevelQuestion[]
}

export const LEVELS: LevelInfo[] = [
  {
    id: 1,
    nama: 'Pulau Bentuk',
    subjudul: 'Mengenal bentuk dasar',
    gambar: pulau1,
    bintang: 3,
    terbuka: true,
    totalSoal: 5,
    pertanyaan: [
      {
        pertanyaan: 'Manakah gambar yang berbentuk segitiga?',
        opsi: ['Segitiga', 'Persegi', 'Lingkaran', 'Persegi Panjang'],
        kunci: 0,
        pembahasan: 'Segitiga adalah bangun datar yang dibatasi oleh 3 sisi dan memiliki 3 titik sudut!',
      },
      {
        pertanyaan: 'Bangun datar manakah yang berbentuk bulat?',
        opsi: ['Persegi', 'Lingkaran', 'Segitiga', 'Trapesium'],
        kunci: 1,
        pembahasan: 'Lingkaran adalah bangun datar yang berbentuk bulat melingkar tertutup tanpa sudut!',
      },
      {
        pertanyaan: 'Pilih gambar yang merupakan persegi.',
        opsi: ['Segitiga', 'Persegi', 'Lingkaran', 'Persegi Panjang'],
        kunci: 1,
        pembahasan: 'Persegi adalah bangun datar yang memiliki 4 sisi sama panjang!',
      },
      {
        pertanyaan: 'Bentuk apa yang memiliki tiga sisi?',
        opsi: ['Segitiga', 'Persegi', 'Lingkaran', 'Segi Lima'],
        kunci: 0,
        pembahasan: 'Segitiga selalu dibatasi oleh tepat 3 sisi garis lurus!',
      },
      {
        pertanyaan: 'Bangun datar apa yang memiliki empat sisi sama panjang?',
        opsi: ['Segitiga', 'Persegi', 'Lingkaran', 'Persegi Panjang'],
        kunci: 1,
        pembahasan: 'Persegi memiliki 4 sisi yang berukuran sama panjang persis!',
      },
    ],
  },
  {
    id: 2,
    nama: 'Lembah Bentuk',
    subjudul: 'Pemahaman • Mengenali sisi dan titik sudut',
    gambar: pulau2,
    bintang: 3,
    terbuka: true,
    totalSoal: 5,
    pertanyaan: [
      {
        pertanyaan: 'Berapa jumlah sisi pada segitiga?',
        opsi: ['3 sisi', '4 sisi', '5 sisi', '6 sisi'],
        kunci: 0,
        pembahasan: 'Segitiga selalu memiliki 3 sisi dan 3 titik sudut!',
      },
      {
        pertanyaan: 'Berapa jumlah titik sudut pada persegi?',
        opsi: ['3 titik sudut', '4 titik sudut', '5 titik sudut', '0 titik sudut'],
        kunci: 1,
        pembahasan: 'Persegi memiliki 4 titik sudut siku-siku (90°)!',
      },
      {
        pertanyaan: 'Berapa jumlah titik sudut pada lingkaran?',
        opsi: ['0 (tidak ada)', '1 titik sudut', '3 titik sudut', '4 titik sudut'],
        kunci: 0,
        pembahasan: 'Lingkaran dibatasi oleh garis lengkung dan tidak memiliki titik sudut!',
      },
      {
        pertanyaan: 'Bangun datar apa yang memiliki empat sisi?',
        opsi: ['Segitiga', 'Persegi', 'Lingkaran', 'Oval'],
        kunci: 1,
        pembahasan: 'Persegi adalah bangun datar yang memiliki 4 sisi sama panjang!',
      },
      {
        pertanyaan: 'Bangun datar apa yang tidak memiliki titik sudut?',
        opsi: ['Persegi', 'Segitiga', 'Lingkaran', 'Persegi Panjang'],
        kunci: 2,
        pembahasan: 'Lingkaran tidak memiliki titik sudut sama sekali!',
      },
    ],
  },
  {
    id: 3,
    nama: 'Hutan Bentuk',
    subjudul: 'Penerapan • Menemukan bentuk di sekitar kita',
    gambar: pulau3,
    bintang: 3,
    terbuka: true,
    totalSoal: 5,
    pertanyaan: [
      {
        pertanyaan: 'Jam dinding berbentuk bulat menyerupai bangun datar apa?',
        opsi: ['Lingkaran', 'Persegi', 'Segitiga', 'Persegi Panjang'],
        kunci: 0,
        pembahasan: 'Jam dinding yang bulat melingkar menyerupai bangun datar Lingkaran!',
      },
      {
        pertanyaan: 'Atap rumah pada gambar menyerupai bentuk apa?',
        opsi: ['Persegi', 'Segitiga', 'Lingkaran', 'Persegi Panjang'],
        kunci: 1,
        pembahasan: 'Atap rumah memiliki 3 sisi miring menyerupai bangun datar Segitiga!',
      },
      {
        pertanyaan: 'Ubin dengan empat sisi sama panjang menyerupai apa?',
        opsi: ['Segitiga', 'Persegi', 'Lingkaran', 'Persegi Panjang'],
        kunci: 1,
        pembahasan: 'Ubin dengan empat sisi sama panjang menyerupai bangun datar Persegi!',
      },
      {
        pertanyaan: 'Pintu berbentuk persegi panjang memiliki berapa sisi?',
        opsi: ['4 sisi', '3 sisi', '5 sisi', '0 sisi'],
        kunci: 0,
        pembahasan: 'Pintu persegi panjang memiliki tepat 4 sisi garis lurus!',
      },
      {
        pertanyaan: 'Roda sepeda jika dilihat dari samping berbentuk apa?',
        opsi: ['Lingkaran', 'Persegi', 'Segitiga', 'Persegi Panjang'],
        kunci: 0,
        pembahasan: 'Roda sepeda berbentuk Lingkaran bulat sempurna sehingga dapat berputar!',
      },
    ],
  },
  {
    id: 4,
    nama: 'Danau Lingkaran',
    subjudul: 'Misteri Jari-Jari & Diameter',
    gambar: pulau4,
    bintang: 0,
    terbuka: false,
    totalSoal: 3,
    pertanyaan: [
      {
        pertanyaan: 'Jarak dari titik pusat ke tepi lingkaran disebut...',
        opsi: ['Jari-jari (r)', 'Diameter (d)', 'Keliling'],
        kunci: 0,
        pembahasan: 'Jari-jari (radius) adalah jarak dari titik pusat lingkaran ke garis lengkung luar.',
      },
      {
        pertanyaan: 'Jika panjang jari-jari (r) adalah 7 cm, berapakah diameternya?',
        opsi: ['14 cm', '21 cm', '49 cm'],
        kunci: 0,
        pembahasan: 'Diameter adalah dua kali jari-jari: d = 2 × 7 = 14 cm.',
      },
      {
        pertanyaan: 'Nilai pendekatan π (pi) yang biasa digunakan dalam lingkaran adalah...',
        opsi: ['22/7 atau 3,14', '33/7 atau 4,14', '11/7 atau 2,14'],
        kunci: 0,
        pembahasan: 'Nilai pi (π) kira-kira 22/7 atau 3,14!',
      },
    ],
  },
  {
    id: 5,
    nama: 'Kastil Geometri',
    subjudul: 'Ujian Akhir Raja Segi Banyak',
    gambar: pulau5,
    bintang: 0,
    terbuka: false,
    totalSoal: 3,
    pertanyaan: [
      {
        pertanyaan: 'Bangun datar yang memiliki sepasang sisi sejajar tetapi tidak sama panjang adalah...',
        opsi: ['Trapesium', 'Jajar Genjang', 'Belah Ketupat'],
        kunci: 0,
        pembahasan: 'Trapesium memiliki tepat sepasang sisi berhadapan yang sejajar.',
      },
      {
        pertanyaan: 'Jumlah seluruh sudut dalam pada bangun datar segi empat selalu berjumlah...',
        opsi: ['180°', '360°', '90°'],
        kunci: 1,
        pembahasan: 'Semua segi empat memiliki jumlah sudut dalam 360°!',
      },
      {
        pertanyaan: 'Bangun layang-layang memiliki berapa pasang sisi yang sama panjang?',
        opsi: ['2 pasang', '4 pasang', '1 pasang'],
        kunci: 0,
        pembahasan: 'Layang-layang memiliki 2 pasang sisi bersebelahan yang sama panjang.',
      },
    ],
  },
]
