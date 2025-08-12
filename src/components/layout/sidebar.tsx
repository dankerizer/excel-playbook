"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useUIStore } from "@/store/use-ui-store"
import { useProgressStore } from "@/store/use-progress-store"
import { cn } from "@/lib/utils"
import {
  BookOpenIcon,
  TrophyIcon,
  UserIcon,
  PlayIcon,
  HomeIcon,
  XIcon,
  ChevronRightIcon,
  StarIcon,
  TargetIcon,
} from "lucide-react"

/**
 * Sidebar component untuk navigasi dan progress tracking
 * Responsive untuk mobile dan desktop
 */
export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen, isMobile } = useUIStore()
  const { 
    completedChapters, 
    currentChapter, 
    points, 
    streak, 
    achievements 
  } = useProgressStore()

  /**
   * Menentukan apakah link navigasi sedang aktif
   * @param href - URL path yang akan dicek
   * @returns boolean - true jika path aktif
   */
  const isActiveLink = (href: string): boolean => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  /**
   * Menutup sidebar (untuk mobile)
   */
  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  /**
   * Menu navigasi utama
   */
  const navigationItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      description: 'Ringkasan progress belajar',
    },
    {
      title: 'Belajar',
      href: '/learn',
      icon: BookOpenIcon,
      description: 'Pelajari Excel dari dasar',
      badge: `Chapter ${currentChapter}`,
    },
    {
      title: 'Playground',
      href: '/playground',
      icon: PlayIcon,
      description: 'Latihan bebas spreadsheet',
    },
    {
      title: 'Papan Peringkat',
      href: '/leaderboard',
      icon: TrophyIcon,
      description: 'Kompetisi dan ranking',
    },
    {
      title: 'Profil',
      href: '/profile',
      icon: UserIcon,
      description: 'Pengaturan akun',
    },
  ]

  /**
   * Menghitung progress keseluruhan
   */
  const totalChapters = 10 // Sesuaikan dengan jumlah chapter yang ada
  const progressPercentage = (completedChapters.length / totalChapters) * 100

  return (
    <>
      {/* Overlay untuk mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          !isMobile && "md:hidden"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b px-4">
            <Link href="/" className="flex items-center gap-2" onClick={closeSidebar}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
                EM
              </div>
              <span className="font-bold text-lg">ExcelMaster</span>
            </Link>
            
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={closeSidebar}
                className="h-8 w-8"
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close sidebar</span>
              </Button>
            )}
          </div>

          {/* Progress Summary */}
          <div className="border-b p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress Belajar</span>
                <span className="font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-3 w-3 text-yellow-500" />
                  <span>{points.toLocaleString('id-ID')} poin</span>
                </div>
                <div className="flex items-center gap-1">
                  <TargetIcon className="h-3 w-3 text-orange-500" />
                  <span>{streak} hari streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigationItems.map((item) => {
              const isActive = isActiveLink(item.href)
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive 
                      ? "bg-accent text-accent-foreground" 
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <div className="flex-1 truncate">
                    <div className="flex items-center justify-between">
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRightIcon className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              )
            })}
          </nav>

          {/* Achievements Preview */}
          {achievements.length > 0 && (
            <div className="border-t p-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Pencapaian Terbaru</h4>
                <div className="space-y-1">
                  {achievements.slice(-2).map((achievement) => (
                    <div 
                      key={achievement.id}
                      className="flex items-center gap-2 rounded-md bg-muted/50 p-2 text-xs"
                    >
                      <div className="text-lg">{achievement.icon}</div>
                      <div className="flex-1 truncate">
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-muted-foreground truncate">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {achievements.length > 2 && (
                  <Link 
                    href="/profile#achievements" 
                    onClick={closeSidebar}
                    className="block text-center text-xs text-primary hover:underline"
                  >
                    Lihat semua pencapaian
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-center text-xs text-muted-foreground">
              <p>ExcelMaster v1.0</p>
              <p>Platform Belajar Excel Indonesia</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}