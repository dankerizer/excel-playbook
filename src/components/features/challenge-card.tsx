"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Trophy, 
  Clock, 
  Target, 
  Star,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Award
} from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  timeLimit: number // in minutes
  points: number
  category: string
  objectives: string[]
  hints: string[]
  solution?: string
  isCompleted?: boolean
  bestScore?: number
  attempts?: number
  completionRate?: number
}

interface ChallengeCardProps {
  challenge: Challenge
  onStart?: (challengeId: string) => void
  onComplete?: (challengeId: string, score: number) => void
  onReset?: (challengeId: string) => void
  className?: string
}

/**
 * Mendapatkan warna berdasarkan tingkat kesulitan
 */
function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
  }
}

/**
 * Mendapatkan icon berdasarkan tingkat kesulitan
 */
function getDifficultyIcon(difficulty: string) {
  switch (difficulty) {
    case 'beginner': return <Target className="w-4 h-4" />
    case 'intermediate': return <Star className="w-4 h-4" />
    case 'advanced': return <Trophy className="w-4 h-4" />
    default: return <Target className="w-4 h-4" />
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
    default: return 'Pemula'
  }
}

/**
 * Komponen ChallengeCard untuk menampilkan tantangan interaktif
 * Menampilkan informasi tantangan, tingkat kesulitan, poin, dan status penyelesaian
 */
export function ChallengeCard({ 
  challenge, 
  onStart, 
  onComplete, 
  onReset, 
  className 
}: ChallengeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  
  /**
   * Handler untuk memulai tantangan
   */
  const handleStart = () => {
    onStart?.(challenge.id)
  }
  
  /**
   * Handler untuk reset tantangan
   */
  const handleReset = () => {
    onReset?.(challenge.id)
    setShowHints(false)
    setCurrentHint(0)
  }
  
  /**
   * Handler untuk menampilkan hint berikutnya
   */
  const handleNextHint = () => {
    if (currentHint < challenge.hints.length - 1) {
      setCurrentHint(currentHint + 1)
    }
  }
  
  /**
   * Menghitung progress berdasarkan skor terbaik
   */
  const getProgressPercentage = (): number => {
    if (!challenge.bestScore) return 0
    return Math.min((challenge.bestScore / challenge.points) * 100, 100)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className={`hover:shadow-lg transition-all duration-300 ${
        challenge.isCompleted 
          ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950' 
          : 'hover:border-blue-200 dark:hover:border-blue-800'
      }`}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                {challenge.isCompleted && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {getDifficultyIcon(challenge.difficulty)}
                  <span className="ml-1">{getDifficultyLabel(challenge.difficulty)}</span>
                </Badge>
                
                <Badge variant="outline" className="text-xs">
                  {challenge.category}
                </Badge>
                
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{challenge.timeLimit} menit</span>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-yellow-600">
                  <Star className="w-4 h-4" />
                  <span>{challenge.points} poin</span>
                </div>
              </div>
              
              <CardDescription className="text-sm">
                {challenge.description}
              </CardDescription>
            </div>
          </div>
          
          {/* Progress Bar untuk tantangan yang sudah diselesaikan */}
          {challenge.isCompleted && challenge.bestScore && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Skor Terbaik</span>
                <span className="font-medium">
                  {challenge.bestScore}/{challenge.points} ({Math.round(getProgressPercentage())}%)
                </span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Objectives */}
          <div>
            <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
              Tujuan Pembelajaran:
            </h4>
            <ul className="space-y-1">
              {challenge.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Hints Section */}
          {showHints && challenge.hints.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-sm text-blue-800 dark:text-blue-200">
                  Petunjuk {currentHint + 1}/{challenge.hints.length}
                </span>
              </div>
              
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                {challenge.hints[currentHint]}
              </p>
              
              {currentHint < challenge.hints.length - 1 && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleNextHint}
                  className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900"
                >
                  Petunjuk Berikutnya
                </Button>
              )}
            </motion.div>
          )}
          
          {/* Statistics untuk tantangan yang sudah dicoba */}
          {challenge.attempts && challenge.attempts > 0 && (
            <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {challenge.attempts}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Percobaan</p>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {challenge.bestScore || 0}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Skor Terbaik</p>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            {!challenge.isCompleted ? (
              <Button onClick={handleStart} className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Mulai Tantangan
              </Button>
            ) : (
              <Button onClick={handleStart} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Coba Lagi
              </Button>
            )}
            
            {!showHints && challenge.hints.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowHints(true)}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Petunjuk
              </Button>
            )}
            
            {challenge.attempts && challenge.attempts > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleReset}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Achievement Badge untuk tantangan yang diselesaikan dengan sempurna */}
          {challenge.isCompleted && challenge.bestScore === challenge.points && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800"
            >
              <Award className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Skor Sempurna! 🎉
              </span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}