"use client"

import { PlaygroundLayout } from "@/components/layout/main-layout"
import { SpreadsheetSimulator } from "./spreadsheet-simulator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  Save, 
  Download,
  Upload,
  Lightbulb,
  Target,
  Trophy
} from "lucide-react"

/**
 * Komponen workspace untuk halaman playground
 * Menangani semua interaksi dan state management
 */
export function PlaygroundWorkspace() {
  return (
    <PlaygroundLayout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Excel Playground
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Latihan bebas tanpa batasan. Eksplorasi formula Excel, coba berbagai fungsi, 
            dan tingkatkan skill Anda dengan simulator interaktif.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="gap-2">
            <Save className="w-4 h-4" />
            Simpan Worksheet
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Upload className="w-4 h-4" />
            Load Worksheet
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Download className="w-4 h-4" />
            Export Excel
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Spreadsheet */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Excel Simulator
                </CardTitle>
                <CardDescription>
                  Simulator Excel lengkap dengan dukungan formula dan fungsi populer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SpreadsheetSimulator 
                  chapterId={0}
                  lessonId={0}
                  onFormulaComplete={(formula: string, result: string | number) => {
                    console.log(`Formula ${formula} evaluated to:`, result)
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Tips Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <p><strong>Ctrl + Enter:</strong> Konfirmasi formula</p>
                  <p><strong>F2:</strong> Edit sel aktif</p>
                  <p><strong>Ctrl + C/V:</strong> Copy/Paste</p>
                  <p><strong>Ctrl + Z:</strong> Undo</p>
                  <p><strong>Tab:</strong> Pindah ke sel kanan</p>
                </div>
              </CardContent>
            </Card>

            {/* Formula Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Contoh Formula</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                    <code>=SUM(A1:A10)</code>
                    <p className="text-xs text-gray-600 mt-1">Menjumlahkan range A1 sampai A10</p>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                    <code>=AVERAGE(B1:B5)</code>
                    <p className="text-xs text-gray-600 mt-1">Rata-rata nilai di B1 sampai B5</p>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                    <code>=IF(C1&gt;10,&quot;Tinggi&quot;,&quot;Rendah&quot;)</code>
                    <p className="text-xs text-gray-600 mt-1">Kondisi if-then-else</p>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                    <code>=VLOOKUP(D1,A:B,2,FALSE)</code>
                    <p className="text-xs text-gray-600 mt-1">Pencarian data vertikal</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Function Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Kategori Fungsi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2 mb-2">Matematika</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Statistik</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Teks</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Tanggal</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Lookup</Badge>
                  <Badge variant="outline" className="mr-2 mb-2">Logika</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Daily Challenge Suggestion */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  💡 Tantangan Harian
                </h3>
                <p className="text-blue-700 dark:text-blue-300">
                  Coba buat formula untuk menghitung total penjualan dengan diskon bertingkat!
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Target className="w-4 h-4 mr-2" />
                Coba Sekarang
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Pencapaian Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  🏆
                </div>
                <div>
                  <p className="font-medium text-yellow-900 dark:text-yellow-100">Formula Master</p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">100 formula berhasil</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  ⚡
                </div>
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">Speed Demon</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Formula dalam 10 detik</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  🎯
                </div>
                <div>
                  <p className="font-medium text-purple-900 dark:text-purple-100">Precision Pro</p>
                  <p className="text-sm text-purple-700 dark:text-purple-300">95% akurasi</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PlaygroundLayout>
  )
}