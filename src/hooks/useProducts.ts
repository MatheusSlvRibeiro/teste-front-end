import { useCallback, useEffect, useReducer, useState } from 'react'
import type { Product } from '@/schemas/product'
import { productsService } from '@/services/productsService'

interface State {
    products: Product[]
    loading: boolean
    error: string | null
}

type Action = { type: 'loading' } | { type: 'success'; products: Product[] } | { type: 'error' }

function reducer(_: State, action: Action): State {
    switch (action.type) {
        case 'loading':
            return { products: [], loading: true, error: null }
        case 'success':
            return { products: action.products, loading: false, error: null }
        case 'error':
            return { products: [], loading: false, error: 'Não foi possível carregar os produtos.' }
    }
}

const INITIAL_STATE: State = { products: [], loading: true, error: null }

export interface UseProductsResult {
    products: Product[]
    loading: boolean
    error: string | null
    retry: () => void
}

export function useProducts(): UseProductsResult {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const [retryCount, setRetryCount] = useState(0)

    useEffect(() => {
        let cancelled = false
        dispatch({ type: 'loading' })

        productsService
            .getRelatedProducts()
            .then((data) => {
                if (!cancelled) dispatch({ type: 'success', products: data })
            })
            .catch(() => {
                if (!cancelled) dispatch({ type: 'error' })
            })

        return () => {
            cancelled = true
        }
    }, [retryCount])

    const retry = useCallback(() => setRetryCount((c) => c + 1), [])

    return { ...state, retry }
}
