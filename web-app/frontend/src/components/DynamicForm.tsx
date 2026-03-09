import React from 'react'
import type { FormField, FormData } from '../types'
import { Input, Textarea, Select } from './ui/Input'

interface Props {
  fields: FormField[]
  values: FormData
  onChange: (name: string, value: string) => void
}

export function DynamicForm({ fields, values, onChange }: Props) {
  return (
    <div className="space-y-4">
      {fields.map(field => {
        const value = values[field.name] || ''

        if (field.type === 'textarea') {
          return (
            <Textarea
              key={field.name}
              label={field.label}
              help={field.help}
              placeholder={field.placeholder}
              required={field.required}
              value={value}
              onChange={e => onChange(field.name, e.target.value)}
              rows={3}
            />
          )
        }

        if (field.type === 'select' && field.options) {
          return (
            <Select
              key={field.name}
              label={field.label}
              help={field.help}
              options={field.options}
              required={field.required}
              value={value}
              onChange={e => onChange(field.name, e.target.value)}
            />
          )
        }

        return (
          <Input
            key={field.name}
            label={field.label}
            help={field.help}
            placeholder={field.placeholder}
            required={field.required}
            value={value}
            onChange={e => onChange(field.name, e.target.value)}
          />
        )
      })}
    </div>
  )
}
