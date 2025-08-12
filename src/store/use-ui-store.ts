import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UIState } from '@/types'
import { STORAGE_KEYS, DEFAULT_PREFERENCES } from '@/lib/constants'

interface UIStoreState {
  // UI state
  sidebarOpen: boolean
  currentView: 'dashboard' | 'learn' | 'playground' | 'leaderboard' | 'profile'
  
  // Loading and error states
  loading: boolean
  error: string | null
  
  // User preferences
  notifications: boolean
  soundEffects: boolean
  autoSave: boolean
  showHints: boolean
  
  // Mobile responsiveness
  isMobile: boolean
  isTablet: boolean
}

interface UIStoreActions {
  // Sidebar actions
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  
  // Navigation actions
  setCurrentView: (view: UIStoreState['currentView']) => void
  
  // Loading and error actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  
  // Preference actions
  setNotifications: (enabled: boolean) => void
  setSoundEffects: (enabled: boolean) => void
  setAutoSave: (enabled: boolean) => void
  setShowHints: (enabled: boolean) => void
  
  // Responsive actions
  setIsMobile: (isMobile: boolean) => void
  setIsTablet: (isTablet: boolean) => void
  
  // Utility actions
  resetPreferences: () => void
}

type UIStore = UIStoreState & UIStoreActions

const initialState: UIStoreState = {
  sidebarOpen: true,
  currentView: 'dashboard',
  loading: false,
  error: null,
  notifications: DEFAULT_PREFERENCES.notifications,
  soundEffects: DEFAULT_PREFERENCES.soundEffects,
  autoSave: DEFAULT_PREFERENCES.autoSave,
  showHints: DEFAULT_PREFERENCES.showHints,
  isMobile: false,
  isTablet: false
}

/**
 * Zustand store for managing UI state and user preferences
 * Persisted to localStorage for consistent user experience
 */
export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      

      
      /**
       * Set sidebar open/closed state
       * @param open - Whether sidebar should be open
       */
      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open })
      },
      
      /**
       * Toggle sidebar open/closed state
       */
      toggleSidebar: () => {
        set((state: UIStoreState) => ({ sidebarOpen: !state.sidebarOpen }))
      },
      
      /**
       * Set the current view/page
       * @param view - View to set as current
       */
      setCurrentView: (view: UIStoreState['currentView']) => {
        set({ currentView: view })
      },
      
      /**
       * Set loading state
       * @param loading - Loading state
       */
      setLoading: (loading: boolean) => {
        set({ loading })
      },
      
      /**
       * Set error message
       * @param error - Error message or null to clear
       */
      setError: (error: string | null) => {
        set({ error })
      },
      
      /**
       * Clear current error
       */
      clearError: () => {
        set({ error: null })
      },
      
      /**
       * Set notifications preference
       * @param enabled - Whether notifications are enabled
       */
      setNotifications: (enabled: boolean) => {
        set({ notifications: enabled })
      },
      
      /**
       * Set sound effects preference
       * @param enabled - Whether sound effects are enabled
       */
      setSoundEffects: (enabled: boolean) => {
        set({ soundEffects: enabled })
      },
      
      /**
       * Set auto-save preference
       * @param enabled - Whether auto-save is enabled
       */
      setAutoSave: (enabled: boolean) => {
        set({ autoSave: enabled })
      },
      
      /**
       * Set show hints preference
       * @param enabled - Whether hints should be shown
       */
      setShowHints: (enabled: boolean) => {
        set({ showHints: enabled })
      },
      
      /**
       * Set mobile device state
       * @param isMobile - Whether device is mobile
       */
      setIsMobile: (isMobile: boolean) => {
        set({ isMobile })
        
        // Auto-close sidebar on mobile
        if (isMobile) {
          set({ sidebarOpen: false })
        }
      },
      
      /**
       * Set tablet device state
       * @param isTablet - Whether device is tablet
       */
      setIsTablet: (isTablet: boolean) => {
        set({ isTablet })
      },
      
      /**
       * Reset all preferences to default values
       */
      resetPreferences: () => {
        set({
          notifications: DEFAULT_PREFERENCES.notifications,
          soundEffects: DEFAULT_PREFERENCES.soundEffects,
          autoSave: DEFAULT_PREFERENCES.autoSave,
          showHints: DEFAULT_PREFERENCES.showHints
        })
      }
    }),
    {
      name: STORAGE_KEYS.USER_PREFERENCES,
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        notifications: state.notifications,
        soundEffects: state.soundEffects,
        autoSave: state.autoSave,
        showHints: state.showHints
      })
    }
  )
)