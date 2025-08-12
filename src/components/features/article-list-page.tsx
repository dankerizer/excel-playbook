"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SearchIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  TrendingUpIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "lucide-react"
import { motion } from "framer-motion"

// Interface untuk artikel
interface Article {
  id: string
  title: string
  description: string
  content: string
  author: string
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
  featured: boolean
  imageUrl?: string
}

// Data mock artikel
const mockArticles: Article[] = [
  {
    id: "menguasai-vlookup-lengkap",
    title: "Menguasai VLOOKUP: Panduan Lengkap untuk Pemula",
    description: "Pelajari cara menggunakan fungsi VLOOKUP dengan mudah. Dari dasar hingga tips advanced untuk meningkatkan produktivitas Excel Anda.",
    content: "Konten artikel lengkap...",
    author: "Tim ExcelMaster",
    publishedAt: "2025-01-15",
    readTime: "8 menit baca",
    category: "Fungsi Dasar",
    tags: ["VLOOKUP", "Fungsi", "Pemula"],
    featured: true,
    imageUrl: "/images/articles/vlookup-guide.jpg"
  },
  {
    id: "10-formula-excel-wajib",
    title: "10 Formula Excel yang Wajib Dikuasai Profesional",
    description: "Kumpulan formula Excel paling penting yang sering digunakan di dunia kerja. Lengkap dengan contoh praktis dan penerapannya.",
    content: "Konten artikel lengkap...",
    author: "Sarah Johnson",
    publishedAt: "2025-01-12",
    readTime: "12 menit baca",
    category: "Formula",
    tags: ["Formula", "Profesional", "Tips"],
    featured: true,
    imageUrl: "/images/articles/excel-formulas.jpg"
  },
  {
    id: "pivot-table-excel-analisis-data",
    title: "Pivot Table Excel: Analisis Data Cepat dan Mudah",
    description: "Analisis data besar dengan menggunakan Pivot Table. Pelajari cara membuat laporan yang informatif dalam hitungan menit.",
    content: "Konten artikel lengkap...",
    author: "Michael Chen",
    publishedAt: "2025-01-10",
    readTime: "15 menit baca",
    category: "Analisis Data",
    tags: ["Pivot Table", "Analisis", "Data"],
    featured: false,
    imageUrl: "/images/articles/pivot-table.jpg"
  },
  {
    id: "conditional-formatting-visual",
    title: "Conditional Formatting: Membuat Data Lebih Visual",
    description: "Buat spreadsheet Anda lebih menarik dan mudah dibaca dengan conditional formatting. Tutorial lengkap dengan berbagai contoh.",
    content: "Konten artikel lengkap...",
    author: "Lisa Wong",
    publishedAt: "2025-01-08",
    readTime: "10 menit baca",
    category: "Tips & Trik",
    tags: ["Formatting", "Visual", "Design"],
    featured: false,
    imageUrl: "/images/articles/conditional-formatting.jpg"
  },
  {
    id: "index-match-vs-vlookup",
    title: "INDEX MATCH vs VLOOKUP: Mana yang Lebih Baik?",
    description: "Perbandingan mendalam antara INDEX MATCH dan VLOOKUP. Kapan menggunakan yang mana dan mengapa INDEX MATCH lebih fleksibel.",
    content: "Konten artikel lengkap...",
    author: "David Kim",
    publishedAt: "2025-01-05",
    readTime: "7 menit baca",
    category: "Fungsi Dasar",
    tags: ["INDEX", "MATCH", "VLOOKUP"],
    featured: false,
    imageUrl: "/images/articles/index-match.jpg"
  },
]

// Kategori artikel
const categories = [
  { name: "Semua", count: mockArticles.length },
  { name: "Fungsi Dasar", count: mockArticles.filter(a => a.category === "Fungsi Dasar").length },
  { name: "Formula", count: mockArticles.filter(a => a.category === "Formula").length },
  { name: "Tips & Trik", count: mockArticles.filter(a => a.category === "Tips & Trik").length },
  { name: "Analisis Data", count: mockArticles.filter(a => a.category === "Analisis Data").length },
]

/**
 * Komponen halaman daftar artikel
 * Menampilkan artikel unggulan, kategori, dan fitur pencarian
 */
export function ArticleListPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Semua")
  const [filteredArticles, setFilteredArticles] = React.useState(mockArticles)

  // Filter artikel berdasarkan pencarian dan kategori
  React.useEffect(() => {
    let filtered = mockArticles

    // Filter berdasarkan kategori
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    // Filter berdasarkan pencarian
    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredArticles(filtered)
  }, [searchQuery, selectedCategory])

  const featuredArticles = filteredArticles.filter(article => article.featured)
  const regularArticles = filteredArticles.filter(article => !article.featured)

  return (
    <div className="space-y-8 ">
      {/* Header */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-bold tracking-tight">Artikel Excel & Spreadsheet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pelajari tips, trik, dan tutorial mendalam tentang Excel dan Google Sheets untuk 
            meningkatkan produktivitas Anda
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto"
        >
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>
      </div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TagIcon className="h-5 w-5" />
              Kategori Artikel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className="text-sm"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUpIcon className="h-6 w-6" />
            Artikel Unggulan
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <BookOpenIcon className="h-12 w-12 text-blue-600" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UserIcon className="h-3 w-3" />
                        {article.author}
                        <span>•</span>
                        <CalendarIcon className="h-3 w-3" />
                        {new Date(article.publishedAt).toLocaleDateString('id-ID')}
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/artikel/${article.id}`}>
                          Baca Artikel
                          <ArrowRightIcon className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Regular Articles */}
      {regularArticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Semua Artikel</h2>
          <div className="grid gap-4">
            {regularArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpenIcon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{article.category}</Badge>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            {article.readTime}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold line-clamp-2">
                          <Link 
                            href={`/artikel/${article.id}`}
                            className="hover:text-blue-600 transition-colors"
                          >
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground line-clamp-2">
                          {article.description}
                        </p>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <UserIcon className="h-3 w-3" />
                            {article.author}
                            <span>•</span>
                            <CalendarIcon className="h-3 w-3" />
                            {new Date(article.publishedAt).toLocaleDateString('id-ID')}
                          </div>
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/artikel/${article.id}`}>
                              Baca Selengkapnya
                              <ArrowRightIcon className="ml-2 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpenIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Tidak ada artikel ditemukan</h3>
          <p className="text-muted-foreground mb-4">
            Coba ubah kata kunci pencarian atau pilih kategori yang berbeda.
          </p>
          <Button 
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("Semua")
            }}
            variant="outline"
          >
            Reset Filter
          </Button>
        </motion.div>
      )}

      {/* Newsletter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Dapatkan Artikel Terbaru</h3>
            <p className="text-blue-100 mb-6">
              Berlangganan newsletter kami dan dapatkan tips Excel terbaru langsung di inbox Anda.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input 
                placeholder="Alamat email Anda"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button variant="secondary">
                Berlangganan
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}