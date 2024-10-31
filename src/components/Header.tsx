"use client"

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { PasskeyModal } from '../components/PasskeyModal'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter();

  const handleAdminClick = () => {
    router.push('/?admin=true');
  };

  return (
    <>
      <div style={{
        margin: '14px',
        position: 'fixed',
        right: '30px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
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
        <button 
          onClick={handleAdminClick}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Admin
        </button>
      </div>
      <PasskeyModal />
    </>
  )
}