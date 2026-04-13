import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-blue-700">
          Record Center 1
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link href="/profil/sejarah" className="text-sm font-medium text-gray-700 hover:text-blue-700">
            Profil
          </Link>
          <Link href="/layanan" className="text-sm font-medium text-gray-700 hover:text-blue-700">
            Layanan
          </Link>
          <Link href="/publikasi" className="text-sm font-medium text-gray-700 hover:text-blue-700">
            Publikasi
          </Link>
        </nav>
      </div>
    </header>
  )
}