'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useProgressStore } from '@/store/use-progress-store'
import { getLearningTrackById, getChaptersByTrackId } from '@/data/learning-tracks'
import type { LearningTrack, Chapter } from '@/types'
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Lock, 
  CheckCircle, 
  PlayCircle,
  ArrowLeft,
  Award,
  Target
} from 'lucide-react'

interface TrackLearningPageProps {
  trackId: string
}

/**
 * Komponen halaman pembelajaran untuk learning track tertentu
 * Menampilkan daftar chapter dalam track dengan status dan progres
 */
export function TrackLearningPage({ trackId }: TrackLearningPageProps) {
  const router = useRouter()
  const { 
    completedChapters, 
    currentChapter,
    isChapterCompleted,
    getTrackProgress,
    isTrackCompleted,
    addCertificate
  } = useProgressStore()
  
  const [track, setTrack] = useState<LearningTrack | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [showCertificateModal, setShowCertificateModal] = useState(false)

  useEffect(() => {
    const trackData = getLearningTrackById(trackId)
    if (trackData) {
      setTrack(trackData)
      setChapters(getChaptersByTrackId(trackId))
    }
  }, [trackId])

  if (!track) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Track Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">Learning track yang Anda cari tidak tersedia.</p>
          <Button onClick={() => router.push('/learn')}>
            Kembali ke Daftar Track
          </Button>
        </div>
      </div>
    )
  }

  const trackProgress = getTrackProgress(trackId)
  const isCompleted = isTrackCompleted(trackId)
  const completedChaptersCount = chapters.filter(chapter => 
    isChapterCompleted(chapter.id)
  ).length

  /**
   * Menentukan status chapter berdasarkan progres dan prerequisites
   */
  const getChapterStatus = (chapter: Chapter) => {
    if (isChapterCompleted(chapter.id)) {
      return 'completed'
    }
    
    // Check prerequisites
    if (chapter.prerequisites.length > 0) {
      const prerequisitesMet = chapter.prerequisites.every(prereqId => 
        isChapterCompleted(prereqId)
      )
      if (!prerequisitesMet) {
        return 'locked'
      }
    }
    
    if (chapter.id === currentChapter) {
      return 'current'
    }
    
    return 'available'
  }

  /**
   * Handle navigasi ke chapter
   */
  const handleChapterClick = (chapter: Chapter) => {
    const status = getChapterStatus(chapter)
    if (status === 'locked') return
    
    router.push(`/learn/${chapter.id}`)
  }

  /**
   * Handle generate certificate
   */
  const handleGenerateCertificate = () => {
    if (!isCompleted) return
    
    const certificate = {
      id: `cert-${trackId}-${Date.now()}`,
      trackId: track.id,
      trackTitle: track.title,
      recipientName: 'Pengguna ExcelMaster', // This should come from user data
      issuedAt: new Date(),
      issuedDate: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      certificateNumber: `EM-${track.level.toUpperCase()}-${Date.now().toString().slice(-6)}`,
      completionPercentage: 100,
      totalPoints: 0, // This should be calculated from actual points
      grade: 'A' as const, // This should be calculated based on performance
      skills: track.skills
    }
    
    addCertificate(certificate)
    router.push(`/certificate/${trackId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/learn')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{track.icon}</div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{track.title}</h1>
                  <p className="text-gray-600">{track.description}</p>
                </div>
              </div>
            </div>
            
            {isCompleted && (
              <Button 
                onClick={handleGenerateCertificate}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                <Award className="h-4 w-4 mr-2" />
                Dapatkan Sertifikat
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Track Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Progres Track</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Kemajuan</span>
                    <span className="font-medium">{Math.round(trackProgress)}%</span>
                  </div>
                  <Progress value={trackProgress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {completedChaptersCount} dari {chapters.length} chapter selesai
                  </p>
                </div>

                <Separator />

                {/* Track Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Total Chapter</span>
                    </div>
                    <span className="font-medium">{chapters.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Estimasi Waktu</span>
                    </div>
                    <span className="font-medium">{Math.round(track.estimatedTime / 60)} jam</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Level</span>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {track.level}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Skills */}
                <div>
                  <h4 className="font-medium text-sm mb-3">Skill yang Akan Dipelajari</h4>
                  <div className="flex flex-wrap gap-2">
                    {track.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {isCompleted && (
                  <>
                    <Separator />
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-800">Track Selesai!</p>
                      <p className="text-xs text-green-600">Selamat! Anda telah menyelesaikan semua chapter.</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chapters List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Daftar Chapter</h2>
                <Badge variant="secondary">
                  {completedChaptersCount}/{chapters.length} Selesai
                </Badge>
              </div>

              <div className="space-y-4">
                {chapters.map((chapter, index) => {
                  const status = getChapterStatus(chapter)
                  const isLocked = status === 'locked'
                  const isCurrent = status === 'current'
                  const isCompleted = status === 'completed'

                  return (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          isLocked ? 'opacity-60 cursor-not-allowed' : ''
                        } ${
                          isCurrent ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                        } ${
                          isCompleted ? 'bg-green-50 border-green-200' : ''
                        }`}
                        onClick={() => handleChapterClick(chapter)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            {/* Chapter Icon & Status */}
                            <div className="flex-shrink-0">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                                isCompleted ? 'bg-green-100' : 
                                isCurrent ? 'bg-blue-100' : 
                                isLocked ? 'bg-gray-100' : 'bg-gray-50'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle className="h-6 w-6 text-green-600" />
                                ) : isLocked ? (
                                  <Lock className="h-6 w-6 text-gray-400" />
                                ) : isCurrent ? (
                                  <PlayCircle className="h-6 w-6 text-blue-600" />
                                ) : (
                                  chapter.icon
                                )}
                              </div>
                            </div>

                            {/* Chapter Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    Chapter {chapter.id}: {chapter.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm mb-3">
                                    {chapter.description}
                                  </p>
                                  
                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{Math.round(chapter.estimatedTime / 60)} jam</span>
                                    </div>
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${
                                        chapter.difficulty === 'beginner' ? 'border-green-300 text-green-700' :
                                        chapter.difficulty === 'intermediate' ? 'border-yellow-300 text-yellow-700' :
                                        'border-red-300 text-red-700'
                                      }`}
                                    >
                                      {chapter.difficulty === 'beginner' ? 'Pemula' :
                                       chapter.difficulty === 'intermediate' ? 'Menengah' : 'Lanjutan'}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Status Badge */}
                                <div className="flex-shrink-0 ml-4">
                                  {isCompleted && (
                                    <Badge className="bg-green-100 text-green-800 border-green-300">
                                      Selesai
                                    </Badge>
                                  )}
                                  {isCurrent && (
                                    <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                                      Saat Ini
                                    </Badge>
                                  )}
                                  {isLocked && (
                                    <Badge variant="secondary">
                                      Terkunci
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              {/* Prerequisites */}
                              {chapter.prerequisites.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                  <p className="text-xs text-gray-500 mb-1">Prasyarat:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {chapter.prerequisites.map(prereqId => {
                                      const prereqChapter = chapters.find(c => c.id === prereqId)
                                      const prereqCompleted = isChapterCompleted(prereqId)
                                      return (
                                        <Badge 
                                          key={prereqId} 
                                          variant="outline" 
                                          className={`text-xs ${
                                            prereqCompleted ? 'border-green-300 text-green-700' : 'border-gray-300 text-gray-500'
                                          }`}
                                        >
                                          {prereqCompleted ? '✓' : '○'} Chapter {prereqId}
                                        </Badge>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}