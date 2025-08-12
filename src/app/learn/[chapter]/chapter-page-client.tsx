"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useProgressStore } from "@/store/use-progress-store"
import { cn } from "@/lib/utils"
import {
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  StarIcon,
  TrophyIcon,
  UserIcon,
  CalendarIcon,
  AwardIcon
} from "lucide-react"
import { notFound } from "next/navigation"

interface ChapterPageClientProps {
  chapter: string
}

interface Lesson {
  id: number
  title: string
  description: string
  duration: number // dalam menit
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  points: number
  isCompleted: boolean
  isLocked: boolean
}

/**
 * Client component untuk halaman chapter dengan semua interaktivitas
 */
export function ChapterPageClient({ chapter }: ChapterPageClientProps) {
  const { isLessonCompleted, completionPercentage, points } = useProgressStore()
  
  const chapterId = parseInt(chapter)
  
  if (isNaN(chapterId) || chapterId < 1 || chapterId > 10) {
    notFound()
  }

  /**
   * Mendapatkan data lessons untuk chapter tertentu
   */
  const getLessonsForChapter = (chapterId: number): Lesson[] => {
    // Data mock untuk lessons - dalam implementasi nyata akan dari API
    const baseLessons = [
      {
        id: 1,
        title: "Pengenalan Operator Matematika",
        description: "Memahami +, -, *, / dalam Excel",
        duration: 5,
        difficulty: 'beginner' as const,
        points: 100
      },
      {
        id: 2,
        title: "Fungsi SUM Dasar",
        description: "Menjumlahkan range sel dengan SUM",
        duration: 8,
        difficulty: 'beginner' as const,
        points: 100
      },
      {
        id: 3,
        title: "SUM dengan Multiple Range",
        description: "Menjumlahkan beberapa range sekaligus",
        duration: 8,
        difficulty: 'beginner' as const,
        points: 100
      },
      {
        id: 4,
        title: "Kombinasi Operasi Matematika",
        description: "Menggabungkan +, -, *, / dalam satu formula",
        duration: 10,
        difficulty: 'intermediate' as const,
        points: 100
      },
      {
        id: 5,
        title: "Urutan Operasi (BODMAS)",
        description: "Memahami prioritas operasi matematika",
        duration: 8,
        difficulty: 'intermediate' as const,
        points: 100
      },
      {
        id: 6,
        title: "Praktik Kasus: Laporan Keuangan",
        description: "Uji kemampuan fungsi matematika dan data",
        duration: 15,
        difficulty: 'advanced' as const,
        points: 100
      },
      {
        id: 7,
        title: "Quiz: Uji Kemampuan",
        description: "Tes pemahaman fungsi matematika",
        duration: 10,
        difficulty: 'advanced' as const,
        points: 100
      }
    ]

    return baseLessons.map(lesson => {
      const isCompleted = isLessonCompleted(chapterId, lesson.id)
      const isLocked = lesson.id > 1 && !isLessonCompleted(chapterId, lesson.id - 1)
      
      return {
        ...lesson,
        isCompleted,
        isLocked
      }
    })
  }

  /**
   * Mendapatkan informasi chapter
   */
  const getChapterInfo = (chapterId: number) => {
    const chapters = {
      1: {
        title: "Fungsi Matematika Dasar",
        description: "Kuasai SUM, pengurangan, perkalian, dan pembagian dalam Excel untuk membangun fondasi yang kuat.",
        icon: "📊",
        totalLessons: 7,
        estimatedTime: 54
      },
      2: {
        title: "Fungsi Logika",
        description: "Pelajari IF, AND, OR untuk membuat keputusan otomatis dalam spreadsheet Anda.",
        icon: "🧠",
        totalLessons: 6,
        estimatedTime: 45
      },
      3: {
        title: "Fungsi Teks",
        description: "Manipulasi teks dengan CONCATENATE, LEFT, RIGHT, MID, dan fungsi teks lainnya.",
        icon: "📝",
        totalLessons: 8,
        estimatedTime: 60
      }
    }
    
    return chapters[chapterId as keyof typeof chapters] || chapters[1]
  }

  /**
   * Mendapatkan warna badge berdasarkan difficulty
   */
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  /**
   * Mendapatkan label difficulty dalam bahasa Indonesia
   */
  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Pemula'
      case 'intermediate':
        return 'Menengah'
      case 'advanced':
        return 'Lanjutan'
      default:
        return 'Pemula'
    }
  }

  const lessons = getLessonsForChapter(chapterId)
  const chapterInfo = getChapterInfo(chapterId)
  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length
  const progressPercentage = (completedLessons / lessons.length) * 100
  const totalProgress = completionPercentage
  const totalCompletedLessons = completedLessons

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/learn" className="flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Kembali ke Materi
            </Link>
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/avatars/user.png" alt="User" />
              <AvatarFallback>
                <UserIcon className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Selamat datang kembali!</h1>
              <p className="text-gray-600">Mari lanjutkan perjalanan belajar Excel Anda</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Konten Utama - Kolom Kiri */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chapter Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{chapterInfo.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpenIcon className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-600">Chapter {chapterId}</span>
                      </div>
                      <CardTitle className="text-2xl mb-2">{chapterInfo.title}</CardTitle>
                      <CardDescription className="text-base">
                        {chapterInfo.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="h-4 w-4" />
                      <span>{chapterInfo.estimatedTime} menit</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpenIcon className="h-4 w-4" />
                      <span>{chapterInfo.totalLessons} lesson</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <TrophyIcon className="h-4 w-4" />
                      <span>{lessons.reduce((total, lesson) => total + lesson.points, 0)} poin</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress Chapter</span>
                      <span className="text-sm text-gray-600">{completedLessons}/{lessons.length} selesai</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </CardHeader>
              </Card>
            </motion.div>

            {/* Daftar Lesson */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpenIcon className="h-5 w-5" />
                    Daftar Lesson
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border transition-all duration-200",
                        lesson.isCompleted
                          ? "bg-green-50 border-green-200"
                          : lesson.isLocked
                          ? "bg-gray-50 border-gray-200 opacity-60"
                          : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-md"
                      )}
                    >
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {lesson.isCompleted ? (
                          <CheckCircleIcon className="h-8 w-8 text-green-600" />
                        ) : lesson.isLocked ? (
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 text-sm font-medium">{lesson.id}</span>
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <PlayIcon className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className={cn(
                              "font-semibold mb-1",
                              lesson.isLocked ? "text-gray-400" : "text-gray-900"
                            )}>
                              {lesson.id}. {lesson.title}
                            </h3>
                            <p className={cn(
                              "text-sm mb-2",
                              lesson.isLocked ? "text-gray-400" : "text-gray-600"
                            )}>
                              {lesson.description}
                            </p>
                            <div className="flex items-center gap-3">
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  "text-xs",
                                  lesson.isLocked ? "border-gray-200 text-gray-400" : getDifficultyColor(lesson.difficulty)
                                )}
                              >
                                {getDifficultyLabel(lesson.difficulty)}
                              </Badge>
                              <span className={cn(
                                "text-xs flex items-center gap-1",
                                lesson.isLocked ? "text-gray-400" : "text-gray-500"
                              )}>
                                <ClockIcon className="h-3 w-3" />
                                {lesson.duration} menit
                              </span>
                              <span className={cn(
                                "text-xs flex items-center gap-1",
                                lesson.isLocked ? "text-gray-400" : "text-gray-500"
                              )}>
                                <StarIcon className="h-3 w-3" />
                                {lesson.points} poin
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        {lesson.isCompleted ? (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/learn/${chapterId}/${lesson.id}`}>
                              Ulangi
                            </Link>
                          </Button>
                        ) : lesson.isLocked ? (
                          <Button variant="ghost" size="sm" disabled>
                            Terkunci
                          </Button>
                        ) : (
                          <Button size="sm" asChild>
                            <Link href={`/learn/${chapterId}/${lesson.id}`}>
                              Mulai
                            </Link>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar Progress - Kolom Kanan */}
          <div className="space-y-6">
            {/* Progress Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Progress Terakhir</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{Math.round(totalProgress)}%</div>
                    <p className="text-sm text-gray-600">Total Progress</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-semibold text-gray-900">{totalCompletedLessons}</div>
                      <p className="text-xs text-gray-600">Lesson Selesai</p>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-gray-900">3</div>
                      <p className="text-xs text-gray-600">Hari Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Motivational Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Tetap Semangat!</h3>
                  <p className="text-sm text-blue-100 mb-4">
                    Anda sudah menyelesaikan {completedLessons} lesson di chapter ini. Terus lanjutkan!
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrophyIcon className="h-4 w-4" />
                    <span>Target: Selesaikan 1 lesson hari ini</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievement Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AwardIcon className="h-5 w-5 text-yellow-600" />
                    Achievement Terbaru
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "First Step", desc: "Menyelesaikan lesson pertama", icon: "🎯" },
                    { title: "Math Master", desc: "Menguasai fungsi matematika", icon: "🧮" },
                    { title: "Speed Learner", desc: "Belajar 3 hari berturut-turut", icon: "⚡" }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Tips Belajar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Tips Belajar</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      Praktikkan setiap formula di Excel nyata
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      Luangkan 15-30 menit setiap hari untuk belajar
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      Ulangi lesson yang sudah selesai untuk memperkuat ingatan
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}