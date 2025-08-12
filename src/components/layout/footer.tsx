"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  MailIcon,
} from "lucide-react"

/**
 * Komponen footer untuk aplikasi ExcelMaster
 * Menampilkan informasi perusahaan, link navigasi, dan form newsletter
 */
export function Footer() {
  const [email, setEmail] = React.useState("")

  /**
   * Handler untuk submit newsletter
   */
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementasi subscribe newsletter
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <span className="text-white font-bold text-xl">📊</span>
              </div>
              <span className="text-xl font-bold">ExcelMaster</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Platform belajar Excel dan Google Sheets terbaik untuk pemula Indonesia.
              Kuasai spreadsheet dengan cara yang menyenangkan dan efektif.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <FacebookIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <TwitterIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <InstagramIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <LinkedinIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <YoutubeIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Belajar Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Belajar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/learn" className="text-slate-300 hover:text-white transition-colors">
                  Semua Chapter
                </Link>
              </li>
              <li>
                <Link href="/playground" className="text-slate-300 hover:text-white transition-colors">
                  Playground
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="text-slate-300 hover:text-white transition-colors">
                  Challenge
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-slate-300 hover:text-white transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dukungan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-slate-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/panduan" className="text-slate-300 hover:text-white transition-colors">
                  Panduan
                </Link>
              </li>
              <li>
                <Link href="/komunitas" className="text-slate-300 hover:text-white transition-colors">
                  Komunitas
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dapatkan Artikel Terbaru</h3>
            <p className="text-slate-300 text-sm">
              Berlangganan newsletter kami dan dapatkan tips Excel terbaru langsung di inbox Anda.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Alamat email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                required
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <MailIcon className="mr-2 h-4 w-4" />
                Berlangganan
              </Button>
            </form>
            <p className="text-xs text-slate-400">
              Gratis dan bebas berhenti kapan saja. Kami tidak akan spam.
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-slate-400">
            © 2025 ExcelMaster. Platform belajar Excel terbaik untuk pemula Indonesia.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/kebijakan-privasi" className="text-slate-400 hover:text-white transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-layanan" className="text-slate-400 hover:text-white transition-colors">
              Syarat Layanan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}