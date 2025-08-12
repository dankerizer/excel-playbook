import { MainLayout } from "@/components/layout/main-layout"
import { ChapterList } from "@/components/features/chapter-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Belajar Excel - ExcelMaster",
  description: "Pelajari Excel dari dasar hingga mahir dengan pembelajaran terstruktur dan hands-on practice.",
}

/**
 * Halaman utama pembelajaran yang menampilkan daftar chapter
 * Pengguna dapat melihat progress dan memilih chapter untuk dipelajari
 */
export default function LearnPage() {
  return (
    <MainLayout>
      <ChapterList />
    </MainLayout>
  )
}