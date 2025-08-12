import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LearningLayout } from '@/components/layout/main-layout'
import { CourseChallengePage } from '@/components/features/course-challenge-page'

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
    category: 'Formula & Fungsi',
    lessons: 36,
    challenges: 24,
    isPopular: true
  }
}

type CourseSlug = keyof typeof mockCourses

interface CourseChallengePageProps {
  params: {
    slug: string
  }
}

/**
 * Generate metadata untuk halaman challenge course
 */
export async function generateMetadata({ params }: CourseChallengePageProps): Promise<Metadata> {
  const course = mockCourses[params.slug as CourseSlug]
  
  if (!course) {
    return {
      title: 'Course Tidak Ditemukan - ExcelMaster',
      description: 'Course yang Anda cari tidak ditemukan.'
    }
  }

  return {
    title: `Challenge ${course.title} - ExcelMaster`,
    description: `Uji kemampuan Anda dengan challenge ${course.title}`,
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
 * Halaman challenge course
 * Menampilkan daftar challenge dan latihan praktis
 */
export default function CourseChallengePageRoute({ params }: CourseChallengePageProps) {
  const course = mockCourses[params.slug as CourseSlug]
  
  if (!course) {
    notFound()
  }

  return (
    <LearningLayout>
      <CourseChallengePage course={course} />
    </LearningLayout>
  )
}