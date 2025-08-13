'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircleIcon, LockIcon, ClockIcon, BookOpenIcon, TrophyIcon } from 'lucide-react'
import { useProgressStore } from '@/store/use-progress-store'
import { learningTracks, getAvailableTracks } from '@/data/learning-tracks'
import type { LearningTrack } from '@/types'

/**
 * Komponen untuk halaman pemilihan learning track
 * Menampilkan daftar track yang tersedia dengan progress dan status
 */
export function TrackSelectionPage() {
  const router = useRouter()
  const { 
    selectedTrack, 
    completedTracks, 
    completedChapters,
    selectTrack, 
    getTrackProgress,
    isTrackCompleted 
  } = useProgressStore()

  const availableTracks = getAvailableTracks(completedTracks)

  /**
   * Handle pemilihan track
   * @param trackId - ID track yang dipilih
   */
  const handleSelectTrack = (trackId: string) => {
    selectTrack(trackId)
    router.push(`/learn/track/${trackId}`)
  }

  /**
   * Mendapatkan status track untuk user
   * @param track - Learning track object
   * @returns Status track
   */
  const getTrackStatus = (track: LearningTrack): 'locked' | 'available' | 'in-progress' | 'completed' => {
    if (isTrackCompleted(track.id)) {
      return 'completed'
    }
    
    if (!availableTracks.some(t => t.id === track.id)) {
      return 'locked'
    }
    
    const progress = getTrackProgress(track.id)
    if (progress > 0) {
      return 'in-progress'
    }
    
    return 'available'
  }

  /**
   * Mendapatkan warna badge berdasarkan level
   * @param level - Level track
   * @returns Variant badge
   */
  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'dasar':
        return 'default'
      case 'menengah':
        return 'secondary'
      case 'perkantoran':
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
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">
          Pilih Jalur Pembelajaran Excel
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Mulai perjalanan belajar Excel Anda dengan memilih jalur yang sesuai dengan kebutuhan dan level kemampuan Anda.
        </p>
      </motion.div>

      {/* Track Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {learningTracks.map((track, index) => {
          const status = getTrackStatus(track)
          const progress = getTrackProgress(track.id)
          const isLocked = status === 'locked'
          const isCompleted = status === 'completed'
          const isSelected = selectedTrack === track.id

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`h-full transition-all duration-300 hover:shadow-lg ${
                  isSelected ? 'ring-2 ring-primary' : ''
                } ${
                  isLocked ? 'opacity-60' : 'cursor-pointer'
                }`}
                onClick={() => !isLocked && handleSelectTrack(track.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">{track.icon}</div>
                    <div className="flex flex-col gap-2">
                      <Badge variant={getLevelBadgeVariant(track.level)}>
                        {track.level.charAt(0).toUpperCase() + track.level.slice(1)}
                      </Badge>
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
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl">{track.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {track.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  {progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {/* Track Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{track.chapters.length} chapter</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{formatEstimatedTime(track.estimatedTime)}</span>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {track.prerequisites && track.prerequisites.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Prasyarat:</h4>
                      <div className="flex flex-wrap gap-1">
                        {track.prerequisites.map((prereqId) => {
                          const prereqTrack = learningTracks.find(t => t.id === prereqId)
                          const isPrereqCompleted = completedTracks.includes(prereqId)
                          
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
                              {prereqTrack?.title || prereqId}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    className="w-full mt-4" 
                    disabled={isLocked}
                    variant={isCompleted ? 'outline' : 'default'}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectTrack(track.id)
                    }}
                  >
                    {isLocked && <LockIcon className="h-4 w-4 mr-2" />}
                    {isCompleted && <TrophyIcon className="h-4 w-4 mr-2" />}
                    {isLocked ? 'Terkunci' : 
                     isCompleted ? 'Lihat Sertifikat' :
                     progress > 0 ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">💡 Tips Memilih Jalur Pembelajaran</CardTitle>
          </CardHeader>
          <CardContent className="text-left space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌱</span>
              <div>
                <h4 className="font-medium">Excel Dasar</h4>
                <p className="text-sm text-muted-foreground">
                  Cocok untuk pemula yang belum pernah menggunakan Excel atau ingin memperkuat fundamental.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <h4 className="font-medium">Excel Menengah</h4>
                <p className="text-sm text-muted-foreground">
                  Untuk yang sudah menguasai dasar dan ingin belajar fungsi-fungsi lanjutan untuk analisis data.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💼</span>
              <div>
                <h4 className="font-medium">Excel Perkantoran</h4>
                <p className="text-sm text-muted-foreground">
                  Untuk profesional yang ingin menguasai Excel untuk kebutuhan bisnis dan otomatisasi.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}