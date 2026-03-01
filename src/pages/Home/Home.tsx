import { CategoryIcons } from '@/components/CategoryIcons/CategoryIcons';
import { Header } from '@/components/Header/Header';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import { TopBar } from '@/components/TopBar/TopBar';
import styles from './Home.module.scss';

export default function Home() {
    return (
        <main>
            <TopBar />
            <Header />
            <HeroBanner />
            <div className={styles.constrainedContent}>
                <CategoryIcons />
            </div>
        </main>
    );
}
