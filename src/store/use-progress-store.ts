import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Progress, Achievement, Certificate } from '@/types'
import { STORAGE_KEYS, POINTS } from '@/lib/constants'
import { calculateTrackProgress, isTrackCompleted } from '@/data/learning-tracks'

interface ProgressState {
  // State
  userId: string | null
  selectedTrack: string | null // current learning track
  completedTracks: string[] // completed track IDs
  completedChapters: number[]
  currentChapter: number
  currentLesson: number
  points: number
  streak: number
  achievements: Achievement[]
  certificates: Certificate[] // earned certificates
  lastUpdated: Date | null
  
  // Computed values
  totalChapters: number
  completionPercentage: number
}

interface ProgressActions {
  // Actions
  initializeProgress: (userId: string) => void
  selectTrack: (trackId: string) => void
  completeTrack: (trackId: string) => void
  completeLesson: (chapterId: number, lessonId: number, earnedPoints?: number) => void
  completeChapter: (chapterId: number) => void
  updateStreak: () => void
  addAchievement: (achievement: Achievement) => void
  addCertificate: (certificate: Certificate) => void
  resetProgress: () => void
  setCurrentChapter: (chapterId: number) => void
  setCurrentLesson: (lessonId: number) => void
  
  // Getters
  isTrackCompleted: (trackId: string) => boolean
  isChapterCompleted: (chapterId: number) => boolean
  isLessonCompleted: (chapterId: number, lessonId: number) => boolean
  getTrackProgress: (trackId: string) => number
  getChapterProgress: (chapterId: number) => number
}

type ProgressStore = ProgressState & ProgressActions

const initialState: ProgressState = {
  userId: null,
  selectedTrack: null,
  completedTracks: [],
  completedChapters: [],
  currentChapter: 1,
  currentLesson: 1,
  points: 0,
  streak: 0,
  achievements: [],
  certificates: [],
  lastUpdated: null,
  totalChapters: 10, // Based on the 10 chapters mentioned in requirements
  completionPercentage: 0
}

/**
 * Zustand store for managing user learning progress
 * Persisted to localStorage for offline access
 */
export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      /**
       * Initialize progress for a user
       * @param userId - User ID to initialize progress for
       */
      initializeProgress: (userId: string) => {
        set({
          userId,
          lastUpdated: new Date()
        })
      },
      
      /**
       * Select a learning track for the user
       * @param trackId - Learning track ID to select
       */
      selectTrack: (trackId: string) => {
        set({
          selectedTrack: trackId,
          lastUpdated: new Date()
        })
      },
      
      /**
       * Mark a learning track as completed
       * @param trackId - Learning track ID to complete
       */
      completeTrack: (trackId: string) => {
        const state = get()
        
        if (state.completedTracks.includes(trackId)) {
          return
        }
        
        set({
          completedTracks: [...state.completedTracks, trackId],
          lastUpdated: new Date()
        })
      },
      
      /**
       * Mark a lesson as completed and award points
       * @param chapterId - Chapter ID
       * @param lessonId - Lesson ID
       * @param earnedPoints - Points earned (default: POINTS.LESSON_COMPLETION)
       */
      completeLesson: (chapterId: number, lessonId: number, earnedPoints = POINTS.LESSON_COMPLETION) => {
        const state = get()
        
        // Check if lesson is already completed
        if (state.isLessonCompleted(chapterId, lessonId)) {
          return
        }
        
        set({
          points: state.points + earnedPoints,
          lastUpdated: new Date()
        })
        
        // Update streak if this is a daily completion
        state.updateStreak()
      },
      
      /**
       * Mark a chapter as completed
       * @param chapterId - Chapter ID to complete
       */
      completeChapter: (chapterId: number) => {
        const state = get()
        
        if (state.completedChapters.includes(chapterId)) {
          return
        }
        
        const newCompletedChapters = [...state.completedChapters, chapterId]
        const newCompletionPercentage = (newCompletedChapters.length / state.totalChapters) * 100
        
        set({
          completedChapters: newCompletedChapters,
          points: state.points + POINTS.CHAPTER_COMPLETION,
          completionPercentage: newCompletionPercentage,
          lastUpdated: new Date()
        })
      },
      
      /**
       * Update daily streak counter
       */
      updateStreak: () => {
        const state = get()
        const today = new Date()
        const lastUpdate = state.lastUpdated
        
        if (!lastUpdate) {
          set({ streak: 1 })
          return
        }
        
        const daysDiff = Math.floor((today.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysDiff === 1) {
          // Consecutive day - increment streak
          set({ 
            streak: state.streak + 1,
            points: state.points + POINTS.DAILY_STREAK
          })
        } else if (daysDiff > 1) {
          // Streak broken - reset to 1
          set({ streak: 1 })
        }
        // Same day - no change to streak
      },
      
      /**
       * Add an achievement to user's profile
       * @param achievement - Achievement to add
       */
      addAchievement: (achievement: Achievement) => {
        const state = get()
        
        // Check if achievement already exists
        if (state.achievements.some((a: Achievement) => a.id === achievement.id)) {
          return
        }
        
        set({
          achievements: [...state.achievements, achievement],
          points: state.points + achievement.points,
          lastUpdated: new Date()
        })
      },
      
      /**
       * Add a certificate to user's profile
       * @param certificate - Certificate to add
       */
      addCertificate: (certificate: Certificate) => {
        const state = get()
        
        // Check if certificate already exists
        if (state.certificates.some((c: Certificate) => c.id === certificate.id)) {
          return
        }
        
        set({
          certificates: [...state.certificates, certificate],
          lastUpdated: new Date()
        })
      },
      
      /**
       * Reset all progress data
       */
      resetProgress: () => {
        set({
          ...initialState,
          userId: get().userId // Keep user ID
        })
      },
      
      /**
       * Set current chapter
       * @param chapterId - Chapter ID to set as current
       */
      setCurrentChapter: (chapterId: number) => {
        set({ currentChapter: chapterId })
      },
      
      /**
       * Set current lesson
       * @param lessonId - Lesson ID to set as current
       */
      setCurrentLesson: (lessonId: number) => {
        set({ currentLesson: lessonId })
      },
      
      /**
       * Check if a chapter is completed
       * @param chapterId - Chapter ID to check
       * @returns True if chapter is completed
       */
      isChapterCompleted: (chapterId: number) => {
        return get().completedChapters.includes(chapterId)
      },
      
      /**
       * Check if a lesson is completed
       * @param chapterId - Chapter ID
       * @param lessonId - Lesson ID
       * @returns True if lesson is completed
       */
      isLessonCompleted: (chapterId: number, lessonId: number) => {
        // For now, we'll consider a lesson completed if its chapter is completed
        // This can be enhanced later with more granular lesson tracking
        return get().completedChapters.includes(chapterId)
      },
      
      /**
       * Check if a learning track is completed
       * @param trackId - Learning track ID to check
       * @returns True if track is completed
       */
      isTrackCompleted: (trackId: string) => {
        const state = get()
        return isTrackCompleted(trackId, state.completedChapters)
      },
      
      /**
       * Get progress percentage for a learning track
       * @param trackId - Learning track ID
       * @returns Progress percentage (0-100)
       */
      getTrackProgress: (trackId: string) => {
        const state = get()
        return calculateTrackProgress(trackId, state.completedChapters)
      },
      
      /**
       * Get progress percentage for a specific chapter
       * @param chapterId - Chapter ID
       * @returns Progress percentage (0-100)
       */
      getChapterProgress: (chapterId: number) => {
        const state = get()
        
        if (state.completedChapters.includes(chapterId)) {
          return 100
        }
        
        if (state.currentChapter === chapterId) {
          // Return partial progress based on current lesson
          // Assuming 5 lessons per chapter on average
          return Math.min((state.currentLesson / 5) * 100, 90)
        }
        
        return 0
      }
    }),
    {
      name: STORAGE_KEYS.USER_PROGRESS,
      partialize: (state) => ({
        userId: state.userId,
        selectedTrack: state.selectedTrack,
        completedTracks: state.completedTracks,
        completedChapters: state.completedChapters,
        currentChapter: state.currentChapter,
        currentLesson: state.currentLesson,
        points: state.points,
        streak: state.streak,
        achievements: state.achievements,
        certificates: state.certificates,
        lastUpdated: state.lastUpdated
      })
    }
  )
)