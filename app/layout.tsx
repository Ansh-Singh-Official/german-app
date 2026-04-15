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
            <div className="flex min-h-screen bg-black">
              <Sidebar />
              {/* The pt-20 adds space for the mobile menu button at the top */}
              <main className="flex-1 w-full pt-20 md:pt-0 overflow-x-hidden">
                {children}
              </main>
            </div>
          </SessionGuard>
        </AuthProvider>
      </body>
    </html>
  );
}