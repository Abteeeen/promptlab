import { useState, useCallback, useRef } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: false, error: null })
  const mountedRef = useRef(true)

  const execute = useCallback(async (fn: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null })
    try {
      const data = await fn()
      if (mountedRef.current) setState({ data, loading: false, error: null })
      return data
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Something went wrong'
      if (mountedRef.current) setState({ data: null, loading: false, error })
      return null
    }
  }, [])

  return { ...state, execute }
}
