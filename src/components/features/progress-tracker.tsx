"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Star, 
  Target, 
  Calendar,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  Flame,
  BookOpen,
  BarChart3,
  Zap
} from "lucide-react"
import { motion } from "framer-motion"
import { useProgressStore } from "@/store/use-progress-store"

interface ProgressStats {
  totalPoints: number
  completedChapters: number
  totalChapters: number
  completedLessons: number
  totalLessons: number
  currentStreak: number
  longestStreak: number
  averageScore: number
  timeSpent: number // in minutes
  rank: number
  totalUsers: number
  weeklyGoal: number
  weeklyProgress: number
}

interface Milestone {
  id: string
  title: string
  description: string
  target: number
  current: number
  type: 'points' | 'chapters' | 'lessons' | 'streak'
  reward: string
  isCompleted: boolean
}

interface ProgressTrackerProps {
  stats?: ProgressStats
  milestones?: Milestone[]
  showDetailed?: boolean
  className?: string
}

/**
 * Mock data untuk progress stats
 * Dalam implementasi nyata, ini akan diambil dari store atau API
 */
const mockStats: ProgressStats = {
  totalPoints: 2850,
  completedChapters: 8,
  totalChapters: 10,
  completedLessons: 45,
  totalLessons: 60,
  currentStreak: 15,
  longestStreak: 23,
  averageScore: 87,
  timeSpent: 1240, // 20+ hours
  rank: 12,
  totalUsers: 1247,
  weeklyGoal: 5, // lessons per week
  weeklyProgress: 3
}

const mockMilestones: Milestone[] = [
  {
    id: "first-1000",
    title: "Pencapaian Pertama",
    description: "Raih 1000 poin pertama",
    target: 1000,
    current: 2850,
    type: "points",
    reward: "Badge: Rookie Excel",
    isCompleted: true
  },
  {
    id: "chapter-master",
    title: "Chapter Master",
    description: "Selesaikan 5 chapter",
    target: 5,
    current: 8,
    type: "chapters",
    reward: "Badge: Chapter Master",
    isCompleted: true
  },
  {
    id: "streak-warrior",
    title: "Streak Warrior",
    description: "Pertahankan streak 30 hari",
    target: 30,
    current: 15,
    type: "streak",
    reward: "Badge: Consistency King",
    isCompleted: false
  },
  {
    id: "lesson-expert",
    title: "Lesson Expert",
    description: "Selesaikan 50 lesson",
    target: 50,
    current: 45,
    type: "lessons",
    reward: "Unlock: Advanced Features",
    isCompleted: false
  }
]

/**
 * Format durasi dalam jam dan menit
 */
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}j ${mins}m`
  }
  return `${mins}m`
}

/**
 * Mendapatkan warna berdasarkan tipe milestone
 */
function getMilestoneColor(type: string): string {
  switch (type) {
    case 'points': return 'text-yellow-600'
    case 'chapters': return 'text-blue-600'
    case 'lessons': return 'text-green-600'
    case 'streak': return 'text-orange-600'
    default: return 'text-gray-600'
  }
}

/**
 * Mendapatkan icon berdasarkan tipe milestone
 */
function getMilestoneIcon(type: string) {
  switch (type) {
    case 'points': return <Star className="w-4 h-4" />
    case 'chapters': return <BookOpen className="w-4 h-4" />
    case 'lessons': return <Target className="w-4 h-4" />
    case 'streak': return <Flame className="w-4 h-4" />
    default: return <Trophy className="w-4 h-4" />
  }
}

/**
 * Komponen ProgressTracker untuk melacak dan menampilkan progres pembelajaran
 * Menampilkan statistik, milestone, dan pencapaian pengguna
 */
export function ProgressTracker({ 
  stats = mockStats, 
  milestones = mockMilestones,
  showDetailed = true,
  className 
}: ProgressTrackerProps) {
  const { points, completedChapters, currentChapter, streak } = useProgressStore()
  
  // Gunakan data dari store jika tersedia, fallback ke mock data
  const currentStats = {
    ...stats,
    totalPoints: points || stats.totalPoints,
    completedChapters: completedChapters.length || stats.completedChapters,
    currentStreak: streak || stats.currentStreak
  }
  
  const overallProgress = (currentStats.completedChapters / currentStats.totalChapters) * 100
  const lessonProgress = (currentStats.completedLessons / currentStats.totalLessons) * 100
  const weeklyProgress = (currentStats.weeklyProgress / currentStats.weeklyGoal) * 100
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Poin</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentStats.totalPoints.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Chapter Selesai</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentStats.completedChapters}/{currentStats.totalChapters}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Flame className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Streak Saat Ini</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentStats.currentStreak} hari
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ranking</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    #{currentStats.rank}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {showDetailed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Progress Overview
                </CardTitle>
                <CardDescription>
                  Ringkasan kemajuan pembelajaran Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overall Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress Keseluruhan</span>
                    <span className="font-medium">{Math.round(overallProgress)}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {currentStats.completedChapters} dari {currentStats.totalChapters} chapter selesai
                  </p>
                </div>
                
                {/* Lesson Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress Lesson</span>
                    <span className="font-medium">{Math.round(lessonProgress)}%</span>
                  </div>
                  <Progress value={lessonProgress} className="h-3" />
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {currentStats.completedLessons} dari {currentStats.totalLessons} lesson selesai
                  </p>
                </div>
                
                {/* Weekly Goal */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Target Mingguan</span>
                    <span className="font-medium">{Math.round(weeklyProgress)}%</span>
                  </div>
                  <Progress value={weeklyProgress} className="h-3" />
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {currentStats.weeklyProgress} dari {currentStats.weeklyGoal} lesson minggu ini
                  </p>
                </div>
                
                {/* Additional Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentStats.averageScore}%
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Rata-rata Skor</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatDuration(currentStats.timeSpent)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Waktu Belajar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Milestone
                </CardTitle>
                <CardDescription>
                  Pencapaian dan target yang sedang dikejar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => {
                    const progress = Math.min((milestone.current / milestone.target) * 100, 100)
                    
                    return (
                      <motion.div
                        key={milestone.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-3 rounded-lg border ${
                          milestone.isCompleted 
                            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`p-1 rounded ${getMilestoneColor(milestone.type)}`}>
                              {getMilestoneIcon(milestone.type)}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                                {milestone.title}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                          
                          {milestone.isCompleted && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="font-medium">
                              {milestone.current}/{milestone.target}
                            </span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className="text-xs"
                          >
                            {milestone.reward}
                          </Badge>
                          
                          {!milestone.isCompleted && (
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {milestone.target - milestone.current} lagi
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
      
      {/* Streak Motivation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <Flame className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200">
                    Streak {currentStats.currentStreak} Hari! 🔥
                  </h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    {currentStats.currentStreak >= currentStats.longestStreak 
                      ? "Ini adalah streak terpanjang Anda! Pertahankan!"
                      : `${currentStats.longestStreak - currentStats.currentStreak} hari lagi untuk memecahkan rekor!`
                    }
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-orange-700 dark:text-orange-300">Rekor Terpanjang</p>
                <p className="text-xl font-bold text-orange-800 dark:text-orange-200">
                  {currentStats.longestStreak} hari
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}