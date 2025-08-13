'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DownloadIcon, 
  ShareIcon, 
  ArrowLeftIcon,
  CalendarIcon,
  TrophyIcon,
  CheckCircleIcon,
  PrinterIcon
} from 'lucide-react'
import { useProgressStore } from '@/store/use-progress-store'
import { getLearningTrackById } from '@/data/learning-tracks'
import type { Certificate } from '@/types'

interface CertificatePageProps {
  trackId: string
}

/**
 * Komponen untuk menampilkan halaman sertifikat
 * Menampilkan sertifikat yang telah diperoleh dari menyelesaikan learning track
 */
export function CertificatePage({ trackId }: CertificatePageProps) {
  const router = useRouter()
  const { 
    certificates,
    isTrackCompleted,
    getTrackProgress,
    addCertificate,
    completedTracks
  } = useProgressStore()
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [certificate, setCertificate] = useState<Certificate | null>(null)

  const track = getLearningTrackById(trackId)
  const isCompleted = isTrackCompleted(trackId)
  const trackProgress = getTrackProgress(trackId)

  useEffect(() => {
    if (!track || !isCompleted) return

    // Cek apakah sertifikat sudah ada
    const existingCertificate = certificates.find(cert => cert.trackId === trackId)
    
    if (existingCertificate) {
      setCertificate(existingCertificate)
    } else {
      // Generate sertifikat baru
      generateCertificate()
    }
  }, [track, isCompleted, certificates, trackId])

  /**
   * Generate sertifikat baru untuk track yang telah diselesaikan
   */
  const generateCertificate = async () => {
    if (!track || !isCompleted) return

    setIsGenerating(true)
    
    try {
      // Simulasi delay untuk generating certificate
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newCertificate: Certificate = {
        id: `cert-${trackId}-${Date.now()}`,
        trackId,
        trackTitle: track.title,
        recipientName: 'Peserta ExcelMaster', // Dalam implementasi nyata, ambil dari user profile
        issuedDate: new Date(),
        certificateNumber: `EM-${trackId.toUpperCase()}-${Date.now().toString().slice(-6)}`,
        skills: getSkillsFromTrack(track.id),
        grade: calculateGrade(trackProgress)
      }
      
      addCertificate(newCertificate)
      setCertificate(newCertificate)
    } catch (error) {
      console.error('Error generating certificate:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  /**
   * Mendapatkan daftar skill berdasarkan track
   * @param trackId - ID track
   * @returns Array skill yang dipelajari
   */
  const getSkillsFromTrack = (trackId: string): string[] => {
    switch (trackId) {
      case 'basic':
        return [
          'Navigasi Excel',
          'Input dan Format Data',
          'Formula Dasar',
          'Fungsi SUM, AVERAGE, COUNT',
          'Pembuatan Chart Sederhana'
        ]
      case 'intermediate':
        return [
          'Formula Lanjutan',
          'Fungsi VLOOKUP & HLOOKUP',
          'Conditional Formatting',
          'PivotTable',
          'Data Validation'
        ]
      case 'office':
        return [
          'Template Bisnis',
          'Laporan Keuangan',
          'Dashboard Interaktif',
          'Analisis Data',
          'Presentasi Data'
        ]
      default:
        return ['Excel Skills']
    }
  }

  /**
   * Menghitung grade berdasarkan progress
   * @param progress - Progress dalam persen
   * @returns Grade sertifikat
   */
  const calculateGrade = (progress: number): 'A' | 'B' | 'C' => {
    if (progress >= 95) return 'A'
    if (progress >= 85) return 'B'
    return 'C'
  }

  /**
   * Format tanggal untuk tampilan
   * @param date - Date object
   * @returns String tanggal yang diformat
   */
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  /**
   * Handle download sertifikat
   */
  const handleDownload = () => {
    // Dalam implementasi nyata, generate PDF atau image
    const element = document.getElementById('certificate-content')
    if (element) {
      // Implementasi download/print
      window.print()
    }
  }

  /**
   * Handle share sertifikat
   */
  const handleShare = async () => {
    if (navigator.share && certificate) {
      try {
        await navigator.share({
          title: `Sertifikat ${certificate.trackTitle}`,
          text: `Saya telah menyelesaikan ${certificate.trackTitle} di ExcelMaster!`,
          url: window.location.href
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link sertifikat telah disalin!')
    }
  }

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
          Kembali ke Pembelajaran
        </Button>
      </div>
    )
  }

  if (!isCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto">
          <TrophyIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Sertifikat Belum Tersedia</h1>
          <p className="text-muted-foreground mb-6">
            Anda perlu menyelesaikan semua chapter dalam {track.title} untuk mendapatkan sertifikat.
          </p>
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              Progress: {trackProgress}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${trackProgress}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Button 
              onClick={() => router.push(`/learn/${trackId}`)}
              className="w-full"
            >
              Lanjutkan Belajar
            </Button>
            <Button 
              variant="outline" 
              onClick={() => router.push('/learn')}
              className="w-full"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Pilih Track Lain
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <TrophyIcon className="h-16 w-16 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-bold mt-4 mb-2">Sedang Membuat Sertifikat...</h1>
          <p className="text-muted-foreground">
            Mohon tunggu sebentar, kami sedang mempersiapkan sertifikat Anda.
          </p>
        </div>
      </div>
    )
  }

  if (!certificate) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Gagal memuat sertifikat</h1>
        <Button 
          variant="outline" 
          onClick={() => router.push('/learn')}
          className="mt-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Kembali ke Pembelajaran
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.push('/learn')}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Kembali ke Pembelajaran
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShare}>
              <ShareIcon className="h-4 w-4 mr-2" />
              Bagikan
            </Button>
            <Button onClick={handleDownload}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Certificate */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <Card 
          id="certificate-content"
          className="bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-primary/20 shadow-2xl"
        >
          <CardContent className="p-12">
            {/* Certificate Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🏆</div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                SERTIFIKAT PENYELESAIAN
              </h1>
              <p className="text-lg text-muted-foreground">
                ExcelMaster Learning Platform
              </p>
            </div>

            {/* Certificate Body */}
            <div className="text-center mb-8">
              <p className="text-lg mb-4">Dengan ini menyatakan bahwa</p>
              <h2 className="text-3xl font-bold text-primary mb-4">
                {certificate.recipientName}
              </h2>
              <p className="text-lg mb-2">telah berhasil menyelesaikan</p>
              <h3 className="text-2xl font-semibold text-secondary-foreground mb-6">
                {certificate.trackTitle}
              </h3>
              
              <div className="flex justify-center mb-6">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  Grade: {certificate.grade}
                </Badge>
              </div>
            </div>

            {/* Skills Learned */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-center mb-4">
                Keterampilan yang Dikuasai:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
                {certificate.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Footer */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Tanggal: {formatDate(certificate.issuedDate)}</span>
                </div>
                <div>
                  No. Sertifikat: {certificate.certificateNumber}
                </div>
              </div>
              
              <div className="text-center mt-6">
                <div className="inline-block">
                  <div className="border-t border-gray-400 pt-2">
                    <p className="text-sm font-medium">ExcelMaster</p>
                    <p className="text-xs text-muted-foreground">Platform Pembelajaran Excel</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Congratulations Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl mx-auto mt-8 text-center"
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <div className="text-4xl mb-2">🎉</div>
            <CardTitle className="text-xl text-green-800">
              Selamat atas pencapaian Anda!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              Anda telah berhasil menguasai {certificate.trackTitle}. 
              Terus tingkatkan kemampuan Excel Anda dengan mengambil track pembelajaran lainnya.
            </p>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline"
                onClick={() => router.push('/learn')}
              >
                Ambil Track Lain
              </Button>
              <Button 
                onClick={() => router.push('/dashboard')}
              >
                Lihat Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}