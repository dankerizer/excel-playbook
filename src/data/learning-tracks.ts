import type { LearningTrack, Chapter } from '@/types'

/**
 * Data learning tracks untuk sistem pembelajaran ExcelMaster
 * Setiap track memiliki fokus pembelajaran yang berbeda
 */

// Chapters untuk Track Dasar
const dasarChapters: Chapter[] = [
  {
    id: 1,
    title: "Pengenalan Excel",
    description: "Pelajari dasar-dasar Excel, interface, dan navigasi spreadsheet",
    icon: "📊",
    trackId: "dasar",
    lessons: [],
    estimatedTime: 120, // 2 jam
    difficulty: "beginner",
    prerequisites: [],
  },
  {
    id: 2,
    title: "Formula Dasar",
    description: "Menguasai formula matematika dasar dan referensi sel",
    icon: "🧮",
    trackId: "dasar",
    lessons: [],
    estimatedTime: 180, // 3 jam
    difficulty: "beginner",
    prerequisites: [1],
  },
  {
    id: 3,
    title: "Format dan Styling",
    description: "Belajar memformat sel, teks, dan membuat tabel yang menarik",
    icon: "🎨",
    trackId: "dasar",
    lessons: [],
    estimatedTime: 150, // 2.5 jam
    difficulty: "beginner",
    prerequisites: [1],
  },
  {
    id: 4,
    title: "Grafik Sederhana",
    description: "Membuat grafik dasar untuk visualisasi data",
    icon: "📈",
    trackId: "dasar",
    lessons: [],
    estimatedTime: 120, // 2 jam
    difficulty: "beginner",
    prerequisites: [1, 2],
  }
]

// Chapters untuk Track Menengah
const menengahChapters: Chapter[] = [
  {
    id: 5,
    title: "Fungsi Logika",
    description: "Pelajari fungsi IF, AND, OR untuk logika kondisional",
    icon: "🤔",
    trackId: "menengah",
    lessons: [],
    estimatedTime: 240, // 4 jam
    difficulty: "intermediate",
    prerequisites: [],
  },
  {
    id: 6,
    title: "Fungsi Teks",
    description: "Manipulasi dan pengolahan data teks dengan berbagai fungsi",
    icon: "📝",
    trackId: "menengah",
    lessons: [],
    estimatedTime: 180, // 3 jam
    difficulty: "intermediate",
    prerequisites: [5],
  },
  {
    id: 7,
    title: "Fungsi Tanggal & Waktu",
    description: "Bekerja dengan data tanggal dan waktu secara efektif",
    icon: "📅",
    trackId: "menengah",
    lessons: [],
    estimatedTime: 150, // 2.5 jam
    difficulty: "intermediate",
    prerequisites: [5],
  },
  {
    id: 8,
    title: "VLOOKUP & HLOOKUP",
    description: "Pencarian data dengan fungsi lookup yang powerful",
    icon: "🔍",
    trackId: "menengah",
    lessons: [],
    estimatedTime: 300, // 5 jam
    difficulty: "intermediate",
    prerequisites: [5, 6],
  },
  {
    id: 9,
    title: "Analisis Data Dasar",
    description: "Sorting, filtering, dan analisis data sederhana",
    icon: "📊",
    trackId: "menengah",
    lessons: [],
    estimatedTime: 240, // 4 jam
    difficulty: "intermediate",
    prerequisites: [5, 8],
  }
]

// Chapters untuk Track Perkantoran
const perkantoranChapters: Chapter[] = [
  {
    id: 10,
    title: "Pivot Table",
    description: "Analisis data dengan Pivot Table untuk insight mendalam",
    icon: "🔄",
    trackId: "perkantoran",
    lessons: [],
    estimatedTime: 240, // 4 jam
    difficulty: "advanced",
    prerequisites: [],
  },
  {
    id: 11,
    title: "Dashboard & Reporting",
    description: "Membuat dashboard interaktif dan laporan profesional",
    icon: "📋",
    trackId: "perkantoran",
    lessons: [],
    estimatedTime: 360, // 6 jam
    difficulty: "advanced",
    prerequisites: [10],
  },
  {
    id: 12,
    title: "Macro & Automation",
    description: "Otomatisasi tugas dengan Macro dan VBA dasar",
    icon: "⚡",
    trackId: "perkantoran",
    lessons: [],
    estimatedTime: 360, // 6 jam
    difficulty: "advanced",
    prerequisites: [10],
  },
  {
    id: 13,
    title: "Kolaborasi & Sharing",
    description: "Berbagi workbook, proteksi data, dan kolaborasi tim",
    icon: "👥",
    trackId: "perkantoran",
    lessons: [],
    estimatedTime: 180, // 3 jam
    difficulty: "advanced",
    prerequisites: [10, 11],
  },
  {
    id: 14,
    title: "Studi Kasus Bisnis",
    description: "Aplikasi Excel dalam skenario bisnis nyata",
    icon: "💼",
    trackId: "perkantoran",
    lessons: [],
    estimatedTime: 480, // 8 jam
    difficulty: "advanced",
    prerequisites: [10, 11, 12],
  }
]

/**
 * Daftar learning tracks yang tersedia
 */
export const learningTracks: LearningTrack[] = [
  {
    id: "dasar",
    title: "Excel Dasar",
    description: "Pelajari fundamental Excel dari nol. Cocok untuk pemula yang belum pernah menggunakan Excel.",
    icon: "🌱",
    level: "dasar",
    chapters: dasarChapters,
    estimatedTime: 570, // Total dari semua chapters
    totalLessons: 20, // Estimasi total lessons
    certificateTemplate: "excel-dasar-certificate",
    skills: ["Navigasi Excel", "Formula Dasar", "Format Sel", "Grafik Sederhana"],
  },
  {
    id: "menengah",
    title: "Excel Menengah",
    description: "Tingkatkan skill Excel dengan fungsi-fungsi lanjutan dan analisis data.",
    icon: "📈",
    level: "menengah",
    chapters: menengahChapters,
    estimatedTime: 1110, // Total dari semua chapters
    totalLessons: 35, // Estimasi total lessons
    certificateTemplate: "excel-menengah-certificate",
    prerequisites: ["dasar"],
    skills: ["Fungsi Logika", "Manipulasi Teks", "Fungsi Tanggal", "VLOOKUP/HLOOKUP", "Analisis Data"],
  },
  {
    id: "perkantoran",
    title: "Excel Perkantoran",
    description: "Master Excel untuk kebutuhan profesional dan bisnis dengan tools advanced.",
    icon: "💼",
    level: "perkantoran",
    chapters: perkantoranChapters,
    estimatedTime: 1620, // Total dari semua chapters
    totalLessons: 45, // Estimasi total lessons
    certificateTemplate: "excel-perkantoran-certificate",
    prerequisites: ["dasar", "menengah"],
    skills: ["Pivot Table", "Dashboard", "Macro & VBA", "Kolaborasi Tim", "Analisis Bisnis"],
  }
]

/**
 * Mendapatkan learning track berdasarkan ID
 * @param trackId - ID learning track
 * @returns Learning track atau undefined jika tidak ditemukan
 */
export function getLearningTrackById(trackId: string): LearningTrack | undefined {
  return learningTracks.find(track => track.id === trackId)
}

/**
 * Mendapatkan chapters berdasarkan track ID
 * @param trackId - ID learning track
 * @returns Array chapters atau empty array jika tidak ditemukan
 */
export function getChaptersByTrackId(trackId: string): Chapter[] {
  const track = getLearningTrackById(trackId)
  return track?.chapters || []
}

/**
 * Mendapatkan learning tracks yang tersedia untuk user
 * berdasarkan tracks yang sudah diselesaikan
 * @param completedTracks - Array ID tracks yang sudah diselesaikan
 * @returns Array learning tracks yang bisa diakses
 */
export function getAvailableTracks(completedTracks: string[] = []): LearningTrack[] {
  return learningTracks.filter(track => {
    if (!track.prerequisites || track.prerequisites.length === 0) {
      return true
    }
    
    // Cek apakah semua prerequisite sudah diselesaikan
    return track.prerequisites.every(prereq => completedTracks.includes(prereq))
  })
}

/**
 * Menghitung total progress untuk sebuah track
 * @param trackId - ID learning track
 * @param completedChapters - Array ID chapters yang sudah diselesaikan
 * @returns Persentase progress (0-100)
 */
export function calculateTrackProgress(trackId: string, completedChapters: number[]): number {
  const track = getLearningTrackById(trackId)
  if (!track) return 0
  
  const trackChapterIds = track.chapters.map(chapter => chapter.id)
  const completedTrackChapters = completedChapters.filter(chapterId => 
    trackChapterIds.includes(chapterId)
  )
  
  return Math.round((completedTrackChapters.length / track.chapters.length) * 100)
}

/**
 * Mengecek apakah sebuah track sudah diselesaikan
 * @param trackId - ID learning track
 * @param completedChapters - Array ID chapters yang sudah diselesaikan
 * @returns True jika track sudah diselesaikan
 */
export function isTrackCompleted(trackId: string, completedChapters: number[]): boolean {
  const progress = calculateTrackProgress(trackId, completedChapters)
  return progress === 100
}