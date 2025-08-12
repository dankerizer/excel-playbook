"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Clock, 
  Target, 
  Lightbulb, 
  CheckCircle,
  Play,
  ArrowRight,
  Star
} from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface LessonContentProps {
  chapterId: number
  lessonId: number
}

interface LessonStep {
  id: string
  title: string
  description: string
  type: 'explanation' | 'demo' | 'practice' | 'quiz'
  content: string
  hints?: string[]
  solution?: string
}

interface LessonData {
  id: number
  title: string
  description: string
  estimatedTime: number
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan'
  objectives: string[]
  steps: LessonStep[]
  summary: string
  nextSteps: string
}

/**
 * Data lesson berdasarkan chapter dan lesson ID
 * Dalam implementasi nyata, ini akan diambil dari API atau database
 */
function getLessonData(chapterId: number, lessonId: number): LessonData {
  // Mock data untuk demo
  const lessons: Record<string, LessonData> = {
    "1-1": {
      id: 1,
      title: "Mengenal Interface Excel",
      description: "Pelajari bagian-bagian utama Excel dan cara navigasi dasar",
      estimatedTime: 15,
      difficulty: "Pemula",
      objectives: [
        "Memahami ribbon dan tab utama Excel",
        "Mengenal area kerja spreadsheet",
        "Belajar navigasi sel dan range",
        "Memahami formula bar dan name box"
      ],
      steps: [
        {
          id: "step-1",
          title: "Ribbon dan Tab Utama",
          type: "explanation",
          description: "Excel memiliki ribbon di bagian atas dengan berbagai tab",
          content: "Ribbon adalah area di bagian atas Excel yang berisi semua tools dan commands. Tab utama meliputi Home, Insert, Page Layout, Formulas, Data, Review, dan View. Setiap tab memiliki grup commands yang terkait.",
          hints: ["Klik setiap tab untuk melihat commands yang tersedia"]
        },
        {
          id: "step-2",
          title: "Area Kerja Spreadsheet",
          type: "demo",
          description: "Spreadsheet terdiri dari kolom (A, B, C...) dan baris (1, 2, 3...)",
          content: "Setiap pertemuan kolom dan baris membentuk sel. Sel aktif ditandai dengan border tebal. Anda bisa mengklik sel atau menggunakan keyboard arrow untuk berpindah.",
          hints: ["Coba klik sel A1, lalu tekan arrow keys untuk berpindah"]
        },
        {
          id: "step-3",
          title: "Formula Bar dan Name Box",
          type: "practice",
          description: "Formula bar menampilkan isi sel, Name box menampilkan alamat sel",
          content: "Formula bar berada di atas spreadsheet dan menampilkan konten sel yang aktif. Name box di sebelah kiri formula bar menampilkan alamat sel atau nama range yang dipilih.",
          hints: ["Klik sel berbeda dan perhatikan perubahan di Name box"]
        }
      ],
      summary: "Anda telah mempelajari komponen utama interface Excel: ribbon dengan tab-tabnya, area spreadsheet dengan kolom dan baris, serta formula bar dan name box untuk navigasi.",
      nextSteps: "Selanjutnya kita akan belajar cara input data dan format dasar di Excel."
    },
    "2-1": {
      id: 1,
      title: "Fungsi SUM Dasar",
      description: "Pelajari cara menggunakan fungsi SUM untuk menjumlahkan data",
      estimatedTime: 20,
      difficulty: "Pemula",
      objectives: [
        "Memahami sintaks fungsi SUM",
        "Menggunakan SUM dengan range sel",
        "Menerapkan SUM pada data nyata",
        "Memahami error umum pada SUM"
      ],
      steps: [
        {
          id: "step-1",
          title: "Sintaks Fungsi SUM",
          type: "explanation",
          description: "SUM adalah fungsi untuk menjumlahkan angka dalam range sel",
          content: "Sintaks: =SUM(range). Contoh: =SUM(A1:A10) akan menjumlahkan semua nilai dari sel A1 sampai A10. Anda juga bisa menggunakan =SUM(A1,B1,C1) untuk sel individual.",
          hints: ["Selalu mulai formula dengan tanda sama dengan (=)"]
        },
        {
          id: "step-2",
          title: "Menggunakan Range",
          type: "demo",
          description: "Range adalah kumpulan sel yang berurutan",
          content: "Range ditulis dengan format StartCell:EndCell. Contoh A1:A5 berarti sel A1, A2, A3, A4, A5. Untuk range persegi panjang gunakan A1:C3.",
          hints: ["Gunakan titik dua (:) untuk menandakan range"]
        },
        {
          id: "step-3",
          title: "Praktik SUM",
          type: "practice",
          description: "Coba gunakan SUM pada data penjualan",
          content: "Pada simulator, Anda akan melihat data penjualan di kolom B. Gunakan fungsi SUM untuk menghitung total penjualan.",
          hints: ["Ketik =SUM(B2:B6) di sel B7"],
          solution: "=SUM(B2:B6)"
        }
      ],
      summary: "Anda telah mempelajari fungsi SUM untuk menjumlahkan data. SUM adalah fungsi paling dasar dan sering digunakan dalam Excel.",
      nextSteps: "Selanjutnya kita akan belajar fungsi AVERAGE untuk menghitung rata-rata."
    }
  }
  
  const key = `${chapterId}-${lessonId}`
  return lessons[key] || lessons["1-1"] // fallback ke lesson pertama
}

/**
 * Komponen untuk menampilkan konten pembelajaran lesson
 * Menampilkan objectives, steps, dan progress tracking
 */
export function LessonContent({ chapterId, lessonId }: LessonContentProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  
  const lesson = getLessonData(chapterId, lessonId)
  const progress = (completedSteps.length / lesson.steps.length) * 100
  
  /**
   * Menandai step sebagai selesai
   */
  const completeStep = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }
  
  /**
   * Pindah ke step berikutnya
   */
  const nextStep = () => {
    if (currentStep < lesson.steps.length - 1) {
      completeStep(lesson.steps[currentStep].id)
      setCurrentStep(currentStep + 1)
    }
  }
  
  /**
   * Pindah ke step sebelumnya
   */
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const currentStepData = lesson.steps[currentStep]
  
  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-xs">
                Chapter {chapterId} - Lesson {lessonId}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{lesson.estimatedTime} menit</span>
              </div>
            </div>
            
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {lesson.title}
            </CardTitle>
            
            <CardDescription className="text-lg">
              {lesson.description}
            </CardDescription>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progress
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {completedSteps.length}/{lesson.steps.length} steps
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
        </Card>
      </motion.div>
      
      {/* Learning Objectives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="w-5 h-5 text-blue-600" />
              Tujuan Pembelajaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lesson.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Current Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {currentStepData.type === 'explanation' && <BookOpen className="w-5 h-5 text-blue-600" />}
                {currentStepData.type === 'demo' && <Play className="w-5 h-5 text-green-600" />}
                {currentStepData.type === 'practice' && <Target className="w-5 h-5 text-orange-600" />}
                {currentStepData.type === 'quiz' && <Star className="w-5 h-5 text-purple-600" />}
                Step {currentStep + 1}: {currentStepData.title}
              </CardTitle>
              
              <Badge 
                variant={completedSteps.includes(currentStepData.id) ? "default" : "outline"}
                className="text-xs"
              >
                {completedSteps.includes(currentStepData.id) ? "Selesai" : "Belum Selesai"}
              </Badge>
            </div>
            
            <CardDescription>
              {currentStepData.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Step Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p>{currentStepData.content}</p>
            </div>
            
            {/* Hints */}
            {currentStepData.hints && currentStepData.hints.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800 dark:text-blue-200">Petunjuk:</span>
                </div>
                <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                  {currentStepData.hints.map((hint, index) => (
                    <li key={index}>• {hint}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Solution (for practice steps) */}
            {currentStepData.solution && completedSteps.includes(currentStepData.id) && (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800 dark:text-green-200">Solusi:</span>
                </div>
                <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {currentStepData.solution}
                </code>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Step Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Sebelumnya
        </Button>
        
        <div className="flex items-center gap-2">
          {lesson.steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep 
                  ? 'bg-blue-600' 
                  : completedSteps.includes(lesson.steps[index].id)
                  ? 'bg-green-600'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        <Button 
          onClick={nextStep}
          disabled={currentStep === lesson.steps.length - 1}
        >
          Selanjutnya
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
      
      {/* Lesson Summary (shown when all steps completed) */}
      {completedSteps.length === lesson.steps.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <CheckCircle className="w-5 h-5" />
                Lesson Selesai!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Ringkasan:</h4>
                <p className="text-green-700 dark:text-green-300">{lesson.summary}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Langkah Selanjutnya:</h4>
                <p className="text-green-700 dark:text-green-300">{lesson.nextSteps}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}