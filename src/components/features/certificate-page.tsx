"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DownloadIcon,
  ShareIcon,
  TrophyIcon,
  CalendarIcon,
  UserIcon,
  AwardIcon,
  LinkedinIcon,
  BookOpenIcon,
} from "lucide-react"
import { motion } from "framer-motion"

/**
 * Komponen halaman sertifikat yang menampilkan sertifikat penyelesaian
 * Berdasarkan desain dari gambar yang diberikan
 */
export function CertificatePage() {
  const [isDownloading, setIsDownloading] = React.useState(false)

  // Data sertifikat (dalam implementasi nyata, ini akan diambil dari API)
  const certificateData = {
    userName: "Ayu Pratiwi",
    courseName: "Master Excel & Google Spreadsheet untuk Pemula",
    completionDate: "15 Januari 2025",
    certificateId: "EXM/2025/001234",
    chaptersCompleted: 10,
    challengesCompleted: 45,
    skillRate: "98%",
    badges: [
      { name: "Beginner", description: "Chapter pertama", icon: "⭐" },
      { name: "Formula Master", description: "20+ fungsi dikuasai", icon: "🏆" },
      { name: "Speed Learner", description: "Belajar cepat", icon: "⚡" },
      { name: "Champion", description: "Semua chapter", icon: "👑" },
    ],
  }

  /**
   * Handler untuk mengunduh sertifikat dalam format PDF
   */
  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    // TODO: Implementasi download PDF
    setTimeout(() => {
      setIsDownloading(false)
    }, 2000)
  }

  /**
   * Handler untuk mengunduh sertifikat dalam format PNG
   */
  const handleDownloadPNG = async () => {
    setIsDownloading(true)
    // TODO: Implementasi download PNG
    setTimeout(() => {
      setIsDownloading(false)
    }, 2000)
  }

  /**
   * Handler untuk berbagi ke LinkedIn
   */
  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(
      `Saya telah menyelesaikan kursus ${certificateData.courseName} di ExcelMaster! 🎉`
    )
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`,
      '_blank'
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-400 p-4 rounded-full">
              <TrophyIcon className="h-8 w-8 text-yellow-800" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Selamat! Anda Telah Menyelesaikan Kursus
          </h1>
          <p className="text-gray-600">
            Semua chapter telah berhasil diselesaikan dengan sempurna
          </p>
        </motion.div>

        {/* Certificate Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white shadow-2xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <AwardIcon className="h-12 w-12" />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">SERTIFIKAT PENYELESAIAN</h2>
              <p className="text-blue-100">Dengan ini menyatakan bahwa</p>
            </div>

            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {certificateData.userName}
                  </h3>
                  <p className="text-gray-600">telah berhasil menyelesaikan kursus</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    {certificateData.courseName}
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {certificateData.chaptersCompleted}
                      </div>
                      <div className="text-sm text-gray-600">Chapter Diselesaikan</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {certificateData.challengesCompleted}
                      </div>
                      <div className="text-sm text-gray-600">Challenge Berhasil</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {certificateData.skillRate}
                      </div>
                      <div className="text-sm text-gray-600">Skill Rate-rata</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    Tanggal Penyelesaian: {certificateData.completionDate}
                  </div>
                  <div className="flex items-center">
                    <AwardIcon className="h-4 w-4 mr-1" />
                    ID Sertifikat: {certificateData.certificateId}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Unduh Sertifikat Anda</CardTitle>
              <CardDescription>
                Pilih format yang Anda inginkan untuk mengunduh sertifikat penyelesaian:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Format PDF</h4>
                    <DownloadIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Kualitas tinggi, siap cetak
                  </p>
                  <Button 
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="w-full"
                  >
                    {isDownloading ? 'Mengunduh...' : 'Unduh PDF'}
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Format PNG</h4>
                    <ShareIcon className="h-4 w-4 text-gray-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Untuk media sosial
                  </p>
                  <Button 
                    onClick={handleDownloadPNG}
                    disabled={isDownloading}
                    variant="outline"
                    className="w-full"
                  >
                    {isDownloading ? 'Mengunduh...' : 'Unduh PNG'}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <Button 
                  onClick={handleShareLinkedIn}
                  variant="outline"
                  className="inline-flex items-center"
                >
                  <LinkedinIcon className="mr-2 h-4 w-4" />
                  Bagikan ke LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Badge yang Diperoleh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {certificateData.badges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-medium text-sm">{badge.name}</h4>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Langkah Selanjutnya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button asChild variant="outline" className="h-auto p-4">
                  <div className="text-left">
                    <div className="flex items-center mb-2">
                      <BookOpenIcon className="h-5 w-5 mr-2" />
                      <span className="font-medium">Kursus Lanjutan</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Pelajari Excel tingkat mahir dengan pivot table dan macro
                    </p>
                  </div>
                </Button>

                <Button asChild variant="outline" className="h-auto p-4">
                  <div className="text-left">
                    <div className="flex items-center mb-2">
                      <UserIcon className="h-5 w-5 mr-2" />
                      <span className="font-medium">Bergabung Komunitas</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Diskusi dan berbagi tips dengan sesama learner
                    </p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}