"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { LoaderIcon } from "lucide-react"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

/**
 * Komponen loading spinner sederhana
 * @param className - CSS classes tambahan
 * @param size - Ukuran spinner (sm, md, lg)
 */
export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <LoaderIcon 
      className={cn(
        "animate-spin text-muted-foreground",
        sizeClasses[size],
        className
      )} 
    />
  )
}

interface LoadingStateProps {
  className?: string
  message?: string
  size?: "sm" | "md" | "lg"
}

/**
 * Komponen loading state dengan pesan
 * @param className - CSS classes tambahan
 * @param message - Pesan loading yang ditampilkan
 * @param size - Ukuran loading state
 */
export function LoadingState({ 
  className, 
  message = "Memuat...", 
  size = "md" 
}: LoadingStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-3 p-8",
      className
    )}>
      <LoadingSpinner size={size} />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

interface PageLoadingProps {
  message?: string
}

/**
 * Komponen loading untuk halaman penuh
 * @param message - Pesan loading yang ditampilkan
 */
export function PageLoading({ message = "Memuat halaman..." }: PageLoadingProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <LoadingState message={message} size="lg" />
    </div>
  )
}

interface SkeletonProps {
  className?: string
}

/**
 * Komponen skeleton untuk placeholder loading
 * @param className - CSS classes tambahan
 */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-md bg-muted", 
        className
      )} 
    />
  )
}

/**
 * Komponen skeleton untuk card
 */
export function CardSkeleton() {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
    </div>
  )
}

/**
 * Komponen skeleton untuk list item
 */
export function ListItemSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

/**
 * Komponen skeleton untuk tabel
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      ))}
    </div>
  )
}