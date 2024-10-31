'use client'

import { useState } from 'react'
import { OTPInput, SlotProps } from 'input-otp'
import { useRouter } from 'next/navigation'
import { validatePasskey, storePasskey, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function AdminOTPInput() {
  const [otp, setOTP] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleComplete = async (value: string) => {
    setIsLoading(true)
    setError('')

    try {
      if (validatePasskey(value, process.env.NEXT_PUBLIC_ADMIN_PASSKEY || '')) {
        storePasskey(value)
        document.cookie = "admin_passkey_confirmed=true; path=/; max-age=3600" // 1 hour expiry
        router.push('/admin')
      } else {
        setError('Invalid passkey. Please try again.')
        setOTP('')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <OTPInput
        value={otp}
        onChange={setOTP}
        maxLength={6}
        containerClassName="group flex items-center justify-center space-x-2"
        render={({ slots }) => (
          <>
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </>
        )}
      />
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <Button 
        onClick={() => handleComplete(otp)} 
        disabled={otp.length !== 6 || isLoading}
        className="w-full mt-4"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          'Verify Passkey'
        )}
      </Button>
    </div>
  )
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'relative w-12 h-14 text-3xl font-bold',
        'flex items-center justify-center',
        'transition-all duration-300',
        'border-2 rounded-lg',
        'group-hover:border-indigo-500 group-focus-within:border-indigo-500',
        'outline outline-0 outline-indigo-500',
        { 'outline-2': props.isActive },
        { 'border-gray-300': !props.char },
        { 'border-indigo-600': props.char }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}

function FakeCaret() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-px h-8 bg-indigo-500 animate-blink"></div>
    </div>
  )
}