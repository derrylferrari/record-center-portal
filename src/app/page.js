import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
              Portal Resmi
            </p>

            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Record Center 1
              <span className="block text-blue-700">
                Kantor Pengelolaan Data dan Arsip Digital
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-7 text-gray-600">
              Portal layanan dan informasi Record Center 1 yang memudahkan
              pengunjung, mitra, dan instansi untuk mengakses layanan, mengisi
              buku tamu digital, serta mengajukan peminjaman fasilitas secara
              cepat dan tertata.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/layanan/form-buku-tamu-digital"
                className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow hover:bg-blue-700"
              >
                Isi Buku Tamu Digital
              </Link>

              <Link
                href="/layanan/form-peminjaman-fasilitas"
                className="rounded-xl border border-blue-600 px-6 py-3 text-center font-semibold text-blue-700 hover:bg-blue-50"
              >
                Ajukan Peminjaman Fasilitas
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="mb-4 rounded-2xl bg-blue-600 px-5 py-4 text-white">
              <h2 className="text-xl font-semibold">Layanan Utama</h2>
              <p className="mt-1 text-sm text-blue-100">
                Akses cepat ke layanan yang paling sering digunakan
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-200 p-4">
                <h3 className="text-lg font-semibold">Buku Tamu Digital</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Digunakan untuk pencatatan kunjungan tamu secara digital,
                  rapi, dan terdokumentasi.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <h3 className="text-lg font-semibold">Peminjaman Fasilitas</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Digunakan untuk pengajuan penggunaan ruang, alat, atau
                  fasilitas pendukung lainnya.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <h3 className="text-lg font-semibold">Pengembangan Lanjutan</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Konsultasi, akses arsip, PKL, magang, pelatihan, dan publikasi
                  akan ditambahkan secara bertahap.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="mb-8 text-2xl font-bold">Struktur Portal</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                Profil
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Sejarah</li>
                <li>Visi dan Misi</li>
                <li>Hubungi Kami</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                Layanan
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Konsultasi</li>
                <li>Akses Arsip</li>
                <li>Form Buku Tamu Digital</li>
                <li>Form Peminjaman Fasilitas</li>
                <li>PKL - Magang - Pelatihan</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-blue-700">
                Publikasi
              </h3>
              <p className="text-sm text-gray-600">
                Halaman publikasi akan ditambahkan pada tahap pengembangan
                berikutnya.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}