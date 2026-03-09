export interface Template {
  id: string
  name: string
  description: string
  category: string
  domain: string
  qualityScore: number
  brackets?: string[]
  mainTemplate?: string
  quickTemplate?: string
  examples?: string[]
  variations?: string[]
  proTips?: string[]
  qualityChecklist?: string[]
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'checkbox'
  placeholder?: string
  help?: string
  required?: boolean
  options?: string[]
}

export interface FormStructure {
  templateId: string
  mode: 'quick' | 'standard' | 'advanced'
  fields: FormField[]
  proTips: string[]
}

export interface PromptVariation {
  label: string
  text: string
}

export interface QualityDimension {
  key: string
  label: string
  description: string
  score: number
  maxScore: number
}

export interface QualityScore {
  overallScore: number
  breakdown: Record<string, number>
  rating: 'Excellent' | 'Good' | 'Okay' | 'Needs Work'
  suggestion: string
  dimensions: QualityDimension[]
}

export interface GenerateResult {
  templateId: string
  templateName: string
  formData: Record<string, string>
  variations: PromptVariation[]
  prompt: string
  qualityScore: QualityScore
}

export interface SearchResult {
  id: string
  name: string
  description: string
  category: string
  relevanceScore: number
}

export type FormData = Record<string, string>
