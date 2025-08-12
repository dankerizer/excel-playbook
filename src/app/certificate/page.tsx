import { MainLayout } from "@/components/layout/main-layout"
import { CertificatePage as CertificatePageComponent } from "@/components/features/certificate-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sertifikat Penyelesaian - ExcelMaster",
  description: "Unduh sertifikat penyelesaian kursus Excel dan Google Spreadsheet Anda.",
}

/**
 * Halaman sertifikat yang menampilkan sertifikat penyelesaian kursus
 * Memungkinkan pengguna untuk mengunduh sertifikat dalam format PDF atau PNG
 */
export default function CertificatePage() {
  return (
    <MainLayout showSidebar={false}>
      <CertificatePageComponent />
    </MainLayout>
  )
}