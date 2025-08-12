"use client"

import * as React from "react"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Footer } from "./footer"
import { useUIStore } from "@/store/use-ui-store"
import { useResponsive } from "@/hooks/use-responsive"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
  /**
   * Apakah layout ini untuk halaman yang membutuhkan sidebar
   * Default: true
   */
  showSidebar?: boolean
  /**
   * Apakah layout ini untuk halaman yang membutuhkan header
   * Default: true
   */
  showHeader?: boolean
  /**
   * Apakah layout ini untuk halaman yang membutuhkan footer
   * Default: true
   */
  showFooter?: boolean
  /**
   * Apakah konten membutuhkan padding
   * Default: true
   */
  padded?: boolean
}

/**
 * Layout utama aplikasi ExcelMaster
 * Menggabungkan header, sidebar, dan area konten utama
 */
export function MainLayout({
  children,
  className,
  showSidebar = true,
  showHeader = true,
  showFooter = true,
  padded = true,
}: MainLayoutProps) {
  const { sidebarOpen, isMobile } = useUIStore()
  
  // Aktifkan deteksi responsive
  useResponsive()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      {showHeader && <Header />}
      
      <div className="flex flex-1">
        {/* Sidebar */}
        {showSidebar && <Sidebar />}
        
        {/* Main Content */}
        <main 
          className={cn(
            "flex-1 overflow-auto ",
            showSidebar && !isMobile && sidebarOpen && "ml-0",
            padded && "p-6",
            className
          )}
        >
          {children}
        </main>
      </div>
      
      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  )
}

/**
 * Layout khusus untuk halaman marketing/landing
 * Tanpa sidebar, hanya header
 */
export function MarketingLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <MainLayout 
      showSidebar={false} 
      showHeader={true}
      showFooter={true}
      padded={false}
      className={className}
    >
      {children}
    </MainLayout>
  )
}

/**
 * Layout khusus untuk halaman pembelajaran
 * Dengan sidebar dan area konten yang dioptimalkan untuk belajar
 */
export function LearningLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <MainLayout 
      showSidebar={true} 
      showHeader={true}
      showFooter={false}
      padded={false}
      className={cn("bg-muted/30", className)}
    >
      {children}
    </MainLayout>
  )
}

/**
 * Layout khusus untuk playground/editor
 * Memaksimalkan area kerja untuk spreadsheet
 */
export function PlaygroundLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <MainLayout 
      showSidebar={false} 
      showHeader={true}
      showFooter={false}
      padded={false}
      className={cn("bg-background", className)}
    >
      {children}
    </MainLayout>
  )
}

/**
 * Layout khusus untuk halaman fullscreen
 * Tanpa header dan sidebar
 */
export function FullscreenLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {children}
    </div>
  )
}