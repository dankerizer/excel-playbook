"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  PlayIcon,
  PauseIcon,
  SkipForwardIcon,
  SkipBackIcon,
  VolumeIcon,
  SettingsIcon,
  FullscreenIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  FileTextIcon,
  DownloadIcon,
  MessageCircleIcon,
  ThumbsUpIcon,
  ShareIcon,
  LockIcon,
  PlayCircleIcon,
} from "lucide-react"
import { motion } from "framer-motion"

// Interface untuk course
interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: 'Pemula' | 'Menengah' | 'Lanjutan'
  rating: number
  students: number
  price: number
  category: string
  lessons: number
  challenges: number
  isPopular?: boolean
  isFree?: boolean
  progress?: number
}

// Interface untuk lesson
interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'reading' | 'quiz' | 'challenge'
  isCompleted?: boolean
  isLocked?: boolean
  description?: string
  videoUrl?: string
  content?: string
}

// Interface untuk module
interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  duration: string
}

interface CourseLearningPageProps {
  course: Course
}

/**
 * Komponen halaman belajar course
 * Menampilkan video pembelajaran dan materi course
 */
export function CourseLearningPage({ course }: CourseLearningPageProps) {
  const [currentLessonId, setCurrentLessonId] = React.useState('lesson-1-1')
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(900) // 15 minutes in seconds
  const [showNotes, setShowNotes] = React.useState(false)
  const [notes, setNotes] = React.useState('')

  // Data mock untuk curriculum
  const mockCurriculum: Module[] = [
    {
      id: 'module-1',
      title: 'Pengenalan Excel',
      description: 'Dasar-dasar Excel dan interface',
      duration: '2 jam',
      lessons: [
        {
          id: 'lesson-1-1',
          title: 'Mengenal Interface Excel',
          duration: '15 menit',
          type: 'video',
          isCompleted: true,
          description: 'Pelajari bagian-bagian interface Excel',
          videoUrl: '/videos/lesson-1-1.mp4',
          content: 'Dalam pelajaran ini, kita akan mempelajari interface Excel yang terdiri dari ribbon, worksheet, formula bar, dan berbagai elemen penting lainnya.'
        },
        {
          id: 'lesson-1-2',
          title: 'Membuat Workbook Pertama',
          duration: '20 menit',
          type: 'video',
          isCompleted: false,
          description: 'Cara membuat dan menyimpan workbook',
          videoUrl: '/videos/lesson-1-2.mp4',
          content: 'Mari belajar cara membuat workbook baru, menyimpan file, dan mengelola worksheet dalam Excel.'
        },
        {
          id: 'lesson-1-3',
          title: 'Navigasi dan Shortcut Dasar',
          duration: '25 menit',
          type: 'video',
          isCompleted: false,
          description: 'Shortcut keyboard yang sering digunakan',
          videoUrl: '/videos/lesson-1-3.mp4',
          content: 'Pelajari shortcut keyboard yang akan meningkatkan produktivitas Anda dalam menggunakan Excel.'
        },
        {
          id: 'lesson-1-4',
          title: 'Quiz: Pengenalan Excel',
          duration: '10 menit',
          type: 'quiz',
          isCompleted: false,
          isLocked: true,
          description: 'Uji pemahaman Anda tentang dasar Excel'
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Input dan Format Data',
      description: 'Cara memasukkan dan memformat data',
      duration: '3 jam',
      lessons: [
        {
          id: 'lesson-2-1',
          title: 'Memasukkan Data',
          duration: '30 menit',
          type: 'video',
          isCompleted: false,
          isLocked: true,
          description: 'Berbagai cara memasukkan data ke Excel'
        },
        {
          id: 'lesson-2-2',
          title: 'Format Sel dan Data',
          duration: '45 menit',
          type: 'video',
          isCompleted: false,
          isLocked: true,
          description: 'Memformat angka, teks, dan tanggal'
        }
      ]
    }
  ]

  // Flatten all lessons untuk navigasi
  const allLessons = mockCurriculum.flatMap(module => module.lessons)
  const currentLesson = allLessons.find(lesson => lesson.id === currentLessonId)
  const currentLessonIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId)
  const nextLesson = allLessons[currentLessonIndex + 1]
  const prevLesson = allLessons[currentLessonIndex - 1]

  /**
   * Format waktu dari detik ke format MM:SS
   */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  /**
   * Handler untuk play/pause video
   */
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // TODO: Implementasi kontrol video player
  }

  /**
   * Handler untuk menandai lesson sebagai selesai
   */
  const handleMarkComplete = () => {
    // TODO: Implementasi mark complete ke backend
    console.log('Marking lesson as complete:', currentLessonId)
  }

  /**
   * Handler untuk navigasi ke lesson berikutnya
   */
  const handleNextLesson = () => {
    if (nextLesson && !nextLesson.isLocked) {
      setCurrentLessonId(nextLesson.id)
    }
  }

  /**
   * Handler untuk navigasi ke lesson sebelumnya
   */
  const handlePrevLesson = () => {
    if (prevLesson) {
      setCurrentLessonId(prevLesson.id)
    }
  }

  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <BookOpenIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Lesson tidak ditemukan</h3>
          <p className="text-muted-foreground">Silakan pilih lesson dari daftar curriculum.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href={`/course/${course.id}`}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Kembali ke Course
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="font-semibold">{course.title}</h1>
              <p className="text-sm text-muted-foreground">{currentLesson.title}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ShareIcon className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowNotes(!showNotes)}>
              <FileTextIcon className="h-4 w-4 mr-2" />
              Notes
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          {currentLesson.type === 'video' && (
            <div className="bg-black relative aspect-video">
              {/* Video placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <PlayCircleIcon className="h-20 w-20 mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-medium">{currentLesson.title}</p>
                  <p className="text-sm opacity-80">Video akan dimuat di sini</p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-2">
                  {/* Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div 
                      className="bg-white rounded-full h-1 transition-all"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePlayPause}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <PauseIcon className="h-5 w-5" />
                        ) : (
                          <PlayIcon className="h-5 w-5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <VolumeIcon className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <SettingsIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <FullscreenIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Lesson Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                  <p className="text-muted-foreground">{currentLesson.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{currentLesson.duration}</span>
                </div>
              </div>

              {/* Lesson Content */}
              {currentLesson.content && (
                <Card>
                  <CardHeader>
                    <CardTitle>Materi Pembelajaran</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed">{currentLesson.content}</p>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevLesson}
                  disabled={!prevLesson}
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Lesson Sebelumnya
                </Button>
                
                <div className="flex items-center gap-2">
                  {!currentLesson.isCompleted && (
                    <Button onClick={handleMarkComplete}>
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Tandai Selesai
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleNextLesson}
                    disabled={!nextLesson || nextLesson.isLocked}
                  >
                    Lesson Berikutnya
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Notes Section */}
              {showNotes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Catatan Pribadi</CardTitle>
                      <CardDescription>
                        Tulis catatan Anda untuk lesson ini
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tulis catatan Anda di sini..."
                        className="w-full h-32 p-3 border rounded-md resize-none"
                      />
                      <div className="flex justify-end mt-2">
                        <Button size="sm">
                          Simpan Catatan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Curriculum */}
        <div className="w-80 border-l bg-muted/30 overflow-auto">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Curriculum</h3>
            <p className="text-sm text-muted-foreground">
              {course.lessons} Pelajaran • {course.duration}
            </p>
          </div>
          
          <div className="p-4 space-y-4">
            {mockCurriculum.map((module, moduleIndex) => (
              <div key={module.id} className="space-y-2">
                <div className="font-medium text-sm">
                  Module {moduleIndex + 1}: {module.title}
                </div>
                
                <div className="space-y-1">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => !lesson.isLocked && setCurrentLessonId(lesson.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        lesson.id === currentLessonId
                          ? 'bg-primary text-primary-foreground'
                          : lesson.isLocked
                          ? 'opacity-60 cursor-not-allowed'
                          : 'hover:bg-muted'
                      }`}
                      disabled={lesson.isLocked}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                          {lesson.isCompleted ? (
                            <CheckCircleIcon className="h-4 w-4 text-green-600" />
                          ) : lesson.isLocked ? (
                            <LockIcon className="h-4 w-4 text-muted-foreground" />
                          ) : lesson.type === 'video' ? (
                            <PlayIcon className="h-4 w-4" />
                          ) : (
                            <BookOpenIcon className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{lesson.title}</div>
                          <div className="text-xs opacity-80">{lesson.duration}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}