import { Header } from '@/components/Header/Header';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import { TopBar } from '@/components/TopBar/TopBar';

export default function Home() {
    return (
        <main>
            <TopBar />
            <Header />
            <HeroBanner />
        </main>
    );
}
