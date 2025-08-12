"use client"

import { useState } from "react"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Search, 
  Copy, 
  Star, 
  Calculator,
  Calendar,
  Type,
  Database,
  TrendingUp,
  Filter,
  Zap,
  Check
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FormulaItem {
  id: string
  name: string
  syntax: string
  description: string
  example: string
  result: string
  category: 'math' | 'text' | 'date' | 'lookup' | 'logical' | 'statistical'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}

interface CheatSheetDrawerProps {
  trigger?: React.ReactNode
  defaultOpen?: boolean
  onFormulaSelect?: (formula: FormulaItem) => void
}

/**
 * Data formula Excel yang tersedia
 * Dalam implementasi nyata, ini bisa diambil dari API atau file terpisah
 */
const formulas: FormulaItem[] = [
  // Math Functions
  {
    id: "sum",
    name: "SUM",
    syntax: "=SUM(range)",
    description: "Menjumlahkan semua angka dalam range",
    example: "=SUM(A1:A10)",
    result: "55 (jika A1:A10 berisi 1,2,3...10)",
    category: "math",
    difficulty: "beginner",
    tags: ["penjumlahan", "total", "dasar"]
  },
  {
    id: "average",
    name: "AVERAGE",
    syntax: "=AVERAGE(range)",
    description: "Menghitung rata-rata dari range angka",
    example: "=AVERAGE(B1:B5)",
    result: "15 (jika rata-rata adalah 15)",
    category: "math",
    difficulty: "beginner",
    tags: ["rata-rata", "mean", "statistik"]
  },
  {
    id: "max",
    name: "MAX",
    syntax: "=MAX(range)",
    description: "Mencari nilai maksimum dalam range",
    example: "=MAX(C1:C20)",
    result: "100 (nilai tertinggi)",
    category: "math",
    difficulty: "beginner",
    tags: ["maksimum", "tertinggi", "terbesar"]
  },
  {
    id: "min",
    name: "MIN",
    syntax: "=MIN(range)",
    description: "Mencari nilai minimum dalam range",
    example: "=MIN(C1:C20)",
    result: "5 (nilai terendah)",
    category: "math",
    difficulty: "beginner",
    tags: ["minimum", "terendah", "terkecil"]
  },
  {
    id: "count",
    name: "COUNT",
    syntax: "=COUNT(range)",
    description: "Menghitung jumlah sel yang berisi angka",
    example: "=COUNT(D1:D10)",
    result: "7 (jika 7 sel berisi angka)",
    category: "math",
    difficulty: "beginner",
    tags: ["hitung", "jumlah", "angka"]
  },
  
  // Text Functions
  {
    id: "concatenate",
    name: "CONCATENATE",
    syntax: "=CONCATENATE(text1, text2, ...)",
    description: "Menggabungkan beberapa teks menjadi satu",
    example: "=CONCATENATE(A1, \" \", B1)",
    result: "\"John Doe\" (jika A1=John, B1=Doe)",
    category: "text",
    difficulty: "beginner",
    tags: ["gabung", "teks", "string"]
  },
  {
    id: "left",
    name: "LEFT",
    syntax: "=LEFT(text, num_chars)",
    description: "Mengambil karakter dari kiri",
    example: "=LEFT(A1, 3)",
    result: "\"Exc\" (jika A1=Excel)",
    category: "text",
    difficulty: "beginner",
    tags: ["kiri", "substring", "potong"]
  },
  {
    id: "right",
    name: "RIGHT",
    syntax: "=RIGHT(text, num_chars)",
    description: "Mengambil karakter dari kanan",
    example: "=RIGHT(A1, 3)",
    result: "\"cel\" (jika A1=Excel)",
    category: "text",
    difficulty: "beginner",
    tags: ["kanan", "substring", "potong"]
  },
  {
    id: "len",
    name: "LEN",
    syntax: "=LEN(text)",
    description: "Menghitung panjang teks",
    example: "=LEN(A1)",
    result: "5 (jika A1=Excel)",
    category: "text",
    difficulty: "beginner",
    tags: ["panjang", "karakter", "length"]
  },
  
  // Date Functions
  {
    id: "today",
    name: "TODAY",
    syntax: "=TODAY()",
    description: "Menampilkan tanggal hari ini",
    example: "=TODAY()",
    result: "2024-01-15 (tanggal saat ini)",
    category: "date",
    difficulty: "beginner",
    tags: ["tanggal", "hari ini", "sekarang"]
  },
  {
    id: "now",
    name: "NOW",
    syntax: "=NOW()",
    description: "Menampilkan tanggal dan waktu saat ini",
    example: "=NOW()",
    result: "2024-01-15 14:30:00",
    category: "date",
    difficulty: "beginner",
    tags: ["tanggal", "waktu", "sekarang"]
  },
  {
    id: "datedif",
    name: "DATEDIF",
    syntax: "=DATEDIF(start_date, end_date, unit)",
    description: "Menghitung selisih antara dua tanggal",
    example: "=DATEDIF(A1, B1, \"Y\")",
    result: "5 (selisih 5 tahun)",
    category: "date",
    difficulty: "intermediate",
    tags: ["selisih", "umur", "durasi"]
  },
  
  // Lookup Functions
  {
    id: "vlookup",
    name: "VLOOKUP",
    syntax: "=VLOOKUP(lookup_value, table_array, col_index, exact_match)",
    description: "Mencari nilai dalam tabel secara vertikal",
    example: "=VLOOKUP(A1, B:D, 3, FALSE)",
    result: "Nilai dari kolom ke-3 yang sesuai",
    category: "lookup",
    difficulty: "intermediate",
    tags: ["cari", "tabel", "referensi"]
  },
  {
    id: "hlookup",
    name: "HLOOKUP",
    syntax: "=HLOOKUP(lookup_value, table_array, row_index, exact_match)",
    description: "Mencari nilai dalam tabel secara horizontal",
    example: "=HLOOKUP(A1, B1:F5, 3, FALSE)",
    result: "Nilai dari baris ke-3 yang sesuai",
    category: "lookup",
    difficulty: "intermediate",
    tags: ["cari", "tabel", "horizontal"]
  },
  
  // Logical Functions
  {
    id: "if",
    name: "IF",
    syntax: "=IF(condition, value_if_true, value_if_false)",
    description: "Mengembalikan nilai berdasarkan kondisi",
    example: "=IF(A1>10, \"Besar\", \"Kecil\")",
    result: "\"Besar\" atau \"Kecil\" tergantung kondisi",
    category: "logical",
    difficulty: "beginner",
    tags: ["kondisi", "logika", "percabangan"]
  },
  {
    id: "and",
    name: "AND",
    syntax: "=AND(condition1, condition2, ...)",
    description: "Mengembalikan TRUE jika semua kondisi benar",
    example: "=AND(A1>5, B1<10)",
    result: "TRUE atau FALSE",
    category: "logical",
    difficulty: "beginner",
    tags: ["dan", "logika", "kondisi"]
  },
  {
    id: "or",
    name: "OR",
    syntax: "=OR(condition1, condition2, ...)",
    description: "Mengembalikan TRUE jika salah satu kondisi benar",
    example: "=OR(A1>5, B1<10)",
    result: "TRUE atau FALSE",
    category: "logical",
    difficulty: "beginner",
    tags: ["atau", "logika", "kondisi"]
  }
]

/**
 * Mendapatkan icon berdasarkan kategori formula
 */
function getCategoryIcon(category: string) {
  switch (category) {
    case 'math': return <Calculator className="w-4 h-4" />
    case 'text': return <Type className="w-4 h-4" />
    case 'date': return <Calendar className="w-4 h-4" />
    case 'lookup': return <Database className="w-4 h-4" />
    case 'logical': return <Filter className="w-4 h-4" />
    case 'statistical': return <TrendingUp className="w-4 h-4" />
    default: return <Zap className="w-4 h-4" />
  }
}

/**
 * Mendapatkan warna berdasarkan tingkat kesulitan
 */
function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

/**
 * Mendapatkan label tingkat kesulitan dalam bahasa Indonesia
 */
function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'beginner': return 'Pemula'
    case 'intermediate': return 'Menengah'
    case 'advanced': return 'Lanjutan'
    default: return 'Tidak diketahui'
  }
}

/**
 * Komponen CheatSheetDrawer untuk menampilkan referensi cepat formula Excel
 * Menyediakan pencarian, filter kategori, dan copy formula
 */
export function CheatSheetDrawer({ 
  trigger, 
  defaultOpen = false, 
  onFormulaSelect 
}: CheatSheetDrawerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  
  // Filter formula berdasarkan pencarian dan kategori
  const filteredFormulas = formulas.filter(formula => {
    const matchesSearch = 
      formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formula.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formula.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || formula.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  // Grup formula berdasarkan kategori
  const categories = [
    { id: "all", name: "Semua", icon: <BookOpen className="w-4 h-4" /> },
    { id: "math", name: "Matematika", icon: <Calculator className="w-4 h-4" /> },
    { id: "text", name: "Teks", icon: <Type className="w-4 h-4" /> },
    { id: "date", name: "Tanggal", icon: <Calendar className="w-4 h-4" /> },
    { id: "lookup", name: "Pencarian", icon: <Database className="w-4 h-4" /> },
    { id: "logical", name: "Logika", icon: <Filter className="w-4 h-4" /> },
    { id: "statistical", name: "Statistik", icon: <TrendingUp className="w-4 h-4" /> }
  ]
  
  /**
   * Handle copy formula ke clipboard
   */
  const handleCopyFormula = async (formula: FormulaItem) => {
    try {
      await navigator.clipboard.writeText(formula.syntax)
      setCopiedId(formula.id)
      
      // Reset status copied setelah 2 detik
      setTimeout(() => {
        setCopiedId(null)
      }, 2000)
      
      // Callback jika ada
      if (onFormulaSelect) {
        onFormulaSelect(formula)
      }
    } catch (err) {
      console.error('Failed to copy formula:', err)
    }
  }
  
  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <BookOpen className="w-4 h-4 mr-2" />
      Cheat Sheet
    </Button>
  )
  
  return (
    <Sheet defaultOpen={defaultOpen}>
      <SheetTrigger asChild>
        {trigger || defaultTrigger}
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Excel Formula Cheat Sheet
          </SheetTitle>
          <SheetDescription>
            Referensi cepat formula Excel yang paling sering digunakan
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari formula, deskripsi, atau tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="text-xs"
                >
                  <span className="hidden sm:flex items-center gap-1">
                    {category.icon}
                    {category.name}
                  </span>
                  <span className="sm:hidden">
                    {category.icon}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* Results */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Ditemukan {filteredFormulas.length} formula
              </p>
              
              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                <AnimatePresence>
                  {filteredFormulas.map((formula, index) => (
                    <motion.div
                      key={formula.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(formula.category)}
                              <CardTitle className="text-lg">{formula.name}</CardTitle>
                              <Badge 
                                variant="secondary" 
                                className={getDifficultyColor(formula.difficulty)}
                              >
                                {getDifficultyLabel(formula.difficulty)}
                              </Badge>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCopyFormula(formula)}
                              className="shrink-0"
                            >
                              {copiedId === formula.id ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                          
                          <CardDescription>{formula.description}</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {/* Syntax */}
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Sintaks:
                              </p>
                              <code className="block p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono">
                                {formula.syntax}
                              </code>
                            </div>
                            
                            {/* Example */}
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Contoh:
                              </p>
                              <code className="block p-2 bg-blue-50 dark:bg-blue-950 rounded text-sm font-mono text-blue-800 dark:text-blue-200">
                                {formula.example}
                              </code>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                Hasil: {formula.result}
                              </p>
                            </div>
                            
                            {/* Tags */}
                            {formula.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {formula.tags.map((tag) => (
                                  <Badge 
                                    key={tag} 
                                    variant="outline" 
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filteredFormulas.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Tidak ada formula yang ditemukan
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Coba gunakan kata kunci yang berbeda
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}