"use client"

import { useEffect } from 'react'
import { useUIStore } from '@/store/use-ui-store'
import { UI_CONSTANTS } from '@/lib/constants'

/**
 * Hook untuk mendeteksi perubahan ukuran layar dan mengatur status responsive
 * Menggunakan window.matchMedia untuk mendeteksi breakpoint mobile dan tablet
 */
export function useResponsive() {
  const { setIsMobile, setIsTablet } = useUIStore()

  useEffect(() => {
    // Hanya jalankan di client-side
    if (typeof window === 'undefined') return

    /**
     * Mendeteksi apakah layar dalam mode mobile
     */
    const mobileQuery = window.matchMedia(`(max-width: ${UI_CONSTANTS.MOBILE_BREAKPOINT - 1}px)`)
    
    /**
     * Mendeteksi apakah layar dalam mode tablet
     */
    const tabletQuery = window.matchMedia(
      `(min-width: ${UI_CONSTANTS.MOBILE_BREAKPOINT}px) and (max-width: ${UI_CONSTANTS.TABLET_BREAKPOINT - 1}px)`
    )

    /**
     * Handler untuk perubahan ukuran layar mobile
     * @param e - MediaQueryListEvent
     */
    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    /**
     * Handler untuk perubahan ukuran layar tablet
     * @param e - MediaQueryListEvent
     */
    const handleTabletChange = (e: MediaQueryListEvent) => {
      setIsTablet(e.matches)
    }

    // Set initial values
    setIsMobile(mobileQuery.matches)
    setIsTablet(tabletQuery.matches)

    // Add event listeners
    mobileQuery.addEventListener('change', handleMobileChange)
    tabletQuery.addEventListener('change', handleTabletChange)

    // Cleanup function
    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange)
      tabletQuery.removeEventListener('change', handleTabletChange)
    }
  }, [setIsMobile, setIsTablet])
}