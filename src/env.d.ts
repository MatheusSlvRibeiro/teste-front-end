interface ImportMetaEnv {
  readonly VITE_PRODUCTS_API_URL?: string
  readonly VITE_USE_MOCK_API?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
