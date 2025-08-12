"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Zap,
  Gift,
  Star,
  Trophy
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const benefits = [
  {
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    text: "Akses seumur hidup ke semua materi"
  },
  {
    icon: <Users className="w-5 h-5 text-blue-600" />,
    text: "Bergabung dengan 10,000+ pelajar aktif"
  },
  {
    icon: <Trophy className="w-5 h-5 text-yellow-600" />,
    text: "Sertifikat resmi setelah menyelesaikan course"
  },
  {
    icon: <Zap className="w-5 h-5 text-purple-600" />,
    text: "Update materi terbaru secara otomatis"
  },
  {
    icon: <Clock className="w-5 h-5 text-orange-600" />,
    text: "Belajar fleksibel 24/7 sesuai waktu Anda"
  },
  {
    icon: <Gift className="w-5 h-5 text-pink-600" />,
    text: "Bonus template Excel siap pakai"
  }
]

const pricingFeatures = [
  "50+ Pelajaran Interaktif",
  "Hands-on Practice dengan Real Cases",
  "AI-Powered Hints & Feedback",
  "Progress Tracking & Gamifikasi",
  "Akses Komunitas Eksklusif",
  "Template & Tools Premium",
  "Support 24/7 dari Expert",
  "Mobile App untuk Belajar On-the-go"
]

/**
 * Komponen call-to-action untuk mendorong konversi di halaman landing
 * Menampilkan penawaran, benefit, dan tombol untuk memulai
 */
export function LandingCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
      />
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-16 w-16 h-16 bg-white/10 rounded-full"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            🎯 Penawaran Terbatas
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Siap Menjadi{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Excel Expert?
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Bergabunglah dengan ribuan profesional yang telah meningkatkan karir mereka. 
            Mulai perjalanan Excel mastery Anda hari ini!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Yang Akan Anda Dapatkan:
            </h3>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="bg-white/20 p-2 rounded-lg">
                    {benefit.icon}
                  </div>
                  <span className="text-lg">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                    >
                      {String.fromCharCode(65 + i - 1)}
                    </div>
                  ))}
                </div>
                <div className="text-white">
                  <div className="font-semibold">10,000+ Pelajar Aktif</div>
                  <div className="text-blue-100 text-sm">Bergabung minggu ini</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white font-semibold">4.9/5</span>
                <span className="text-blue-100">dari 5,000+ review</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white dark:bg-gray-900 shadow-2xl border-0 overflow-hidden">
              <CardContent className="p-8">
                {/* Pricing Header */}
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
                    🔥 Paling Populer
                  </Badge>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    ExcelMaster Pro
                  </h4>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      Gratis
                    </span>
                    <div className="text-left">
                      <div className="text-sm text-gray-500 line-through">Rp 299.000</div>
                      <div className="text-sm text-green-600 font-semibold">Beta Launch</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Akses penuh selama periode beta. Gratis selamanya untuk early adopters!
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  {pricingFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4">
                  <Button asChild size="lg" className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    <Link href="/learn">
                      Mulai Belajar Sekarang
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full py-6 text-lg font-semibold border-2"
                    asChild
                  >
                    <Link href="/dashboard">
                      Lihat Dashboard Demo
                    </Link>
                  </Button>
                </div>

                {/* Guarantee */}
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">100% Satisfaction Guarantee</span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Tidak puas? Kami refund 100% dalam 30 hari pertama.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-blue-100 mb-4">
            ⏰ Penawaran beta terbatas! Hanya untuk 1000 pengguna pertama.
          </p>
          <div className="flex items-center justify-center gap-4 text-white">
            <span className="text-sm">Sudah bergabung:</span>
            <div className="bg-white/20 px-4 py-2 rounded-full font-bold">
              8,247 / 10,000
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}