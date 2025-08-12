import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { CourseDetailPage } from '@/components/features/course-detail-page'

// Data mock untuk course (dalam implementasi nyata, ini akan diambil dari database)
const mockCourses = {
  'excel-dasar-pemula': {
    id: 'excel-dasar-pemula',
    title: 'Excel Dasar untuk Pemula',
    description: 'Pelajari dasar-dasar Excel dari nol hingga mahir menggunakan formula dan fungsi dasar.',
    instructor: 'Budi Santoso',
    duration: '8 jam',
    level: 'Pemula' as const,
    rating: 4.8,
    students: 1250,
    price: 0,
    originalPrice: undefined,
    category: 'Excel Dasar',
    lessons: 24,
    challenges: 12,
    isPopular: true,
    isFree: true,
    progress: 65
  },
  'excel-formula-lanjutan': {
    id: 'excel-formula-lanjutan',
    title: 'Master Excel Formula & Fungsi',
    description: 'Kuasai formula Excel tingkat lanjut seperti VLOOKUP, INDEX MATCH, dan array formula.',
    instructor: 'Sari Wijaya',
    duration: '12 jam',
    level: 'Menengah' as const,
    rating: 4.9,
    students: 890,
    price: 299000,
    originalPrice: 499000,
    category: 'Formula & Fungsi',
    lessons: 36,
    challenges: 24,
    isPopular: true
  },
  'excel-data-analysis': {
    id: 'excel-data-analysis',
    title: 'Analisis Data dengan Excel',
    description: 'Belajar menganalisis data menggunakan PivotTable, Chart, dan fitur analisis Excel.',
    instructor: 'Ahmad Rahman',
    duration: '10 jam',
    level: 'Menengah' as const,
    rating: 4.7,
    students: 654,
    price: 399000,
    originalPrice: 599000,
    category: 'Analisis Data',
    lessons: 28,
    challenges: 18
  }
}

type CourseSlug = keyof typeof mockCourses

interface CoursePageProps {
  params: {
    slug: string
  }
}

/**
 * Generate metadata untuk halaman course
 */
export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = mockCourses[params.slug as CourseSlug]
  
  if (!course) {
    return {
      title: 'Course Tidak Ditemukan - ExcelMaster',
      description: 'Course yang Anda cari tidak ditemukan.'
    }
  }

  return {
    title: `${course.title} - ExcelMaster`,
    description: course.description,
  }
}

/**
 * Generate static params untuk pre-rendering
 */
export async function generateStaticParams() {
  return Object.keys(mockCourses).map((slug) => ({
    slug,
  }))
}

/**
 * Halaman detail course
 * Menampilkan informasi lengkap course dan curriculum
 */
export default function CourseDetailPageRoute({ params }: CoursePageProps) {
  const course = mockCourses[params.slug as CourseSlug]
  
  if (!course) {
    notFound()
  }

  return (
    <MainLayout showSidebar={false} showHeader={true} showFooter={true} padded={true}>
      <CourseDetailPage course={course} />
    </MainLayout>
  )
}