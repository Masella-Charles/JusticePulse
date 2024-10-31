import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Petition {
  title: string;
  description: string;
  goal: number;
  category: string;
  createdAt: string;
  stage: 'trending' | 'urgent' | 'victory';
}

interface PetitionContextType {
  petitions: Petition[];
  addNewPetition: (petition: Petition) => void;
  updatePetition: (id: string, updatedPetition: Partial<Petition>) => void;
  deletePetition: (id: string) => void;
}

const PetitionContext = createContext<PetitionContextType | undefined>(undefined);

export const usePetitionContext = () => {
  const context = useContext(PetitionContext);
  if (context === undefined) {
    throw new Error('usePetitionContext must be used within a PetitionProvider');
  }
  return context;
};

interface PetitionProviderProps {
  children: ReactNode;
}

export const PetitionProvider: React.FC<PetitionProviderProps> = ({ children }) => {
  const [petitions, setPetitions] = useState<Petition[]>([]);

  const addNewPetition = (petition: Petition) => {
    setPetitions((prevPetitions) => [...prevPetitions, petition]);
  };

  const updatePetition = (id: string, updatedPetition: Partial<Petition>) => {
    setPetitions((prevPetitions) =>
      prevPetitions.map((petition) =>
        petition.id === id ? { ...petition, ...updatedPetition } : petition
      )
    );
  };

  const deletePetition = (id: string) => {
    setPetitions((prevPetitions) =>
      prevPetitions.filter((petition) => petition.id !== id)
    );
  };

  const value: PetitionContextType = {
    petitions,
    addNewPetition,
    updatePetition,
    deletePetition,
  };

  return <PetitionContext.Provider value={value}>{children}</PetitionContext.Provider>;
};

export { PetitionContext };