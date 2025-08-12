import type { Metadata } from "next"
import { PlaygroundWorkspace } from "@/components/features/playground-workspace"

export const metadata: Metadata = {
  title: "Playground - ExcelMaster",
  description: "Latihan bebas Excel dengan simulator interaktif. Coba berbagai formula dan fungsi Excel.",
  keywords: ["excel playground", "latihan excel", "simulator excel", "practice excel"]
}

/**
 * Halaman playground untuk latihan bebas Excel
 * Menggunakan komponen PlaygroundWorkspace yang sudah dibuat
 */
export default function PlaygroundPage() {
  return <PlaygroundWorkspace />
}