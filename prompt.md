
# PROMPT UNTUK AI BUILDER

**Peranmu:** Ahli Frontend yang membangun aplikasi web edukasi interaktif mirip app.uxcel.com, tetapi materinya adalah **Excel & Google Spreadsheet** untuk pemula Indonesia. Gunakan **Next.js 15 (App Router) + TypeScript (strict) + TailwindCSS + shadcn/ui**. Tone konten **Pengajar Santai** (ramah, jelas, tidak menggurui).

## Tujuan Produk

Buat platform belajar interaktif berbasis **hands-on learning + gamifikasi** agar pengguna pemula (16–35 tahun) bisa:

1. Memahami interface Excel & navigasi dasar
2. Menguasai 20+ fungsi esensial (SUM, AVERAGE, COUNT, IF, VLOOKUP, dll.)
3. Menggabungkan beberapa fungsi dalam satu formula
4. Menerapkan fungsi pada kasus nyata (keuangan, inventory, dsb.)
5. Melakukan troubleshooting error formula umum

## Spesifikasi Teknis

* **Framework:** Next.js 15 (App Router, Server/Client Components seperlunya)
* **Bahasa:** TypeScript (strict: true), ESLint aktif
* **UI:** TailwindCSS (gunakan versi terbaru yang kompatibel), **shadcn/ui** (Button, Card, Dialog, Tabs, Progress, Tooltip, Badge, Alert, Skeleton)
* **Animasi:** Framer Motion (micro-interactions, page transitions)
* **Spreadsheet Simulator:** gunakan komponen grid spreadsheet React (atau implementasi ringan) dengan **formula evaluation real-time**
* **State:** Zustand (prefer) atau Redux Toolkit (jika perlu)
* **Routing:** Next.js App Router (jangan React Router)
* **Testing:** Jest + React Testing Library (minimal coverage 80%)
* **A11y:** WCAG 2.1 AA, navigasi keyboard, aria-\*
* **Perf:** initial load < 3s; page transition < 1s; lazy loading; image optimization
* **I18N:** Seluruh UI & konten **Bahasa Indonesia**
* **Data mock:** gunakan MSW atau mock API lokal untuk leaderboard, progress, dsb. (endpoint kontrak disiapkan)

## Struktur Konten (10 Chapter)

1. **Pengenalan Interface Excel** – ribbon, cell, range, worksheet, navigasi
2. **Fungsi Matematika Dasar** – SUM, pengurangan, perkalian, pembagian
3. **Fungsi Statistik** – AVERAGE, COUNT, MAX, MIN
4. **Fungsi Logika** – IF, AND, OR, NOT
5. **Fungsi Teks** – CONCATENATE/TEXTJOIN, LEFT, RIGHT, MID, UPPER, LOWER
6. **Tanggal & Waktu** – TODAY, NOW, DATE, DATEDIF (jelas bedanya)
7. **Lookup** – VLOOKUP, HLOOKUP, INDEX, MATCH (termasuk INDEX+MATCH)
8. **Kondisional Lanjutan** – COUNTIF, SUMIF, AVERAGEIF (+ \*-S jika sempat)
9. **Kombinasi Fungsi** – nested & formula kompleks
10. **Studi Kasus Praktis** – mini-project (mis. laporan penjualan sederhana)

> Setiap chapter punya: **tutorial step-by-step**, **simulator**, **3–5 challenge** (auto-grading), **cheat-sheet link**, dan **Ringkasan + Next Steps**.

## Fitur Wajib

### Dashboard & Progress

* Progress tracker (persentase, chapter unlocked)
* Learning path (unlock system)
* Time-spent tracking per chapter
* Statistik personal + achievement showcase

### Pembelajaran Interaktif

* **Live Excel Simulator**: grid + formula bar + real-time eval + error hints
* **Formula Editor**: Monaco Editor (syntax highlight + snippet auto-complete nama fungsi)
* **Guided Practice**: langkah kecil, hint kontekstual
* **Interactive Challenges**: auto-grading, umpan balik instan, solusi

### Gamifikasi

* **Points**: 100 poin/chapter, bonus untuk perfect score pertama kali
* **Badges**: ≥15 (Beginner, Formula Master, Speed Learner, Streak 7/14/30, dsb.)
* **Leaderboard**: mingguan & bulanan (opsional, toggle)
* **Streak Counter**: hitung hari belajar berturut-turut

### Tools Pendukung

* **Cheat Sheet**: referensi fungsi bisa dicari + contoh singkat
* **Formula Builder**: UI visual menyusun argumen fungsi & men-generate formula
* **Error Helper (AI-like UX)**: deteksi pola error umum (#N/A, #VALUE!, #REF!, dsb.) + saran
* **Practice Playground**: kanvas spreadsheet bebas eksperimen

## Desain & UX

* **Design System**: warna konsisten, tipografi Inter/Poppins, spacing skala 4
* **Theme**: light/dark, transisi 0.3s
* **Layout**: sidebar nav, main content, floating help/actions
* **Loading**: skeleton untuk halaman & komponen berat
* **Micro-interactions**: hover, press, celebrate saat lulus challenge
* **Responsif**: 320–1920 px, mobile-first
* **Konten Lokal**: contoh data pakai Rupiah (Rp), nama orang/daerah Indonesia

## Arsitektur & Struktur Folder

```
/app
  /(marketing)           -> landing, fitur, FAQ
  /dashboard             -> progress, statistik, achievements
  /learn
    /[chapter]/[lesson]  -> halaman belajar + simulator + challenges
  /playground
  /leaderboard
  /profile
  /api-mocks             -> MSW handlers (dev only)
/components              -> UI & features (shadcn-ized)
/lib
  /formula-engine        -> evaluator, parser, helpers (excel-like)
/store                   -> Zustand slices (user, progress, ui)
/data                    -> seed konten lessons, cheatsheet, badges
/tests
```

## Kontrak Data (Mock API)

* `GET /api/progress` → `{ completedChapters: number[], timeSpent: Record<string,number>, streak:number, points:number }`
* `POST /api/progress` → simpan penyelesaian lesson/chapter
* `GET /api/leaderboard?range=weekly|monthly` → daftar top 50
* `GET /api/cheatsheet?q=SUM` → daftar fungsi yg cocok + contoh
* `POST /api/grade` → body: `{ challengeId, formula }` → `{ correct:boolean, feedback:string, score:number }`

## Sample Konten & Tantangan (mohon buatkan)

1. **Challenge SUM (Dasar)**

   * Dataset: kolom **Jumlah** (Rp)
   * Instruksi: “Jumlahkan seluruh nilai pada kolom **Jumlah**.”
   * Jawaban benar: `=SUM(B2:B10)`
   * Feedback salah umum: “Cek range yang dipilih. Gunakan `SUM` dengan rentang sel yang benar.”

2. **Challenge IF (Logika)**

   * Dataset: kolom **Nilai**
   * Instruksi: “Jika Nilai ≥ 75, tulis ‘Lulus’, selain itu ‘Remedial’.”
   * Jawaban: `=IF(C2>=75,"Lulus","Remedial")`

3. **Challenge Lookup INDEX+MATCH**

   * Instruksi: “Ambil **Harga** berdasarkan **Kode Barang** di input.”
   * Jawaban: `=INDEX(HargaRange, MATCH(KodeInput, KodeRange, 0))`
   * Feedback: “Gunakan pencocokan tepat (0) pada MATCH.”

> Sertakan minimal 4–6 challenge representatif per chapter dengan rubrik penilaian & feedback spesifik kesalahan umum.

## Formula Engine (Minimal Requirements)

* Dukung fungsi: `SUM, AVERAGE, COUNT, MAX, MIN, IF, AND, OR, NOT, CONCATENATE/TEXTJOIN, LEFT, RIGHT, MID, UPPER, LOWER, TODAY, NOW, DATE, DATEDIF, VLOOKUP, HLOOKUP, INDEX, MATCH, COUNTIF, SUMIF, AVERAGEIF`
* Evaluasi sel & range (`A1`, `A1:B10`), referensi relatif
* Error handling standar (`#N/A, #VALUE!, #REF!, #DIV/0!, #NAME?`) + penjelasan ringkas
* Kinerja: evaluasi < 16ms per input sederhana (target 60fps saat mengetik)

## Komponen Kunci (implementasikan)

* `Spreadsheet` (grid, selection, formula bar, cell inspector)
* `FormulaEditor` (Monaco + snippet fungsi + validasi)
* `CheatSheetDrawer` (search + kategori + contoh)
* `ChallengeCard` (deskripsi, input formula, run, hasil & feedback)
* `ProgressTracker` (ringkasan kursus, persentase, unlock)
* `Gamification` (PointsDisplay, BadgesGrid, StreakCounter)
* `LeaderboardTable`
* `Playground` (kanvas spreadsheet bebas)

## Acceptance Criteria

* Semua halaman & komponen berbahasa **Indonesia** dengan tone **Pengajar Santai**
* **Flow belajar**: Landing → Dashboard → Chapter → Lesson → Challenge → Penilaian → Progress & Poin naik → Badge bila terpenuhi
* **Auto-grading**: membandingkan hasil sel yang diminta **atau** menilai kesetaraan formula (tidak terpaku urutan argumen jika hasil identik)
* **Cheat Sheet** bisa dicari (nama fungsi & deskripsi)
* **Formula Builder** menghasilkan formula valid yang dapat ditempel ke editor
* **Error Helper** menampilkan penyebab & saran singkat saat formula gagal
* **Dark/Light mode** stabil & tersimpan (localStorage)
* **Testing coverage ≥ 80%** (komponen kritikal + formula engine)
* **Perf budget** & **A11y** lulus pemeriksaan dasar

## Deliverables

1. Kode lengkap (Next.js 15 + TS strict)
2. **Component library reusable** (dengan shadcn/ui)
3. **Dokumentasi teknis** (setup, arsitektur, design system, menambah chapter)
4. **User Manual (Indonesia)** untuk pengguna pemula
5. **Deployment guide** (production build & optimasi)
6. Laporan coverage test (≥80%)

## Gaya Bahasa & Konten

* Gunakan istilah Excel yang familiar di Indonesia
* Hindari jargon teknis; jelaskan dengan contoh sederhana
* Cantumkan contoh data **Rupiah** (Rp 10.000), nama Indonesia (Ayu, Budi), kota (Bandung, Makassar)
* Sediakan **hint** bertahap (dari clue kecil → solusi)
* Selalu beri **contoh formula** dan **anti-pattern** umum

## Catatan Implementasi

* Jika paket “React Spreadsheet Grid” tidak ideal, boleh gunakan alternatif (handsontable/react-data-grid) atau implementasi grid minimalis sendiri
* Simpan state progress & theme di localStorage; mock API via MSW untuk leaderboard/progress
* Pastikan semua halaman memuat **Skeleton** saat fetch data
* Tambahkan **celebration confetti** saat chapter selesai 100%

**Output yang Diharapkan dari AI Builder:**

* Repositori siap jalan (`pnpm install && pnpm dev`)
* Halaman utama: Landing → CTA mulai belajar
* Alur lengkap Dashboard → Chapter 1 → Lesson → Challenge (dengan auto-grading)
* Minimal 2 chapter **fully playable** (demo lengkap), sisanya scaffold + contoh konten
* Dokumen: README teknis + User Manual (Indonesia) + Deployment guide
* Laporan test coverage (≥80%)

---

Kalau mau, aku bisa lanjut bikin **scaffold kode Next.js + shadcn** dan **seed 2 chapter pertama** sebagai starting point. Mau?
