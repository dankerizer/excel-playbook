"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Award, 
  Star, 
  TrendingUp,
  Calendar,
  Target,
  Crown,
  Users,
  Filter
} from "lucide-react"
import { motion } from "framer-motion"

interface LeaderboardUser {
  id: string
  name: string
  avatar?: string
  points: number
  completedChapters: number
  streak: number
  rank: number
  badge?: string
  isCurrentUser?: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedBy: number // number of users who have this
}

// Mock data untuk leaderboard
const mockLeaderboardData: LeaderboardUser[] = [
  {
    id: "1",
    name: "Andi Pratama",
    avatar: "/avatars/andi.jpg",
    points: 2850,
    completedChapters: 8,
    streak: 15,
    rank: 1,
    badge: "Excel Master"
  },
  {
    id: "2",
    name: "Sari Dewi",
    avatar: "/avatars/sari.jpg",
    points: 2720,
    completedChapters: 7,
    streak: 12,
    rank: 2,
    badge: "Formula Expert"
  },
  {
    id: "3",
    name: "Budi Santoso",
    avatar: "/avatars/budi.jpg",
    points: 2650,
    completedChapters: 7,
    streak: 8,
    rank: 3,
    badge: "Data Analyst"
  },
  {
    id: "4",
    name: "Rina Kusuma",
    points: 2480,
    completedChapters: 6,
    streak: 10,
    rank: 4
  },
  {
    id: "5",
    name: "Dedi Kurniawan",
    points: 2350,
    completedChapters: 6,
    streak: 7,
    rank: 5
  },
  {
    id: "current",
    name: "Anda",
    points: 1850,
    completedChapters: 4,
    streak: 5,
    rank: 12,
    isCurrentUser: true
  }
]

const mockAchievements: Achievement[] = [
  {
    id: "first-lesson",
    title: "Langkah Pertama",
    description: "Selesaikan lesson pertama",
    icon: "🎯",
    rarity: "common",
    unlockedBy: 1250
  },
  {
    id: "formula-master",
    title: "Master Formula",
    description: "Gunakan 50 formula berbeda",
    icon: "🧮",
    rarity: "rare",
    unlockedBy: 340
  },
  {
    id: "speed-demon",
    title: "Speed Demon",
    description: "Selesaikan lesson dalam 5 menit",
    icon: "⚡",
    rarity: "epic",
    unlockedBy: 89
  },
  {
    id: "perfectionist",
    title: "Perfectionist",
    description: "Dapatkan skor 100% di 10 lesson",
    icon: "💎",
    rarity: "legendary",
    unlockedBy: 23
  }
]

/**
 * Mendapatkan warna berdasarkan ranking
 */
function getRankColor(rank: number): string {
  if (rank === 1) return 'text-yellow-600'
  if (rank === 2) return 'text-gray-600'
  if (rank === 3) return 'text-amber-600'
  return 'text-gray-500'
}

/**
 * Mendapatkan ikon berdasarkan ranking
 */
function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />
  if (rank === 2) return <Award className="w-6 h-6 text-gray-400" />
  if (rank === 3) return <Award className="w-6 h-6 text-amber-500" />
  return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
}

/**
 * Mendapatkan warna berdasarkan rarity achievement
 */
function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    case 'rare': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'epic': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'legendary': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default: return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Komponen workspace untuk halaman leaderboard
 * Menampilkan ranking pengguna dan achievement
 */
export function LeaderboardWorkspace() {
  const currentUser = mockLeaderboardData.find(user => user.isCurrentUser)
  const topUsers = mockLeaderboardData.filter(user => !user.isCurrentUser).slice(0, 10)
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Papan Peringkat
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Kompetisi dengan pengguna lain dan raih posisi teratas!
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Mingguan
            </Button>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Peserta</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Posisi Anda</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">#{currentUser?.rank || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Poin Anda</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser?.points.toLocaleString() || '0'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentUser?.streak || 0} hari</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Leaderboard */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Top Performers
              </CardTitle>
              <CardDescription>
                Pengguna dengan performa terbaik minggu ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Top 3 - Special Display */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {topUsers.slice(0, 3).map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`text-center p-4 rounded-lg border-2 ${
                        index === 0 
                          ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950'
                          : index === 1
                          ? 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                          : 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950'
                      }`}
                    >
                      <div className="flex justify-center mb-3">
                        {getRankIcon(user.rank)}
                      </div>
                      
                      <Avatar className="w-12 h-12 mx-auto mb-3">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                        {user.name}
                      </h3>
                      
                      <p className={`text-lg font-bold ${getRankColor(user.rank)}`}>
                        {user.points.toLocaleString()}
                      </p>
                      
                      {user.badge && (
                        <Badge className="mt-2 text-xs" variant="outline">
                          {user.badge}
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Remaining Users */}
                <div className="space-y-3">
                  {topUsers.slice(3).map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (index + 3) * 0.05 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8">
                          {getRankIcon(user.rank)}
                        </div>
                        
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {user.name}
                          </h3>
                          {user.badge && (
                            <Badge className="mt-1 text-xs" variant="outline">
                              {user.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">
                          {user.points.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.completedChapters} chapter
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Position */}
          {currentUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-blue-600 dark:text-blue-400">Posisi Anda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {getRankIcon(currentUser.rank)}
                    </div>
                    
                    <Avatar className="w-16 h-16 mx-auto mb-4">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {currentUser.name}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {currentUser.points.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Poin</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {currentUser.streak}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress Chapter</span>
                        <span>{currentUser.completedChapters}/10</span>
                      </div>
                      <Progress value={(currentUser.completedChapters / 10) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Pencapaian yang bisa Anda raih
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {achievement.unlockedBy} pengguna
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}