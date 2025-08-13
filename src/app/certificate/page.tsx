'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MainLayout } from "@/components/layout/main-layout"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, ArrowLeft } from 'lucide-react'
import type { Metadata } from "next"

/**
 * Halaman redirect untuk sertifikat
 * Mengarahkan pengguna untuk memilih track terlebih dahulu
 */
export default function CertificatePage() {
  const router = useRouter()

  return (
    <MainLayout showSidebar={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-xl font-bold">Sertifikat Learning Track</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Untuk mendapatkan sertifikat, Anda perlu menyelesaikan salah satu learning track terlebih dahulu.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => router.push('/learn')}
                className="w-full"
              >
                Pilih Learning Track
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard')}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}