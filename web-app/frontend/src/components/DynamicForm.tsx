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

        if (field.type === 'checkbox') {
          const checked = value === 'true'
          return (
            <label
              key={field.name}
              className="glass p-4 rounded-xl flex items-start gap-3 cursor-pointer select-none"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={e => onChange(field.name, String(e.target.checked))}
                className="mt-0.5"
              />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">{field.label}</div>
                {field.help && <div className="text-xs text-gray-500 mt-0.5">{field.help}</div>}
              </div>
            </label>
          )
        }

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
