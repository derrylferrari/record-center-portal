import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import AdminNavbar from '../../components/AdminNavbar'

export default async function AdminPage() {
  const { count: guestbookCount } = await supabase
    .from('guestbook_entries')
    .select('*', { count: 'exact', head: true })

  const { count: facilityLoanCount } = await supabase
    .from('facility_loan_requests')
    .select('*', { count: 'exact', head: true })

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <AdminNavbar />

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">
            Ringkasan data layanan yang masuk ke portal Record Center 1.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm font-medium text-gray-500">
              Total Data Buku Tamu
            </p>
            <h2 className="text-4xl font-bold text-blue-700">
              {guestbookCount ?? 0}
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Jumlah seluruh data kunjungan tamu yang telah masuk.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="mb-2 text-sm font-medium text-gray-500">
              Total Data Peminjaman Fasilitas
            </p>
            <h2 className="text-4xl font-bold text-blue-700">
              {facilityLoanCount ?? 0}
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Jumlah seluruh permohonan peminjaman fasilitas yang telah masuk.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/admin/guestbook"
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-blue-700">
              Kelola Data Buku Tamu
            </h2>
            <p className="text-sm text-gray-600">
              Buka halaman daftar kunjungan tamu untuk melihat seluruh data yang
              telah masuk.
            </p>
          </Link>

          <Link
            href="/admin/facility-loans"
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-blue-700">
              Kelola Data Peminjaman
            </h2>
            <p className="text-sm text-gray-600">
              Buka halaman daftar peminjaman fasilitas untuk melihat data dan
              file surat resmi.
            </p>
          </Link>
        </div>
      </div>
    </main>
  )
}