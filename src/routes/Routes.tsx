import { Navigate, Route, Routes as RouterRoutes } from 'react-router'
import { AppLayout } from '@/components/layout/AppLayout/AppLayout'
import { Home } from '@/pages/Home/Home'

export function Routes() {
  return (
    <RouterRoutes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </RouterRoutes>
  )
}
