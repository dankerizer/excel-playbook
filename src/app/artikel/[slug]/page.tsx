import { MainLayout } from "@/components/layout/main-layout"
import { ArticleDetailPage } from "@/components/features/article-detail-page"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

// Data mock artikel (dalam implementasi nyata, ini akan diambil dari API)
const mockArticles = [
  {
    id: "menguasai-vlookup-lengkap",
    title: "Menguasai VLOOKUP: Panduan Lengkap untuk Pemula",
    description: "Pelajari cara menggunakan fungsi VLOOKUP dengan mudah. Dari dasar hingga tips advanced untuk meningkatkan produktivitas Excel Anda.",
    author: "Tim ExcelMaster",
    publishedAt: "2025-01-15",
    readTime: "8 menit baca",
    category: "Fungsi Dasar",
    tags: ["VLOOKUP", "Fungsi", "Pemula"],
  },
  {
    id: "10-formula-excel-wajib",
    title: "10 Formula Excel yang Wajib Dikuasai Profesional",
    description: "Kumpulan formula Excel paling penting yang sering digunakan di dunia kerja. Lengkap dengan contoh praktis dan penerapannya.",
    author: "Sarah Johnson",
    publishedAt: "2025-01-12",
    readTime: "12 menit baca",
    category: "Formula",
    tags: ["Formula", "Profesional", "Tips"],
  },
  {
    id: "pivot-table-excel-analisis-data",
    title: "Pivot Table Excel: Analisis Data Cepat dan Mudah",
    description: "Analisis data besar dengan menggunakan Pivot Table. Pelajari cara membuat laporan yang informatif dalam hitungan menit.",
    author: "Michael Chen",
    publishedAt: "2025-01-10",
    readTime: "15 menit baca",
    category: "Analisis Data",
    tags: ["Pivot Table", "Analisis", "Data"],
  },
  {
    id: "conditional-formatting-visual",
    title: "Conditional Formatting: Membuat Data Lebih Visual",
    description: "Buat spreadsheet Anda lebih menarik dan mudah dibaca dengan conditional formatting. Tutorial lengkap dengan berbagai contoh.",
    author: "Lisa Wong",
    publishedAt: "2025-01-08",
    readTime: "10 menit baca",
    category: "Tips & Trik",
    tags: ["Formatting", "Visual", "Design"],
  },
  {
    id: "index-match-vs-vlookup",
    title: "INDEX MATCH vs VLOOKUP: Mana yang Lebih Baik?",
    description: "Perbandingan mendalam antara INDEX MATCH dan VLOOKUP. Kapan menggunakan yang mana dan mengapa INDEX MATCH lebih fleksibel.",
    author: "David Kim",
    publishedAt: "2025-01-05",
    readTime: "7 menit baca",
    category: "Fungsi Dasar",
    tags: ["INDEX", "MATCH", "VLOOKUP"],
  },
]

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate metadata untuk halaman artikel
 */
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = mockArticles.find(a => a.id === slug)
  
  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan - ExcelMaster",
      description: "Artikel yang Anda cari tidak ditemukan.",
    }
  }

  return {
    title: `${article.title} - ExcelMaster`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
  }
}

/**
 * Generate static params untuk artikel yang tersedia
 */
export function generateStaticParams() {
  return mockArticles.map((article) => ({
    slug: article.id,
  }))
}

/**
 * Halaman detail artikel individual
 * Menampilkan konten artikel lengkap dengan navigasi dan related articles
 */
export default async function ArtikelDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = mockArticles.find(a => a.id === slug)
  
  if (!article) {
    notFound()
  }

  return (
    <MainLayout>
      <ArticleDetailPage article={article} />
    </MainLayout>
  )
}