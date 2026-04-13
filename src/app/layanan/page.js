import Link from 'next/link'

export default function LayananPage() {
  const layanan = [
    {
      title: 'Konsultasi',
      href: '/layanan/konsultasi',
      desc: 'Layanan konsultasi terkait data, arsip, dan kebutuhan pendukung lainnya.',
    },
    {
      title: 'Akses Arsip',
      href: '/layanan/akses-arsip',
      desc: 'Pengajuan akses terhadap arsip sesuai kebutuhan dan ketentuan yang berlaku.',
    },
    {
      title: 'Form Buku Tamu Digital',
      href: '/layanan/form-buku-tamu-digital',
      desc: 'Pencatatan tamu dan kunjungan secara digital.',
    },
    {
      title: 'Form Peminjaman Fasilitas',
      href: '/layanan/form-peminjaman-fasilitas',
      desc: 'Pengajuan peminjaman ruang, alat, atau fasilitas lainnya.',
    },
    {
      title: 'PKL - Magang - Pelatihan',
      href: '/layanan/pkl-magang-pelatihan',
      desc: 'Informasi dan pengajuan program PKL, magang, dan pelatihan.',
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Layanan</h1>
        <p className="mb-8 text-gray-600">
          Pilih layanan yang ingin Anda akses.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {layanan.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="mb-2 text-xl font-semibold text-blue-700">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}