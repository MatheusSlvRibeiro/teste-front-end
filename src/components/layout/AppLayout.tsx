import type { ReactNode } from 'react';
import { TopBar } from './TopBar/TopBar';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

type AppLayoutProps = {
    children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <TopBar />
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
