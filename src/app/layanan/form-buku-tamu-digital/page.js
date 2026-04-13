'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

const picOptions = [
  'Okki Mahendra Daniswara, S.Si., M.T.',
  'Dedah Budianti, SKM., MM.Kes.',
  'Dafit Pancasena, S.Si.',
  'Asep Saepudin',
  'Lainnya',
]

const purposeOptions = [
  'Audiensi',
  'Koordinasi',
  'Konsultasi',
  'Kegiatan Praktikum / Magang',
  'Peminjaman / Pengambilan Arsip',
  'Pemanfaatan Co-working Space',
  'Silaturahmi',
  'Lainnya',
]

export default function GuestbookFormPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    institution: '',
    phone: '',
    email: '',
    purpose_pic: '',
    other_pic: '',
    visit_date: '',
    purpose: '',
    other_purpose: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      full_name: '',
      institution: '',
      phone: '',
      email: '',
      purpose_pic: '',
      other_pic: '',
      visit_date: '',
      purpose: '',
      other_purpose: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const payload = {
      full_name: formData.full_name,
      institution: formData.institution,
      phone: formData.phone,
      email: formData.email,
      purpose_pic: formData.purpose_pic,
      other_pic: formData.purpose_pic === 'Lainnya' ? formData.other_pic : null,
      visit_date: formData.visit_date,
      purpose: formData.purpose,
      other_purpose: formData.purpose === 'Lainnya' ? formData.other_purpose : null,
    }

    const { error } = await supabase.from('guestbook_entries').insert([payload])

    if (error) {
      console.error(error)
      setMessage('Gagal mengirim data. Silakan coba lagi.')
    } else {
      setMessage('Data berhasil dikirim.')
      resetForm()
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Form Buku Tamu Digital
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          Silakan lengkapi data kunjungan dengan benar.
        </p>

        {message && (
          <div className="mb-4 rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Instansi
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              No. HP
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tujuan / PIC
            </label>
            <select
              name="purpose_pic"
              value={formData.purpose_pic}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="">-- Pilih Tujuan / PIC --</option>
              {picOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {formData.purpose_pic === 'Lainnya' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tujuan / PIC Lainnya
              </label>
              <input
                type="text"
                name="other_pic"
                value={formData.other_pic}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tanggal Kunjungan
            </label>
            <input
              type="date"
              name="visit_date"
              value={formData.visit_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Keperluan
            </label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="">-- Pilih Keperluan --</option>
              {purposeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {formData.purpose === 'Lainnya' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Keperluan Lainnya
              </label>
              <input
                type="text"
                name="other_purpose"
                value={formData.other_purpose}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Mengirim...' : 'Kirim Data Kunjungan'}
          </button>
        </form>
      </div>
    </main>
  )
}