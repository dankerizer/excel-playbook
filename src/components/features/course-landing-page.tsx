"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  SearchIcon,
  FilterIcon,
  StarIcon,
  ClockIcon,
  UsersIcon,
  PlayIcon,
  BookOpenIcon,
  TrophyIcon,
  CheckCircleIcon,
  ArrowRightIcon,
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
  thumbnail: string
  category: string
  lessons: number
  challenges: number
  isPopular?: boolean
  isFree?: boolean
  progress?: number
}

// Data mock untuk course
const mockCourses: Course[] = [
  {
    id: 'excel-dasar-pemula',
    title: 'Excel Dasar untuk Pemula',
    description: 'Pelajari dasar-dasar Excel dari nol hingga mahir menggunakan formula dan fungsi dasar.',
    instructor: 'Budi Santoso',
    duration: '8 jam',
    level: 'Pemula',
    rating: 4.8,
    students: 1250,
    price: 0,
    thumbnail: '/course-thumbnails/excel-dasar.jpg',
    category: 'Excel Dasar',
    lessons: 24,
    challenges: 12,
    isPopular: true,
    isFree: true,
    progress: 65
  },
  {
    id: 'excel-formula-lanjutan',
    title: 'Master Excel Formula & Fungsi',
    description: 'Kuasai formula Excel tingkat lanjut seperti VLOOKUP, INDEX MATCH, dan array formula.',
    instructor: 'Sari Wijaya',
    duration: '12 jam',
    level: 'Menengah',
    rating: 4.9,
    students: 890,
    price: 299000,
    originalPrice: 499000,
    thumbnail: '/course-thumbnails/excel-formula.jpg',
    category: 'Formula & Fungsi',
    lessons: 36,
    challenges: 24,
    isPopular: true
  },
  {
    id: 'excel-data-analysis',
    title: 'Analisis Data dengan Excel',
    description: 'Belajar menganalisis data menggunakan PivotTable, Chart, dan fitur analisis Excel.',
    instructor: 'Ahmad Rahman',
    duration: '10 jam',
    level: 'Menengah',
    rating: 4.7,
    students: 654,
    price: 399000,
    originalPrice: 599000,
    thumbnail: '/course-thumbnails/data-analysis.jpg',
    category: 'Analisis Data',
    lessons: 28,
    challenges: 18
  },
  {
    id: 'excel-dashboard-reporting',
    title: 'Excel Dashboard & Reporting',
    description: 'Buat dashboard interaktif dan laporan profesional menggunakan Excel.',
    instructor: 'Maya Putri',
    duration: '15 jam',
    level: 'Lanjutan',
    rating: 4.8,
    students: 432,
    price: 599000,
    originalPrice: 899000,
    thumbnail: '/course-thumbnails/dashboard.jpg',
    category: 'Dashboard',
    lessons: 42,
    challenges: 30
  },
  {
    id: 'excel-automation-vba',
    title: 'Otomatisasi Excel dengan VBA',
    description: 'Automatisasi tugas Excel menggunakan VBA untuk meningkatkan produktivitas.',
    instructor: 'Rudi Hermawan',
    duration: '20 jam',
    level: 'Lanjutan',
    rating: 4.6,
    students: 298,
    price: 799000,
    originalPrice: 1199000,
    thumbnail: '/course-thumbnails/vba.jpg',
    category: 'Automation',
    lessons: 48,
    challenges: 36
  },
  {
    id: 'excel-financial-modeling',
    title: 'Financial Modeling dengan Excel',
    description: 'Belajar membuat model keuangan profesional menggunakan Excel.',
    instructor: 'Lisa Andriani',
    duration: '18 jam',
    level: 'Lanjutan',
    rating: 4.9,
    students: 187,
    price: 899000,
    originalPrice: 1299000,
    thumbnail: '/course-thumbnails/financial.jpg',
    category: 'Keuangan',
    lessons: 54,
    challenges: 42
  }
]

const categories = ['Semua', 'Excel Dasar', 'Formula & Fungsi', 'Analisis Data', 'Dashboard', 'Automation', 'Keuangan']
const levels = ['Semua Level', 'Pemula', 'Menengah', 'Lanjutan']

/**
 * Komponen halaman landing course
 * Menampilkan daftar course yang tersedia dengan fitur filter dan pencarian
 */
export function CourseLandingPage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('Semua')
  const [selectedLevel, setSelectedLevel] = React.useState('Semua Level')
  const [showFilters, setShowFilters] = React.useState(false)

  /**
   * Filter course berdasarkan pencarian, kategori, dan level
   */
  const filteredCourses = React.useMemo(() => {
    return mockCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'Semua' || course.category === selectedCategory
      const matchesLevel = selectedLevel === 'Semua Level' || course.level === selectedLevel
      
      return matchesSearch && matchesCategory && matchesLevel
    })
  }, [searchQuery, selectedCategory, selectedLevel])

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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 py-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Course Excel Terlengkap
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Tingkatkan skill Excel Anda dengan course berkualitas tinggi dari instruktur berpengalaman.
          Mulai dari dasar hingga tingkat expert.
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-muted-foreground">Course Tersedia</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">10K+</div>
            <div className="text-sm text-muted-foreground">Siswa Aktif</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-muted-foreground">Rating Rata-rata</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">95%</div>
            <div className="text-sm text-muted-foreground">Tingkat Kepuasan</div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto"
          >
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50"
          >
            <div>
              <label className="text-sm font-medium mb-2 block">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Course Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {filteredCourses.length} Course Ditemukan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <div className="relative">
                  {/* Course Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayIcon className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
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
                  
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3"
                  >
                    {course.level}
                  </Badge>
                </div>

                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{course.category}</Badge>
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </CardTitle>
                  
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress (if enrolled) */}
                  {course.progress !== undefined && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}
                  
                  {/* Course Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="h-4 w-4" />
                      {course.students.toLocaleString()}
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
                  <div className="text-sm">
                    <span className="text-muted-foreground">Instruktur: </span>
                    <span className="font-medium">{course.instructor}</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(course.price)}
                      </div>
                      {course.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {formatPrice(course.originalPrice)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Button asChild className="w-full">
                    <Link href={`/course/${course.id}`}>
                      {course.progress !== undefined ? (
                        <>
                          <CheckCircleIcon className="mr-2 h-4 w-4" />
                          Lanjutkan Belajar
                        </>
                      ) : (
                        <>
                          Mulai Belajar
                          <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpenIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tidak ada course ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Coba ubah filter atau kata kunci pencarian Anda.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('Semua')
                setSelectedLevel('Semua Level')
              }}
            >
              Reset Filter
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Siap Menjadi Excel Expert?</h3>
            <p className="text-blue-100 mb-6">
              Bergabunglah dengan ribuan profesional yang telah meningkatkan karir mereka dengan Excel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Mulai Course Gratis
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600">
                Lihat Semua Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}