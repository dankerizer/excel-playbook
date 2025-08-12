"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Calculator, 
  Plus, 
  Minus, 
  Copy, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  Lightbulb, 
  Zap
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FormulaFunction {
  id: string
  name: string
  category: string
  description: string
  syntax: string
  parameters: {
    name: string
    type: 'range' | 'number' | 'text' | 'boolean'
    required: boolean
    description: string
    example?: string
  }[]
  example: string
  tips?: string[]
}

interface FormulaBuilderProps {
  onFormulaGenerated?: (formula: string) => void
  initialFunction?: string
  className?: string
}

/**
 * Data fungsi Excel yang tersedia untuk builder
 */
const availableFunctions: FormulaFunction[] = [
  {
    id: "sum",
    name: "SUM",
    category: "Matematika",
    description: "Menjumlahkan semua angka dalam range yang ditentukan",
    syntax: "SUM(number1, [number2], ...)",
    parameters: [
      {
        name: "range",
        type: "range",
        required: true,
        description: "Range sel yang akan dijumlahkan",
        example: "A1:A10"
      }
    ],
    example: "=SUM(A1:A10)",
    tips: [
      "Gunakan : untuk range sel (A1:A10)",
      "Bisa menambahkan beberapa range dengan koma",
      "Sel kosong akan diabaikan"
    ]
  },
  {
    id: "average",
    name: "AVERAGE",
    category: "Matematika",
    description: "Menghitung rata-rata dari range angka",
    syntax: "AVERAGE(number1, [number2], ...)",
    parameters: [
      {
        name: "range",
        type: "range",
        required: true,
        description: "Range sel untuk dihitung rata-ratanya",
        example: "B1:B20"
      }
    ],
    example: "=AVERAGE(B1:B20)",
    tips: [
      "Sel kosong dan teks akan diabaikan",
      "Gunakan untuk analisis data numerik"
    ]
  },
  {
    id: "if",
    name: "IF",
    category: "Logika",
    description: "Mengembalikan nilai berdasarkan kondisi yang diberikan",
    syntax: "IF(logical_test, value_if_true, value_if_false)",
    parameters: [
      {
        name: "condition",
        type: "text",
        required: true,
        description: "Kondisi yang akan dievaluasi",
        example: "A1>10"
      },
      {
        name: "value_if_true",
        type: "text",
        required: true,
        description: "Nilai jika kondisi benar",
        example: "\"Lulus\""
      },
      {
        name: "value_if_false",
        type: "text",
        required: true,
        description: "Nilai jika kondisi salah",
        example: "\"Tidak Lulus\""
      }
    ],
    example: "=IF(A1>75, \"Lulus\", \"Tidak Lulus\")",
    tips: [
      "Gunakan tanda kutip untuk teks",
      "Bisa digabung dengan fungsi lain",
      "Operator: >, <, >=, <=, =, <>"
    ]
  },
  {
    id: "vlookup",
    name: "VLOOKUP",
    category: "Pencarian",
    description: "Mencari nilai dalam tabel secara vertikal",
    syntax: "VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
    parameters: [
      {
        name: "lookup_value",
        type: "text",
        required: true,
        description: "Nilai yang dicari",
        example: "A1"
      },
      {
        name: "table_array",
        type: "range",
        required: true,
        description: "Range tabel pencarian",
        example: "B:D"
      },
      {
        name: "col_index",
        type: "number",
        required: true,
        description: "Nomor kolom hasil (dimulai dari 1)",
        example: "3"
      },
      {
        name: "exact_match",
        type: "boolean",
        required: false,
        description: "TRUE untuk pencarian persis, FALSE untuk pendekatan",
        example: "FALSE"
      }
    ],
    example: "=VLOOKUP(A1, B:D, 3, FALSE)",
    tips: [
      "Kolom pencarian harus di sebelah kiri",
      "Gunakan FALSE untuk pencarian persis",
      "Pastikan data terurut jika menggunakan TRUE"
    ]
  },
  {
    id: "concatenate",
    name: "CONCATENATE",
    category: "Teks",
    description: "Menggabungkan beberapa teks menjadi satu",
    syntax: "CONCATENATE(text1, [text2], ...)",
    parameters: [
      {
        name: "text1",
        type: "text",
        required: true,
        description: "Teks pertama",
        example: "A1"
      },
      {
        name: "text2",
        type: "text",
        required: false,
        description: "Teks kedua",
        example: "\" \""
      },
      {
        name: "text3",
        type: "text",
        required: false,
        description: "Teks ketiga",
        example: "B1"
      }
    ],
    example: "=CONCATENATE(A1, \" \", B1)",
    tips: [
      "Gunakan tanda kutip untuk teks literal",
      "Alternatif: gunakan operator & (A1&\" \"&B1)",
      "Bisa menggabungkan banyak sel sekaligus"
    ]
  }
]

/**
 * Komponen FormulaBuilder untuk membantu pengguna membangun formula Excel
 * Menyediakan interface visual untuk memilih fungsi dan mengisi parameter
 */
export function FormulaBuilder({ 
  onFormulaGenerated, 
  initialFunction,
  className 
}: FormulaBuilderProps) {
  const [selectedFunction, setSelectedFunction] = useState<FormulaFunction | null>(null)
  const [parameters, setParameters] = useState<Record<string, string>>({})
  const [generatedFormula, setGeneratedFormula] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  // Set initial function jika ada
  useEffect(() => {
    if (initialFunction) {
      const func = availableFunctions.find(f => f.id === initialFunction)
      if (func) {
        setSelectedFunction(func)
      }
    }
  }, [initialFunction])
  
  // Generate formula ketika function atau parameter berubah
  useEffect(() => {
    if (selectedFunction) {
      generateFormula()
    }
  }, [selectedFunction, parameters])
  
  /**
   * Validasi parameter berdasarkan tipe
   */
  const validateParameter = (param: FormulaFunction['parameters'][0], value: string): string | null => {
    if (param.required && !value.trim()) {
      return "Parameter ini wajib diisi"
    }
    
    if (value.trim() && param.type === 'number' && isNaN(Number(value))) {
      return "Harus berupa angka"
    }
    
    if (value.trim() && param.type === 'range' && !/^[A-Z]+\d+:[A-Z]+\d+$|^[A-Z]+:[A-Z]+$/.test(value)) {
      return "Format range tidak valid (contoh: A1:A10 atau A:A)"
    }
    
    return null
  }
  
  /**
   * Generate formula berdasarkan function dan parameter yang dipilih
   */
  const generateFormula = () => {
    if (!selectedFunction) return
    
    const newErrors: Record<string, string> = {}
    const paramValues: string[] = []
    
    // Validasi dan kumpulkan parameter
    selectedFunction.parameters.forEach((param) => {
      const value = parameters[param.name] || ""
      const error = validateParameter(param, value)
      
      if (error) {
        newErrors[param.name] = error
      } else if (value.trim()) {
        paramValues.push(value.trim())
      } else if (param.required) {
        newErrors[param.name] = "Parameter ini wajib diisi"
      }
    })
    
    setErrors(newErrors)
    
    // Generate formula jika tidak ada error
    if (Object.keys(newErrors).length === 0 && paramValues.length > 0) {
      const formula = `=${selectedFunction.name}(${paramValues.join(", ")})`
      setGeneratedFormula(formula)
      
      if (onFormulaGenerated) {
        onFormulaGenerated(formula)
      }
    } else {
      setGeneratedFormula("")
    }
  }
  
  /**
   * Handle perubahan parameter
   */
  const handleParameterChange = (paramName: string, value: string) => {
    setParameters(prev => ({
      ...prev,
      [paramName]: value
    }))
  }
  
  /**
   * Handle copy formula ke clipboard
   */
  const handleCopyFormula = async () => {
    if (!generatedFormula) return
    
    try {
      await navigator.clipboard.writeText(generatedFormula)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy formula:', err)
    }
  }
  
  /**
   * Reset builder
   */
  const handleReset = () => {
    setSelectedFunction(null)
    setParameters({})
    setGeneratedFormula("")
    setErrors({})
    setCopied(false)
  }
  
  /**
   * Handle pemilihan function
   */
  const handleFunctionSelect = (functionId: string) => {
    const func = availableFunctions.find(f => f.id === functionId)
    if (func) {
      setSelectedFunction(func)
      setParameters({})
      setErrors({})
    }
  }
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Function Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Formula Builder
          </CardTitle>
          <CardDescription>
            Bangun formula Excel dengan mudah menggunakan interface visual
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="function-select">Pilih Fungsi</Label>
            <Select value={selectedFunction?.id || ""} onValueChange={handleFunctionSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih fungsi Excel..." />
              </SelectTrigger>
              <SelectContent>
                {availableFunctions.map((func) => (
                  <SelectItem key={func.id} value={func.id}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{func.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {func.category}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedFunction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg"
            >
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                {selectedFunction.name}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                {selectedFunction.description}
              </p>
              <code className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                {selectedFunction.syntax}
              </code>
            </motion.div>
          )}
        </CardContent>
      </Card>
      
      {/* Parameter Input */}
      {selectedFunction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Parameter</CardTitle>
              <CardDescription>
                Isi parameter yang diperlukan untuk fungsi {selectedFunction.name}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {selectedFunction.parameters.map((param, index) => (
                <motion.div
                  key={param.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor={param.name} className="flex items-center gap-2">
                    {param.name}
                    {param.required && <span className="text-red-500">*</span>}
                    <Badge variant="outline" className="text-xs">
                      {param.type}
                    </Badge>
                  </Label>
                  
                  <Input
                    id={param.name}
                    placeholder={param.example || `Masukkan ${param.name}...`}
                    value={parameters[param.name] || ""}
                    onChange={(e) => handleParameterChange(param.name, e.target.value)}
                    className={errors[param.name] ? "border-red-500" : ""}
                  />
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {param.description}
                  </p>
                  
                  {errors[param.name] && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors[param.name]}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Generated Formula */}
      {selectedFunction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Formula yang Dihasilkan
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  value={generatedFormula || "Formula akan muncul di sini..."}
                  readOnly
                  className={`font-mono text-lg ${generatedFormula ? 'bg-green-50 dark:bg-green-950' : 'bg-gray-50 dark:bg-gray-900'}`}
                  rows={3}
                />
                
                {generatedFormula && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyFormula}
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
                
                {generatedFormula && (
                  <Button
                    onClick={handleCopyFormula}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Salin Formula
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Tips */}
      {selectedFunction?.tips && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <Lightbulb className="w-5 h-5" />
                Tips & Trik
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2">
                {selectedFunction.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-sm text-yellow-700 dark:text-yellow-300 flex items-start gap-2"
                  >
                    <span className="text-yellow-600 dark:text-yellow-400 mt-1">•</span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}