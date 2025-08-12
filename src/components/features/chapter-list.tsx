"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useProgressStore } from "@/store/use-progress-store"
import { cn } from "@/lib/utils"
import {
  BookOpenIcon,
  LockIcon,
  CheckCircleIcon,
  PlayIcon,
  ClockIcon,
  StarIcon,
  ChevronRightIcon,
  TargetIcon,
} from "lucide-react"
import type { ChapterStatus } from "@/types"

interface Chapter {
  id: number
  title: string
  description: string
  lessons: number
  estimatedTime: string
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan'
  topics: string[]
  prerequisites?: number[]
}

/**
 * Data chapter pembelajaran Excel
 */
const chapters: Chapter[] = [
  {
    id: 1,
    title: "Pengenalan Excel",
    description: "Pelajari dasar-dasar Excel, interface, dan navigasi spreadsheet",
    lessons: 5,
    estimatedTime: "2 jam",
    difficulty: "Pemula",
    topics: ["Interface Excel", "Navigasi Sel", "Input Data", "Save & Open"],
  },
  {
    id: 2,
    title: "Formula Dasar",
    description: "Menguasai formula matematika dasar dan referensi sel",
    lessons: 6,
    estimatedTime: "3 jam",
    difficulty: "Pemula",
    topics: ["SUM", "AVERAGE", "COUNT", "MIN/MAX", "Referensi Sel"],
    prerequisites: [1],
  },
  {
    id: 3,
    title: "Fungsi Logika",
    description: "Pelajari fungsi IF, AND, OR untuk logika kondisional",
    lessons: 7,
    estimatedTime: "4 jam",
    difficulty: "Menengah",
    topics: ["IF", "AND", "OR", "NOT", "Nested IF", "IFS"],
    prerequisites: [1, 2],
  },
  {
    id: 4,
    title: "Fungsi Teks",
    description: "Manipulasi dan pengolahan data teks dengan berbagai fungsi",
    lessons: 6,
    estimatedTime: "3 jam",
    difficulty: "Menengah",
    topics: ["CONCATENATE", "LEFT/RIGHT/MID", "UPPER/LOWER", "TRIM", "FIND"],
    prerequisites: [1, 2],
  },
  {
    id: 5,
    title: "Fungsi Tanggal & Waktu",
    description: "Bekerja dengan data tanggal dan waktu secara efektif",
    lessons: 5,
    estimatedTime: "2.5 jam",
    difficulty: "Menengah",
    topics: ["TODAY", "NOW", "DATE", "DATEDIF", "WEEKDAY"],
    prerequisites: [1, 2],
  },
  {
    id: 6,
    title: "VLOOKUP & HLOOKUP",
    description: "Pencarian data dengan fungsi lookup yang powerful",
    lessons: 8,
    estimatedTime: "5 jam",
    difficulty: "Lanjutan",
    topics: ["VLOOKUP", "HLOOKUP", "INDEX", "MATCH", "XLOOKUP"],
    prerequisites: [1, 2, 3],
  },
  {
    id: 7,
    title: "Pivot Table",
    description: "Analisis data dengan Pivot Table untuk insight mendalam",
    lessons: 6,
    estimatedTime: "4 jam",
    difficulty: "Lanjutan",
    topics: ["Membuat Pivot", "Grouping", "Calculated Fields", "Slicers"],
    prerequisites: [1, 2, 6],
  },
  {
    id: 8,
    title: "Grafik & Visualisasi",
    description: "Membuat grafik dan visualisasi data yang menarik",
    lessons: 5,
    estimatedTime: "3 jam",
    difficulty: "Menengah",
    topics: ["Chart Types", "Formatting", "Sparklines", "Conditional Formatting"],
    prerequisites: [1, 2],
  },
  {
    id: 9,
    title: "Macro & Automation",
    description: "Otomatisasi tugas dengan Macro dan VBA dasar",
    lessons: 7,
    estimatedTime: "6 jam",
    difficulty: "Lanjutan",
    topics: ["Record Macro", "Edit Macro", "VBA Basics", "Automation"],
    prerequisites: [1, 2, 3, 6],
  },
  {
    id: 10,
    title: "Studi Kasus Bisnis",
    description: "Aplikasi Excel dalam skenario bisnis nyata",
    lessons: 8,
    estimatedTime: "8 jam",
    difficulty: "Lanjutan",
    topics: ["Financial Model", "Dashboard", "Reporting", "Data Analysis"],
    prerequisites: [1, 2, 3, 6, 7],
  },
]

/**
 * Komponen untuk menampilkan daftar chapter pembelajaran
 */
export function ChapterList() {
  const { completedChapters, currentChapter } = useProgressStore()

  /**
   * Menentukan status chapter berdasarkan progress pengguna
   * @param chapter - Data chapter
   * @returns Status chapter (locked, available, completed)
   */
  const getChapterStatus = (chapter: Chapter): ChapterStatus => {
    // Chapter sudah selesai
    if (completedChapters.includes(chapter.id)) {
      return 'completed'
    }

    // Chapter pertama selalu tersedia
    if (chapter.id === 1) {
      return 'available'
    }

    // Cek prerequisites
    if (chapter.prerequisites) {
      const allPrerequisitesMet = chapter.prerequisites.every(prereqId => 
        completedChapters.includes(prereqId)
      )
      return allPrerequisitesMet ? 'available' : 'locked'
    }

    // Jika tidak ada prerequisites, cek apakah chapter sebelumnya selesai
    return completedChapters.includes(chapter.id - 1) ? 'available' : 'locked'
  }

  /**
   * Mendapatkan icon berdasarkan status chapter
   */
  const getStatusIcon = (status: ChapterStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case 'available':
        return <PlayIcon className="h-5 w-5 text-blue-600" />
      case 'locked':
        return <LockIcon className="h-5 w-5 text-muted-foreground" />
    }
  }

  /**
   * Mendapatkan warna badge berdasarkan tingkat kesulitan
   */
  const getDifficultyColor = (difficulty: Chapter['difficulty']) => {
    switch (difficulty) {
      case 'Pemula':
        return 'bg-green-100 text-green-800'
      case 'Menengah':
        return 'bg-yellow-100 text-yellow-800'
      case 'Lanjutan':
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="space-y-6 container">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Belajar Excel</h1>
        <p className="text-muted-foreground">
          Kuasai Excel dari dasar hingga mahir dengan pembelajaran terstruktur dan hands-on practice.
        </p>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TargetIcon className="h-5 w-5" />
            Progress Keseluruhan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {completedChapters.length} dari {chapters.length} chapter selesai
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round((completedChapters.length / chapters.length) * 100)}%
              </span>
            </div>
            <Progress 
              value={(completedChapters.length / chapters.length) * 100} 
              className="h-2" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Chapter Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => {
          const status = getChapterStatus(chapter)
          const isLocked = status === 'locked'
          const isCompleted = status === 'completed'
          const isCurrent = chapter.id === currentChapter

          return (
            <Card 
              key={chapter.id} 
              className={cn(
                "transition-all duration-200 hover:shadow-md",
                isLocked && "opacity-60",
                isCurrent && "ring-2 ring-primary",
                isCompleted && "bg-green-50 border-green-200"
              )}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <CardTitle className="text-lg">
                        Chapter {chapter.id}
                      </CardTitle>
                    </div>
                    <h3 className="font-semibold">{chapter.title}</h3>
                  </div>
                  
                  <Badge 
                    variant="secondary" 
                    className={getDifficultyColor(chapter.difficulty)}
                  >
                    {chapter.difficulty}
                  </Badge>
                </div>
                
                <CardDescription className="text-sm">
                  {chapter.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Chapter Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{chapter.lessons} pelajaran</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{chapter.estimatedTime}</span>
                  </div>
                </div>

                {/* Topics */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Topik yang dipelajari:</h4>
                  <div className="flex flex-wrap gap-1">
                    {chapter.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {chapter.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{chapter.topics.length - 3} lagi
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Prerequisites */}
                {chapter.prerequisites && chapter.prerequisites.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Prasyarat:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {chapter.prerequisites.map((prereqId) => {
                        const isPrereqCompleted = completedChapters.includes(prereqId)
                        return (
                          <Badge 
                            key={prereqId} 
                            variant={isPrereqCompleted ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {isPrereqCompleted && <CheckCircleIcon className="mr-1 h-3 w-3" />}
                            Chapter {prereqId}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-2">
                  {isLocked ? (
                    <Button disabled className="w-full">
                      <LockIcon className="mr-2 h-4 w-4" />
                      Terkunci
                    </Button>
                  ) : (
                    <Button asChild className="w-full" variant={isCompleted ? "outline" : "default"}>
                      <Link href={`/learn/${chapter.id}`}>
                        {isCompleted ? (
                          <>
                            <CheckCircleIcon className="mr-2 h-4 w-4" />
                            Ulangi
                          </>
                        ) : (
                          <>
                            <PlayIcon className="mr-2 h-4 w-4" />
                            {isCurrent ? 'Lanjutkan' : 'Mulai'}
                          </>
                        )}
                        <ChevronRightIcon className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Learning Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <StarIcon className="h-5 w-5" />
            Tips Belajar Efektif
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <ul className="space-y-2 text-sm">
            <li>• Pelajari chapter secara berurutan untuk pemahaman yang optimal</li>
            <li>• Praktikkan setiap formula di playground setelah mempelajarinya</li>
            <li>• Ulangi chapter yang sudah selesai untuk memperkuat ingatan</li>
            <li>• Jangan ragu untuk bertanya di forum komunitas jika ada kesulitan</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}