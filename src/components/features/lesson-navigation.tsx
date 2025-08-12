"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  BookOpen,
  CheckCircle,
  Lock,
  Star,
  Trophy
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useProgressStore } from "@/store/use-progress-store"

interface LessonNavigationProps {
  chapterId: number
  lessonId: number
}

interface LessonInfo {
  id: number
  title: string
  isCompleted: boolean
  isLocked: boolean
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan'
}

interface ChapterInfo {
  id: number
  title: string
  lessons: LessonInfo[]
  totalLessons: number
  completedLessons: number
}

/**
 * Data chapter dan lesson untuk navigasi
 * Dalam implementasi nyata, ini akan diambil dari API atau database
 */
function getChapterData(chapterId: number): ChapterInfo {
  const chapters: Record<number, ChapterInfo> = {
    1: {
      id: 1,
      title: "Dasar-dasar Excel",
      totalLessons: 5,
      completedLessons: 2,
      lessons: [
        { id: 1, title: "Mengenal Interface Excel", isCompleted: true, isLocked: false, difficulty: "Pemula" },
        { id: 2, title: "Navigasi dan Seleksi Sel", isCompleted: true, isLocked: false, difficulty: "Pemula" },
        { id: 3, title: "Input Data dan Format Dasar", isCompleted: false, isLocked: false, difficulty: "Pemula" },
        { id: 4, title: "Menyimpan dan Membuka File", isCompleted: false, isLocked: true, difficulty: "Pemula" },
        { id: 5, title: "Print dan Export Data", isCompleted: false, isLocked: true, difficulty: "Pemula" }
      ]
    },
    2: {
      id: 2,
      title: "Formula dan Fungsi Dasar",
      totalLessons: 6,
      completedLessons: 1,
      lessons: [
        { id: 1, title: "Fungsi SUM Dasar", isCompleted: true, isLocked: false, difficulty: "Pemula" },
        { id: 2, title: "Fungsi AVERAGE dan COUNT", isCompleted: false, isLocked: false, difficulty: "Pemula" },
        { id: 3, title: "Fungsi MIN dan MAX", isCompleted: false, isLocked: true, difficulty: "Pemula" },
        { id: 4, title: "Operator Matematika", isCompleted: false, isLocked: true, difficulty: "Menengah" },
        { id: 5, title: "Referensi Sel Absolut", isCompleted: false, isLocked: true, difficulty: "Menengah" },
        { id: 6, title: "Formula Bersarang", isCompleted: false, isLocked: true, difficulty: "Menengah" }
      ]
    },
    3: {
      id: 3,
      title: "Fungsi Logika",
      totalLessons: 4,
      completedLessons: 0,
      lessons: [
        { id: 1, title: "Fungsi IF Dasar", isCompleted: false, isLocked: true, difficulty: "Menengah" },
        { id: 2, title: "IF Bersarang", isCompleted: false, isLocked: true, difficulty: "Menengah" },
        { id: 3, title: "Fungsi AND dan OR", isCompleted: false, isLocked: true, difficulty: "Menengah" },
        { id: 4, title: "Kombinasi Fungsi Logika", isCompleted: false, isLocked: true, difficulty: "Lanjutan" }
      ]
    }
  }
  
  return chapters[chapterId] || chapters[1]
}

/**
 * Mendapatkan lesson sebelumnya
 */
function getPreviousLesson(chapterId: number, lessonId: number): { chapterId: number; lessonId: number } | null {
  const currentChapter = getChapterData(chapterId)
  
  if (lessonId > 1) {
    return { chapterId, lessonId: lessonId - 1 }
  }
  
  if (chapterId > 1) {
    const prevChapter = getChapterData(chapterId - 1)
    return { chapterId: chapterId - 1, lessonId: prevChapter.lessons.length }
  }
  
  return null
}

/**
 * Mendapatkan lesson berikutnya
 */
function getNextLesson(chapterId: number, lessonId: number): { chapterId: number; lessonId: number } | null {
  const currentChapter = getChapterData(chapterId)
  
  if (lessonId < currentChapter.lessons.length) {
    const nextLesson = currentChapter.lessons[lessonId] // lessonId is 1-based, array is 0-based
    if (!nextLesson?.isLocked) {
      return { chapterId, lessonId: lessonId + 1 }
    }
  }
  
  // Check next chapter
  const nextChapter = getChapterData(chapterId + 1)
  if (nextChapter && nextChapter.id !== chapterId) {
    const firstLesson = nextChapter.lessons[0]
    if (!firstLesson?.isLocked) {
      return { chapterId: chapterId + 1, lessonId: 1 }
    }
  }
  
  return null
}

/**
 * Komponen navigasi untuk lesson
 * Menampilkan progress chapter, navigasi lesson, dan aksi cepat
 */
export function LessonNavigation({ chapterId, lessonId }: LessonNavigationProps) {
  const { points, streak } = useProgressStore()
  
  const chapterData = getChapterData(chapterId)
  const currentLesson = chapterData.lessons[lessonId - 1] // Convert to 0-based index
  const previousLesson = getPreviousLesson(chapterId, lessonId)
  const nextLesson = getNextLesson(chapterId, lessonId)
  
  const chapterProgress = (chapterData.completedLessons / chapterData.totalLessons) * 100
  
  /**
   * Mendapatkan warna badge berdasarkan tingkat kesulitan
   */
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Pemula': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Menengah': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Lanjutan': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }
  
  return (
    <div className="space-y-4">
      {/* Chapter Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Chapter Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Chapter {chapterId}: {chapterData.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {chapterData.completedLessons} dari {chapterData.totalLessons} lesson selesai
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{points.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{streak} hari</span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Progress Chapter
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.round(chapterProgress)}%
                  </span>
                </div>
                <Progress value={chapterProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Current Lesson Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Lesson {lessonId}: {currentLesson?.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getDifficultyColor(currentLesson?.difficulty || 'Pemula')}>
                      {currentLesson?.difficulty}
                    </Badge>
                    {currentLesson?.isCompleted && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Selesai
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Lesson List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Semua Lesson di Chapter Ini
            </h4>
            
            <div className="space-y-2">
              {chapterData.lessons.map((lesson, index) => {
                const isCurrentLesson = lesson.id === lessonId
                
                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {lesson.isLocked ? (
                      <div className={`p-3 rounded-lg border-2 transition-all ${
                        isCurrentLesson 
                          ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950' 
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded">
                              <Lock className="w-4 h-4 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-500 dark:text-gray-400">
                                Lesson {lesson.id}: {lesson.title}
                              </p>
                              <Badge className={getDifficultyColor(lesson.difficulty)}>
                                {lesson.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link href={`/learn/${chapterId}/${lesson.id}`}>
                        <div className={`p-3 rounded-lg border-2 transition-all cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 ${
                          isCurrentLesson 
                            ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950' 
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded ${
                                lesson.isCompleted 
                                  ? 'bg-green-100 dark:bg-green-900' 
                                  : isCurrentLesson
                                  ? 'bg-blue-100 dark:bg-blue-900'
                                  : 'bg-gray-100 dark:bg-gray-800'
                              }`}>
                                {lesson.isCompleted ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <BookOpen className={`w-4 h-4 ${
                                    isCurrentLesson ? 'text-blue-600' : 'text-gray-600'
                                  }`} />
                                )}
                              </div>
                              <div>
                                <p className={`font-medium ${
                                  isCurrentLesson 
                                    ? 'text-blue-900 dark:text-blue-100' 
                                    : 'text-gray-900 dark:text-white'
                                }`}>
                                  Lesson {lesson.id}: {lesson.title}
                                </p>
                                <Badge className={getDifficultyColor(lesson.difficulty)}>
                                  {lesson.difficulty}
                                </Badge>
                              </div>
                            </div>
                            
                            {isCurrentLesson && (
                              <Badge variant="outline" className="text-blue-600 border-blue-600">
                                Sedang Dipelajari
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              {/* Previous Lesson */}
              {previousLesson ? (
                <Link href={`/learn/${previousLesson.chapterId}/${previousLesson.lessonId}`}>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Lesson Sebelumnya
                  </Button>
                </Link>
              ) : (
                <Link href="/learn">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Kembali ke Daftar Chapter
                  </Button>
                </Link>
              )}
              
              {/* Next Lesson */}
              {nextLesson ? (
                <Link href={`/learn/${nextLesson.chapterId}/${nextLesson.lessonId}`}>
                  <Button className="flex items-center gap-2">
                    Lesson Selanjutnya
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/learn">
                  <Button className="flex items-center gap-2">
                    Selesai Chapter
                    <Trophy className="w-4 h-4" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}