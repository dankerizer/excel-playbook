# User Story Baru - Learning Track System

## 📋 Overview

Mengimplementasikan sistem learning track yang memungkinkan user memilih jalur pembelajaran spesifik sebelum masuk ke chapter individual. Setiap track memiliki chapter tersendiri dan sertifikat yang sesuai.

## 🎯 User Flow Baru

### 1. Pemilihan Learning Track
**Halaman:** `/learn` (dimodifikasi)

**User Story:**
> Sebagai user, saya ingin memilih track pembelajaran yang sesuai dengan kebutuhan saya, sehingga saya bisa fokus pada materi yang relevan.

**Acceptance Criteria:**
- [ ] User melihat 3 pilihan track utama:
  - **Excel Dasar** (10 chapter)
  - **Excel Menengah** (8 chapter) 
  - **Excel Untuk Perkantoran** (12 chapter)
- [ ] Setiap track menampilkan:
  - Deskripsi singkat
  - Jumlah chapter
  - Estimasi waktu belajar
  - Level kesulitan
  - Preview chapter yang akan dipelajari
- [ ] User dapat melihat progress untuk setiap track
- [ ] User dapat melanjutkan track yang sedang berjalan

### 2. Pemilihan Chapter dalam Track
**Halaman:** `/learn/[track]` (baru)

**User Story:**
> Sebagai user yang telah memilih track, saya ingin melihat daftar chapter dalam track tersebut dan memilih chapter yang ingin dipelajari.

**Acceptance Criteria:**
- [ ] Menampilkan daftar chapter sesuai track yang dipilih
- [ ] Chapter yang sudah selesai ditandai dengan checkmark
- [ ] Chapter yang terkunci ditampilkan dengan icon lock
- [ ] Progress bar untuk keseluruhan track
- [ ] Estimasi waktu untuk setiap chapter
- [ ] Breadcrumb navigation: Home > Learn > [Track Name]

### 3. Pembelajaran Chapter & Lesson
**Halaman:** `/learn/[track]/[chapter]/[lesson]` (dimodifikasi)

**User Story:**
> Sebagai user, saya ingin belajar lesson dalam chapter yang dipilih dengan konteks track yang sedang saya ambil.

**Acceptance Criteria:**
- [ ] Sama seperti flow saat ini
- [ ] Menampilkan informasi track di header
- [ ] Navigation breadcrumb: Home > Learn > [Track] > [Chapter] > [Lesson]
- [ ] Progress tracking per track

### 4. Sertifikat per Track
**Halaman:** `/certificate/[track]` (dimodifikasi)

**User Story:**
> Sebagai user yang menyelesaikan semua chapter dalam track, saya ingin mendapatkan sertifikat yang sesuai dengan track yang saya selesaikan.

**Acceptance Criteria:**
- [ ] Sertifikat dengan nama track spesifik:
  - "Sertifikat Excel Dasar"
  - "Sertifikat Excel Menengah" 
  - "Sertifikat Excel Untuk Perkantoran"
- [ ] Menampilkan detail track yang diselesaikan
- [ ] Tanggal penyelesaian
- [ ] Skor rata-rata
- [ ] Daftar chapter yang diselesaikan

## 🏗️ Technical Implementation Plan

### 1. Data Structure Changes

#### Learning Tracks Data
```typescript
interface LearningTrack {
  id: string; // 'excel-dasar', 'excel-menengah', 'excel-perkantoran'
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  chapters: Chapter[];
  prerequisites?: string[]; // track IDs
  certificateTemplate: string;
}
```

#### Modified Chapter Structure
```typescript
interface Chapter {
  id: number;
  trackId: string; // new field
  title: string;
  description: string;
  lessons: Lesson[];
  // ... existing fields
}
```

#### Progress Tracking Updates
```typescript
interface UserProgress {
  tracks: {
    [trackId: string]: {
      completedChapters: number[];
      currentChapter: number;
      startedAt: Date;
      completedAt?: Date;
      certificateIssued: boolean;
    }
  };
  // ... existing fields
}
```

### 2. Route Structure Changes

```
/learn                           # Track selection page
/learn/[track]                   # Chapter list for specific track
/learn/[track]/[chapter]         # Chapter overview (existing, modified)
/learn/[track]/[chapter]/[lesson] # Lesson page (existing, modified)
/certificate/[track]             # Track-specific certificate
```

### 3. Component Changes

#### New Components
- [ ] `track-selection-page.tsx` - Halaman pemilihan track
- [ ] `track-card.tsx` - Card untuk setiap track
- [ ] `track-chapter-list.tsx` - Daftar chapter dalam track
- [ ] `track-progress-bar.tsx` - Progress bar per track
- [ ] `track-certificate.tsx` - Sertifikat per track

#### Modified Components
- [ ] `chapter-page-client.tsx` - Tambah context track
- [ ] `lesson-navigation.tsx` - Update breadcrumb dan navigation
- [ ] `progress-tracker.tsx` - Support multiple tracks
- [ ] `sidebar.tsx` - Tampilkan progress per track

### 4. Store Updates

#### Progress Store Enhancement
```typescript
interface ProgressState {
  // Existing fields...
  currentTrack: string | null;
  trackProgress: Record<string, TrackProgress>;
}

interface ProgressActions {
  // Existing actions...
  setCurrentTrack: (trackId: string) => void;
  completeTrack: (trackId: string) => void;
  getTrackProgress: (trackId: string) => TrackProgress;
}
```

## 📊 Learning Tracks Content

### Track 1: Excel Dasar (10 Chapter)
**Target:** Pemula yang belum pernah menggunakan Excel
**Estimasi:** 20 jam

1. Pengenalan Interface Excel
2. Input dan Format Data Dasar
3. Fungsi Matematika Sederhana (SUM, AVERAGE, COUNT)
4. Fungsi Logika Dasar (IF)
5. Sorting dan Filtering Data
6. Membuat Chart Sederhana
7. Print dan Page Setup
8. Shortcut Keyboard Penting
9. Tips Produktivitas Dasar
10. Project: Membuat Laporan Keuangan Sederhana

### Track 2: Excel Menengah (8 Chapter)
**Target:** User yang sudah familiar dengan Excel dasar
**Estimasi:** 16 jam
**Prerequisites:** Excel Dasar

1. Fungsi Lookup (VLOOKUP, HLOOKUP, INDEX-MATCH)
2. Fungsi Text dan Date
3. Conditional Formatting Lanjutan
4. Data Validation dan Protection
5. Pivot Tables dan Pivot Charts
6. Macro Recording Dasar
7. Collaboration dan Sharing
8. Project: Dashboard Penjualan Interaktif

### Track 3: Excel Untuk Perkantoran (12 Chapter)
**Target:** Profesional yang butuh Excel untuk pekerjaan
**Estimasi:** 24 jam
**Prerequisites:** Excel Dasar

1. Template dan Standardisasi Dokumen
2. Fungsi Keuangan (PMT, FV, PV, IRR, NPV)
3. Analisis Data dengan What-If Analysis
4. Advanced Charts dan Visualisasi
5. Power Query untuk Import Data
6. Formulir dan Data Entry
7. Reporting dan Dashboard
8. Automation dengan Macro VBA
9. Integration dengan Office Suite
10. Data Security dan Backup
11. Troubleshooting Common Issues
12. Project: Sistem Manajemen Inventory

## 🎨 UI/UX Considerations

### Track Selection Page Design
- **Layout:** Grid 3 kolom untuk desktop, stack untuk mobile
- **Card Design:** 
  - Header dengan icon dan level badge
  - Progress ring untuk track yang sudah dimulai
  - "Mulai Belajar" atau "Lanjutkan" button
  - Preview chapter list (collapsible)

### Navigation Enhancements
- **Breadcrumb:** Selalu tampilkan path lengkap
- **Track Switcher:** Dropdown di header untuk ganti track
- **Progress Indicator:** Mini progress bar di sidebar untuk setiap track

### Certificate Customization
- **Template per Track:** Design berbeda untuk setiap level
- **Color Scheme:**
  - Excel Dasar: Green theme
  - Excel Menengah: Blue theme  
  - Excel Perkantoran: Purple theme

## 🚀 Implementation Phases

### Phase 1: Data Structure & Routes (Hari 1-2)
- [ ] Update types dan interfaces
- [ ] Buat data structure untuk tracks
- [ ] Setup routing baru
- [ ] Update Zustand store

### Phase 2: Track Selection (Hari 3-4)
- [ ] Buat halaman pemilihan track
- [ ] Implementasi track cards
- [ ] Progress tracking per track
- [ ] Navigation updates

### Phase 3: Chapter List per Track (Hari 5-6)
- [ ] Halaman chapter list per track
- [ ] Update chapter navigation
- [ ] Breadcrumb implementation
- [ ] Track context di lesson pages

### Phase 4: Certificate System (Hari 7-8)
- [ ] Track-specific certificates
- [ ] Certificate templates
- [ ] Completion detection
- [ ] Certificate download/share

### Phase 5: Content Migration (Hari 9-10)
- [ ] Migrate existing chapters ke track structure
- [ ] Create content untuk track baru
- [ ] Update challenge system
- [ ] Testing dan QA

## 📝 Acceptance Criteria Summary

### Functional Requirements
- [ ] User dapat memilih dari 3 learning tracks
- [ ] Setiap track memiliki chapter list tersendiri
- [ ] Progress tracking terpisah per track
- [ ] Sertifikat sesuai dengan track yang diselesaikan
- [ ] Navigation yang jelas dengan breadcrumb
- [ ] Backward compatibility dengan sistem existing

### Technical Requirements
- [ ] Type-safe implementation dengan TypeScript
- [ ] Responsive design untuk semua device
- [ ] Performance optimization untuk loading
- [ ] SEO-friendly URLs
- [ ] Analytics tracking untuk track selection

### UX Requirements
- [ ] Intuitive track selection interface
- [ ] Clear progress indication
- [ ] Smooth transitions antar halaman
- [ ] Consistent design language
- [ ] Accessibility compliance (WCAG 2.1 AA)

## 🔄 Migration Strategy

### Existing User Data
- Map existing progress ke "Excel Dasar" track
- Preserve semua achievement dan points
- Maintain backward compatibility untuk URLs lama

### Content Migration
- Chapter 1-10 existing → Excel Dasar track
- Create new content untuk Excel Menengah dan Perkantoran
- Update challenge system untuk support multiple tracks

---

**Next Steps:**
1. Review dan approval user story ini
2. Technical design document
3. UI mockups dan wireframes
4. Implementation planning
5. Development start