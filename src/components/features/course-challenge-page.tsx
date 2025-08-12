"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrophyIcon,
  ClockIcon,
  StarIcon,
  PlayIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TargetIcon,
  AwardIcon,
  LockIcon,
  BookOpenIcon,
  FileTextIcon,
  DownloadIcon,
  RefreshCwIcon,
  HelpCircleIcon,
  LightbulbIcon,
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

// Interface untuk challenge
interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'Mudah' | 'Sedang' | 'Sulit'
  estimatedTime: string
  points: number
  isCompleted?: boolean
  isLocked?: boolean
  completionRate?: number
  attempts?: number
  bestScore?: number
  category: string
  prerequisites?: string[]
  learningObjectives: string[]
  hints?: string[]
}

interface CourseChallengePageProps {
  course: Course
}

/**
 * Komponen halaman challenge course
 * Menampilkan daftar challenge dan latihan praktis untuk course
 */
export function CourseChallengePage({ course }: CourseChallengePageProps) {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('Semua')
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Semua')
  const [activeTab, setActiveTab] = React.useState('challenges')

  // Data mock untuk challenges
  const mockChallenges: Challenge[] = [
    {
      id: 'challenge-1',
      title: 'Membuat Laporan Penjualan Sederhana',
      description: 'Buat laporan penjualan menggunakan formula SUM, AVERAGE, dan format tabel yang menarik.',
      difficulty: 'Mudah',
      estimatedTime: '15 menit',
      points: 100,
      isCompleted: true,
      completionRate: 85,
      attempts: 2,
      bestScore: 95,
      category: 'Formula Dasar',
      learningObjectives: [
        'Menggunakan formula SUM untuk menjumlahkan data',
        'Menggunakan formula AVERAGE untuk menghitung rata-rata',
        'Memformat tabel dengan style yang profesional',
        'Membuat header dan footer laporan'
      ],
      hints: [
        'Gunakan formula SUM untuk menjumlahkan total penjualan',
        'Format angka sebagai currency untuk tampilan yang lebih baik',
        'Gunakan border dan shading untuk membuat tabel lebih menarik'
      ]
    },
    {
      id: 'challenge-2',
      title: 'Analisis Data Karyawan dengan IF',
      description: 'Gunakan fungsi IF untuk mengkategorikan karyawan berdasarkan performa dan gaji.',
      difficulty: 'Sedang',
      estimatedTime: '25 menit',
      points: 200,
      isCompleted: true,
      completionRate: 72,
      attempts: 3,
      bestScore: 88,
      category: 'Fungsi Logika',
      prerequisites: ['challenge-1'],
      learningObjectives: [
        'Menggunakan fungsi IF untuk kondisi sederhana',
        'Menggunakan nested IF untuk kondisi kompleks',
        'Membuat kategori berdasarkan kriteria tertentu',
        'Memformat hasil dengan conditional formatting'
      ],
      hints: [
        'Gunakan IF untuk mengecek apakah gaji > 5000000',
        'Nested IF dapat digunakan untuk multiple kondisi',
        'Conditional formatting akan membuat hasil lebih visual'
      ]
    },
    {
      id: 'challenge-3',
      title: 'Dashboard Penjualan Interaktif',
      description: 'Buat dashboard penjualan dengan chart, pivot table, dan slicer untuk analisis data.',
      difficulty: 'Sulit',
      estimatedTime: '45 menit',
      points: 300,
      isCompleted: false,
      completionRate: 45,
      attempts: 1,
      category: 'Dashboard',
      prerequisites: ['challenge-1', 'challenge-2'],
      learningObjectives: [
        'Membuat pivot table untuk analisis data',
        'Membuat berbagai jenis chart (bar, line, pie)',
        'Menggunakan slicer untuk filter interaktif',
        'Mendesain layout dashboard yang efektif'
      ],
      hints: [
        'Mulai dengan membuat pivot table dari data mentah',
        'Gunakan chart yang sesuai dengan jenis data',
        'Slicer memungkinkan user untuk filter data secara interaktif'
      ]
    },
    {
      id: 'challenge-4',
      title: 'Otomatisasi Laporan dengan VLOOKUP',
      description: 'Buat sistem laporan otomatis menggunakan VLOOKUP dan referensi dinamis.',
      difficulty: 'Sedang',
      estimatedTime: '30 menit',
      points: 250,
      isCompleted: false,
      isLocked: true,
      completionRate: 0,
      category: 'Lookup Functions',
      prerequisites: ['challenge-2'],
      learningObjectives: [
        'Menggunakan VLOOKUP untuk mencari data',
        'Membuat referensi dinamis dengan INDIRECT',
        'Menggunakan data validation untuk input',
        'Membuat template laporan yang reusable'
      ]
    },
    {
      id: 'challenge-5',
      title: 'Analisis Finansial Lanjutan',
      description: 'Buat model finansial dengan NPV, IRR, dan analisis sensitivitas.',
      difficulty: 'Sulit',
      estimatedTime: '60 menit',
      points: 400,
      isCompleted: false,
      isLocked: true,
      completionRate: 0,
      category: 'Financial Modeling',
      prerequisites: ['challenge-3', 'challenge-4'],
      learningObjectives: [
        'Menggunakan fungsi finansial NPV dan IRR',
        'Membuat analisis sensitivitas',
        'Menggunakan data table untuk scenario analysis',
        'Membuat model yang robust dan scalable'
      ]
    }
  ]

  const difficulties = ['Semua', 'Mudah', 'Sedang', 'Sulit']
  const categories = ['Semua', 'Formula Dasar', 'Fungsi Logika', 'Dashboard', 'Lookup Functions', 'Financial Modeling']

  /**
   * Filter challenges berdasarkan difficulty dan category
   */
  const filteredChallenges = React.useMemo(() => {
    return mockChallenges.filter(challenge => {
      const matchesDifficulty = selectedDifficulty === 'Semua' || challenge.difficulty === selectedDifficulty
      const matchesCategory = selectedCategory === 'Semua' || challenge.category === selectedCategory
      return matchesDifficulty && matchesCategory
    })
  }, [selectedDifficulty, selectedCategory])

  /**
   * Hitung statistik progress
   */
  const stats = React.useMemo(() => {
    const completed = mockChallenges.filter(c => c.isCompleted).length
    const total = mockChallenges.length
    const totalPoints = mockChallenges.reduce((sum, c) => sum + (c.bestScore ? (c.bestScore / 100) * c.points : 0), 0)
    const maxPoints = mockChallenges.reduce((sum, c) => sum + c.points, 0)
    
    return {
      completed,
      total,
      progress: (completed / total) * 100,
      totalPoints: Math.round(totalPoints),
      maxPoints
    }
  }, [])

  /**
   * Get difficulty color
   */
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Mudah': return 'bg-green-500'
      case 'Sedang': return 'bg-yellow-500'
      case 'Sulit': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
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
              <h1 className="font-semibold">{course.title} - Challenges</h1>
              <p className="text-sm text-muted-foreground">
                {stats.completed} dari {stats.total} challenge selesai
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-semibold">{stats.totalPoints} / {stats.maxPoints} Poin</div>
              <div className="text-sm text-muted-foreground">{Math.round(stats.progress)}% Selesai</div>
            </div>
            <div className="w-32">
              <Progress value={stats.progress} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <TrophyIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">Challenge Selesai</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <TargetIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Poin</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <StarIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{Math.round(stats.progress)}%</div>
                <div className="text-sm text-muted-foreground">Progress</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <AwardIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Badge Earned</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Tingkat Kesulitan:</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>{difficulty}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Kategori:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDifficulty('Semua')
                    setSelectedCategory('Semua')
                  }}
                >
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  Reset Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${challenge.isLocked ? 'opacity-60' : 'hover:shadow-lg transition-shadow'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                          <Badge variant="outline">{challenge.category}</Badge>
                          {challenge.isCompleted && (
                            <Badge className="bg-green-500">
                              <CheckCircleIcon className="h-3 w-3 mr-1" />
                              Selesai
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {challenge.description}
                        </CardDescription>
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-yellow-600">{challenge.points}</div>
                        <div className="text-xs text-muted-foreground">poin</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Challenge Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{challenge.estimatedTime}</span>
                      </div>
                      {challenge.completionRate !== undefined && (
                        <div className="flex items-center gap-2">
                          <TargetIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{challenge.completionRate}% berhasil</span>
                        </div>
                      )}
                    </div>

                    {/* Progress (if attempted) */}
                    {challenge.bestScore !== undefined && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Skor Terbaik</span>
                          <span className="font-medium">{challenge.bestScore}/100</span>
                        </div>
                        <Progress value={challenge.bestScore} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {challenge.attempts} percobaan
                        </div>
                      </div>
                    )}

                    {/* Prerequisites */}
                    {challenge.prerequisites && challenge.prerequisites.length > 0 && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Prasyarat: </span>
                        <span>Selesaikan challenge sebelumnya</span>
                      </div>
                    )}

                    {/* Learning Objectives */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium flex items-center gap-2">
                        <LightbulbIcon className="h-4 w-4" />
                        Yang akan dipelajari:
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {challenge.learningObjectives.slice(0, 2).map((objective, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{objective}</span>
                          </li>
                        ))}
                        {challenge.learningObjectives.length > 2 && (
                          <li className="text-xs text-muted-foreground">
                            +{challenge.learningObjectives.length - 2} lainnya...
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1" 
                        disabled={challenge.isLocked}
                        asChild={!challenge.isLocked}
                      >
                        {challenge.isLocked ? (
                          <>
                            <LockIcon className="h-4 w-4 mr-2" />
                            Terkunci
                          </>
                        ) : (
                          <Link href={`/challenges/${challenge.id}`}>
                            {challenge.isCompleted ? (
                              <>
                                <RefreshCwIcon className="h-4 w-4 mr-2" />
                                Coba Lagi
                              </>
                            ) : (
                              <>
                                <PlayIcon className="h-4 w-4 mr-2" />
                                Mulai Challenge
                              </>
                            )}
                          </Link>
                        )}
                      </Button>
                      
                      {!challenge.isLocked && (
                        <Button variant="outline" size="sm">
                          <HelpCircleIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredChallenges.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <TrophyIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tidak ada challenge ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah filter untuk melihat challenge lainnya.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedDifficulty('Semua')
                  setSelectedCategory('Semua')
                }}
              >
                Reset Filter
              </Button>
            </motion.div>
          )}

          {/* Achievement Section */}
          <Card>
            <CardHeader>
              <CardTitle>Badge & Pencapaian</CardTitle>
              <CardDescription>
                Kumpulkan badge dengan menyelesaikan challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <AwardIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="font-medium">First Challenge</div>
                  <div className="text-sm text-muted-foreground">Selesaikan challenge pertama</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <TrophyIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="font-medium">Perfect Score</div>
                  <div className="text-sm text-muted-foreground">Dapatkan skor 100</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg opacity-60">
                  <StarIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="font-medium">Challenge Master</div>
                  <div className="text-sm text-muted-foreground">Selesaikan 10 challenge</div>
                </div>
                
                <div className="text-center p-4 border rounded-lg opacity-60">
                  <TargetIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <div className="font-medium">Speed Runner</div>
                  <div className="text-sm text-muted-foreground">Selesaikan dalam waktu record</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}