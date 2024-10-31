import Link from 'next/link';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <header>
            <div style={{
              margin: '14px',
              position: 'fixed',
              right: '30px',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 6,
              gap: '10px',
            }}>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-lime-400 text-white rounded-md hover:bg-lime-500 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    }
                  }}
                />
              </SignedIn>
              <Link href="/verify-passkey">
                <button 
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Admin
                </button>
              </Link>
            </div>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}