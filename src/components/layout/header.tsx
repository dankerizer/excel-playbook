"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useUIStore } from "@/store/use-ui-store"
import { useProgressStore } from "@/store/use-progress-store"
import { cn } from "@/lib/utils"
import {
  BookOpenIcon,
  TrophyIcon,
  UserIcon,
  PlayIcon,
  MenuIcon,
  SunIcon,
  MoonIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react"

/**
 * Header component untuk navigasi utama aplikasi ExcelMaster
 * Menampilkan logo, menu navigasi, dan profil pengguna
 */
export function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme, toggleSidebar, isMobile } = useUIStore()
  const { points, streak, currentChapter } = useProgressStore()

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
   * Menu navigasi utama untuk desktop
   */
  const navigationItems = [
    {
      title: 'Belajar',
      href: '/learn',
      icon: BookOpenIcon,
      description: 'Pelajari Excel dari dasar hingga mahir',
    },
    {
      title: 'Playground',
      href: '/playground',
      icon: PlayIcon,
      description: 'Latihan bebas dengan spreadsheet',
    },
    {
      title: 'Papan Peringkat',
      href: '/leaderboard',
      icon: TrophyIcon,
      description: 'Lihat ranking dan kompetisi',
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo dan Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              EM
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">
              ExcelMaster
            </span>
          </Link>
        </div>

        {/* Navigation Menu - Desktop */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.href}>
               
                  <NavigationMenuLink
                    className={cn(
                      "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                      isActiveLink(item.href) && "bg-accent text-accent-foreground"
                    )}
                    href={item.href}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </NavigationMenuLink>
                
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          {/* Progress Indicators */}
          <div className="hidden sm:flex items-center gap-3 mr-4">
            <Badge variant="secondary" className="gap-1">
              <TrophyIcon className="h-3 w-3" />
              {points.toLocaleString('id-ID')} poin
            </Badge>
            <Badge variant="outline" className="gap-1">
              🔥 {streak} hari
            </Badge>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === 'light' ? (
              <MoonIcon className="h-4 w-4" />
            ) : (
              <SunIcon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/user.png" alt="User" />
                  <AvatarFallback>
                    <UserIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Pengguna ExcelMaster</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    Chapter {currentChapter} • {points.toLocaleString('id-ID')} poin
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Profil & Pengaturan
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}