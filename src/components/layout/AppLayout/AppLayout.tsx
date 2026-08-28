import { Outlet } from 'react-router'
import { Footer } from '@/components/layout/Footer/Footer'
import { Header } from '@/components/layout/Header/Header'
import { NavBar } from '@/components/layout/NavBar/NavBar'
import { Newsletter } from '@/components/layout/Newsletter/Newsletter'

export function AppLayout() {
    return (
        <>
            <Header />
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Newsletter />
            <Footer />
        </>
    )
}
