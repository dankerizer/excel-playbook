import { MainLayout } from "@/components/layout/main-layout"
import { ArticleListPage } from "@/components/features/article-list-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Artikel Excel & Spreadsheet - ExcelMaster",
  description: "Pelajari tips, trik, dan tutorial mendalam tentang Excel dan Google Sheets untuk meningkatkan produktivitas Anda.",
}

/**
 * Halaman daftar artikel yang menampilkan semua artikel Excel dan Spreadsheet
 * Menampilkan artikel unggulan, kategori, dan fitur pencarian
 */
export default function ArtikelPage() {
  return (
    <MainLayout>
      <ArticleListPage />
    </MainLayout>
  )
}