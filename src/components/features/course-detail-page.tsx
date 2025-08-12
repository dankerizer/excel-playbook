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
  StarIcon,
  ClockIcon,
  UsersIcon,
  PlayIcon,
  BookOpenIcon,
  TrophyIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  DownloadIcon,
  ShareIcon,
  HeartIcon,
  MessageCircleIcon,
  UserIcon,
  CalendarIcon,
  AwardIcon,
  TargetIcon,
  LockIcon,
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
  originalPrice?: number
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
}

// Interface untuk module
interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  duration: string
}

interface CourseDetailPageProps {
  course: Course
}

/**
 * Komponen halaman detail course
 * Menampilkan informasi lengkap course, curriculum, dan review
 */
export function CourseDetailPage({ course }: CourseDetailPageProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('overview')

  /**
   * Format harga ke format Rupiah
   */
  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratis'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  /**
   * Handler untuk wishlist
   */
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    // TODO: Implementasi wishlist ke backend
  }

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
          description: 'Pelajari bagian-bagian interface Excel'
        },
        {
          id: 'lesson-1-2',
          title: 'Membuat Workbook Pertama',
          duration: '20 menit',
          type: 'video',
          isCompleted: true,
          description: 'Cara membuat dan menyimpan workbook'
        },
        {
          id: 'lesson-1-3',
          title: 'Navigasi dan Shortcut Dasar',
          duration: '25 menit',
          type: 'video',
          isCompleted: false,
          description: 'Shortcut keyboard yang sering digunakan'
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
        },
        {
          id: 'lesson-2-3',
          title: 'Challenge: Format Laporan',
          duration: '30 menit',
          type: 'challenge',
          isCompleted: false,
          isLocked: true,
          description: 'Praktik memformat laporan keuangan'
        }
      ]
    },
    {
      id: 'module-3',
      title: 'Formula dan Fungsi Dasar',
      description: 'Menguasai formula Excel dasar',
      duration: '3 jam',
      lessons: [
        {
          id: 'lesson-3-1',
          title: 'Pengenalan Formula',
          duration: '25 menit',
          type: 'video',
          isCompleted: false,
          isLocked: true,
          description: 'Konsep dasar formula Excel'
        },
        {
          id: 'lesson-3-2',
          title: 'Fungsi SUM, AVERAGE, COUNT',
          duration: '35 menit',
          type: 'video',
          isCompleted: false,
          isLocked: true,
          description: 'Fungsi matematika dasar'
        },
        {
          id: 'lesson-3-3',
          title: 'Fungsi IF dan Logika',
          duration: '40 menit',
          type: 'video',
          isCompleted: false,
          isLocked: true,
          description: 'Membuat kondisi dengan fungsi IF'
        }
      ]
    }
  ]

  // Data mock untuk review
  const mockReviews = [
    {
      id: '1',
      name: 'Andi Pratama',
      rating: 5,
      date: '2024-01-15',
      comment: 'Course yang sangat bagus! Penjelasan mudah dipahami dan praktis untuk diterapkan di pekerjaan.'
    },
    {
      id: '2',
      name: 'Siti Nurhaliza',
      rating: 5,
      date: '2024-01-10',
      comment: 'Instruktur sangat berpengalaman. Materi disusun dengan baik dari dasar hingga lanjutan.'
    },
    {
      id: '3',
      name: 'Budi Santoso',
      rating: 4,
      date: '2024-01-08',
      comment: 'Sangat membantu untuk meningkatkan skill Excel. Recommended untuk pemula!'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/course">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Kembali ke Course
          </Link>
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
              {course.isPopular && (
                <Badge className="bg-orange-500 hover:bg-orange-600">
                  <TrophyIcon className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
              {course.isFree && (
                <Badge className="bg-green-500 hover:bg-green-600">
                  Gratis
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {course.description}
            </p>

            {/* Course Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{course.rating}</span>
                <span>({course.students.toLocaleString()} siswa)</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <BookOpenIcon className="h-4 w-4" />
                {course.lessons} Pelajaran
              </div>
              <div className="flex items-center gap-1">
                <TrophyIcon className="h-4 w-4" />
                {course.challenges} Challenge
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-medium">{course.instructor}</div>
                <div className="text-sm text-muted-foreground">Instruktur Excel Expert</div>
              </div>
            </div>
          </motion.div>

          {/* Course Content Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Review</TabsTrigger>
                <TabsTrigger value="instructor">Instruktur</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Apa yang akan Anda pelajari?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Menguasai interface dan navigasi Excel</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Membuat dan memformat spreadsheet profesional</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Menggunakan formula dan fungsi dasar</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Membuat chart dan grafik yang menarik</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Mengelola data dengan filter dan sort</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Tips dan trik untuk produktivitas maksimal</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Persyaratan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Komputer dengan Microsoft Excel (versi 2016 atau lebih baru)</li>
                      <li>• Tidak perlu pengalaman sebelumnya dengan Excel</li>
                      <li>• Kemauan untuk belajar dan berlatih</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Untuk siapa course ini?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Pemula yang ingin belajar Excel dari nol</li>
                      <li>• Profesional yang ingin meningkatkan produktivitas</li>
                      <li>• Mahasiswa yang membutuhkan skill Excel untuk tugas</li>
                      <li>• Siapa saja yang ingin menguasai spreadsheet</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                {mockCurriculum.map((module, moduleIndex) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: moduleIndex * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              Module {moduleIndex + 1}: {module.title}
                            </CardTitle>
                            <CardDescription>{module.description}</CardDescription>
                          </div>
                          <Badge variant="outline">{module.duration}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className={`flex items-center gap-3 p-3 rounded-lg border ${
                                lesson.isLocked ? 'opacity-60' : 'hover:bg-muted/50'
                              }`}
                            >
                              <div className="flex-shrink-0">
                                {lesson.isCompleted ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                ) : lesson.isLocked ? (
                                  <LockIcon className="h-5 w-5 text-muted-foreground" />
                                ) : lesson.type === 'video' ? (
                                  <PlayIcon className="h-5 w-5 text-blue-600" />
                                ) : lesson.type === 'quiz' ? (
                                  <TargetIcon className="h-5 w-5 text-purple-600" />
                                ) : lesson.type === 'challenge' ? (
                                  <TrophyIcon className="h-5 w-5 text-orange-600" />
                                ) : (
                                  <BookOpenIcon className="h-5 w-5 text-gray-600" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium">{lesson.title}</div>
                                {lesson.description && (
                                  <div className="text-sm text-muted-foreground">
                                    {lesson.description}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ClockIcon className="h-4 w-4" />
                                {lesson.duration}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="grid gap-4">
                  {mockReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <UserIcon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">{review.name}</span>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString('id-ID')}
                                </span>
                              </div>
                              <p className="text-muted-foreground">{review.comment}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="instructor">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserIcon className="h-12 w-12 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{course.instructor}</h3>
                        <p className="text-muted-foreground mb-4">
                          Excel Expert dengan pengalaman lebih dari 10 tahun di bidang data analysis dan business intelligence. 
                          Telah melatih ribuan profesional untuk menguasai Excel di berbagai perusahaan multinasional.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-600">50+</div>
                            <div className="text-sm text-muted-foreground">Course</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600">15K+</div>
                            <div className="text-sm text-muted-foreground">Siswa</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-600">4.9</div>
                            <div className="text-sm text-muted-foreground">Rating</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-orange-600">10+</div>
                            <div className="text-sm text-muted-foreground">Tahun</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="sticky top-6">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <PlayIcon className="mr-2 h-5 w-5" />
                    Preview Course
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                {/* Progress (if enrolled) */}
                {course.progress !== undefined && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress Anda</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="text-sm text-muted-foreground">
                      {Math.round((course.progress / 100) * course.lessons)} dari {course.lessons} pelajaran selesai
                    </div>
                  </div>
                )}
                
                {/* Price */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {formatPrice(course.price)}
                  </div>
                  {course.originalPrice && (
                    <div className="text-lg text-muted-foreground line-through">
                      {formatPrice(course.originalPrice)}
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    {course.progress !== undefined ? (
                      <>
                        <CheckCircleIcon className="mr-2 h-5 w-5" />
                        Lanjutkan Belajar
                      </>
                    ) : (
                      <>
                        Mulai Belajar
                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={handleWishlist}
                      className={isWishlisted ? "bg-red-50 text-red-600 border-red-200" : ""}
                    >
                      <HeartIcon className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                      {isWishlisted ? 'Disimpan' : 'Simpan'}
                    </Button>
                    <Button variant="outline">
                      <ShareIcon className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
                
                {/* Course Info */}
                <Separator />
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Level:</span>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Durasi:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pelajaran:</span>
                    <span>{course.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Challenge:</span>
                    <span>{course.challenges}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Sertifikat:</span>
                    <div className="flex items-center gap-1">
                      <AwardIcon className="h-4 w-4 text-yellow-600" />
                      <span>Ya</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Akses:</span>
                    <span>Selamanya</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}