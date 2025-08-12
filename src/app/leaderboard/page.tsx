import { MainLayout } from "@/components/layout/main-layout"
import { LeaderboardWorkspace } from "@/components/features/leaderboard-workspace"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Papan Peringkat - ExcelMaster",
  description: "Lihat ranking dan kompetisi dengan pengguna lain. Raih posisi teratas di leaderboard ExcelMaster!",
  keywords: ["leaderboard", "ranking", "kompetisi excel", "papan peringkat"]
}



/**
 * Halaman leaderboard untuk menampilkan ranking dan kompetisi
 */
export default function LeaderboardPage() {
  return (
    <MainLayout>
      <LeaderboardWorkspace />
    </MainLayout>
  )
}