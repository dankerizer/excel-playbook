/**
 * Constants for ExcelMaster Learning Platform
 */

// Excel Functions that will be supported
export const EXCEL_FUNCTIONS = {
  MATH: [
    'SUM', 'AVERAGE', 'COUNT', 'MAX', 'MIN',
    'ROUND', 'ROUNDUP', 'ROUNDDOWN', 'ABS',
    'POWER', 'SQRT', 'MOD'
  ],
  LOGICAL: [
    'IF', 'AND', 'OR', 'NOT', 'TRUE', 'FALSE'
  ],
  TEXT: [
    'CONCATENATE', 'LEFT', 'RIGHT', 'MID',
    'LEN', 'UPPER', 'LOWER', 'TRIM'
  ],
  DATE: [
    'TODAY', 'NOW', 'DATE', 'YEAR', 'MONTH', 'DAY'
  ],
  LOOKUP: [
    'VLOOKUP', 'HLOOKUP', 'INDEX', 'MATCH'
  ]
} as const

// Error messages in Indonesian
export const ERROR_MESSAGES = {
  FORMULA: {
    INVALID_SYNTAX: 'Sintaks formula tidak valid',
    UNKNOWN_FUNCTION: 'Fungsi tidak dikenal',
    MISSING_PARENTHESIS: 'Tanda kurung tidak lengkap',
    INVALID_REFERENCE: 'Referensi sel tidak valid',
    CIRCULAR_REFERENCE: 'Referensi melingkar terdeteksi'
  },
  VALIDATION: {
    REQUIRED_FIELD: 'Field ini wajib diisi',
    INVALID_EMAIL: 'Format email tidak valid',
    PASSWORD_TOO_SHORT: 'Password minimal 8 karakter',
    INVALID_NUMBER: 'Harus berupa angka'
  },
  GENERAL: {
    NETWORK_ERROR: 'Terjadi kesalahan jaringan',
    UNKNOWN_ERROR: 'Terjadi kesalahan yang tidak diketahui',
    ACCESS_DENIED: 'Akses ditolak'
  }
} as const

// Success messages in Indonesian
export const SUCCESS_MESSAGES = {
  LESSON_COMPLETED: 'Pelajaran berhasil diselesaikan!',
  CHAPTER_COMPLETED: 'Bab berhasil diselesaikan!',
  ACHIEVEMENT_UNLOCKED: 'Achievement baru terbuka!',
  PROGRESS_SAVED: 'Progress berhasil disimpan',
  PROFILE_UPDATED: 'Profil berhasil diperbarui'
} as const

// UI Constants
export const UI_CONSTANTS = {
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  DESKTOP_BREAKPOINT: 1280,
  MAX_CONTENT_WIDTH: 1200
} as const

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
} as const

// Points and Gamification
export const POINTS = {
  LESSON_COMPLETION: 10,
  CHAPTER_COMPLETION: 50,
  PERFECT_SCORE: 25,
  DAILY_STREAK: 5,
  WEEKLY_STREAK: 20,
  MONTHLY_STREAK: 100
} as const

// Achievement thresholds
export const ACHIEVEMENT_THRESHOLDS = {
  FIRST_LESSON: 1,
  FIRST_CHAPTER: 1,
  FIVE_CHAPTERS: 5,
  ALL_CHAPTERS: 10,
  WEEK_STREAK: 7,
  MONTH_STREAK: 30,
  POINTS_100: 100,
  POINTS_500: 500,
  POINTS_1000: 1000
} as const

// Spreadsheet constants
export const SPREADSHEET_CONFIG = {
  DEFAULT_ROWS: 20,
  DEFAULT_COLS: 10,
  MAX_ROWS: 100,
  MAX_COLS: 26, // A-Z
  CELL_WIDTH: 100,
  CELL_HEIGHT: 32,
  HEADER_HEIGHT: 32
} as const

// Column labels for spreadsheet
export const COLUMN_LABELS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
] as const

// Local storage keys
export const STORAGE_KEYS = {
  USER_PROGRESS: 'excelmaster_progress',
  USER_PREFERENCES: 'excelmaster_preferences',
  THEME: 'excelmaster_theme',
  TUTORIAL_COMPLETED: 'excelmaster_tutorial_completed'
} as const

// API endpoints (for mock API)
export const API_ENDPOINTS = {
  CHAPTERS: '/api/chapters',
  LESSONS: '/api/lessons',
  PROGRESS: '/api/progress',
  ACHIEVEMENTS: '/api/achievements',
  LEADERBOARD: '/api/leaderboard',
  USER: '/api/user'
} as const

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CELL_REFERENCE: /^[A-Z]+[1-9]\d*$/,
  CELL_RANGE: /^[A-Z]+[1-9]\d*:[A-Z]+[1-9]\d*$/,
  FORMULA: /^=.+/,
  FUNCTION_NAME: /^[A-Z]+$/
} as const

// Default user preferences
export const DEFAULT_PREFERENCES = {
  language: 'id' as const,
  notifications: true,
  soundEffects: true,
  autoSave: true,
  showHints: true
} as const