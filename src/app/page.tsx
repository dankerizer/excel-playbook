import { MarketingLayout } from "@/components/layout/main-layout"
import { 
  LandingHero, 
  LandingFeatures, 
  LandingTestimonials, 
  LandingCTA 
} from "@/components/features"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ExcelMaster - Belajar Excel dari Nol hingga Mahir",
  description: "Platform pembelajaran Excel interaktif untuk pemula Indonesia. Kuasai Excel dengan hands-on learning dan gamifikasi yang menyenangkan.",
  keywords: ["excel", "belajar excel", "tutorial excel", "kursus excel", "excel indonesia", "spreadsheet"],
}

/**
 * Halaman landing/marketing utama ExcelMaster
 * Menampilkan hero section, fitur, testimonial, dan call-to-action
 */
export default function HomePage() {
  return (
    <MarketingLayout>
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingCTA />
    </MarketingLayout>
  )
}
