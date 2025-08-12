import { MainLayout } from "@/components/layout/main-layout"
import { DashboardOverview } from "@/components/features/dashboard-overview"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - ExcelMaster",
  description: "Pantau progress belajar Excel Anda dan lihat pencapaian terbaru.",
}

/**
 * Halaman dashboard utama yang menampilkan overview progress pengguna
 * Menampilkan statistik belajar, progress chapter, dan pencapaian
 */
export default function DashboardPage() {
  return (
    <MainLayout>
      <DashboardOverview />
    </MainLayout>
  )
}