'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

const actingAsOptions = [
  'Kepanitiaan',
  'Instansi / Organisasi',
  'Pribadi',
  'Lainnya',
]

const loanTypeOptions = [
  'Alat / Perlengkapan',
  'Ruang',
  'Fasilitas Lain',
]

export default function FacilityLoanFormPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    institution: '',
    phone: '',
    email: '',
    acting_as: '',
    acting_as_other: '',
    loan_type: '',
    loan_date: '',
    loan_time: '',
    event_purpose: '',
    estimated_participants: '',
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
  }

  const resetForm = () => {
    setFormData({
      full_name: '',
      institution: '',
      phone: '',
      email: '',
      acting_as: '',
      acting_as_other: '',
      loan_type: '',
      loan_date: '',
      loan_time: '',
      event_purpose: '',
      estimated_participants: '',
    })
    setSelectedFile(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    let uploadedFileUrl = null

    try {
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop()
        const safeName = formData.full_name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')

        const fileName = `${Date.now()}-${safeName}.${fileExt}`
        const filePath = fileName

        const { error: uploadError } = await supabase.storage
          .from('official-letters')
          .upload(filePath, selectedFile)

        if (uploadError) {
          console.error('Upload error:', uploadError)
          setMessage('Gagal upload surat resmi.')
          setLoading(false)
          return
        }

        const { data: publicUrlData } = supabase.storage
          .from('official-letters')
          .getPublicUrl(filePath)

        uploadedFileUrl = publicUrlData.publicUrl
      }

      const payload = {
        full_name: formData.full_name,
        institution: formData.institution,
        phone: formData.phone,
        email: formData.email,
        acting_as: formData.acting_as,
        acting_as_other:
          formData.acting_as === 'Lainnya' ? formData.acting_as_other : null,
        loan_type: formData.loan_type,
        loan_date: formData.loan_date,
        loan_time: formData.loan_time,
        event_purpose: formData.event_purpose,
        estimated_participants: formData.estimated_participants
          ? parseInt(formData.estimated_participants, 10)
          : null,
        official_letter_url: uploadedFileUrl,
      }

      const { error } = await supabase
        .from('facility_loan_requests')
        .insert([payload])

      if (error) {
        console.error('Insert error:', error)
        setMessage('Gagal mengirim permohonan. Silakan coba lagi.')
      } else {
        setMessage('Permohonan peminjaman fasilitas berhasil dikirim.')
        resetForm()
      }
    } catch (err) {
      console.error(err)
      setMessage('Terjadi kesalahan. Silakan coba lagi.')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Form Peminjaman Fasilitas
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          Silakan lengkapi data permohonan dengan benar.
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
              Bertindak atas nama
            </label>
            <select
              name="acting_as"
              value={formData.acting_as}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="">-- Pilih --</option>
              {actingAsOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {formData.acting_as === 'Lainnya' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Bertindak atas nama (Lainnya)
              </label>
              <input
                type="text"
                name="acting_as_other"
                value={formData.acting_as_other}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Jenis Peminjaman
            </label>
            <select
              name="loan_type"
              value={formData.loan_type}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            >
              <option value="">-- Pilih Jenis Peminjaman --</option>
              {loanTypeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tanggal Peminjaman
            </label>
            <input
              type="date"
              name="loan_date"
              value={formData.loan_date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Waktu
            </label>
            <input
              type="text"
              name="loan_time"
              value={formData.loan_time}
              onChange={handleChange}
              placeholder="Contoh: 08.00 - 12.00 WIB"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Keperluan / Acara
            </label>
            <textarea
              name="event_purpose"
              value={formData.event_purpose}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Perkiraan Peserta
            </label>
            <input
              type="number"
              name="estimated_participants"
              value={formData.estimated_participants}
              onChange={handleChange}
              min="1"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Upload File (Surat Resmi dari Instansi yang Bersangkutan)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
            />
            <p className="mt-2 text-xs text-gray-500">
              Format yang disarankan: PDF, DOC, DOCX, JPG, JPEG, PNG
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Mengirim...' : 'Kirim Permohonan'}
          </button>
        </form>
      </div>
    </main>
  )
}