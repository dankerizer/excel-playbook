"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  AlertTriangleIcon,
  RefreshCwIcon,
  WifiOffIcon,
  ServerCrashIcon,
  FileXIcon,
  ShieldXIcon,
  HomeIcon,
} from "lucide-react"

interface ErrorStateProps {
  className?: string
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
  variant?: "default" | "network" | "server" | "notFound" | "permission"
}

/**
 * Komponen untuk menampilkan state error dengan berbagai varian
 * @param className - CSS classes tambahan
 * @param title - Judul error
 * @param description - Deskripsi error
 * @param action - Aksi utama (biasanya retry)
 * @param secondaryAction - Aksi sekunder (biasanya kembali ke home)
 * @param icon - Icon custom untuk error
 * @param variant - Varian error yang menentukan icon dan pesan default
 */
export function ErrorState({
  className,
  title,
  description,
  action,
  secondaryAction,
  icon,
  variant = "default",
}: ErrorStateProps) {
  /**
   * Mendapatkan konfigurasi default berdasarkan variant
   */
  const getVariantConfig = () => {
    switch (variant) {
      case "network":
        return {
          icon: <WifiOffIcon className="h-12 w-12 text-muted-foreground" />,
          title: "Tidak Ada Koneksi Internet",
          description: "Periksa koneksi internet Anda dan coba lagi.",
        }
      case "server":
        return {
          icon: <ServerCrashIcon className="h-12 w-12 text-muted-foreground" />,
          title: "Server Bermasalah",
          description: "Terjadi kesalahan pada server. Silakan coba lagi dalam beberapa saat.",
        }
      case "notFound":
        return {
          icon: <FileXIcon className="h-12 w-12 text-muted-foreground" />,
          title: "Halaman Tidak Ditemukan",
          description: "Halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.",
        }
      case "permission":
        return {
          icon: <ShieldXIcon className="h-12 w-12 text-muted-foreground" />,
          title: "Akses Ditolak",
          description: "Anda tidak memiliki izin untuk mengakses halaman ini.",
        }
      default:
        return {
          icon: <AlertTriangleIcon className="h-12 w-12 text-muted-foreground" />,
          title: "Terjadi Kesalahan",
          description: "Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.",
        }
    }
  }

  const config = getVariantConfig()
  const displayIcon = icon || config.icon
  const displayTitle = title || config.title
  const displayDescription = description || config.description

  return (
    <div className={cn(
      "flex min-h-[400px] items-center justify-center p-4",
      className
    )}>
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            {displayIcon}
          </div>
          <CardTitle className="text-xl">{displayTitle}</CardTitle>
          <CardDescription className="text-base">
            {displayDescription}
          </CardDescription>
        </CardHeader>
        
        {(action || secondaryAction) && (
          <CardContent className="space-y-3">
            {action && (
              <Button 
                onClick={action.onClick}
                className="w-full"
                size="lg"
              >
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            )}
            
            {secondaryAction && (
              <Button 
                variant="outline"
                onClick={secondaryAction.onClick}
                className="w-full"
                size="lg"
              >
                <HomeIcon className="mr-2 h-4 w-4" />
                {secondaryAction.label}
              </Button>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}

/**
 * Komponen error state sederhana untuk inline error
 */
export function InlineError({
  message,
  onRetry,
  className,
}: {
  message: string
  onRetry?: () => void
  className?: string
}) {
  return (
    <div className={cn(
      "flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm",
      className
    )}>
      <div className="flex items-center gap-2">
        <AlertTriangleIcon className="h-4 w-4 text-destructive" />
        <span className="text-destructive">{message}</span>
      </div>
      
      {onRetry && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRetry}
          className="h-auto p-1 text-destructive hover:text-destructive"
        >
          <RefreshCwIcon className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}

/**
 * Komponen error boundary untuk menangkap error React
 */
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{
    fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  }>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{
    fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  }>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return (
          <FallbackComponent 
            error={this.state.error!} 
            resetError={this.resetError} 
          />
        )
      }

      return (
        <ErrorState
          title="Terjadi Kesalahan Aplikasi"
          description="Aplikasi mengalami kesalahan yang tidak terduga. Silakan muat ulang halaman."
          action={{
            label: "Muat Ulang",
            onClick: () => window.location.reload(),
          }}
          secondaryAction={{
            label: "Kembali ke Beranda",
            onClick: () => window.location.href = "/",
          }}
        />
      )
    }

    return this.props.children
  }
}

/**
 * Hook untuk menangani error state
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<string | null>(null)

  const handleError = React.useCallback((error: Error | string) => {
    const message = typeof error === 'string' ? error : error.message
    setError(message)
    console.error('Error handled:', error)
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    handleError,
    clearError,
  }
}