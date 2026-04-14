import { supabase } from '../../../lib/supabase'
import AdminNavbar from '../../../components/AdminNavbar'

export default async function AdminFacilityLoansPage() {
  const { data, error } = await supabase
    .from('facility_loan_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <AdminNavbar />
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Data Peminjaman Fasilitas
            </h1>
            <p className="text-red-600">Gagal mengambil data.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <AdminNavbar />

        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Data Peminjaman Fasilitas
        </h1>
        <p className="mb-6 text-gray-600">
          Daftar seluruh permohonan peminjaman fasilitas yang telah masuk.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-50 text-left text-gray-700">
              <tr>
                <th className="px-4 py-3">Nama Lengkap</th>
                <th className="px-4 py-3">Instansi</th>
                <th className="px-4 py-3">No. HP</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Bertindak atas nama</th>
                <th className="px-4 py-3">Jenis Peminjaman</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Waktu</th>
                <th className="px-4 py-3">Keperluan / Acara</th>
                <th className="px-4 py-3">Perkiraan Peserta</th>
                <th className="px-4 py-3">Surat Resmi</th>
                <th className="px-4 py-3">Waktu Input</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100 align-top">
                    <td className="px-4 py-3">{item.full_name}</td>
                    <td className="px-4 py-3">{item.institution}</td>
                    <td className="px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">
                      {item.acting_as === 'Lainnya' && item.acting_as_other
                        ? item.acting_as_other
                        : item.acting_as}
                    </td>
                    <td className="px-4 py-3">{item.loan_type}</td>
                    <td className="px-4 py-3">{item.loan_date}</td>
                    <td className="px-4 py-3">{item.loan_time}</td>
                    <td className="px-4 py-3">{item.event_purpose}</td>
                    <td className="px-4 py-3">
                      {item.estimated_participants ?? '-'}
                    </td>
                    <td className="px-4 py-3">
                      {item.official_letter_url ? (
                        <a
                          href={item.official_letter_url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-700 underline"
                        >
                          Lihat File
                        </a>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(item.created_at).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="px-4 py-6 text-center text-gray-500">
                    Belum ada data peminjaman fasilitas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}