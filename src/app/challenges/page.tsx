import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Trophy, 
  Clock, 
  Star, 
  Users, 
  Target, 
  Search,
  Award,
  TrendingUp,
  CheckCircle,
  Play
} from "lucide-react"
import { ChallengeCard } from "@/components/features"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Challenges - ExcelMaster",
  description: "Tantangan Excel interaktif untuk menguji dan meningkatkan kemampuan Anda",
}

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: 'basic' | 'formulas' | 'data-analysis' | 'charts' | 'pivot-tables' | 'macros'
  points: number
  timeLimit: number // in minutes
  participants: number
  completionRate: number
  tags: string[]
  isCompleted: boolean
  bestScore?: number
  objectives: string[]
  hints: string[]
  createdAt: string
  featured?: boolean
}

/**
 * Mock data untuk challenges
 * Dalam implementasi nyata, ini akan diambil dari API
 */
const mockChallenges: Challenge[] = [
  {
    id: "basic-sum-challenge",
    title: "Master Penjumlahan Dasar",
    description: "Kuasai fungsi SUM dengan berbagai skenario dan kondisi khusus",
    difficulty: "beginner",
    category: "basic",
    points: 100,
    timeLimit: 15,
    participants: 1247,
    completionRate: 87,
    tags: ["SUM", "dasar", "matematika"],
    isCompleted: true,
    bestScore: 95,
    objectives: [
      "Gunakan SUM untuk menjumlahkan range sel",
      "Kombinasikan beberapa range dalam satu formula",
      "Handle sel kosong dan error dalam penjumlahan"
    ],
    hints: [
      "SUM akan mengabaikan sel kosong secara otomatis",
      "Gunakan koma untuk memisahkan multiple range"
    ],
    createdAt: "2024-01-10",
    featured: true
  },
  {
    id: "conditional-formatting",
    title: "Conditional Formatting Master",
    description: "Buat laporan yang menarik dengan conditional formatting yang tepat",
    difficulty: "intermediate",
    category: "data-analysis",
    points: 250,
    timeLimit: 30,
    participants: 892,
    completionRate: 64,
    tags: ["formatting", "visual", "analisis"],
    isCompleted: false,
    objectives: [
      "Terapkan color scale pada data penjualan",
      "Buat data bars untuk visualisasi progress",
      "Highlight nilai tertinggi dan terendah"
    ],
    hints: [
      "Gunakan Home > Conditional Formatting",
      "Color scale bagus untuk data numerik"
    ],
    createdAt: "2024-01-08",
    featured: true
  },
  {
    id: "vlookup-mastery",
    title: "VLOOKUP Ninja",
    description: "Kuasai VLOOKUP untuk pencarian data yang kompleks dan efisien",
    difficulty: "intermediate",
    category: "formulas",
    points: 300,
    timeLimit: 25,
    participants: 756,
    completionRate: 58,
    tags: ["VLOOKUP", "pencarian", "referensi"],
    isCompleted: true,
    bestScore: 88,
    objectives: [
      "Gunakan VLOOKUP untuk mencari data karyawan",
      "Kombinasikan dengan IFERROR untuk handle error",
      "Buat lookup table yang dinamis"
    ],
    hints: [
      "Selalu gunakan FALSE untuk exact match",
      "IFERROR berguna untuk handle #N/A error"
    ],
    createdAt: "2024-01-05"
  },
  {
    id: "pivot-table-pro",
    title: "Pivot Table Professional",
    description: "Analisis data besar dengan pivot table yang powerful dan insightful",
    difficulty: "advanced",
    category: "pivot-tables",
    points: 500,
    timeLimit: 45,
    participants: 423,
    completionRate: 34,
    tags: ["pivot", "analisis", "data besar"],
    isCompleted: false,
    objectives: [
      "Buat pivot table dari data penjualan",
      "Tambahkan calculated fields",
      "Buat pivot chart yang informatif"
    ],
    hints: [
      "Drag fields ke area yang tepat",
      "Gunakan filters untuk fokus pada data tertentu"
    ],
    createdAt: "2024-01-03"
  },
  {
    id: "if-nested-challenge",
    title: "IF Bersarang Expert",
    description: "Buat logika kompleks dengan nested IF yang efisien dan mudah dibaca",
    difficulty: "intermediate",
    category: "formulas",
    points: 200,
    timeLimit: 20,
    participants: 634,
    completionRate: 71,
    tags: ["IF", "logika", "nested"],
    isCompleted: false,
    objectives: [
      "Buat sistem grading dengan nested IF",
      "Handle multiple conditions",
      "Optimasi formula untuk performa"
    ],
    hints: [
      "Pertimbangkan menggunakan IFS untuk multiple conditions",
      "Urutkan kondisi dari yang paling spesifik"
    ],
    createdAt: "2024-01-01"
  },
  {
    id: "chart-visualization",
    title: "Chart Visualization Master",
    description: "Buat chart yang menarik dan informatif untuk presentasi data",
    difficulty: "intermediate",
    category: "charts",
    points: 275,
    timeLimit: 35,
    participants: 567,
    completionRate: 62,
    tags: ["chart", "visualisasi", "presentasi"],
    isCompleted: false,
    objectives: [
      "Buat combo chart untuk data penjualan",
      "Customize chart design dan colors",
      "Tambahkan trendline dan annotations"
    ],
    hints: [
      "Pilih chart type yang sesuai dengan data",
      "Gunakan colors yang konsisten dengan brand"
    ],
    createdAt: "2023-12-28"
  }
]

/**
 * Mendapatkan warna berdasarkan tingkat kesulitan
 */
function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

/**
 * Mendapatkan label tingkat kesulitan dalam bahasa Indonesia
 */
function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'beginner': return 'Pemula'
    case 'intermediate': return 'Menengah'
    case 'advanced': return 'Lanjutan'
    default: return 'Tidak diketahui'
  }
}

/**
 * Mendapatkan label kategori dalam bahasa Indonesia
 */
function getCategoryLabel(category: string): string {
  switch (category) {
    case 'basic': return 'Dasar'
    case 'formulas': return 'Formula'
    case 'data-analysis': return 'Analisis Data'
    case 'charts': return 'Chart'
    case 'pivot-tables': return 'Pivot Table'
    case 'macros': return 'Macro'
    default: return 'Lainnya'
  }
}

/**
 * Halaman Challenges untuk menampilkan daftar tantangan Excel
 * Menyediakan filter, pencarian, dan kategori challenges
 */
export default function ChallengesPage() {
  const featuredChallenges = mockChallenges.filter(c => c.featured)
  const completedChallenges = mockChallenges.filter(c => c.isCompleted)
  const totalPoints = completedChallenges.reduce((sum, c) => sum + c.points, 0)
  
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Excel Challenges
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Uji kemampuan Excel Anda dengan tantangan interaktif yang menarik dan bermanfaat
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Poin</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalPoints.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Selesai</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedChallenges.length}/{mockChallenges.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rata-rata Skor</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedChallenges.length > 0 
                    ? Math.round(completedChallenges.reduce((sum, c) => sum + (c.bestScore || 0), 0) / completedChallenges.length)
                    : 0
                  }%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ranking</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  #42
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Featured Challenges */}
      {featuredChallenges.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Challenge Unggulan
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={{
                  id: challenge.id,
                  title: challenge.title,
                  description: challenge.description,
                  difficulty: challenge.difficulty,
                  points: challenge.points,
                  timeLimit: challenge.timeLimit,
                  completionRate: challenge.completionRate,
                  isCompleted: challenge.isCompleted,
                  objectives: challenge.objectives,
                  hints: challenge.hints,
                  attempts: challenge.isCompleted ? 1 : 0,
                  bestScore: challenge.bestScore,
                  category:challenge.category
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Filters and Search */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Semua Challenges
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari challenge..."
              className="pl-10"
            />
          </div>
          
          {/* Difficulty Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Tingkat Kesulitan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tingkat</SelectItem>
              <SelectItem value="beginner">Pemula</SelectItem>
              <SelectItem value="intermediate">Menengah</SelectItem>
              <SelectItem value="advanced">Lanjutan</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Category Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="basic">Dasar</SelectItem>
              <SelectItem value="formulas">Formula</SelectItem>
              <SelectItem value="data-analysis">Analisis Data</SelectItem>
              <SelectItem value="charts">Chart</SelectItem>
              <SelectItem value="pivot-tables">Pivot Table</SelectItem>
              <SelectItem value="macros">Macro</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Status Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="not-completed">Belum Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockChallenges.map((challenge) => (
          <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {getDifficultyLabel(challenge.difficulty)}
                    </Badge>
                    <Badge variant="outline">
                      {getCategoryLabel(challenge.category)}
                    </Badge>
                    {challenge.isCompleted && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    {challenge.points} pts
                  </p>
                  {challenge.bestScore && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Best: {challenge.bestScore}%
                    </p>
                  )}
                </div>
              </div>
              
              <CardDescription className="line-clamp-2">
                {challenge.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{challenge.timeLimit}m</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{challenge.participants}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">{challenge.completionRate}%</span>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {challenge.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {challenge.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{challenge.tags.length - 3}
                  </Badge>
                )}
              </div>
              
              {/* Action Button */}
              <Link href={`/challenges/${challenge.id}`}>
                <Button className="w-full" variant={challenge.isCompleted ? "outline" : "default"}>
                  <Play className="w-4 h-4 mr-2" />
                  {challenge.isCompleted ? "Coba Lagi" : "Mulai Challenge"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Call to Action */}
      <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                Siap untuk Challenge Berikutnya?
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                Selesaikan lebih banyak challenge untuk naik ranking dan unlock fitur premium!
              </p>
              
              <div className="flex justify-center gap-4">
                <Link href="/learn">
                  <Button variant="outline">
                    Belajar Dulu
                  </Button>
                </Link>
                <Link href="/playground">
                  <Button>
                    Practice Mode
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}