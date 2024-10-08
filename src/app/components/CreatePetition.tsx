'use client'

import React, { useState, useEffect, useContext } from 'react'
import { X, ChevronLeft, ChevronRight, ClipboardCheck, Flag, Globe, Home, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip } from '@/components/ui/tooltip'
import styles from './CreatePetition.module.scss'
import { PetitionContext } from '../ PetitionContext'

interface CreatePetitionProps {
  currentLanguage: string
  onClose: () => void
}

export default function CreatePetition({ currentLanguage, onClose }: CreatePetitionProps) {
  const context = useContext(PetitionContext)

  if (!context) {
    throw new Error('CreatePetition must be used within a PetitionProvider')
  }

  const { addNewPetition } = context

  const [step, setStep] = useState(1)
  const [petitionData, setPetitionData] = useState({
    scope: '',
    title: '',
    description: '',
    signatures: 0,
    goal: 1000,
    stage: 'trending'
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  
  const totalSteps = 3

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
    setPetitionData(prev => ({ ...prev, [name]: value }))
    setErrorMessage('')
  }

  const handleScopeSelect = (scope: string) => {
    setPetitionData(prev => ({ ...prev, scope }))
    setStep(2)
  }

  const handleNext = () => {
    if (step === 2 && petitionData.title.length < 5) {
      setErrorMessage(currentLanguage === 'en' ? 'Title must be at least 5 characters long.' : 'Kichwa kinapaswa kuwa na herufi 5 au zaidi.')
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!petitionData.scope || !petitionData.title || !petitionData.description) {
      setErrorMessage(currentLanguage === 'en' ? 'All fields are required.' : 'Sehemu zote zinahitajika.')
      return
    }

    const newPetition = {
      id: Date.now(),
      title: petitionData.title,
      signatures: petitionData.signatures,
      goal: petitionData.goal,
      stage: petitionData.stage as 'trending' | 'victory' | 'urgent',
      description: petitionData.description,
      scope: petitionData.scope
    }

    addNewPetition(newPetition)

    console.log('Petition submitted:', newPetition)
    localStorage.removeItem('petitionData')
    setSuccessMessage(currentLanguage === 'en' ? 'Petition submitted successfully!' : 'Ombi limewasilishwa kwa mafanikio!')
    setTimeout(() => {
      setSuccessMessage('')
      onClose()
    }, 3000)
  }

  const handleReset = () => {
    setPetitionData({
      scope: '',
      title: '',
      description: '',
      signatures: 0,
      goal: 1000,
      stage: 'trending'
    })
    setStep(1)
    setErrorMessage('')
  }

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
            <h2>{currentLanguage === 'en' ? "Let's take your first step toward change" : "Tuchukue hatua yako ya kwanza kuelekea mabadiliko"}</h2>
            <p>{currentLanguage === 'en' ? "Select the scope of your petition:" : "Chagua upeo wa ombi lako:"}</p>
            <div className={styles.scopeButtons}>
              <Tooltip content={currentLanguage === 'en' ? "For local issues in your community" : "Kwa masuala ya mtaa katika jamii yako"}>
                <button type="button" onClick={() => handleScopeSelect('local')} className={petitionData.scope === 'local' ? styles.active : ''}>
                  <Home className="h-5 w-5 mr-2" />
                  {currentLanguage === 'en' ? "Local" : "Mtaa"}
                </button>
              </Tooltip>
              <Tooltip content={currentLanguage === 'en' ? "For issues affecting your country" : "Kwa masuala yanayoathiri nchi yako"}>
                <button type="button" onClick={() => handleScopeSelect('national')} className={petitionData.scope === 'national' ? styles.active : ''}>
                  <Flag className="h-5 w-5 mr-2" />
                  {currentLanguage === 'en' ? "National" : "Kitaifa"}
                </button>
              </Tooltip>
              <Tooltip content={currentLanguage === 'en' ? "For issues with worldwide impact" : "Kwa masuala yenye athari za kimataifa"}>
                <button type="button" onClick={() => handleScopeSelect('global')} className={petitionData.scope === 'global' ? styles.active : ''}>
                  <Globe className="h-5 w-5 mr-2" />
                  {currentLanguage === 'en' ? "Global" : "Kimataifa"}
                </button>
              </Tooltip>
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
            <h2>{currentLanguage === 'en' ? "Write your petition title" : "Andika kichwa cha ombi lako"}</h2>
            <p>{currentLanguage === 'en' ? "Tell people what you want to change." : "Waambie watu unachotaka kubadilisha."}</p>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="title"
                value={petitionData.title}
                onChange={handleInputChange}
                placeholder={currentLanguage === 'en' ? "Enter petition title" : "Ingiza kichwa cha ombi"}
                required
                maxLength={100}
              />
              <Tooltip content={currentLanguage === 'en' ? "Be clear and concise" : "Kuwa wazi na mafupi"}>
                <Info className={styles.infoIcon} />
              </Tooltip>
            </div>
            <p className={styles.charCount}>{petitionData.title.length}/100</p>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className={styles.step}
          >
            <h2>{currentLanguage === 'en' ? "Describe the change you want to make" : "Eleza mabadiliko unayotaka kufanya"}</h2>
            <div className={styles.inputWrapper}>
              <textarea
                name="description"
                value={petitionData.description}
                onChange={handleInputChange}
                placeholder={currentLanguage === 'en' ? "Explain why this change is important..." : "Eleza kwa nini mabadiliko haya ni muhimu..."}
                required
                rows={5}
              />
              <Tooltip content={currentLanguage === 'en' ? "Provide context and reasons" : "Toa muktadha na sababu"}>
                <Info className={styles.infoIcon} />
              </Tooltip>
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="goal">{currentLanguage === 'en' ? "Signature Goal" : "Lengo la Sahihi"}</label>
              <input
                type="number"
                name="goal"
                id="goal"
                value={petitionData.goal}
                onChange={handleInputChange}
                min={100}
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
                  whileHover={{ scale: 1.05 }}
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