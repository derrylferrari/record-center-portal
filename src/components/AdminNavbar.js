import Link from 'next/link'

export default function AdminNavbar() {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <p className="text-sm text-gray-600">
          Kelola data layanan Record Center 1
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/guestbook"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Buku Tamu
        </Link>

        <Link
          href="/admin/facility-loans"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Peminjaman
        </Link>

        <Link
          href="/"
          className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
        >
          Kembali ke Portal
        </Link>
      </div>
    </div>
  )
}