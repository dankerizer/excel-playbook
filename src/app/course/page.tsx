import type { Metadata } from 'next'
import { MainLayout } from '@/components/layout/main-layout'
import { CourseLandingPage } from '@/components/features/course-landing-page'

export const metadata: Metadata = {
  title: 'Course - ExcelMaster',
  description: 'Jelajahi berbagai course Excel yang tersedia di ExcelMaster untuk meningkatkan skill Anda.',
}

/**
 * Halaman landing course
 * Menampilkan daftar course yang tersedia
 */
export default function CoursePage() {
  return (
    <MainLayout showSidebar={false} showHeader={true} showFooter={true} padded={true}>
      <CourseLandingPage />
    </MainLayout>
  )
}