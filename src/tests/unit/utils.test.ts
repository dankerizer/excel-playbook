import { 
  cn, 
  formatCurrency, 
  formatPercentage, 
  generateId, 
  capitalizeWords, 
  truncateText 
} from '@/lib/utils'

describe('Utils Functions', () => {
  describe('cn', () => {
    it('should combine class names correctly', () => {
      const result = cn('class1', 'class2', { 'class3': true, 'class4': false })
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
      expect(result).not.toContain('class4')
    })
  })

  describe('formatCurrency', () => {
    it('should format currency in Indonesian Rupiah', () => {
      const result = formatCurrency(1000000)
      expect(result).toContain('Rp')
      expect(result).toContain('1.000.000')
    })

    it('should handle zero amount', () => {
      const result = formatCurrency(0)
      expect(result).toContain('Rp')
      expect(result).toContain('0')
    })
  })

  describe('formatPercentage', () => {
    it('should format percentage correctly', () => {
      const result = formatPercentage(0.75)
      expect(result).toContain('75')
      expect(result).toContain('%')
    })

    it('should handle zero percentage', () => {
      const result = formatPercentage(0)
      expect(result).toContain('0%')
    })
  })

  describe('generateId', () => {
    it('should generate ID with default length', () => {
      const id = generateId()
      expect(id).toHaveLength(8)
      expect(typeof id).toBe('string')
    })

    it('should generate ID with custom length', () => {
      const id = generateId(12)
      expect(id).toHaveLength(12)
    })

    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })
  })

  describe('capitalizeWords', () => {
    it('should capitalize first letter of each word', () => {
      const result = capitalizeWords('hello world test')
      expect(result).toBe('Hello World Test')
    })

    it('should handle single word', () => {
      const result = capitalizeWords('hello')
      expect(result).toBe('Hello')
    })

    it('should handle empty string', () => {
      const result = capitalizeWords('')
      expect(result).toBe('')
    })
  })

  describe('truncateText', () => {
    it('should truncate text longer than max length', () => {
      const text = 'This is a very long text that should be truncated'
      const result = truncateText(text, 20)
      expect(result).toHaveLength(20)
      expect(result.endsWith('...')).toBe(true)
    })

    it('should not truncate text shorter than max length', () => {
      const text = 'Short text'
      const result = truncateText(text, 20)
      expect(result).toBe(text)
      expect(result.endsWith('...')).toBe(false)
    })

    it('should handle exact length', () => {
      const text = 'Exact length text!!!'
      const result = truncateText(text, 20)
      expect(result).toBe(text)
    })
  })
})