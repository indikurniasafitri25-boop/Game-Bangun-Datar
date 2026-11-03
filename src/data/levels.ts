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
    subjudul: 'Pengenalan Bangun Datar Dasar',
    gambar: pulau1,
    bintang: 3,
    terbuka: true,
    totalSoal: 3,
    pertanyaan: [
      {
        pertanyaan: 'Berapakah jumlah sisi pada sebuah segitiga?',
        opsi: ['3 sisi', '4 sisi', '5 sisi'],
        kunci: 0,
        pembahasan: 'Segitiga selalu memiliki 3 sisi dan 3 titik sudut!',
      },
      {
        pertanyaan: 'Bangun datar yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku adalah...',
        opsi: ['Persegi Panjang', 'Persegi', 'Lingkaran'],
        kunci: 1,
        pembahasan: 'Persegi memiliki 4 sisi sama panjang dan sudutnya 90°!',
      },
      {
        pertanyaan: 'Bangun datar manakah yang tidak memiliki titik sudut sama sekali?',
        opsi: ['Segitiga', 'Trapesium', 'Lingkaran'],
        kunci: 2,
        pembahasan: 'Lingkaran hanya dibatasi oleh 1 garis lengkung yang tak berujung!',
      },
    ],
  },
  {
    id: 2,
    nama: 'Hutan Segi Empat',
    subjudul: 'Petualangan Persegi & Persegi Panjang',
    gambar: pulau2,
    bintang: 3,
    terbuka: true,
    totalSoal: 3,
    pertanyaan: [
      {
        pertanyaan: 'Rumus luas persegi dengan panjang sisi (s) adalah...',
        opsi: ['s × s', '4 × s', '2 × (s + s)'],
        kunci: 0,
        pembahasan: 'Luas persegi dihitung dengan sisi dikali sisi (s²)!',
      },
      {
        pertanyaan: 'Sebuah persegi panjang berukuran panjang 8 cm dan lebar 4 cm. Berapa luasnya?',
        opsi: ['24 cm²', '32 cm²', '16 cm²'],
        kunci: 1,
        pembahasan: 'Luas = panjang × lebar = 8 cm × 4 cm = 32 cm².',
      },
      {
        pertanyaan: 'Keliling persegi yang memiliki sisi 6 cm adalah...',
        opsi: ['36 cm', '24 cm', '18 cm'],
        kunci: 1,
        pembahasan: 'Keliling = 4 × sisi = 4 × 6 = 24 cm.',
      },
    ],
  },
  {
    id: 3,
    nama: 'Pegunungan Segitiga',
    subjudul: 'Mendaki Puncak Siku-Siku & Sama Kaki',
    gambar: pulau3,
    bintang: 2,
    terbuka: true,
    totalSoal: 3,
    pertanyaan: [
      {
        pertanyaan: 'Segitiga yang memiliki ketiga sisinya sama panjang dinamakan...',
        opsi: ['Segitiga Sama Kaki', 'Segitiga Sama Sisi', 'Segitiga Siku-Siku'],
        kunci: 1,
        pembahasan: 'Segitiga sama sisi memiliki 3 sisi yang sama panjang dan 3 sudut sama besar (60°)!',
      },
      {
        pertanyaan: 'Jika alas segitiga 10 cm dan tingginya 6 cm, berapakah luasnya? (Rumus: ½ × a × t)',
        opsi: ['30 cm²', '60 cm²', '16 cm²'],
        kunci: 0,
        pembahasan: 'Luas = ½ × 10 × 6 = 30 cm²!',
      },
      {
        pertanyaan: 'Segitiga yang salah satu sudutnya tepat berukuran 90° disebut segitiga...',
        opsi: ['Tumpul', 'Lancip', 'Siku-Siku'],
        kunci: 2,
        pembahasan: 'Sudut 90 derajat adalah sudut siku-siku!',
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
