'use client';


import AppLayout from './components/AppLayout';
import { PetitionProvider } from './ PetitionContext';
import { ToastProvider } from '@/components/ToastProvider';
import Link from 'next/link';
import { PasskeyModal } from './components/PasskeyModal';
// Import other components as needed

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams?.admin === "true";


  return (
    <div className="container mx-auto px-4">
         {isAdmin && <PasskeyModal />}
      <main>
        <ToastProvider />
      <PetitionProvider>
      <Link href="/?admin=true" className="text-green-500">
            </Link>
        <AppLayout />

      </PetitionProvider>
      </main>
    </div>
  )
}


export default Home;