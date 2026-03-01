import styles from './TopBar.module.scss';
import safeIcon from '@assets/icons/safe.svg';
import truckIcon from '@assets/icons/truck.svg';
import cardIcon from '@assets/icons/card.svg';

type TopBarItem = {
    icon: string;
    prefix?: string;
    highlight: string;
    suffix?: string;
};

const topBarItems: TopBarItem[] = [
    {
        icon: safeIcon,
        prefix: 'Compra',
        highlight: '100% segura',
    },
    {
        icon: truckIcon,
        highlight: 'Frete gratis',
        suffix: 'acima de R$ 200',
    },
    {
        icon: cardIcon,
        highlight: 'Parcele',
        suffix: 'suas compras',
    },
];

export function TopBar() {
    return (
        <section className={styles.topbar} aria-label="Benefícios da loja">
            <ul className={styles.topbar__container}>
                {topBarItems.map((item) => (
                    <li
                        key={`${item.highlight}-${item.suffix ?? ''}`}
                        className={styles.topbar__item}
                    >
                        <img src={item.icon} alt="" aria-hidden="true" />
                        {item.prefix && <>{item.prefix} </>}
                        <strong>{item.highlight}</strong>
                        {item.suffix && <> {item.suffix}</>}
                    </li>
                ))}
            </ul>
        </section>
    );
}
