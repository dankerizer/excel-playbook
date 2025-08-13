'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircleIcon, 
  LockIcon, 
  ClockIcon, 
  BookOpenIcon, 
  PlayIcon,
  ArrowLeftIcon,
  TrophyIcon
} from 'lucide-react'
import { useProgressStore } from '@/store/use-progress-store'
import { getLearningTrackById } from '@/data/learning-tracks'
import type { Chapter } from '@/types'

interface TrackChapterListProps {
  trackId: string
}

/**
 * Komponen untuk menampilkan daftar chapter dalam sebuah learning track
 * Menampilkan progress, status, dan navigasi ke chapter
 */
export function TrackChapterList({ trackId }: TrackChapterListProps) {
  const router = useRouter()
  const { 
    completedChapters,
    currentChapter,
    isChapterCompleted,
    getTrackProgress,
    setCurrentChapter
  } = useProgressStore()

  const track = getLearningTrackById(trackId)

  if (!track) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Track tidak ditemukan</h1>
        <Button 
          variant="outline" 
          onClick={() => router.push('/learn')}
          className="mt-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Kembali ke Pemilihan Track
        </Button>
      </div>
    )
  }

  const trackProgress = getTrackProgress(trackId)
  const completedChaptersCount = track.chapters.filter(chapter => 
    isChapterCompleted(chapter.id)
  ).length

  /**
   * Handle navigasi ke chapter
   * @param chapterId - ID chapter yang akan dibuka
   */
  const handleChapterClick = (chapterId: number) => {
    setCurrentChapter(chapterId)
    router.push(`/learn/${chapterId}`)
  }

  /**
   * Mengecek apakah chapter bisa diakses
   * @param chapter - Chapter object
   * @returns True jika chapter bisa diakses
   */
  const isChapterAccessible = (chapter: Chapter): boolean => {
    if (chapter.prerequisites.length === 0) {
      return true
    }
    
    return chapter.prerequisites.every(prereqId => 
      isChapterCompleted(prereqId)
    )
  }

  /**
   * Mendapatkan status chapter
   * @param chapter - Chapter object
   * @returns Status chapter
   */
  const getChapterStatus = (chapter: Chapter): 'locked' | 'available' | 'current' | 'completed' => {
    if (isChapterCompleted(chapter.id)) {
      return 'completed'
    }
    
    if (!isChapterAccessible(chapter)) {
      return 'locked'
    }
    
    if (chapter.id === currentChapter) {
      return 'current'
    }
    
    return 'available'
  }

  /**
   * Mendapatkan warna badge berdasarkan difficulty
   * @param difficulty - Level kesulitan
   * @returns Variant badge
   */
  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'default'
      case 'intermediate':
        return 'secondary'
      case 'advanced':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  /**
   * Format waktu estimasi
   * @param minutes - Waktu dalam menit
   * @returns String waktu yang diformat
   */
  const formatEstimatedTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    if (hours === 0) {
      return `${remainingMinutes} menit`
    }
    
    if (remainingMinutes === 0) {
      return `${hours} jam`
    }
    
    return `${hours} jam ${remainingMinutes} menit`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push('/learn')}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Pilih Track Lain
          </Button>
        </div>
        
        <div className="flex items-start gap-6">
          <div className="text-6xl">{track.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{track.title}</h1>
              <Badge variant="outline">
                {track.level.charAt(0).toUpperCase() + track.level.slice(1)}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              {track.description}
            </p>
            
            {/* Track Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                <span>{track.chapters.length} Chapter</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span>{formatEstimatedTime(track.estimatedTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrophyIcon className="h-4 w-4 text-muted-foreground" />
                <span>{track.totalLessons} Lesson</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
                <span>{completedChaptersCount}/{track.chapters.length} Selesai</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress Track</span>
            <span>{trackProgress}%</span>
          </div>
          <Progress value={trackProgress} className="h-3" />
        </div>
      </motion.div>

      {/* Chapter List */}
      <div className="space-y-4">
        {track.chapters.map((chapter, index) => {
          const status = getChapterStatus(chapter)
          const isLocked = status === 'locked'
          const isCompleted = status === 'completed'
          const isCurrent = status === 'current'
          const isAccessible = isChapterAccessible(chapter)

          return (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`transition-all duration-300 hover:shadow-md ${
                  isCurrent ? 'ring-2 ring-primary' : ''
                } ${
                  isLocked ? 'opacity-60' : 'cursor-pointer'
                }`}
                onClick={() => isAccessible && handleChapterClick(chapter.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{chapter.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">
                            Chapter {chapter.id}: {chapter.title}
                          </CardTitle>
                          <Badge variant={getDifficultyBadgeVariant(chapter.difficulty)}>
                            {chapter.difficulty === 'beginner' ? 'Pemula' :
                             chapter.difficulty === 'intermediate' ? 'Menengah' : 'Lanjutan'}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {chapter.description}
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {isCompleted && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircleIcon className="h-3 w-3 mr-1" />
                          Selesai
                        </Badge>
                      )}
                      {isLocked && (
                        <Badge variant="outline" className="text-gray-500">
                          <LockIcon className="h-3 w-3 mr-1" />
                          Terkunci
                        </Badge>
                      )}
                      {isCurrent && (
                        <Badge variant="default">
                          <PlayIcon className="h-3 w-3 mr-1" />
                          Sedang Belajar
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{chapter.lessons.length || 5} lesson</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{formatEstimatedTime(chapter.estimatedTime)}</span>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {chapter.prerequisites.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Prasyarat:</h4>
                      <div className="flex flex-wrap gap-1">
                        {chapter.prerequisites.map((prereqId) => {
                          const prereqChapter = track.chapters.find(c => c.id === prereqId)
                          const isPrereqCompleted = isChapterCompleted(prereqId)
                          
                          return (
                            <Badge 
                              key={prereqId} 
                              variant="outline" 
                              className={`text-xs ${
                                isPrereqCompleted 
                                  ? 'text-green-600 border-green-600' 
                                  : 'text-gray-500'
                              }`}
                            >
                              {isPrereqCompleted && <CheckCircleIcon className="h-3 w-3 mr-1" />}
                              Chapter {prereqChapter?.id}: {prereqChapter?.title || `Chapter ${prereqId}`}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    className="w-full" 
                    disabled={isLocked}
                    variant={isCompleted ? 'outline' : 'default'}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (isAccessible) {
                        handleChapterClick(chapter.id)
                      }
                    }}
                  >
                    {isLocked && <LockIcon className="h-4 w-4 mr-2" />}
                    {isCompleted && <CheckCircleIcon className="h-4 w-4 mr-2" />}
                    {!isLocked && !isCompleted && <PlayIcon className="h-4 w-4 mr-2" />}
                    
                    {isLocked ? 'Selesaikan Chapter Sebelumnya' : 
                     isCompleted ? 'Ulangi Chapter' :
                     isCurrent ? 'Lanjutkan Belajar' : 'Mulai Chapter'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Track Completion */}
      {trackProgress === 100 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <CardTitle className="text-2xl text-green-800">
                Selamat! Anda telah menyelesaikan {track.title}
              </CardTitle>
              <CardDescription className="text-green-700">
                Anda telah berhasil menyelesaikan semua chapter dalam track ini.
                Saatnya mendapatkan sertifikat Anda!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => router.push(`/certificate/${trackId}`)}
              >
                <TrophyIcon className="h-5 w-5 mr-2" />
                Dapatkan Sertifikat
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}