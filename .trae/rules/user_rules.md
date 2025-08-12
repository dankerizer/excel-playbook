# 👤 User Rules - ExcelMaster Development Guidelines

## 🎯 Development Principles

### Code Quality First
- **Always write tests** before marking features complete
- **Document complex logic** with clear comments
- **Follow TypeScript strict mode** - no `any` types
- **Performance matters** - optimize for 60fps interactions

### User Experience Focus
- **Indonesian language** for all user-facing content
- **Accessibility first** - WCAG 2.1 AA compliance
- **Mobile responsive** - test on multiple screen sizes
- **Loading states** - always show progress indicators

## 🏗️ Development Workflow

### Before Starting Any Task
1. **Read the task requirements** thoroughly
2. **Check existing code** for similar patterns
3. **Plan the implementation** - think about edge cases
4. **Consider performance** implications
5. **Think about testing** strategy

### During Development
1. **Write function comments** for all new functions
2. **Use proper TypeScript types** - avoid any
3. **Follow naming conventions** (kebab-case for files, use- prefix for hooks)
4. **Test as you go** - don't wait until the end
5. **Check accessibility** with keyboard navigation

### Before Completing
1. **Run all tests** and ensure they pass
2. **Check TypeScript** compilation with no errors
3. **Test responsive design** on mobile and desktop
4. **Verify accessibility** with screen reader
5. **Performance check** - no console errors or warnings

## 📝 Code Writing Guidelines

### Function Documentation
**ALWAYS** add JSDoc comments for functions:

```typescript
/**
 * Evaluates Excel formula and returns calculated result
 * @param formula - Excel formula string (e.g., "=SUM(A1:A10)")
 * @param context - Spreadsheet context containing cell values
 * @returns Calculated result or error object with user-friendly message
 * @throws {FormulaError} When formula syntax is invalid
 */
export function evaluateFormula(formula: string, context: SpreadsheetContext): FormulaResult {
  // Validate formula syntax first
  if (!isValidFormula(formula)) {
    throw new FormulaError('Formula tidak valid', formula);
  }
  
  // Parse and evaluate formula
  const result = parseAndEvaluate(formula, context);
  return result;
}
```

### Component Structure
**Follow this pattern** for React components:

```typescript
/**
 * Progress bar component showing learning completion percentage
 * @param progress - Completion percentage (0-100)
 * @param showLabel - Whether to display percentage text
 */
interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ progress, showLabel = true, className }: ProgressBarProps) {
  // Validate progress value
  const validProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={cn('w-full bg-gray-200 rounded-full h-2', className)}>
      <div 
        className="bg-green-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${validProgress}%` }}
        role="progressbar"
        aria-valuenow={validProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${validProgress}%`}
      />
      {showLabel && (
        <span className="text-sm text-gray-600 mt-1 block">
          {validProgress}% selesai
        </span>
      )}
    </div>
  );
}
```

### Error Handling
**Always handle errors gracefully:**

```typescript
/**
 * Handles formula evaluation errors with user-friendly messages
 */
export function handleFormulaError(error: unknown): FormulaErrorResult {
  if (error instanceof FormulaError) {
    return {
      type: 'formula_error',
      message: error.message,
      suggestion: getErrorSuggestion(error.code)
    };
  }
  
  // Log unexpected errors for debugging
  console.error('Unexpected formula error:', error);
  
  return {
    type: 'unknown_error',
    message: 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.',
    suggestion: 'Periksa formula Anda dan pastikan sintaksnya benar.'
  };
}
```

## 🎨 UI/UX Guidelines

### Indonesian Content
**Use friendly, educational tone:**

```typescript
// ✅ Good - Friendly and encouraging
const messages = {
  welcome: 'Selamat datang! Mari belajar Excel bersama 🎉',
  challenge_complete: 'Hebat! Anda berhasil menyelesaikan tantangan ini',
  hint: 'Petunjuk: Coba gunakan fungsi SUM untuk menjumlahkan data',
  error_help: 'Jangan khawatir, mari kita perbaiki formula ini bersama'
};

// ❌ Bad - Too formal or technical
const badMessages = {
  welcome: 'Sistem pembelajaran Excel telah diinisialisasi',
  error: 'Error: Formula evaluation failed with code #VALUE!'
};
```

### Accessibility Requirements
**Every interactive element must be accessible:**

```typescript
// ✅ Good - Accessible button
<button
  onClick={handleSubmit}
  disabled={isLoading}
  aria-label="Submit formula untuk evaluasi"
  aria-describedby="formula-help"
  className="min-h-[44px] min-w-[44px] focus:ring-2 focus:ring-blue-500"
>
  {isLoading ? 'Memproses...' : 'Submit'}
</button>

// ✅ Good - Accessible form input
<input
  type="text"
  value={formula}
  onChange={handleFormulaChange}
  aria-label="Input formula Excel"
  aria-describedby="formula-error"
  aria-invalid={hasError}
  className="focus:ring-2 focus:ring-blue-500"
/>
```

### Performance Considerations
**Optimize for smooth interactions:**

```typescript
// ✅ Good - Debounced formula evaluation
const debouncedEvaluate = useMemo(
  () => debounce((formula: string) => {
    evaluateFormula(formula);
  }, 300),
  []
);

// ✅ Good - Memoized expensive calculations
const calculatedResult = useMemo(() => {
  if (!formula || !context) return null;
  return evaluateFormula(formula, context);
}, [formula, context]);

// ✅ Good - Lazy loading for heavy components
const SpreadsheetEditor = lazy(() => import('./spreadsheet-editor'));
```

## 🧪 Testing Requirements

### Test Coverage Rules
- **Formula engine:** 100% coverage required
- **UI components:** Test user interactions and edge cases
- **Hooks:** Test all state changes and side effects
- **Utils:** Test all branches and error conditions

### Test Examples

```typescript
// ✅ Good test structure
describe('FormulaEngine', () => {
  describe('SUM function', () => {
    it('should calculate sum of numeric range correctly', () => {
      const context = createMockContext({
        A1: 10, A2: 20, A3: 30
      });
      
      const result = evaluateFormula('=SUM(A1:A3)', context);
      
      expect(result.value).toBe(60);
      expect(result.error).toBeNull();
    });
    
    it('should handle empty cells in range', () => {
      const context = createMockContext({
        A1: 10, A2: '', A3: 30
      });
      
      const result = evaluateFormula('=SUM(A1:A3)', context);
      
      expect(result.value).toBe(40);
    });
    
    it('should return error for invalid range', () => {
      const context = createMockContext({});
      
      const result = evaluateFormula('=SUM(Z1:Z999)', context);
      
      expect(result.error).toBeTruthy();
      expect(result.error?.type).toBe('ref_error');
    });
  });
});
```

## 🚀 Performance Guidelines

### Formula Engine Performance
- **Evaluation time:** Must be < 16ms for simple formulas
- **Memory usage:** Efficient handling of large ranges
- **Caching:** Cache computed results when appropriate

### UI Performance
- **First paint:** < 1 second
- **Interaction response:** < 100ms
- **Animation:** 60fps smooth animations
- **Bundle size:** Keep chunks under reasonable limits

### Optimization Techniques

```typescript
// ✅ Good - Efficient cell reference handling
const cellCache = new Map<string, CellValue>();

function getCellValue(ref: string, context: SpreadsheetContext): CellValue {
  // Check cache first
  if (cellCache.has(ref)) {
    return cellCache.get(ref)!;
  }
  
  // Calculate and cache result
  const value = calculateCellValue(ref, context);
  cellCache.set(ref, value);
  return value;
}

// ✅ Good - Debounced user input
const handleFormulaInput = useCallback(
  debounce((value: string) => {
    setFormula(value);
    validateFormula(value);
  }, 300),
  []
);
```

## 🔧 Development Tools

### Required Tools
- **TypeScript:** Strict mode enabled
- **ESLint:** Follow project configuration
- **Prettier:** Auto-format on save
- **Jest:** For testing
- **React Testing Library:** For component tests

### Recommended VS Code Extensions
- TypeScript Hero
- ESLint
- Prettier
- Jest Runner
- Tailwind CSS IntelliSense
- Auto Rename Tag

## 📊 Quality Checklist

### Before Submitting Code
- [ ] All tests pass (`npm test`)
- [ ] TypeScript compiles without errors (`npm run type-check`)
- [ ] ESLint passes without errors (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Functions have JSDoc comments
- [ ] Components are accessible (keyboard + screen reader)
- [ ] Responsive design works on mobile
- [ ] Performance is acceptable (no console warnings)
- [ ] Indonesian content is friendly and clear

### Code Review Checklist
- [ ] Follows naming conventions
- [ ] Proper error handling
- [ ] Accessibility compliance
- [ ] Performance considerations
- [ ] Test coverage adequate
- [ ] Documentation complete
- [ ] Security considerations addressed

## 🎯 Success Metrics

### Technical Metrics
- **Test coverage:** ≥ 80%
- **TypeScript coverage:** 100% (no any types)
- **Performance:** Core Web Vitals in green
- **Accessibility:** WCAG 2.1 AA compliance

### User Experience Metrics
- **Load time:** < 3 seconds initial load
- **Interaction time:** < 100ms response
- **Error rate:** < 1% formula evaluation errors
- **Completion rate:** > 80% chapter completion

---

**Remember:** These guidelines ensure we build a high-quality, accessible, and performant learning platform that truly helps Indonesian users master Excel skills. Quality over speed - always! 🚀