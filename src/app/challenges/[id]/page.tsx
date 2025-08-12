import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ChallengeWorkspace } from "@/components/features/challenge-workspace"

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  category: 'basic' | 'formulas' | 'data-analysis' | 'charts' | 'pivot-tables' | 'macros'
  points: number
  timeLimit: number // in minutes
  participants: number
  completionRate: number
  tags: string[]
  isCompleted: boolean
  bestScore?: number
  objectives: string[]
  hints: string[]
  createdAt: string
  featured?: boolean
  instructions: string[]
  initialData: (string | number)[][]
  expectedResult: (string | number)[][]
  validationRules: {
    type: 'formula' | 'value' | 'format'
    cell: string
    expected: string | number
    description: string
  }[]
  tips: string[]
  relatedConcepts: string[]
}

/**
 * Mock data untuk challenge detail
 * Dalam implementasi nyata, ini akan diambil dari API berdasarkan ID
 */
const mockChallengeData: Record<string, Challenge> = {
  "basic-sum-challenge": {
    id: "basic-sum-challenge",
    title: "Master Penjumlahan Dasar",
    description: "Kuasai fungsi SUM dengan berbagai skenario dan kondisi khusus",
    difficulty: "beginner",
    category: "basic",
    points: 100,
    timeLimit: 15,
    participants: 1247,
    completionRate: 87,
    tags: ["SUM", "dasar", "matematika"],
    isCompleted: true,
    bestScore: 95,
    objectives: [
      "Gunakan SUM untuk menjumlahkan range sel A1:A5",
      "Kombinasikan beberapa range dalam satu formula (A1:A5 + C1:C3)",
      "Handle sel kosong dan error dalam penjumlahan",
      "Buat formula SUM yang dinamis menggunakan referensi sel"
    ],
    hints: [
      "SUM akan mengabaikan sel kosong secara otomatis",
      "Gunakan koma untuk memisahkan multiple range: =SUM(A1:A5,C1:C3)",
      "Untuk range dinamis, gunakan referensi sel: =SUM(A1:A&B1)"
    ],
    createdAt: "2024-01-10",
    featured: true,
    instructions: [
      "Buka spreadsheet yang telah disediakan",
      "Di sel B6, buat formula untuk menjumlahkan semua nilai di kolom A (A1:A5)",
      "Di sel B7, buat formula untuk menjumlahkan A1:A3 dan C1:C2",
      "Di sel B8, buat formula SUM yang menggunakan referensi dari sel D1 untuk menentukan range",
      "Pastikan semua formula menangani sel kosong dengan benar"
    ],
    initialData: [
      ["Nilai", "Hasil", "Bonus", "Range"],
      [10, "", 5, 5],
      [20, "", 10, ""],
      [30, "", "", ""],
      ["", "", "", ""],
      [50, "", "", ""],
      ["", "=SUM(A1:A5)", "", ""],
      ["", "=SUM(A1:A3,C1:C2)", "", ""],
      ["", "=SUM(A1:A&D1)", "", ""]
    ],
    expectedResult: [
      ["Nilai", "Hasil", "Bonus", "Range"],
      [10, "", 5, 5],
      [20, "", 10, ""],
      [30, "", "", ""],
      ["", "", "", ""],
      [50, "", "", ""],
      ["", 110, "", ""],
      ["", 75, "", ""],
      ["", 110, "", ""]
    ],
    validationRules: [
      {
        type: "formula",
        cell: "B6",
        expected: "=SUM(A1:A5)",
        description: "Formula SUM untuk range A1:A5"
      },
      {
        type: "value",
        cell: "B6",
        expected: 110,
        description: "Hasil penjumlahan harus 110"
      },
      {
        type: "formula",
        cell: "B7",
        expected: "=SUM(A1:A3,C1:C2)",
        description: "Formula SUM untuk multiple range"
      },
      {
        type: "value",
        cell: "B7",
        expected: 75,
        description: "Hasil penjumlahan multiple range harus 75"
      }
    ],
    tips: [
      "Perhatikan bahwa SUM mengabaikan sel kosong dan teks",
      "Gunakan F9 untuk melihat hasil evaluasi formula step by step",
      "Ctrl+Shift+Enter untuk array formula jika diperlukan"
    ],
    relatedConcepts: [
      "SUMIF - Penjumlahan dengan kondisi",
      "SUMIFS - Penjumlahan dengan multiple kondisi",
      "AVERAGE - Rata-rata nilai",
      "COUNT - Menghitung sel berisi angka"
    ]
  },
  "vlookup-mastery": {
    id: "vlookup-mastery",
    title: "VLOOKUP Ninja",
    description: "Kuasai VLOOKUP untuk pencarian data yang kompleks dan efisien",
    difficulty: "intermediate",
    category: "formulas",
    points: 300,
    timeLimit: 25,
    participants: 756,
    completionRate: 58,
    tags: ["VLOOKUP", "pencarian", "referensi"],
    isCompleted: true,
    bestScore: 88,
    objectives: [
      "Gunakan VLOOKUP untuk mencari data karyawan berdasarkan ID",
      "Kombinasikan dengan IFERROR untuk handle error #N/A",
      "Buat lookup table yang dinamis dengan referensi absolut",
      "Implementasikan approximate match untuk range nilai"
    ],
    hints: [
      "Selalu gunakan FALSE untuk exact match kecuali diminta sebaliknya",
      "IFERROR berguna untuk handle #N/A error: =IFERROR(VLOOKUP(...), \"Not Found\")",
      "Gunakan $ untuk membuat referensi absolut pada lookup table"
    ],
    createdAt: "2024-01-05",
    instructions: [
      "Gunakan data karyawan di tabel A1:D6 sebagai lookup table",
      "Di kolom G, buat VLOOKUP untuk mencari nama berdasarkan ID di kolom F",
      "Di kolom H, buat VLOOKUP untuk mencari departemen",
      "Di kolom I, buat VLOOKUP dengan IFERROR untuk handle ID yang tidak ada",
      "Pastikan menggunakan referensi absolut untuk lookup table"
    ],
    initialData: [
      ["ID", "Nama", "Departemen", "Gaji", "", "Cari ID", "Nama", "Dept", "Nama (Safe)"],
      [101, "Andi", "IT", 8000000, "", 103, "=VLOOKUP(F2,$A$2:$D$6,2,FALSE)", "=VLOOKUP(F2,$A$2:$D$6,3,FALSE)", "=IFERROR(VLOOKUP(F2,$A$2:$D$6,2,FALSE),\"Tidak Ditemukan\")"],
      [102, "Budi", "HR", 7500000, "", 999, "=VLOOKUP(F3,$A$2:$D$6,2,FALSE)", "=VLOOKUP(F3,$A$2:$D$6,3,FALSE)", "=IFERROR(VLOOKUP(F3,$A$2:$D$6,2,FALSE),\"Tidak Ditemukan\")"],
      [103, "Citra", "Finance", 9000000, "", 101, "=VLOOKUP(F4,$A$2:$D$6,2,FALSE)", "=VLOOKUP(F4,$A$2:$D$6,3,FALSE)", "=IFERROR(VLOOKUP(F4,$A$2:$D$6,2,FALSE),\"Tidak Ditemukan\")"],
      [104, "Doni", "IT", 8500000, "", "", "", "", ""],
      [105, "Eka", "Marketing", 7000000, "", "", "", "", ""]
    ],
    expectedResult: [
      ["ID", "Nama", "Departemen", "Gaji", "", "Cari ID", "Nama", "Dept", "Nama (Safe)"],
      [101, "Andi", "IT", 8000000, "", 103, "Citra", "Finance", "Citra"],
      [102, "Budi", "HR", 7500000, "", 999, "#N/A", "#N/A", "Tidak Ditemukan"],
      [103, "Citra", "Finance", 9000000, "", 101, "Andi", "IT", "Andi"],
      [104, "Doni", "IT", 8500000, "", "", "", "", ""],
      [105, "Eka", "Marketing", 7000000, "", "", "", "", ""]
    ],
    validationRules: [
      {
        type: "formula",
        cell: "G2",
        expected: "=VLOOKUP(F2,$A$2:$D$6,2,FALSE)",
        description: "VLOOKUP dengan referensi absolut untuk nama"
      },
      {
        type: "value",
        cell: "G2",
        expected: "Citra",
        description: "Harus mengembalikan nama Citra untuk ID 103"
      },
      {
        type: "formula",
        cell: "I3",
        expected: "=IFERROR(VLOOKUP(F3,$A$2:$D$6,2,FALSE),\"Tidak Ditemukan\")",
        description: "VLOOKUP dengan IFERROR handling"
      },
      {
        type: "value",
        cell: "I3",
        expected: "Tidak Ditemukan",
        description: "Harus menampilkan pesan error untuk ID yang tidak ada"
      }
    ],
    tips: [
      "VLOOKUP mencari di kolom pertama dan mengembalikan nilai dari kolom yang ditentukan",
      "Col_index_num dimulai dari 1 untuk kolom pertama lookup table",
      "FALSE = exact match, TRUE = approximate match (data harus terurut)"
    ],
    relatedConcepts: [
      "HLOOKUP - Pencarian horizontal",
      "INDEX MATCH - Alternatif yang lebih fleksibel",
      "XLOOKUP - Fungsi lookup modern (Excel 365)",
      "IFERROR - Error handling"
    ]
  }
}

interface ChallengePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ChallengePageProps): Promise<Metadata> {
  const { id } = await params
  const challenge = mockChallengeData[id]
  
  if (!challenge) {
    return {
      title: "Challenge Not Found - ExcelMaster",
      description: "Challenge yang Anda cari tidak ditemukan"
    }
  }
  
  return {
    title: `${challenge.title} - ExcelMaster Challenges`,
    description: challenge.description
  }
}



/**
 * Halaman detail challenge individual
 * Menggunakan komponen ChallengeWorkspace yang sudah dibuat
 */
export default async function ChallengePage({ params }: ChallengePageProps) {
  const { id } = await params
  const challenge = mockChallengeData[id]
  
  if (!challenge) {
    notFound()
  }
  
  return (
    <ChallengeWorkspace challenge={challenge} />
  )
}