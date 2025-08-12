import type { Metadata } from "next"
import { ChapterPageClient } from "./chapter-page-client"
import { MainLayout } from "@/components/layout/main-layout"

interface ChapterPageProps {
  params: Promise<{
    chapter: string
  }>
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
    description: `Pelajari ${chapterNum === 1 ? 'Fungsi Matematika Dasar' : chapterNum === 2 ? 'Fungsi Logika' : 'Fungsi Teks'} - ExcelMaster`
  }
}

/**
 * Server component untuk halaman chapter
 */
export default async function ChapterPage({ params }: ChapterPageProps) {
  const resolvedParams = await params
  
  return ( <MainLayout>
    <ChapterPageClient chapter={resolvedParams.chapter} />

  </MainLayout>
  )
}