export interface KoleksiItem {
  id: number
  nama: string
  kategori: string
  terbuka: boolean
  ikon: string
  deskripsi: string
}

export const KOLEKSI_BENTUK: KoleksiItem[] = [
  { id: 1, nama: 'Segitiga Sama Sisi', kategori: 'Segitiga', terbuka: true, ikon: '🔺', deskripsi: '3 sisi sama panjang, 3 sudut 60°' },
  { id: 2, nama: 'Segitiga Sama Kaki', kategori: 'Segitiga', terbuka: true, ikon: '📐', deskripsi: '2 sisi sama panjang, 2 sudut sama besar' },
  { id: 3, nama: 'Segitiga Siku-Siku', kategori: 'Segitiga', terbuka: true, ikon: '📐', deskripsi: 'Memiliki 1 sudut tegak 90°' },
  { id: 4, nama: 'Persegi', kategori: 'Segi Empat', terbuka: true, ikon: '🟦', deskripsi: '4 sisi sama panjang, 4 sudut 90°' },
  { id: 5, nama: 'Persegi Panjang', kategori: 'Segi Empat', terbuka: true, ikon: '🚪', deskripsi: 'Sisi berhadapan sama panjang, sudut 90°' },
  { id: 6, nama: 'Lingkaran', kategori: 'Lengkung', terbuka: true, ikon: '⚪', deskripsi: 'Hanya 1 sisi lengkung, tanpa titik sudut' },
  { id: 7, nama: 'Jajar Genjang', kategori: 'Segi Empat', terbuka: true, ikon: '▱', deskripsi: '2 pasang sisi sejajar berhadapan' },
  { id: 8, nama: 'Trapesium Sama Kaki', kategori: 'Segi Empat', terbuka: true, ikon: '⏢', deskripsi: 'Sepasang sisi sejajar berhadapan' },
  // 16 Terkunci
  { id: 9, nama: 'Belah Ketupat', kategori: 'Segi Empat', terbuka: false, ikon: '🔶', deskripsi: 'Buka di Hutan Segi Empat Level 8' },
  { id: 10, nama: 'Layang-Layang', kategori: 'Segi Empat', terbuka: false, ikon: '🪁', deskripsi: 'Buka di Hutan Segi Empat Level 10' },
  { id: 11, nama: 'Trapesium Siku-Siku', kategori: 'Segi Empat', terbuka: false, ikon: '⏢', deskripsi: 'Buka di Hutan Segi Empat Level 12' },
  { id: 12, nama: 'Segitiga Sembarang', kategori: 'Segitiga', terbuka: false, ikon: '📐', deskripsi: 'Buka di Pegunungan Segitiga Level 14' },
  { id: 13, nama: 'Segitiga Tumpul', kategori: 'Segitiga', terbuka: false, ikon: '📐', deskripsi: 'Buka di Pegunungan Segitiga Level 16' },
  { id: 14, nama: 'Segitiga Lancip', kategori: 'Segitiga', terbuka: false, ikon: '📐', deskripsi: 'Buka di Pegunungan Segitiga Level 18' },
  { id: 15, nama: 'Setengah Lingkaran', kategori: 'Lengkung', terbuka: false, ikon: '🌗', deskripsi: 'Buka di Danau Lingkaran Level 20' },
  { id: 16, nama: 'Juring Lingkaran', kategori: 'Lengkung', terbuka: false, ikon: '🍕', deskripsi: 'Buka di Danau Lingkaran Level 22' },
  { id: 17, nama: 'Tembereng', kategori: 'Lengkung', terbuka: false, ikon: '🌙', deskripsi: 'Buka di Danau Lingkaran Level 24' },
  { id: 18, nama: 'Segilima (Pentagon)', kategori: 'Segi Banyak', terbuka: false, ikon: '⬟', deskripsi: 'Buka di Kastil Geometri Level 26' },
  { id: 19, nama: 'Segienam (Hexagon)', kategori: 'Segi Banyak', terbuka: false, ikon: '⬢', deskripsi: 'Buka di Kastil Geometri Level 27' },
  { id: 20, nama: 'Segidelapan (Octagon)', kategori: 'Segi Banyak', terbuka: false, ikon: '🛑', deskripsi: 'Buka di Kastil Geometri Level 28' },
  { id: 21, nama: 'Bintang Geometri', kategori: 'Bintang', terbuka: false, ikon: '⭐', deskripsi: 'Buka di Kastil Geometri Level 29' },
  { id: 22, nama: 'Prisma Segitiga', kategori: 'Bangun Ruang', terbuka: false, ikon: '⛺', deskripsi: 'Bonus Rahasia Pulau Bentuk' },
  { id: 23, nama: 'Tabung Geometri', kategori: 'Bangun Ruang', terbuka: false, ikon: '🥫', deskripsi: 'Bonus Rahasia Danau Lingkaran' },
  { id: 24, nama: 'Mahkota Geometri Emas', kategori: 'Spesial', terbuka: false, ikon: '👑', deskripsi: 'Selesaikan Level 30 Kastil Geometri' },
]
