import { MainLayout } from "@/components/layout/main-layout"
import { TrackLearningPage } from "@/components/features/track-learning-page"
import type { Metadata } from "next"

interface TrackPageProps {
  params: {
    trackId: string
  }
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { trackId } = params
  
  const trackTitles: Record<string, string> = {
    'dasar': 'Excel Dasar',
    'menengah': 'Excel Menengah', 
    'perkantoran': 'Excel Perkantoran'
  }
  
  const title = trackTitles[trackId] || 'Learning Track'
  
  return {
    title: `${title} - ExcelMaster`,
    description: `Pelajari ${title} dengan pembelajaran terstruktur dan hands-on practice.`,
  }
}

/**
 * Halaman pembelajaran untuk track tertentu
 * Menampilkan daftar chapter dalam track dengan progres dan status
 */
export default function TrackPage({ params }: TrackPageProps) {
  const { trackId } = params
  
  return (
    <MainLayout>
      <TrackLearningPage trackId={trackId} />
    </MainLayout>
  )
}