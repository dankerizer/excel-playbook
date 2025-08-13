import { MainLayout } from "@/components/layout/main-layout"
import { TrackSelectionPage } from "@/components/features/track-selection-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pilih Learning Track - ExcelMaster",
  description: "Pilih jalur pembelajaran Excel yang sesuai dengan level dan kebutuhan Anda.",
}

/**
 * Halaman utama pembelajaran yang menampilkan daftar learning track
 * Pengguna dapat memilih track pembelajaran sesuai level mereka
 */
export default function LearnPage() {
  return (
    <MainLayout>
      <TrackSelectionPage />
    </MainLayout>
  )
}