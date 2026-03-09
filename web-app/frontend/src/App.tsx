import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { TemplatesPage } from './pages/TemplatesPage'
import { TemplatePage } from './pages/TemplatePage'
import { GeneratorPage } from './pages/GeneratorPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"                   element={<HomePage />} />
          <Route path="/templates"          element={<TemplatesPage />} />
          <Route path="/templates/:id"      element={<TemplatePage />} />
          <Route path="/generate"           element={<GeneratorPage />} />
          <Route path="*"                   element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
