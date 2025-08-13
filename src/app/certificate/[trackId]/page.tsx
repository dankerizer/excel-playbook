import { MainLayout } from "@/components/layout/main-layout"
import { CertificatePage as CertificatePageComponent } from "@/components/features/certificate-page"
import type { Metadata } from "next"

interface CertificatePageProps {
  params: {
    trackId: string
  }
}

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  const { trackId } = params
  
  const trackTitles: Record<string, string> = {
    'dasar': 'Excel Dasar',
    'menengah': 'Excel Menengah', 
    'perkantoran': 'Excel Perkantoran'
  }
  
  const title = trackTitles[trackId] || 'Learning Track'
  
  return {
    title: `Sertifikat ${title} - ExcelMaster`,
    description: `Unduh sertifikat penyelesaian ${title} Anda.`,
  }
}

/**
 * Halaman sertifikat untuk track tertentu
 * Menampilkan sertifikat penyelesaian track dengan detail lengkap
 */
export default function CertificatePage({ params }: CertificatePageProps) {
  const { trackId } = params
  
  return (
    <MainLayout showSidebar={false}>
      <CertificatePageComponent trackId={trackId} />
    </MainLayout>
  )
}