"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  RotateCcw, 
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react"
import { motion } from "framer-motion"
import { useState, useCallback } from "react"

interface SpreadsheetSimulatorProps {
  chapterId: number
  lessonId: number
  onFormulaComplete?: (formula: string, result: string | number) => void
}

interface CellData {
  value: string | number
  formula?: string
  type: 'text' | 'number' | 'formula'
  error?: string
}

interface SpreadsheetData {
  [key: string]: CellData
}

/**
 * Evaluasi formula Excel sederhana
 * Dalam implementasi nyata, ini akan menggunakan formula engine yang lebih kompleks
 */
function evaluateFormula(formula: string, data: SpreadsheetData): { result: string | number; error?: string } {
  try {
    // Hapus tanda = di awal
    const cleanFormula = formula.replace(/^=/, '')
    
    // Handle SUM function
    if (cleanFormula.startsWith('SUM(')) {
      const rangeMatch = cleanFormula.match(/SUM\(([A-Z]+\d+):([A-Z]+\d+)\)/)
      if (rangeMatch) {
        const [, startCell, endCell] = rangeMatch
        const sum = calculateSumRange(startCell, endCell, data)
        return { result: sum }
      }
      
      // Handle individual cells: SUM(A1,B1,C1)
      const cellsMatch = cleanFormula.match(/SUM\(([A-Z]+\d+(?:,[A-Z]+\d+)*)\)/)
      if (cellsMatch) {
        const cells = cellsMatch[1].split(',')
        const sum = cells.reduce((total, cell) => {
          const cellValue = data[cell.trim()]?.value
          return total + (typeof cellValue === 'number' ? cellValue : 0)
        }, 0)
        return { result: sum }
      }
    }
    
    // Handle AVERAGE function
    if (cleanFormula.startsWith('AVERAGE(')) {
      const rangeMatch = cleanFormula.match(/AVERAGE\(([A-Z]+\d+):([A-Z]+\d+)\)/)
      if (rangeMatch) {
        const [, startCell, endCell] = rangeMatch
        const { sum, count } = calculateSumAndCountRange(startCell, endCell, data)
        return { result: count > 0 ? sum / count : 0 }
      }
    }
    
    // Handle simple arithmetic
    if (/^[A-Z]+\d+[+\-*/][A-Z]+\d+$/.test(cleanFormula)) {
      const match = cleanFormula.match(/^([A-Z]+\d+)([+\-*/])([A-Z]+\d+)$/)
      if (match) {
        const [, cell1, operator, cell2] = match
        const val1 = data[cell1]?.value || 0
        const val2 = data[cell2]?.value || 0
        
        if (typeof val1 !== 'number' || typeof val2 !== 'number') {
          return { result: 0, error: '#VALUE!' }
        }
        
        switch (operator) {
          case '+': return { result: val1 + val2 }
          case '-': return { result: val1 - val2 }
          case '*': return { result: val1 * val2 }
          case '/': return val2 !== 0 ? { result: val1 / val2 } : { result: 0, error: '#DIV/0!' }
          default: return { result: 0, error: '#NAME?' }
        }
      }
    }
    
    // Handle cell references
    if (/^[A-Z]+\d+$/.test(cleanFormula)) {
      const cellValue = data[cleanFormula]?.value
      return { result: cellValue || 0 }
    }
    
    return { result: 0, error: '#NAME?' }
  } catch (error) {
    return { result: 0, error: '#VALUE!' }
  }
}

/**
 * Hitung sum untuk range sel
 */
function calculateSumRange(startCell: string, endCell: string, data: SpreadsheetData): number {
  const startCol = startCell.match(/[A-Z]+/)?.[0] || 'A'
  const startRow = parseInt(startCell.match(/\d+/)?.[0] || '1')
  const endCol = endCell.match(/[A-Z]+/)?.[0] || 'A'
  const endRow = parseInt(endCell.match(/\d+/)?.[0] || '1')
  
  let sum = 0
  
  // Untuk simplifikasi, hanya handle kolom yang sama
  if (startCol === endCol) {
    for (let row = startRow; row <= endRow; row++) {
      const cellKey = `${startCol}${row}`
      const cellValue = data[cellKey]?.value
      if (typeof cellValue === 'number') {
        sum += cellValue
      }
    }
  }
  
  return sum
}

/**
 * Hitung sum dan count untuk range sel (untuk AVERAGE)
 */
function calculateSumAndCountRange(startCell: string, endCell: string, data: SpreadsheetData): { sum: number; count: number } {
  const startCol = startCell.match(/[A-Z]+/)?.[0] || 'A'
  const startRow = parseInt(startCell.match(/\d+/)?.[0] || '1')
  const endCol = endCell.match(/[A-Z]+/)?.[0] || 'A'
  const endRow = parseInt(endCell.match(/\d+/)?.[0] || '1')
  
  let sum = 0
  let count = 0
  
  // Untuk simplifikasi, hanya handle kolom yang sama
  if (startCol === endCol) {
    for (let row = startRow; row <= endRow; row++) {
      const cellKey = `${startCol}${row}`
      const cellValue = data[cellKey]?.value
      if (typeof cellValue === 'number') {
        sum += cellValue
        count++
      }
    }
  }
  
  return { sum, count }
}

/**
 * Generate data awal berdasarkan chapter dan lesson
 */
function getInitialData(chapterId: number, lessonId: number): SpreadsheetData {
  const scenarios: Record<string, SpreadsheetData> = {
    "1-1": {
      A1: { value: "Nama", type: "text" },
      B1: { value: "Nilai", type: "text" },
      A2: { value: "Andi", type: "text" },
      B2: { value: 85, type: "number" },
      A3: { value: "Budi", type: "text" },
      B3: { value: 90, type: "number" },
      A4: { value: "Citra", type: "text" },
      B4: { value: 78, type: "number" }
    },
    "2-1": {
      A1: { value: "Produk", type: "text" },
      B1: { value: "Penjualan", type: "text" },
      A2: { value: "Laptop", type: "text" },
      B2: { value: 15000000, type: "number" },
      A3: { value: "Mouse", type: "text" },
      B3: { value: 250000, type: "number" },
      A4: { value: "Keyboard", type: "text" },
      B4: { value: 500000, type: "number" },
      A5: { value: "Monitor", type: "text" },
      B5: { value: 3000000, type: "number" },
      A6: { value: "Speaker", type: "text" },
      B6: { value: 750000, type: "number" }
    }
  }
  
  const key = `${chapterId}-${lessonId}`
  return scenarios[key] || scenarios["1-1"]
}

/**
 * Komponen simulator spreadsheet untuk pembelajaran Excel
 * Menyediakan interface mirip Excel dengan evaluasi formula dasar
 */
export function SpreadsheetSimulator({ chapterId, lessonId, onFormulaComplete }: SpreadsheetSimulatorProps) {
  const [data, setData] = useState<SpreadsheetData>(() => getInitialData(chapterId, lessonId))
  const [selectedCell, setSelectedCell] = useState<string>('A1')
  const [formulaInput, setFormulaInput] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [lastResult, setLastResult] = useState<{ formula: string; result: string | number; error?: string } | null>(null)
  
  // Generate kolom A-J dan baris 1-10
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const rows = Array.from({ length: 10 }, (_, i) => i + 1)
  
  /**
   * Handle klik sel
   */
  const handleCellClick = useCallback((cellKey: string) => {
    setSelectedCell(cellKey)
    const cellData = data[cellKey]
    if (cellData?.formula) {
      setFormulaInput(cellData.formula)
    } else {
      setFormulaInput(cellData?.value?.toString() || '')
    }
    setIsEditing(false)
  }, [data])
  
  /**
   * Handle input formula
   */
  const handleFormulaSubmit = useCallback(() => {
    if (!formulaInput.trim()) return
    
    const newData = { ...data }
    
    if (formulaInput.startsWith('=')) {
      // Formula
      const evaluation = evaluateFormula(formulaInput, data)
      newData[selectedCell] = {
        value: evaluation.error || evaluation.result,
        formula: formulaInput,
        type: 'formula',
        error: evaluation.error
      }
      
      setLastResult({
        formula: formulaInput,
        result: evaluation.result,
        error: evaluation.error
      })
      
      if (onFormulaComplete && !evaluation.error) {
        onFormulaComplete(formulaInput, evaluation.result)
      }
    } else {
      // Value biasa
      const numValue = parseFloat(formulaInput)
      newData[selectedCell] = {
        value: isNaN(numValue) ? formulaInput : numValue,
        type: isNaN(numValue) ? 'text' : 'number'
      }
    }
    
    setData(newData)
    setIsEditing(false)
  }, [formulaInput, selectedCell, data, onFormulaComplete])
  
  /**
   * Reset spreadsheet ke data awal
   */
  const resetSpreadsheet = useCallback(() => {
    setData(getInitialData(chapterId, lessonId))
    setSelectedCell('A1')
    setFormulaInput('')
    setLastResult(null)
  }, [chapterId, lessonId])
  
  /**
   * Format nilai sel untuk tampilan
   */
  const formatCellValue = (cellData: CellData | undefined): string => {
    if (!cellData) return ''
    
    if (cellData.error) {
      return cellData.error
    }
    
    if (typeof cellData.value === 'number') {
      // Format angka dengan pemisah ribuan untuk angka besar
      if (cellData.value >= 1000) {
        return cellData.value.toLocaleString('id-ID')
      }
      return cellData.value.toString()
    }
    
    return cellData.value?.toString() || ''
  }
  
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Play className="w-5 h-5 text-green-600" />
              Excel Simulator
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetSpreadsheet}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {/* Formula Bar */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {selectedCell}
              </Badge>
              <div className="flex-1">
                <Input
                  value={formulaInput}
                  onChange={(e) => setFormulaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleFormulaSubmit()
                    } else if (e.key === 'Escape') {
                      setIsEditing(false)
                      setFormulaInput(data[selectedCell]?.value?.toString() || '')
                    }
                  }}
                  onFocus={() => setIsEditing(true)}
                  placeholder="Ketik nilai atau formula (mulai dengan =)"
                  className="font-mono text-sm"
                />
              </div>
              <Button size="sm" onClick={handleFormulaSubmit}>
                <CheckCircle className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Formula Result */}
            {lastResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-2 rounded-lg text-sm ${
                  lastResult.error 
                    ? 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                    : 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {lastResult.error ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  <span className="font-mono">{lastResult.formula}</span>
                  <span>=</span>
                  <span className="font-semibold">
                    {lastResult.error || lastResult.result}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Spreadsheet Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-12 h-8 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs font-medium text-gray-600 dark:text-gray-400">
                    {/* Empty corner */}
                  </th>
                  {columns.map((col) => (
                    <th 
                      key={col}
                      className="min-w-20 h-8 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs font-medium text-gray-600 dark:text-gray-400"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row}>
                    <td className="w-12 h-8 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-xs font-medium text-gray-600 dark:text-gray-400 text-center">
                      {row}
                    </td>
                    {columns.map((col) => {
                      const cellKey = `${col}${row}`
                      const cellData = data[cellKey]
                      const isSelected = selectedCell === cellKey
                      const hasError = cellData?.error
                      
                      return (
                        <td
                          key={cellKey}
                          onClick={() => handleCellClick(cellKey)}
                          className={`min-w-20 h-8 border border-gray-300 dark:border-gray-600 text-xs cursor-pointer transition-colors ${
                            isSelected 
                              ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-400' 
                              : hasError
                              ? 'bg-red-50 dark:bg-red-950'
                              : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className={`px-2 py-1 truncate ${
                            hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'
                          } ${
                            cellData?.type === 'number' ? 'text-right' : 'text-left'
                          }`}>
                            {formatCellValue(cellData)}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Tips */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">Tips Penggunaan:</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Klik sel untuk memilih, lalu ketik nilai atau formula</li>
                <li>• Formula dimulai dengan tanda = (contoh: =SUM(B2:B6))</li>
                <li>• Tekan Enter untuk menjalankan formula</li>
                <li>• Gunakan range seperti A1:A5 untuk memilih beberapa sel</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}