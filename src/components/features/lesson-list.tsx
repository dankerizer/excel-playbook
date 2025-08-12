"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useProgressStore } from "@/store/use-progress-store"
import { cn } from "@/lib/utils"
import {
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  StarIcon,
  TrophyIcon
} from "lucide-react"

interface LessonListProps {
  chapterId: number
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
 * Komponen untuk menampilkan daftar lesson dalam sebuah chapter
 * Menampilkan progress, status completion, dan navigasi ke lesson
 */
export function LessonList({ chapterId }: LessonListProps) {
  const { isLessonCompleted, currentChapter, currentLesson } = useProgressStore()

  /**
   * Data mock untuk lessons berdasarkan chapter
   * Dalam implementasi nyata, ini akan diambil dari API atau database
   */
  const getLessonsForChapter = (chapterId: number): Lesson[] => {
    const baseLessons = [
      {
        id: 1,
        title: "Pengenalan Interface Excel",
        description: "Mengenal ribbon, worksheet, dan elemen dasar Excel",
        duration: 15,
        difficulty: 'beginner' as const,
        points: 10
      },
      {
        id: 2,
        title: "Navigasi dan Seleksi Cell",
        description: "Cara bergerak dan memilih cell dengan efisien",
        duration: 20,
        difficulty: 'beginner' as const,
        points: 15
      },
      {
        id: 3,
        title: "Input Data dan Format Dasar",
        description: "Memasukkan data dan formatting sederhana",
        duration: 25,
        difficulty: 'beginner' as const,
        points: 20
      },
      {
        id: 4,
        title: "Formula Dasar",
        description: "Membuat formula sederhana dengan operator matematika",
        duration: 30,
        difficulty: 'intermediate' as const,
        points: 25
      },
      {
        id: 5,
        title: "Latihan Chapter",
        description: "Praktik semua yang telah dipelajari dalam chapter ini",
        duration: 20,
        difficulty: 'intermediate' as const,
        points: 30
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

  const lessons = getLessonsForChapter(chapterId)
  const completedCount = lessons.filter(lesson => lesson.isCompleted).length
  const progressPercentage = (completedCount / lessons.length) * 100

  /**
   * Mendapatkan warna badge berdasarkan tingkat kesulitan
   */
  const getDifficultyColor = (difficulty: Lesson['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  /**
   * Mendapatkan label tingkat kesulitan dalam bahasa Indonesia
   */
  const getDifficultyLabel = (difficulty: Lesson['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'Pemula'
      case 'intermediate':
        return 'Menengah'
      case 'advanced':
        return 'Lanjutan'
      default:
        return 'Tidak Diketahui'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Chapter */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/learn" className="flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Kembali ke Daftar Chapter
            </Link>
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpenIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Chapter {chapterId}</h1>
            <p className="text-muted-foreground">
              {completedCount} dari {lessons.length} lesson selesai
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress Chapter</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-4">
        {lessons.map((lesson, index) => {
          const isCurrentLesson = currentChapter === chapterId && currentLesson === lesson.id
          
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cn(
                "transition-all duration-200 hover:shadow-md",
                lesson.isLocked && "opacity-60",
                lesson.isCompleted && "border-green-200 bg-green-50/50",
                isCurrentLesson && "border-primary bg-primary/5"
              )}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">
                          {lesson.title}
                        </CardTitle>
                        {lesson.isCompleted && (
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                        )}
                        {isCurrentLesson && (
                          <Badge variant="default" className="text-xs">
                            Sedang Dipelajari
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {lesson.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  {/* Lesson Metadata */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {lesson.duration} menit
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={getDifficultyColor(lesson.difficulty)}
                    >
                      {getDifficultyLabel(lesson.difficulty)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-yellow-500" />
                      {lesson.points} poin
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {lesson.isCompleted && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <TrophyIcon className="h-4 w-4" />
                          Selesai
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      asChild
                      disabled={lesson.isLocked}
                      variant={lesson.isCompleted ? "outline" : "default"}
                      size="sm"
                    >
                      <Link href={`/learn/${chapterId}/${lesson.id}`}>
                        {lesson.isCompleted ? (
                          <>
                            <CheckCircleIcon className="mr-2 h-4 w-4" />
                            Ulangi
                          </>
                        ) : (
                          <>
                            <PlayIcon className="mr-2 h-4 w-4" />
                            {isCurrentLesson ? 'Lanjutkan' : 'Mulai'}
                          </>
                        )}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Chapter Summary */}
      {completedCount === lessons.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8"
        >
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <TrophyIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Selamat! Chapter {chapterId} Selesai
                </h3>
                <p className="text-green-700 mb-4">
                  Anda telah menyelesaikan semua lesson dalam chapter ini.
                </p>
                <Button asChild>
                  <Link href="/learn">
                    Lanjut ke Chapter Berikutnya
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}