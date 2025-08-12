/**
 * Core types for ExcelMaster Learning Platform
 */

// User and Progress Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  lastActiveAt: Date
}

export interface Progress {
  userId: string
  completedChapters: number[]
  currentChapter: number
  currentLesson: number
  points: number
  streak: number
  achievements: Achievement[]
  lastUpdated: Date
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: Date
  points: number
}

// Learning Content Types
export interface Chapter {
  id: number
  title: string
  description: string
  icon: string
  lessons: Lesson[]
  estimatedTime: number // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  prerequisites: number[] // chapter IDs
}

export interface Lesson {
  id: number
  chapterId: number
  title: string
  description: string
  type: 'tutorial' | 'practice' | 'challenge'
  content: LessonContent
  estimatedTime: number // in minutes
  points: number
}

export interface LessonContent {
  introduction: string
  steps: LessonStep[]
  summary: string
  nextSteps?: string
}

export interface LessonStep {
  id: string
  title: string
  description: string
  type: 'explanation' | 'demo' | 'practice' | 'quiz'
  content: string
  hints?: string[]
  solution?: string
  validation?: ValidationRule[]
}

// Spreadsheet and Formula Types
export interface SpreadsheetCell {
  row: number
  col: number
  value: string | number | boolean | null
  formula?: string
  format?: CellFormat
}

export interface CellFormat {
  type: 'text' | 'number' | 'currency' | 'percentage' | 'date'
  decimals?: number
  bold?: boolean
  italic?: boolean
  color?: string
  backgroundColor?: string
}

export interface SpreadsheetContext {
  cells: Map<string, SpreadsheetCell> // key: "A1", "B2", etc.
  selectedCell?: string
  selectedRange?: CellRange
}

export interface CellRange {
  start: { row: number; col: number }
  end: { row: number; col: number }
}

export interface FormulaResult {
  value: string | number | boolean | null
  error?: FormulaError
}

export interface FormulaError {
  type: 'NAME' | 'VALUE' | 'REF' | 'DIV0' | 'NA' | 'NUM'
  message: string
  suggestion?: string
}

// Validation and Challenge Types
export interface ValidationRule {
  type: 'formula' | 'value' | 'format' | 'range'
  target: string // cell reference or range
  expected: string | number | boolean | null
  tolerance?: number // for numeric comparisons
  message?: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  timeLimit?: number // in seconds
  initialData: SpreadsheetCell[]
  objectives: ChallengeObjective[]
  hints: string[]
  solution: ChallengeSolution
}

export interface ChallengeObjective {
  id: string
  description: string
  validation: ValidationRule[]
  points: number
}

export interface ChallengeSolution {
  steps: string[]
  finalData: SpreadsheetCell[]
  explanation: string
}

// UI and State Types
export type Theme = 'light' | 'dark'
export type ChapterStatus = 'locked' | 'available' | 'completed'
export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed'

export interface UIState {
  theme: Theme
  sidebarOpen: boolean
  currentView: 'dashboard' | 'learn' | 'playground' | 'leaderboard' | 'profile'
  loading: boolean
  error?: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasNext: boolean
  hasPrev: boolean
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number
  user: Pick<User, 'id' | 'name' | 'avatar'>
  points: number
  completedChapters: number
  streak: number
}

export interface LeaderboardFilters {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time'
  category: 'points' | 'chapters' | 'streak'
}