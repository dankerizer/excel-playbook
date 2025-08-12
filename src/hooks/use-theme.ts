import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * Custom hook untuk mengelola theme menggunakan next-themes
 * Menyediakan interface yang konsisten untuk theme management
 */
export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  // Pastikan component sudah mounted untuk menghindari hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * Toggle antara light dan dark theme
   */
  const toggleTheme = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  /**
   * Get resolved theme (mengatasi system theme)
   */
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  return {
    theme: resolvedTheme,
    setTheme,
    toggleTheme,
    mounted
  }
}