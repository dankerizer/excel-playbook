import { LearningLayout } from "@/components/layout/main-layout"
import { LessonContent, SpreadsheetSimulator, LessonNavigation } from "@/components/features"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface LessonPageProps {
  params: {
    chapter: string
    lesson: string
  }
}

/**
 * Generate metadata untuk halaman lesson
 */
export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const chapterNum = parseInt(resolvedParams.chapter)
  const lessonNum = parseInt(resolvedParams.lesson)
  
  return {
    title: `Chapter ${chapterNum} - Lesson ${lessonNum} - ExcelMaster`,
    description: `Pelajari Excel step-by-step dengan hands-on practice dan simulator interaktif.`,
  }
}

/**
 * Halaman pembelajaran individual untuk setiap lesson
 * Menampilkan konten lesson, simulator spreadsheet, dan navigasi
 */
export default async function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = await params
  const chapterNum = parseInt(resolvedParams.chapter)
  const lessonNum = parseInt(resolvedParams.lesson)
  
  // Validasi parameter
  if (isNaN(chapterNum) || isNaN(lessonNum) || chapterNum < 1 || chapterNum > 10 || lessonNum < 1) {
    notFound()
  }

  return (
    <LearningLayout>
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Left Panel - Lesson Content */}
        <div className="lg:w-1/2 flex flex-col">
          <LessonContent 
            chapterId={chapterNum} 
            lessonId={lessonNum} 
          />
          
          {/* Navigation */}
          <div className="mt-auto pt-6">
            <LessonNavigation 
              chapterId={chapterNum}
              lessonId={lessonNum}
            />
          </div>
        </div>
        
        {/* Right Panel - Spreadsheet Simulator */}
        <div className="lg:w-1/2 flex flex-col">
          <SpreadsheetSimulator 
            chapterId={chapterNum}
            lessonId={lessonNum}
          />
        </div>
      </div>
    </LearningLayout>
  )
}