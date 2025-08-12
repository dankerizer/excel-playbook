"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  LinkIcon,
} from "lucide-react"
import { motion } from "framer-motion"

// Interface untuk artikel
interface Article {
  id: string
  title: string
  description: string
  author: string
  publishedAt: string
  readTime: string
  category: string
  tags: string[]
}

interface ArticleDetailPageProps {
  article: Article
}

/**
 * Komponen halaman detail artikel
 * Menampilkan konten artikel lengkap dengan navigasi dan fitur sharing
 */
export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false)
  const [shareUrl, setShareUrl] = React.useState("")

  React.useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  /**
   * Handler untuk bookmark artikel
   */
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // TODO: Implementasi bookmark ke backend
  }

  /**
   * Handler untuk share ke social media
   */
  const handleShare = (platform: string) => {
    const text = encodeURIComponent(`${article.title} - ExcelMaster`)
    const url = encodeURIComponent(shareUrl)
    
    let shareLink = ""
    
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl)
        return
    }
    
    window.open(shareLink, '_blank', 'width=600,height=400')
  }

  // Konten artikel mock (dalam implementasi nyata, ini akan diambil dari API)
  const articleContent = {
    "menguasai-vlookup-lengkap": {
      sections: [
        {
          title: "Apa itu VLOOKUP?",
          content: "VLOOKUP (Vertical Lookup) adalah salah satu fungsi Excel yang paling sering digunakan untuk mencari data dalam tabel. Fungsi ini memungkinkan Anda untuk mencari nilai tertentu di kolom pertama tabel dan mengembalikan nilai dari kolom lain dalam baris yang sama."
        },
        {
          title: "Sintaks VLOOKUP",
          content: "Sintaks dasar VLOOKUP adalah: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])\n\n• lookup_value: Nilai yang ingin dicari\n• table_array: Range tabel tempat pencarian\n• col_index_num: Nomor kolom yang akan dikembalikan nilainya\n• range_lookup: TRUE untuk pencarian perkiraan, FALSE untuk pencarian tepat"
        },
        {
          title: "Contoh Praktis",
          content: "Mari kita lihat contoh sederhana. Misalkan Anda memiliki tabel data karyawan dengan kolom ID, Nama, dan Gaji. Untuk mencari gaji karyawan dengan ID tertentu, Anda bisa menggunakan:\n\n=VLOOKUP(A2, D:F, 3, FALSE)\n\nFormula ini akan mencari nilai di A2 dalam kolom D, dan mengembalikan nilai dari kolom F (kolom ke-3 dari range D:F)."
        },
        {
          title: "Tips dan Trik VLOOKUP",
          content: "1. Selalu gunakan FALSE untuk pencarian tepat\n2. Pastikan data di kolom pertama tabel sudah terurut jika menggunakan TRUE\n3. Gunakan $ untuk membuat referensi absolut\n4. Kombinasikan dengan IFERROR untuk menangani error\n5. Pertimbangkan INDEX MATCH sebagai alternatif yang lebih fleksibel"
        }
      ]
    },
    "10-formula-excel-wajib": {
      sections: [
        {
          title: "Formula Dasar yang Wajib Dikuasai",
          content: "Dalam dunia kerja, ada beberapa formula Excel yang sangat sering digunakan dan wajib dikuasai oleh setiap profesional. Berikut adalah 10 formula paling penting:"
        },
        {
          title: "1. SUM - Menjumlahkan Data",
          content: "Formula SUM digunakan untuk menjumlahkan range data. Contoh: =SUM(A1:A10) akan menjumlahkan semua nilai dari A1 hingga A10."
        },
        {
          title: "2. AVERAGE - Menghitung Rata-rata",
          content: "Formula AVERAGE menghitung nilai rata-rata dari range data. Contoh: =AVERAGE(B1:B20) akan menghitung rata-rata dari B1 hingga B20."
        },
        {
          title: "3. COUNT dan COUNTA",
          content: "COUNT menghitung jumlah sel yang berisi angka, sedangkan COUNTA menghitung semua sel yang tidak kosong. Sangat berguna untuk analisis data."
        }
      ]
    }
  }

  const currentContent = articleContent[article.id as keyof typeof articleContent] || {
    sections: [
      {
        title: "Konten Artikel",
        content: "Konten artikel akan ditampilkan di sini. Dalam implementasi nyata, konten ini akan diambil dari database atau CMS."
      }
    ]
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/artikel">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Kembali ke Artikel
          </Link>
        </Button>
      </motion.div>

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge>{article.category}</Badge>
          <span>•</span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            {new Date(article.publishedAt).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <ClockIcon className="h-3 w-3" />
            {article.readTime}
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed">
          {article.description}
        </p>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{article.author}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBookmark}
              className={isBookmarked ? "bg-blue-50 text-blue-600" : ""}
            >
              <BookmarkIcon className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Tersimpan' : 'Simpan'}
            </Button>
            
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" onClick={() => handleShare('facebook')}>
                <FacebookIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('twitter')}>
                <TwitterIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}>
                <LinkedinIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('copy')}>
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <Separator />

      {/* Article Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="prose prose-lg max-w-none"
      >
        <div className="space-y-8">
          {currentContent.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <TagIcon className="h-4 w-4" />
              <span className="font-medium">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Related Articles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Artikel Terkait</CardTitle>
            <CardDescription>
              Artikel lain yang mungkin menarik untuk Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-2">
                  <Link href="/artikel/index-match-vs-vlookup" className="hover:text-blue-600">
                    INDEX MATCH vs VLOOKUP: Mana yang Lebih Baik?
                  </Link>
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Perbandingan mendalam antara dua fungsi lookup terpopuler di Excel.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ClockIcon className="h-3 w-3" />
                  7 menit baca
                </div>
              </div>
              
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-2">
                  <Link href="/artikel/10-formula-excel-wajib" className="hover:text-blue-600">
                    10 Formula Excel yang Wajib Dikuasai Profesional
                  </Link>
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Kumpulan formula Excel paling penting untuk dunia kerja.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ClockIcon className="h-3 w-3" />
                  12 menit baca
                </div>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <Button asChild variant="outline">
                <Link href="/artikel">
                  Lihat Semua Artikel
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Newsletter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Suka artikel ini?</h3>
            <p className="text-blue-100 mb-6">
              Berlangganan newsletter kami untuk mendapatkan artikel Excel terbaru langsung di inbox Anda.
            </p>
            <Button variant="secondary" size="lg">
              Berlangganan Newsletter
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}