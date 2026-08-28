import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { ProductDetailModal } from '@/components/ProductDetailModal/ProductDetailModal'
import { getProducts } from '@/lib/api/products'
import type { Product } from '@/schemas/product'
import styles from './App.module.scss'

type FetchState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; products: Product[] }

function App() {
  const [state, setState] = useState<FetchState>({ status: 'loading' })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    let cancelled = false

    getProducts()
      .then((products) => {
        if (!cancelled) setState({ status: 'success', products })
      })
      .catch(() => {
        if (!cancelled) {
          setState({ status: 'error', message: 'Não foi possível carregar os produtos.' })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Vitrine de produtos</h1>
      </header>
      <main>
        <section aria-labelledby="vitrine-heading" className={styles.vitrine}>
          <h2 id="vitrine-heading" className={styles.vitrine__heading}>
            Todos os produtos
          </h2>

          {state.status === 'loading' && <p role="status">Carregando produtos…</p>}
          {state.status === 'error' && <p role="alert">{state.message}</p>}
          {state.status === 'success' && (
            <div className={styles.vitrine__grid}>
              {state.products.map((product) => (
                <ProductCard
                  key={product.productName}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}

export default App
