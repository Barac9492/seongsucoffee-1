'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MVPRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Jeff's flywheel: Landing → Trial (direct path)
    router.replace('/trial')
  }, [router])

  return (
    <div className="min-h-screen bg-coffee-foam flex items-center justify-center">
      <div className="text-center">
        <div className="text-coffee-primary mb-4">Starting your free trial...</div>
        <div className="w-8 h-8 border-2 border-coffee-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  )
}