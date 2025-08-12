"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Trophy, 
  Clock, 
  Target, 
  Star,
  CheckCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Users,
  ArrowLeft,
  BookOpen,
  Zap,
  TrendingUp
} from "lucide-react"
import { SpreadsheetSimulator } from "./spreadsheet-simulator"
import { ErrorHelper } from "./error-helper"
import { FormulaBuilder } from "./formula-builder"
import Link from "next/link"

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: 'basic' | 'formulas' | 'data-analysis' | 'charts' | 'pivot-tables' | 'macros'
  points: number
  timeLimit: number // in minutes
  participants: number
  completionRate: number
  tags: string[]
  isCompleted: boolean
  bestScore?: number
  objectives: string[]
  hints: string[]
  createdAt: string
  featured?: boolean
  instructions: string[]
  initialData: (string | number)[][]
  expectedResult: (string | number)[][]
  validationRules: {
    type: 'formula' | 'value' | 'format'
    cell: string
    expected: string | number
    description: string
  }[]
  tips: string[]
  relatedConcepts: string[]
}

interface ChallengeWorkspaceProps {
  challenge: Challenge
}

/**
 * Mendapatkan warna badge berdasarkan tingkat kesulitan
 */
function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

/**
 * Mendapatkan label tingkat kesulitan dalam bahasa Indonesia
 */
function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'beginner': return 'Pemula'
    case 'intermediate': return 'Menengah'
    case 'advanced': return 'Lanjutan'
    default: return 'Tidak Diketahui'
  }
}

/**
 * Mendapatkan label kategori dalam bahasa Indonesia
 */
function getCategoryLabel(category: string): string {
  switch (category) {
    case 'basic': return 'Dasar'
    case 'formulas': return 'Formula'
    case 'data-analysis': return 'Analisis Data'
    case 'charts': return 'Grafik'
    case 'pivot-tables': return 'Pivot Table'
    case 'macros': return 'Makro'
    default: return 'Lainnya'
  }
}

/**
 * Komponen workspace untuk challenge yang memerlukan interaktivitas
 * Dipisah dari server component untuk mengatasi masalah 'use client'
 */
export function ChallengeWorkspace({ challenge }: ChallengeWorkspaceProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/challenges">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Challenges
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <Badge className={getDifficultyColor(challenge.difficulty)}>
                {getDifficultyLabel(challenge.difficulty)}
              </Badge>
              <Badge variant="outline">
                {getCategoryLabel(challenge.category)}
              </Badge>
              {challenge.featured && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {challenge.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {challenge.description}
              </p>
              
              {/* Challenge Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Poin</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{challenge.points}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Waktu</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{challenge.timeLimit} min</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Peserta</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{challenge.participants.toLocaleString()}</p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tingkat Selesai</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{challenge.completionRate}%</p>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {challenge.isCompleted ? (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Selesai</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Target className="w-5 h-5" />
                        <span className="font-medium">Belum Selesai</span>
                      </div>
                    )}
                    
                    {challenge.bestScore && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Skor Terbaik</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{challenge.bestScore}%</p>
                      </div>
                    )}
                    
                    <Button className="w-full" size="lg">
                      <Play className="w-4 h-4 mr-2" />
                      {challenge.isCompleted ? 'Coba Lagi' : 'Mulai Challenge'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Panel - Instructions & Objectives */}
          <div className="xl:col-span-1 space-y-6">
            {/* Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Tujuan Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {challenge.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{index + 1}</span>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  Langkah-langkah
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {challenge.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">{index + 1}</span>
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
            
            {/* Hints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Petunjuk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {challenge.hints.map((hint, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{hint}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Center Panel - Spreadsheet Simulator */}
          <div className="xl:col-span-2">
            <SpreadsheetSimulator 
              chapterId={0} 
              lessonId={0}
              onFormulaComplete={(formula, result) => {
                console.log('Formula completed:', formula, result)
                // Handle formula completion for challenge validation
              }}
            />
          </div>
          
          {/* Right Panel - Tools & Help */}
          <div className="xl:col-span-1 space-y-6">
            {/* Validation Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  Kriteria Penilaian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {challenge.validationRules.map((rule, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {rule.cell}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {rule.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                        {rule.description}
                      </p>
                      <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
                        Expected: {rule.expected}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Helper Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Alat Bantu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <FormulaBuilder />
                <Separator />
                <ErrorHelper />
              </CardContent>
            </Card>
            
            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips & Trik</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {challenge.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Related Concepts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Konsep Terkait</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {challenge.relatedConcepts.map((concept, index) => (
                    <div key={index} className="p-2 bg-blue-50 dark:bg-blue-950 rounded text-sm text-blue-700 dark:text-blue-300">
                      {concept}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}