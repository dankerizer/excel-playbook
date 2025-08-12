"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  content: string
  achievement: string
  beforeAfter: {
    before: string
    after: string
  }
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sari Dewi",
    role: "Admin Keuangan",
    company: "PT Maju Bersama",
    avatar: "/avatars/sari.jpg",
    rating: 5,
    content: "ExcelMaster benar-benar mengubah cara kerja saya! Dulu butuh 3 jam untuk membuat laporan, sekarang cuma 30 menit. Formula dan pivot table yang diajarkan sangat praktis dan mudah dipahami.",
    achievement: "Excel Expert",
    beforeAfter: {
      before: "3 jam untuk laporan",
      after: "30 menit dengan automation"
    }
  },
  {
    id: "2",
    name: "Budi Santoso",
    role: "Data Analyst",
    company: "Startup Teknologi",
    avatar: "/avatars/budi.jpg",
    rating: 5,
    content: "Platform terbaik untuk belajar Excel! Gamifikasi nya bikin ketagihan belajar. Sekarang saya bisa bikin dashboard yang keren dan analisis data yang mendalam. Recommended banget!",
    achievement: "Data Wizard",
    beforeAfter: {
      before: "Manual data entry",
      after: "Automated dashboards"
    }
  },
  {
    id: "3",
    name: "Maya Putri",
    role: "HR Manager",
    company: "Perusahaan Multinasional",
    avatar: "/avatars/maya.jpg",
    rating: 5,
    content: "Sebagai HR yang harus handle data karyawan, ExcelMaster sangat membantu. Fitur hands-on practice nya membuat saya langsung bisa aplikasikan ke pekerjaan sehari-hari.",
    achievement: "HR Pro",
    beforeAfter: {
      before: "Basic Excel user",
      after: "Advanced HR analytics"
    }
  },
  {
    id: "4",
    name: "Andi Rahman",
    role: "Mahasiswa Ekonomi",
    company: "Universitas Indonesia",
    avatar: "/avatars/andi.jpg",
    rating: 5,
    content: "Materi nya lengkap dan mudah diikuti. Dari yang gak ngerti Excel sama sekali, sekarang bisa bikin model finansial untuk tugas akhir. Terima kasih ExcelMaster!",
    achievement: "Finance Modeler",
    beforeAfter: {
      before: "Excel beginner",
      after: "Financial modeling expert"
    }
  },
  {
    id: "5",
    name: "Rina Sari",
    role: "Business Owner",
    company: "UMKM Fashion",
    avatar: "/avatars/rina.jpg",
    rating: 5,
    content: "Sebagai pemilik UMKM, Excel skills sangat penting untuk manage inventory dan keuangan. ExcelMaster mengajarkan dengan cara yang praktis dan langsung bisa dipake untuk bisnis.",
    achievement: "Business Analyst",
    beforeAfter: {
      before: "Manual bookkeeping",
      after: "Automated business reports"
    }
  },
  {
    id: "6",
    name: "Doni Pratama",
    role: "Marketing Specialist",
    company: "Agency Digital",
    avatar: "/avatars/doni.jpg",
    rating: 5,
    content: "Dashboard marketing yang saya buat sekarang jauh lebih profesional. Client impressed dengan visualisasi data yang saya presentasikan. Worth it banget invest waktu di ExcelMaster!",
    achievement: "Marketing Guru",
    beforeAfter: {
      before: "Basic charts",
      after: "Interactive dashboards"
    }
  }
]

/**
 * Komponen untuk menampilkan testimoni dari pengguna ExcelMaster
 * Menggunakan carousel layout dengan rating dan achievement badges
 */
export function LandingTestimonials() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            💬 Testimoni Nyata
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Apa Kata{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Pelajar Kami?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ribuan profesional telah meningkatkan karir mereka dengan ExcelMaster. 
            Simak cerita sukses mereka!
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-blue-200 dark:text-blue-800">
                  <Quote className="w-8 h-8" />
                </div>
                
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.rating}.0
                    </span>
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Before/After */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg p-4 mb-6">
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Transformasi:
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-red-600 dark:text-red-400">❌ Dulu:</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {testimonial.beforeAfter.before}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600 dark:text-green-400">✅ Sekarang:</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {testimonial.beforeAfter.after}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {testimonial.company}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.achievement}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Bergabung dengan Komunitas Sukses
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ribuan profesional telah meningkatkan karir mereka
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Pelajar Aktif
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                95%
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Tingkat Kepuasan
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                5,000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Review Positif
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                300%
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Peningkatan Produktivitas
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}