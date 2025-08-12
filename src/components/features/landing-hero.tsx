"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Star, Users, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

/**
 * Komponen hero section untuk halaman landing
 * Menampilkan value proposition utama dan call-to-action
 */
export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-gray-900 dark:to-green-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              🎉 Platform Pembelajaran Excel #1 di Indonesia
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Kuasai{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Excel
            </span>
            <br />
            dari Nol hingga Mahir
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Belajar Excel dengan cara yang menyenangkan melalui{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              hands-on practice
            </span>
            ,{" "}
            <span className="font-semibold text-green-600 dark:text-green-400">
              gamifikasi
            </span>
            , dan pembelajaran terstruktur khusus untuk pemula Indonesia.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mb-10 text-sm md:text-base"
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Users className="w-5 h-5 text-blue-600" />
              <span><strong>10,000+</strong> Pelajar</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <BookOpen className="w-5 h-5 text-green-600" />
              <span><strong>50+</strong> Pelajaran</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Star className="w-5 h-5 text-yellow-500" />
              <span><strong>4.9/5</strong> Rating</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Trophy className="w-5 h-5 text-orange-500" />
              <span><strong>95%</strong> Tingkat Kelulusan</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg font-semibold">
              <Link href="/learn">
                Mulai Belajar Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold border-2"
            >
              <Play className="mr-2 w-5 h-5" />
              Lihat Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Dipercaya oleh perusahaan dan institusi terkemuka
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder untuk logo perusahaan */}
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-8 w-28 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-8 w-22 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full opacity-20"
      />
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-32 right-16 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full opacity-20"
      />
      
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute top-1/3 right-8 w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full opacity-20"
      />
    </section>
  )
}