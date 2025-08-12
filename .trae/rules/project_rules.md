# 📋 Project Rules - ExcelMaster Learning Platform

## 🎯 Project Overview

**ExcelMaster** adalah platform pembelajaran Excel interaktif untuk pemula Indonesia dengan pendekatan hands-on learning dan gamifikasi.

### Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** TailwindCSS + shadcn/ui
- **Animation:** Framer Motion
- **State Management:** Zustand
- **Testing:** Jest + React Testing Library
- **Package manager** : always use yarn as package manager
- **Code formatter** : always use prettier as code formatter
- **Linting** : always use eslint as linting tool

## 🏗️ Architecture Rules

### Folder Structure
```
/app                     # Next.js App Router
  /(marketing)           # Landing, features, FAQ
  /dashboard             # Progress, stats, achievements
  /learn/[chapter]/[lesson] # Learning pages
  /playground            # Practice area
  /leaderboard          # Rankings
  /profile              # User profile
  /api-mocks            # MSW handlers
/components             # Reusable UI components
  /ui                   # shadcn/ui components
  /features             # Feature-specific components
  /layout               # Layout components
/lib                    # Utilities and helpers
  /formula-engine       # Excel formula evaluator
  /utils               # General utilities
/store                  # Zustand state slices
/data                   # Static data and content
/tests                  # Test files
```

### Component Organization
- **UI Components:** `/components/ui` (shadcn/ui based)
- **Feature Components:** `/components/features` (business logic)
- **Layout Components:** `/components/layout` (page layouts)
- **Page Components:** `/app` (route components)

## 🎨 Naming Conventions

### React Components
- **Style:** kebab-case untuk file names
- **Export:** PascalCase untuk component names
```typescript
// ✅ Good
// File: /components/ui/progress-bar.tsx
export function ProgressBar() {}

// File: /components/features/formula-editor.tsx
export function FormulaEditor() {}
```

### React Hooks
- **Prefix:** `use-` untuk custom hooks
```typescript
// ✅ Good
// File: /hooks/use-progress.ts
export function useProgress() {}

// File: /hooks/use-formula-engine.ts
export function useFormulaEngine() {}
```

### React Context
- **Prefix:** `use-` untuk context hooks
```typescript
// ✅ Good
// File: /contexts/use-theme-context.tsx
export function useThemeContext() {}

// File: /contexts/use-learning-context.tsx
export function useLearningContext() {}
```

### React Reducers
- **Prefix:** `use-` untuk reducer hooks
```typescript
// ✅ Good
// File: /reducers/use-progress-reducer.ts
export function useProgressReducer() {}
```

### Files and Folders
- **Components:** kebab-case
- **Utilities:** kebab-case
- **Constants:** UPPER_SNAKE_CASE
- **Types:** PascalCase dengan `.types.ts` suffix

```typescript
// ✅ Good
components/ui/data-table.tsx
lib/utils/format-currency.ts
lib/constants/EXCEL_FUNCTIONS.ts
types/Learning.types.ts
```

## 💻 Coding Standards

### TypeScript Rules
- **Strict mode:** Always enabled
- **No any:** Avoid `any` type, use proper typing
- **Interfaces:** Use for object shapes
- **Types:** Use for unions, primitives, and computed types

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  progress: Progress;
}

type Theme = 'light' | 'dark';
type ChapterStatus = 'locked' | 'available' | 'completed';
```

### Function Documentation
- **All functions:** Must have JSDoc comments
- **Complex logic:** Add inline comments
- **Public APIs:** Detailed documentation

```typescript
/**
 * Evaluates Excel formula and returns result
 * @param formula - Excel formula string (e.g., "=SUM(A1:A10)")
 * @param context - Spreadsheet context with cell values
 * @returns Calculated result or error object
 */
export function evaluateFormula(formula: string, context: SpreadsheetContext): FormulaResult {
  // Implementation with inline comments
}
```

### Import/Export Rules
- **Named exports:** Preferred over default exports
- **Barrel exports:** Use index.ts for clean imports
- **Import order:** External → Internal → Relative

```typescript
// ✅ Good import order
import React from 'react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/use-progress';
import { validateFormula } from '../utils/formula-validator';
```

## 🎨 UI/UX Standards

### Design System
- **Colors:** Use CSS custom properties
- **Spacing:** TailwindCSS spacing scale (4px base)
- **Typography:** Inter/Poppins font family
- **Components:** shadcn/ui as base, customize as needed

### Responsive Design
- **Mobile-first:** Start with mobile, scale up
- **Breakpoints:** Use TailwindCSS breakpoints
- **Touch targets:** Minimum 44px for interactive elements

### Accessibility
- **WCAG 2.1 AA:** Compliance required
- **Keyboard navigation:** All interactive elements
- **Screen readers:** Proper ARIA labels
- **Color contrast:** Minimum 4.5:1 ratio

## 🧪 Testing Standards

### Test Coverage
- **Minimum:** 80% overall coverage
- **Critical paths:** 100% coverage for formula engine
- **Components:** Test user interactions and state changes

### Test Organization
```
/tests
  /unit              # Unit tests
  /integration       # Integration tests
  /e2e              # End-to-end tests
  /utils            # Test utilities
```

### Test Naming
```typescript
// ✅ Good test names
describe('FormulaEngine', () => {
  it('should evaluate SUM formula correctly', () => {});
  it('should return error for invalid formula', () => {});
  it('should handle cell references', () => {});
});
```

## 🚀 Performance Rules

### Bundle Size
- **Initial load:** < 3 seconds
- **Page transitions:** < 1 second
- **Code splitting:** Use dynamic imports for heavy components

### Formula Engine
- **Evaluation time:** < 16ms per formula
- **Memory usage:** Efficient cell reference handling
- **Caching:** Cache computed results when possible

### Images and Assets
- **Format:** Use WebP for images, SVG for icons
- **Optimization:** Next.js Image component
- **Lazy loading:** For non-critical content

## 🌐 Internationalization

### Language
- **Primary:** Bahasa Indonesia
- **Tone:** Pengajar Santai (friendly, not condescending)
- **Examples:** Use local context (Rupiah, Indonesian names)

### Content Guidelines
```typescript
// ✅ Good Indonesian content
const messages = {
  welcome: 'Selamat datang di ExcelMaster!',
  challenge: 'Tantangan',
  hint: 'Petunjuk',
  solution: 'Solusi'
};
```

## 📦 State Management

### Zustand Slices
- **Separation:** One slice per domain
- **Naming:** Descriptive slice names
- **Actions:** Clear action names with proper typing

```typescript
// ✅ Good Zustand slice
interface ProgressState {
  completedChapters: number[];
  currentChapter: number;
  points: number;
  streak: number;
}

interface ProgressActions {
  completeChapter: (chapterId: number) => void;
  updatePoints: (points: number) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState & ProgressActions>((set) => ({
  // Implementation
}));
```

## 🔧 Development Workflow

### Git Workflow
- **Branches:** feature/*, bugfix/*, hotfix/*
- **Commits:** Conventional commits format
- **PRs:** Required for main branch

```bash
# ✅ Good commit messages
feat: add formula evaluation engine
fix: resolve spreadsheet cell selection bug
docs: update component documentation
test: add unit tests for formula parser
```

### Code Review
- **Required:** All PRs need review
- **Checklist:** Functionality, tests, documentation, performance
- **Standards:** Follow all project rules

## 🚨 Error Handling

### Formula Errors
- **Standard Excel errors:** #N/A, #VALUE!, #REF!, #DIV/0!, #NAME?
- **User-friendly messages:** Indonesian explanations
- **Recovery suggestions:** How to fix the error

### Application Errors
- **Error boundaries:** Catch React errors
- **Logging:** Structured error logging
- **Fallbacks:** Graceful degradation

## 📊 Analytics and Monitoring

### User Analytics
- **Learning progress:** Chapter completion rates
- **Engagement:** Time spent per lesson
- **Performance:** Formula evaluation success rates

### Technical Monitoring
- **Performance:** Core Web Vitals
- **Errors:** Error rate and types
- **Usage:** Feature adoption metrics

## 🔒 Security Guidelines

### Data Handling
- **No sensitive data:** Keep user data minimal
- **Local storage:** Use for preferences only
- **API security:** Validate all inputs

### Formula Security
- **Sandboxing:** Formula evaluation in safe context
- **Input validation:** Prevent malicious formulas
- **Resource limits:** Prevent infinite loops

---

**Note:** These rules should be followed consistently across the entire project. Any deviations should be discussed and documented.