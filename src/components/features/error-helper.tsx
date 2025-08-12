"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb, 
  RefreshCw, 
  Copy, 
  ExternalLink,
  AlertCircle,
  XCircle,
  Info
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ExcelError {
  code: string
  name: string
  description: string
  commonCauses: string[]
  solutions: string[]
  examples: {
    wrong: string
    correct: string
    explanation: string
  }[]
  severity: 'low' | 'medium' | 'high'
  category: 'syntax' | 'reference' | 'value' | 'calculation' | 'name'
}

interface ErrorHelperProps {
  error?: string
  formula?: string
  onFixSuggestion?: (fixedFormula: string) => void
  className?: string
}

/**
 * Database error Excel yang umum terjadi
 */
const excelErrors: Record<string, ExcelError> = {
  "#NAME?": {
    code: "#NAME?",
    name: "Name Error",
    description: "Excel tidak mengenali nama fungsi, range, atau referensi yang digunakan",
    commonCauses: [
      "Salah ketik nama fungsi",
      "Menggunakan fungsi yang tidak ada",
      "Missing tanda kutip untuk teks",
      "Nama range yang tidak terdefinisi"
    ],
    solutions: [
      "Periksa ejaan nama fungsi",
      "Pastikan fungsi tersedia di versi Excel Anda",
      "Tambahkan tanda kutip untuk teks literal",
      "Definisikan nama range terlebih dahulu"
    ],
    examples: [
      {
        wrong: "=SUMM(A1:A10)",
        correct: "=SUM(A1:A10)",
        explanation: "Fungsi yang benar adalah SUM, bukan SUMM"
      },
      {
        wrong: "=IF(A1>10, Lulus, Gagal)",
        correct: "=IF(A1>10, \"Lulus\", \"Gagal\")",
        explanation: "Teks harus diapit tanda kutip"
      }
    ],
    severity: "medium",
    category: "name"
  },
  
  "#VALUE!": {
    code: "#VALUE!",
    name: "Value Error",
    description: "Tipe data yang digunakan tidak sesuai dengan yang diharapkan fungsi",
    commonCauses: [
      "Menggunakan teks di fungsi matematika",
      "Format tanggal yang salah",
      "Spasi atau karakter tersembunyi",
      "Array dengan ukuran berbeda"
    ],
    solutions: [
      "Pastikan data berupa angka untuk fungsi matematika",
      "Gunakan fungsi VALUE() untuk konversi teks ke angka",
      "Bersihkan data dari spasi dengan TRIM()",
      "Periksa format dan tipe data"
    ],
    examples: [
      {
        wrong: "=SUM(A1:A10) dimana A1 berisi 'abc'",
        correct: "=SUM(A1:A10) dengan data numerik",
        explanation: "SUM hanya bisa menjumlahkan angka, bukan teks"
      },
      {
        wrong: "=A1+B1 dimana A1='10 ' (ada spasi)",
        correct: "=TRIM(A1)+B1 atau =VALUE(A1)+B1",
        explanation: "Gunakan TRIM atau VALUE untuk membersihkan data"
      }
    ],
    severity: "high",
    category: "value"
  },
  
  "#REF!": {
    code: "#REF!",
    name: "Reference Error",
    description: "Referensi sel atau range tidak valid atau telah dihapus",
    commonCauses: [
      "Menghapus baris/kolom yang direferensi",
      "Referensi ke sel yang tidak ada",
      "Copy-paste formula ke area yang invalid",
      "Referensi circular"
    ],
    solutions: [
      "Periksa apakah sel yang direferensi masih ada",
      "Update referensi ke sel yang benar",
      "Gunakan referensi absolut ($A$1) jika perlu",
      "Hindari referensi circular"
    ],
    examples: [
      {
        wrong: "=SUM(A1:A10) setelah menghapus kolom A",
        correct: "=SUM(B1:B10) jika data pindah ke kolom B",
        explanation: "Update referensi setelah menghapus/memindah data"
      },
      {
        wrong: "=A1 di sel A1 (referensi circular)",
        correct: "=B1 atau referensi ke sel lain",
        explanation: "Sel tidak boleh mereferensi dirinya sendiri"
      }
    ],
    severity: "high",
    category: "reference"
  },
  
  "#DIV/0!": {
    code: "#DIV/0!",
    name: "Division by Zero Error",
    description: "Pembagian dengan nol atau sel kosong",
    commonCauses: [
      "Membagi dengan angka nol",
      "Membagi dengan sel kosong",
      "Hasil perhitungan yang menghasilkan nol",
      "Formula yang tidak memperhitungkan kasus khusus"
    ],
    solutions: [
      "Gunakan fungsi IF untuk cek pembagi",
      "Gunakan IFERROR untuk handle error",
      "Pastikan pembagi tidak nol atau kosong",
      "Tambahkan validasi data"
    ],
    examples: [
      {
        wrong: "=A1/B1 dimana B1=0",
        correct: "=IF(B1=0, 0, A1/B1)",
        explanation: "Cek apakah pembagi nol sebelum membagi"
      },
      {
        wrong: "=A1/B1 dimana B1 kosong",
        correct: "=IFERROR(A1/B1, \"Tidak dapat dihitung\")",
        explanation: "Gunakan IFERROR untuk handle semua error"
      }
    ],
    severity: "medium",
    category: "calculation"
  },
  
  "#N/A": {
    code: "#N/A",
    name: "Not Available Error",
    description: "Nilai yang dicari tidak ditemukan dalam fungsi lookup",
    commonCauses: [
      "VLOOKUP/HLOOKUP tidak menemukan nilai",
      "Data tidak terurut untuk approximate match",
      "Tipe data tidak cocok",
      "Spasi atau format yang berbeda"
    ],
    solutions: [
      "Pastikan nilai yang dicari ada dalam tabel",
      "Gunakan exact match (FALSE) untuk VLOOKUP",
      "Bersihkan data dari spasi dengan TRIM",
      "Gunakan IFERROR untuk handle nilai tidak ditemukan"
    ],
    examples: [
      {
        wrong: "=VLOOKUP(\"John\", A:B, 2, FALSE) tapi tidak ada 'John'",
        correct: "=IFERROR(VLOOKUP(\"John\", A:B, 2, FALSE), \"Tidak ditemukan\")",
        explanation: "Gunakan IFERROR untuk handle nilai yang tidak ditemukan"
      },
      {
        wrong: "=VLOOKUP(A1, B:C, 2, FALSE) dimana A1='John ' (ada spasi)",
        correct: "=VLOOKUP(TRIM(A1), B:C, 2, FALSE)",
        explanation: "Bersihkan data dengan TRIM sebelum lookup"
      }
    ],
    severity: "medium",
    category: "value"
  },
  
  "#NUM!": {
    code: "#NUM!",
    name: "Number Error",
    description: "Masalah dengan nilai numerik dalam formula",
    commonCauses: [
      "Angka terlalu besar atau terlalu kecil",
      "Akar kuadrat dari angka negatif",
      "Logaritma dari angka negatif atau nol",
      "Parameter fungsi di luar range yang valid"
    ],
    solutions: [
      "Periksa range nilai yang valid untuk fungsi",
      "Gunakan ABS() untuk nilai absolut jika perlu",
      "Validasi input sebelum perhitungan",
      "Gunakan IF untuk cek kondisi khusus"
    ],
    examples: [
      {
        wrong: "=SQRT(-4)",
        correct: "=IF(A1>=0, SQRT(A1), \"Tidak valid\")",
        explanation: "Akar kuadrat hanya untuk angka non-negatif"
      },
      {
        wrong: "=LOG(0)",
        correct: "=IF(A1>0, LOG(A1), \"Tidak valid\")",
        explanation: "Logaritma hanya untuk angka positif"
      }
    ],
    severity: "medium",
    category: "calculation"
  }
}

/**
 * Deteksi error dari formula atau pesan error
 */
function detectError(input: string): ExcelError | null {
  // Cek apakah input adalah error code langsung
  if (excelErrors[input]) {
    return excelErrors[input]
  }
  
  // Cek apakah ada error code dalam formula
  for (const errorCode in excelErrors) {
    if (input.includes(errorCode)) {
      return excelErrors[errorCode]
    }
  }
  
  return null
}

/**
 * Mendapatkan icon berdasarkan severity
 */
function getSeverityIcon(severity: string) {
  switch (severity) {
    case 'low': return <Info className="w-4 h-4" />
    case 'medium': return <AlertTriangle className="w-4 h-4" />
    case 'high': return <XCircle className="w-4 h-4" />
    default: return <AlertCircle className="w-4 h-4" />
  }
}

/**
 * Mendapatkan warna berdasarkan severity
 */
function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200'
    case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200'
    case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200'
    default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200'
  }
}

/**
 * Komponen ErrorHelper untuk membantu pengguna memahami dan memperbaiki error Excel
 * Memberikan penjelasan, penyebab, solusi, dan contoh perbaikan
 */
export function ErrorHelper({ 
  error, 
  formula, 
  onFixSuggestion,
  className 
}: ErrorHelperProps) {
  const [detectedError, setDetectedError] = useState<ExcelError | null>(null)
  const [selectedExample, setSelectedExample] = useState<number>(0)
  const [copied, setCopied] = useState(false)
  
  // Deteksi error ketika input berubah
  useEffect(() => {
    const input = error || formula || ""
    const detected = detectError(input)
    setDetectedError(detected)
    setSelectedExample(0)
  }, [error, formula])
  
  /**
   * Handle copy solution ke clipboard
   */
  const handleCopySolution = async (solution: string) => {
    try {
      await navigator.clipboard.writeText(solution)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
      if (onFixSuggestion) {
        onFixSuggestion(solution)
      }
    } catch (err) {
      console.error('Failed to copy solution:', err)
    }
  }
  
  if (!detectedError) {
    return (
      <div className={className}>
        <Card className="border-gray-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Tidak Ada Error Terdeteksi
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Formula Anda terlihat baik-baik saja!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Error Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Alert className={`border-2 ${getSeverityColor(detectedError.severity).includes('red') ? 'border-red-200 dark:border-red-800' : detectedError.severity === 'medium' ? 'border-yellow-200 dark:border-yellow-800' : 'border-blue-200 dark:border-blue-800'}`}>
          <div className="flex items-center gap-2">
            {getSeverityIcon(detectedError.severity)}
            <AlertTitle className="text-lg">
              {detectedError.code} - {detectedError.name}
            </AlertTitle>
            <Badge className={getSeverityColor(detectedError.severity)}>
              {detectedError.severity === 'low' ? 'Ringan' : detectedError.severity === 'medium' ? 'Sedang' : 'Tinggi'}
            </Badge>
          </div>
          <AlertDescription className="mt-2 text-base">
            {detectedError.description}
          </AlertDescription>
        </Alert>
      </motion.div>
      
      {/* Common Causes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Penyebab Umum
            </CardTitle>
            <CardDescription>
              Hal-hal yang biasanya menyebabkan error ini
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-2">
              {detectedError.commonCauses.map((cause, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <span className="text-orange-600 mt-1">•</span>
                  {cause}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Solutions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-green-600" />
              Cara Mengatasi
            </CardTitle>
            <CardDescription>
              Langkah-langkah untuk memperbaiki error ini
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-3">
              {detectedError.solutions.map((solution, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg"
                >
                  <span className="bg-green-100 dark:bg-green-900 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-green-800 dark:text-green-200 flex-1">
                    {solution}
                  </span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              Contoh Perbaikan
            </CardTitle>
            <CardDescription>
              Lihat contoh formula yang salah dan yang benar
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {detectedError.examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedExample === index 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setSelectedExample(index)}
              >
                <div className="space-y-3">
                  {/* Wrong Example */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">
                        Salah:
                      </span>
                    </div>
                    <code className="block p-2 bg-red-100 dark:bg-red-900 rounded text-sm font-mono text-red-800 dark:text-red-200">
                      {example.wrong}
                    </code>
                  </div>
                  
                  {/* Correct Example */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                          Benar:
                        </span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopySolution(example.correct)
                        }}
                      >
                        {copied ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <code className="block p-2 bg-green-100 dark:bg-green-900 rounded text-sm font-mono text-green-800 dark:text-green-200">
                      {example.correct}
                    </code>
                  </div>
                  
                  {/* Explanation */}
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Penjelasan:</strong> {example.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                  Butuh Bantuan Lebih Lanjut?
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Coba gunakan Formula Builder atau lihat Cheat Sheet
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Formula Builder
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Cheat Sheet
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}