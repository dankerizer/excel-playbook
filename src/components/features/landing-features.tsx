"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Gamepad2, 
  Users, 
  Trophy, 
  Target, 
  Zap,
  Brain,
  Clock,
  CheckCircle,
  Star,
  Lightbulb,
  BarChart3
} from "lucide-react"
import { motion } from "framer-motion"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
  color: string
}

const features: Feature[] = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Pembelajaran Terstruktur",
    description: "Kurikulum yang dirancang khusus untuk pemula dengan progression yang jelas dari basic hingga advanced.",
    badge: "50+ Pelajaran",
    color: "text-blue-600"
  },
  {
    icon: <Gamepad2 className="w-8 h-8" />,
    title: "Gamifikasi Menyenangkan",
    description: "Sistem poin, achievement, dan leaderboard yang membuat belajar Excel terasa seperti bermain game.",
    badge: "Level Up!",
    color: "text-purple-600"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Hands-on Practice",
    description: "Latihan langsung dengan spreadsheet interaktif, bukan hanya teori tapi praktek nyata.",
    badge: "Interactive",
    color: "text-green-600"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Powered Hints",
    description: "Sistem bantuan cerdas yang memberikan petunjuk personal sesuai dengan kesulitan yang dihadapi.",
    badge: "Smart AI",
    color: "text-orange-600"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Belajar Fleksibel",
    description: "Akses 24/7 dengan progress tracking, belajar sesuai waktu dan kecepatan Anda sendiri.",
    badge: "24/7 Access",
    color: "text-indigo-600"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Komunitas Aktif",
    description: "Bergabung dengan ribuan pelajar lain, diskusi, dan saling membantu dalam forum komunitas.",
    badge: "10K+ Members",
    color: "text-pink-600"
  }
]

const stats = [
  {
    icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    value: "95%",
    label: "Tingkat Penyelesaian",
    description: "Pelajar yang menyelesaikan course"
  },
  {
    icon: <Star className="w-6 h-6 text-yellow-500" />,
    value: "4.9/5",
    label: "Rating Kepuasan",
    description: "Dari 5000+ review pelajar"
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    value: "2 Minggu",
    label: "Rata-rata Waktu",
    description: "Untuk menguasai Excel basic"
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
    value: "300%",
    label: "Peningkatan Skill",
    description: "Produktivitas setelah course"
  }
]

/**
 * Komponen untuk menampilkan fitur-fitur utama platform ExcelMaster
 * Menggunakan grid layout dengan animasi dan statistik
 */
export function LandingFeatures() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
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
            🚀 Fitur Unggulan
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Mengapa Memilih{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              ExcelMaster?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Platform pembelajaran Excel paling komprehensif dengan metode yang terbukti efektif 
            untuk menguasai Excel dari dasar hingga mahir.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${feature.color} bg-gray-50 dark:bg-gray-800 p-3 rounded-lg`}>
                      {feature.icon}
                    </div>
                    {feature.badge && (
                      <Badge variant="outline" className="text-xs">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hasil yang Terbukti
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ribuan pelajar telah merasakan manfaat nyata dari platform ExcelMaster
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Path Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Learning Path yang Teruji
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "Excel Basics",
              "Formulas & Functions", 
              "Data Analysis",
              "Charts & Visualization",
              "Pivot Tables",
              "Advanced Features"
            ].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {step}
                </span>
                {index < 5 && (
                  <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600 hidden sm:block" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}