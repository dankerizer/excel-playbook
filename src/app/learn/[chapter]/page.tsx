import { MainLayout } from "@/components/layout/main-layout"
import { LessonList } from "@/components/features"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface ChapterPageProps {
  params: {
    chapter: string
  }
}

/**
 * Generate metadata untuk halaman chapter
 */
export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const chapterNum = parseInt(resolvedParams.chapter)
  
  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 10) {
    return {
      title: "Chapter Tidak Ditemukan - ExcelMaster",
      description: "Chapter yang Anda cari tidak ditemukan."
    }
  }
  
  return {
    title: `Chapter ${chapterNum} - ExcelMaster`,
    description: `Pelajari Excel Chapter ${chapterNum} dengan berbagai lesson interaktif dan hands-on practice.`,
  }
}

/**
 * Halaman chapter yang menampilkan daftar lesson dalam chapter tersebut
 * Pengguna dapat melihat progress lesson dan memilih lesson untuk dipelajari
 */
export default async function ChapterPage({ params }: ChapterPageProps) {
  const resolvedParams = await params
  const chapterNum = parseInt(resolvedParams.chapter)
  
  // Validasi parameter chapter
  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 10) {
    notFound()
  }

  return (
    <MainLayout>
      <LessonList chapterId={chapterNum} />
    </MainLayout>
  )
}