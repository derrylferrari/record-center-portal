import { supabase } from '../../../lib/supabase'
import AdminNavbar from '../../../components/AdminNavbar'

export default async function AdminGuestbookPage() {
  const { data, error } = await supabase
    .from('guestbook_entries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <AdminNavbar />
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              Data Buku Tamu
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

        <h1 className="mb-2 text-3xl font-bold text-gray-800">Data Buku Tamu</h1>
        <p className="mb-6 text-gray-600">
          Daftar seluruh data kunjungan yang telah masuk.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-50 text-left text-gray-700">
              <tr>
                <th className="px-4 py-3">Nama Lengkap</th>
                <th className="px-4 py-3">Instansi</th>
                <th className="px-4 py-3">No. HP</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Tujuan / PIC</th>
                <th className="px-4 py-3">Tanggal Kunjungan</th>
                <th className="px-4 py-3">Keperluan</th>
                <th className="px-4 py-3">Waktu Input</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="border-t border-gray-100">
                    <td className="px-4 py-3">{item.full_name}</td>
                    <td className="px-4 py-3">{item.institution}</td>
                    <td className="px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">
                      {item.purpose_pic === 'Lainnya' && item.other_pic
                        ? item.other_pic
                        : item.purpose_pic}
                    </td>
                    <td className="px-4 py-3">{item.visit_date}</td>
                    <td className="px-4 py-3">
                      {item.purpose === 'Lainnya' && item.other_purpose
                        ? item.other_purpose
                        : item.purpose}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(item.created_at).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                    Belum ada data buku tamu.
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