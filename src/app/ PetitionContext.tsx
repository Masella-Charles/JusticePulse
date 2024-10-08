import React, { createContext, useState, ReactNode } from 'react'

interface Petition {
  id: number
  title: string
  signatures: number
  goal: number
  stage: 'trending' | 'victory' | 'urgent'
  description: string
  scope: string
}

interface PetitionContextType {
  petitions: Petition[]
  addNewPetition: (petition: Petition) => void
}

export const PetitionContext = createContext<PetitionContextType | null>(null)

interface PetitionProviderProps {
  children: ReactNode
}

export const PetitionProvider: React.FC<PetitionProviderProps> = ({ children }) => {
  const [petitions, setPetitions] = useState<Petition[]>([])

  const addNewPetition = (petition: Petition) => {
    setPetitions(prevPetitions => [...prevPetitions, petition])
  }

  return (
    <PetitionContext.Provider value={{ petitions, addNewPetition }}>
      {children}
    </PetitionContext.Provider>
  )
}