import AuthProvider from '../components/AuthProvider';
import SessionGuard from '../components/SessionGuard';
import Sidebar from '../components/Sidebar';
import './globals.css';

// DO NOT put 'use client' here. Keep it as a Server Component.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>
          <SessionGuard>
            <div className="flex">
              <Sidebar />
              <main className="flex-1 md:ml-64 min-h-screen">
                {children}
              </main>
            </div>
          </SessionGuard>
        </AuthProvider>
      </body>
    </html>
  );
}