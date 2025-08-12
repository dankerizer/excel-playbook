import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Settings, 
  Trophy, 
  Star, 
  Calendar,
  Target,
  TrendingUp,
  Award,
  Bell,
  Shield,
  Palette,
  Download,
  Upload,
  Edit,
  Camera,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap
} from "lucide-react"
import { motion } from "framer-motion"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profil Saya - ExcelMaster",
  description: "Kelola profil, lihat statistik pembelajaran, dan atur preferensi akun Anda di ExcelMaster.",
  keywords: ["profil", "pengaturan", "statistik", "akun pengguna"]
}

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  occupation?: string
  joinDate: string
  lastActive: string
}

interface UserStats {
  totalPoints: number
  completedChapters: number
  totalLessons: number
  currentStreak: number
  longestStreak: number
  averageScore: number
  timeSpent: number // in minutes
  rank: number
  totalUsers: number
}

interface UserAchievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface UserSettings {
  notifications: {
    email: boolean
    push: boolean
    weeklyReport: boolean
    achievements: boolean
  }
  privacy: {
    showProfile: boolean
    showProgress: boolean
    showAchievements: boolean
  }
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: string
    autoSave: boolean
    soundEffects: boolean
  }
}

/**
 * Mock data untuk profil pengguna
 * Dalam implementasi nyata, ini akan diambil dari API
 */
const mockUserProfile: UserProfile = {
  id: "current-user",
  name: "Andi Pratama",
  email: "andi.pratama@email.com",
  avatar: "/avatars/andi.jpg",
  bio: "Seorang data analyst yang sedang belajar Excel untuk meningkatkan produktivitas kerja. Senang berbagi tips dan trik Excel dengan teman-teman.",
  location: "Jakarta, Indonesia",
  occupation: "Data Analyst",
  joinDate: "2024-01-15",
  lastActive: "2024-03-15"
}

const mockUserStats: UserStats = {
  totalPoints: 2850,
  completedChapters: 8,
  totalLessons: 45,
  currentStreak: 15,
  longestStreak: 23,
  averageScore: 87,
  timeSpent: 1240, // 20+ hours
  rank: 12,
  totalUsers: 1247
}

const mockUserAchievements: UserAchievement[] = [
  {
    id: "first-lesson",
    title: "Langkah Pertama",
    description: "Selesaikan lesson pertama",
    icon: "🎯",
    unlockedAt: "2024-01-16",
    rarity: "common"
  },
  {
    id: "week-streak",
    title: "Konsisten Seminggu",
    description: "Belajar setiap hari selama 7 hari",
    icon: "🔥",
    unlockedAt: "2024-01-23",
    rarity: "rare"
  },
  {
    id: "formula-expert",
    title: "Expert Formula",
    description: "Gunakan 25 formula berbeda",
    icon: "🧮",
    unlockedAt: "2024-02-10",
    rarity: "epic"
  },
  {
    id: "perfect-score",
    title: "Skor Sempurna",
    description: "Dapatkan skor 100% di 5 lesson",
    icon: "💎",
    unlockedAt: "2024-03-01",
    rarity: "legendary"
  }
]

const mockUserSettings: UserSettings = {
  notifications: {
    email: true,
    push: true,
    weeklyReport: true,
    achievements: true
  },
  privacy: {
    showProfile: true,
    showProgress: true,
    showAchievements: true
  },
  preferences: {
    theme: 'system',
    language: 'id',
    autoSave: true,
    soundEffects: true
  }
}

/**
 * Mendapatkan warna badge berdasarkan rarity
 */
function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    case 'rare': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'epic': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'legendary': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }
}

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
 * Format tanggal dalam bahasa Indonesia
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Halaman profil pengguna untuk menampilkan informasi personal dan pengaturan
 */
export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Profil Saya
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Kelola informasi profil dan pengaturan akun Anda
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Statistik
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Pencapaian
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Pengaturan
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Profil</CardTitle>
                    <CardDescription>
                      Kelola informasi personal dan kontak Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={mockUserProfile.avatar} alt={mockUserProfile.name} />
                          <AvatarFallback className="text-2xl">
                            {mockUserProfile.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {mockUserProfile.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {mockUserProfile.occupation}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Bergabung {formatDate(mockUserProfile.joinDate)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            Ranking #{mockUserStats.rank}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" defaultValue={mockUserProfile.name} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input id="email" defaultValue={mockUserProfile.email} className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Lokasi</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input id="location" defaultValue={mockUserProfile.location} className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Pekerjaan</Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input id="occupation" defaultValue={mockUserProfile.occupation} className="pl-10" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        defaultValue={mockUserProfile.bio}
                        placeholder="Ceritakan sedikit tentang diri Anda..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Button variant="outline">Batal</Button>
                      <Button>Simpan Perubahan</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Statistik Cepat</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Total Poin</span>
                      </div>
                      <span className="font-semibold">{mockUserStats.totalPoints.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Chapter Selesai</span>
                      </div>
                      <span className="font-semibold">{mockUserStats.completedChapters}/10</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Streak Saat Ini</span>
                      </div>
                      <span className="font-semibold">{mockUserStats.currentStreak} hari</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Ranking</span>
                      </div>
                      <span className="font-semibold">#{mockUserStats.rank}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pencapaian Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockUserAchievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm">{achievement.title}</h4>
                              <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {formatDate(achievement.unlockedAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Poin</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockUserStats.totalPoints.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lesson Selesai</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockUserStats.totalLessons}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rata-rata Skor</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {mockUserStats.averageScore}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Waktu Belajar</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatDuration(mockUserStats.timeSpent)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Chapter</CardTitle>
                  <CardDescription>
                    Kemajuan pembelajaran per chapter
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Chapter Selesai</span>
                        <span className="font-medium">{mockUserStats.completedChapters}/10</span>
                      </div>
                      <Progress value={(mockUserStats.completedChapters / 10) * 100} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{mockUserStats.completedChapters}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Selesai</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{10 - mockUserStats.completedChapters}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Tersisa</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Streak Information</CardTitle>
                  <CardDescription>
                    Konsistensi belajar harian Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-orange-600">{mockUserStats.currentStreak}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Streak Saat Ini</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-red-600">{mockUserStats.longestStreak}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Streak Terpanjang</p>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                      <div className="text-2xl mb-2">🔥</div>
                      <p className="text-sm text-orange-800 dark:text-orange-200">
                        Anda sedang dalam streak {mockUserStats.currentStreak} hari!
                        Jangan putus hari ini.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pencapaian Saya</CardTitle>
                <CardDescription>
                  Koleksi achievement yang telah Anda raih
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockUserAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="text-center mb-3">
                        <div className="text-4xl mb-2">{achievement.icon}</div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {achievement.title}
                          </h3>
                          <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          Diraih pada {formatDate(achievement.unlockedAt)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifikasi
                  </CardTitle>
                  <CardDescription>
                    Atur preferensi notifikasi Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifikasi</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Terima notifikasi melalui email
                      </p>
                    </div>
                    <Switch defaultChecked={mockUserSettings.notifications.email} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifikasi</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Notifikasi langsung di browser
                      </p>
                    </div>
                    <Switch defaultChecked={mockUserSettings.notifications.push} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Laporan Mingguan</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ringkasan progress mingguan
                      </p>
                    </div>
                    <Switch defaultChecked={mockUserSettings.notifications.weeklyReport} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifikasi Achievement</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pemberitahuan pencapaian baru
                      </p>
                    </div>
                    <Switch defaultChecked={mockUserSettings.notifications.achievements} />
                  </div>
                </CardContent>
              </Card>
              
              {/* Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privasi
                  </CardTitle>
                  <CardDescription>
                    Kontrol visibilitas profil Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Tampilkan Profil</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Profil terlihat oleh pengguna lain
                      </p>
                    </div>
                    <Switch defaultChecked={mockUserSettings.privacy.showProfile} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Tampilkan Progress</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Progress belajar di leaderboard
                      </p>
                    </div>
                    <Switch defaultChecked={mockUserSettings.privacy.showProgress} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Tampilkan Achievement</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pencapaian terlihat di profil
                      </p>
                    </div>
                    <Switch defaultChecked={mockUserSettings.privacy.showAchievements} />
                  </div>
                </CardContent>
              </Card>
              
              {/* Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Preferensi
                  </CardTitle>
                  <CardDescription>
                    Sesuaikan pengalaman belajar Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Save</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Simpan progress otomatis
                      </p>
                    </div>
                    <Switch defaultChecked={mockUserSettings.preferences.autoSave} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sound Effects</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Efek suara saat interaksi
                      </p>
                    </div>
                    <Switch defaultChecked={mockUserSettings.preferences.soundEffects} />
                  </div>
                </CardContent>
              </Card>
              
              {/* Data Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Manajemen Data</CardTitle>
                  <CardDescription>
                    Kelola data dan backup progress Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data Progress
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data Progress
                  </Button>
                  
                  <Button variant="destructive" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Reset Semua Progress
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}