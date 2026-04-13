import './globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Record Center 1',
  description: 'Portal Resmi Record Center 1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}