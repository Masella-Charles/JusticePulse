'use client'

import React, { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CreatePetition.module.scss'
import { Client, Databases, ID } from "appwrite"

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) 
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)

const databases = new Databases(client)

interface CreatePetitionProps {
  currentLanguage: string
  onClose: () => void
  onSubmit: (petition: Petition) => void
}

interface Petition {
  name: string
  description: string
  goal: number
  category: string
  location: string
  createdAt: string
  stage: 'trending' | 'urgent' | 'victory'
}

export default function CreatePetition({ currentLanguage, onClose, onSubmit }: CreatePetitionProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [petitionData, setPetitionData] = useState<Petition>({
    name: '',
    description: '',
    goal: 1000,
    category: '',
    location: '',
    createdAt: '',
    stage: 'trending'
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  
  const totalSteps = 2

  useEffect(() => {
    const savedPetitionData = localStorage.getItem('petitionData')
    if (savedPetitionData) {
      setPetitionData(JSON.parse(savedPetitionData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('petitionData', JSON.stringify(petitionData))
  }, [petitionData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPetitionData(prev => ({ 
      ...prev, 
      [name]: name === 'goal' ? parseInt(value, 10) || 0 : value 
    }))
    setErrorMessage('')
  }

  const handleNext = () => {
    if (step === 1 && (!petitionData.name || !petitionData.category || !petitionData.location)) {
      setErrorMessage(currentLanguage === 'en' ? 'Name, category, and location are required.' : 'Jina, kategoria, na eneo zinahitajika.')
      return
    }
    if (step < totalSteps) {
      setStep(step + 1)
      setErrorMessage('')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) {
      return
    }

    if (!petitionData.name || !petitionData.description || !petitionData.category || !petitionData.location) {
      setErrorMessage(currentLanguage === 'en' ? 'All fields are required.' : 'Sehemu zote zinahitajika.')
      return
    }

    try {
      setIsSubmitting(true)
      const REPORT_COLLECTION_ID = process.env.NEXT_PUBLIC_REPORT_COLLECTION_ID!

      const petition = {
        ...petitionData,
        goal: Math.max(0, Math.floor(petitionData.goal)),
        createdAt: new Date().toISOString(),
      }

      const response = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        REPORT_COLLECTION_ID,
        ID.unique(),
        petition
      )

      console.log('Petition submitted:', response)
      console.log('Using collection ID:', REPORT_COLLECTION_ID)

      onSubmit(petition)

      localStorage.removeItem('petitionData')
      setSuccessMessage(currentLanguage === 'en' ? 'Petition submitted successfully!' : 'Ombi limewasilishwa kwa mafanikio!')
      setTimeout(() => {
        setSuccessMessage('')
        onClose()
      }, 3000)
    } catch (error) {
      console.error('Error submitting petition:', error)
      setErrorMessage(currentLanguage === 'en' ? `An error occurred while submitting the petition: ${error.message || error}` : `Hitilafu imetokea wakati wa kuwasilisha ombi: ${error.message || error}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setPetitionData({
      name: '',
      description: '',
      goal: 1000,
      category: '',
      location: '',
      createdAt: '',
      stage: 'trending',
    })
    setStep(1)
    setErrorMessage('')
  }

  // Rest of the component remains the same...
  // (Previous render logic for steps and form)

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className={styles.step}
          >
            <h2>{currentLanguage === 'en' ? "Basic Information" : "Taarifa za Msingi"}</h2>
            <div className={styles.inputWrapper}>
              <label htmlFor="name">{currentLanguage === 'en' ? "Petition Name" : "Jina la Ombi"}</label>
              <input
                type="text"
                name="name"
                id="name"
                value={petitionData.name}
                onChange={handleInputChange}
                placeholder={currentLanguage === 'en' ? "Enter petition name" : "Ingiza jina la ombi"}
                required
                maxLength={100}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="category">{currentLanguage === 'en' ? "Category" : "Kategoria"}</label>
              <input
                type="text"
                name="category"
                id="category"
                value={petitionData.category}
                onChange={handleInputChange}
                required
                placeholder={currentLanguage === 'en' ? "Enter petition category" : "Ingiza kategoria ya ombi"}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="location">{currentLanguage === 'en' ? "Location" : "Eneo"}</label>
              <input
                type="text"
                name="location"
                id="location"
                value={petitionData.location}
                onChange={handleInputChange}
                required
                placeholder={currentLanguage === 'en' ? "Enter petition location" : "Ingiza eneo la ombi"}
              />
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className={styles.step}
          >
            <h2>{currentLanguage === 'en' ? "Additional Details" : "Maelezo ya Ziada"}</h2>
            <div className={styles.inputWrapper}>
              <label htmlFor="description">{currentLanguage === 'en' ? "Description" : "Maelezo"}</label>
              <textarea
                name="description"
                id="description"
                value={petitionData.description}
                onChange={handleInputChange}
                placeholder={currentLanguage === 'en' ? "Explain why this change is important..." : "Eleza kwa nini mabadiliko haya ni muhimu..."}
                required
                rows={5}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="goal">{currentLanguage === 'en' ? "Signature Goal" : "Lengo la Sahihi"}</label>
              <input
                type="number"
                name="goal"
                id="goal"
                value={petitionData.goal}
                onChange={handleInputChange}
                min={1}
                step={1}
                required
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="stage">{currentLanguage === 'en' ? "Petition Stage" : "Hatua ya Ombi"}</label>
              <select
                name="stage"
                id="stage"
                value={petitionData.stage}
                onChange={handleInputChange}
                required
              >
                <option value="trending">{currentLanguage === 'en' ? "Trending" : "Inayovuma"}</option>
                <option value="urgent">{currentLanguage === 'en' ? "Urgent" : "Ya Haraka"}</option>
                <option value="victory">{currentLanguage === 'en' ? "Victory" : "Ushindi"}</option>
              </select>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.overlay}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={styles.modal}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <X className="h-6 w-6" />
        </button>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          <p>{currentLanguage === 'en' ? `Step ${step} of ${totalSteps}` : `Hatua ${step} kati ya ${totalSteps}`}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={styles.error}
              >
                {errorMessage}
              </motion.p>
            )}
            {successMessage && (
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={styles.success}
              >
                {successMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>

          <div className={styles.navigation}>
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleBack}
                className={styles.backButton}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                {currentLanguage === 'en' ? "Back" : "Rudi"}
              </motion.button>
            )}
            {step < totalSteps ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleNext}
                className={styles.nextButton}
              >
                {currentLanguage === 'en' ? "Continue" : "Endelea"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05  }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={styles.submitButton}
                >
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  {currentLanguage === 'en' ? "Submit Petition" : "Wasilisha Ombi"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleReset}
                  className={styles.resetButton}
                >
                  {currentLanguage === 'en' ? "Reset Form" : "Futa Fomu"}
                </motion.button>
              </>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  )
}