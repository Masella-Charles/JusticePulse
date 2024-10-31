'use client';

import React, { useState } from 'react'
import AppLayout from './components/AppLayout';
import { PetitionProvider } from './ PetitionContext';
import { ToastProvider } from '@/components/ToastProvider';
// Import other components as needed

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'en' ? 'sw' : 'en')
  }

  return (
    <div className="container mx-auto px-4">
      <main>
        <ToastProvider />
      <PetitionProvider>
        <AppLayout />
      </PetitionProvider>
      </main>
    </div>
  )
}


