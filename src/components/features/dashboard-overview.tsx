"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useProgressStore } from "@/store/use-progress-store"
import { cn, formatCurrency } from "@/lib/utils"
import {
  BookOpenIcon,
  TrophyIcon,
  TargetIcon,
  StarIcon,
  PlayIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  AwardIcon,
  TrendingUpIcon,
} from "lucide-react"

/**
 * Komponen overview dashboard yang menampilkan ringkasan progress pengguna
 */
export function DashboardOverview() {
  const {
    completedChapters,
    currentChapter,
    points,
    streak,
    achievements,
    lastUpdated,
  } = useProgressStore()

  // Data statistik untuk dashboard
  const totalChapters = 10 // Sesuaikan dengan jumlah chapter yang ada
  const progressPercentage = (completedChapters.length / totalChapters) * 100
  const nextChapter = currentChapter + 1
  const recentAchievements = achievements.slice(-3)

  /**
   * Menghitung estimasi waktu penyelesaian berdasarkan progress saat ini
   */
  const getEstimatedCompletion = () => {
    const remainingChapters = totalChapters - completedChapters.length
    const averageTimePerChapter = 3 // hari
    const estimatedDays = remainingChapters * averageTimePerChapter
    
    if (estimatedDays <= 7) {
      return `${estimatedDays} hari lagi`
    } else if (estimatedDays <= 30) {
      return `${Math.ceil(estimatedDays / 7)} minggu lagi`
    } else {
      return `${Math.ceil(estimatedDays / 30)} bulan lagi`
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang kembali! Mari lanjutkan perjalanan belajar Excel Anda.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Progress Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress Belajar</CardTitle>
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
            <p className="text-xs text-muted-foreground">
              {completedChapters.length} dari {totalChapters} chapter selesai
            </p>
            <Progress value={progressPercentage} className="mt-2" />
          </CardContent>
        </Card>

        {/* Points Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Poin</CardTitle>
            <StarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{points.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(points * 0.1)} poin minggu ini
            </p>
          </CardContent>
        </Card>

        {/* Streak Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak Belajar</CardTitle>
            <TargetIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak} hari</div>
            <p className="text-xs text-muted-foreground">
              {streak >= 7 ? 'Luar biasa! 🔥' : 'Terus pertahankan!'}
            </p>
          </CardContent>
        </Card>

        {/* Achievements Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pencapaian</CardTitle>
            <TrophyIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievements.length}</div>
            <p className="text-xs text-muted-foreground">
              {achievements.length > 0 ? 'Badge terbaru didapat!' : 'Mulai kumpulkan badge'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayIcon className="h-5 w-5" />
                Lanjutkan Belajar
              </CardTitle>
              <CardDescription>
                Anda sedang di Chapter {currentChapter}. Mari lanjutkan ke materi berikutnya!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Chapter {nextChapter <= totalChapters ? nextChapter : currentChapter}</h4>
                  <p className="text-sm text-muted-foreground">
                    {nextChapter <= totalChapters 
                      ? `Materi selanjutnya menanti Anda` 
                      : `Selesaikan latihan di chapter ini`
                    }
                  </p>
                </div>
                <Button asChild>
                  <Link href={`/learn/${nextChapter <= totalChapters ? nextChapter : currentChapter}`}>
                    {nextChapter <= totalChapters ? 'Mulai' : 'Lanjutkan'}
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              {progressPercentage > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Estimasi selesai:</span>
                    <span className="font-medium">{getEstimatedCompletion()}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedChapters.slice(-3).map((chapterId) => (
                  <div key={chapterId} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <BookOpenIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Chapter {chapterId} selesai</p>
                      <p className="text-xs text-muted-foreground">+100 poin didapat</p>
                    </div>
                    <Badge variant="secondary">Selesai</Badge>
                  </div>
                ))}
                
                {completedChapters.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      Belum ada aktivitas. Mulai belajar sekarang!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/playground">
                  <PlayIcon className="mr-2 h-4 w-4" />
                  Buka Playground
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/leaderboard">
                  <TrophyIcon className="mr-2 h-4 w-4" />
                  Lihat Peringkat
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/profile">
                  <AwardIcon className="mr-2 h-4 w-4" />
                  Kelola Profil
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          {recentAchievements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrophyIcon className="h-5 w-5" />
                  Pencapaian Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
                
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/profile#achievements">
                    Lihat Semua
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Learning Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUpIcon className="h-5 w-5" />
                Statistik Belajar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Waktu belajar total:</span>
                <span className="font-medium">24 jam</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Rata-rata per hari:</span>
                <span className="font-medium">45 menit</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Formula dipelajari:</span>
                <span className="font-medium">{completedChapters.length * 3}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Terakhir belajar:</span>
                <span className="font-medium">
                  {lastUpdated ? new Date(lastUpdated).toLocaleDateString('id-ID') : 'Belum pernah'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}