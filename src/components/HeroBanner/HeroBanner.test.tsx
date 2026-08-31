import { render, screen } from '@testing-library/react';
import { HeroBanner } from './HeroBanner';

describe('HeroBanner', () => {
    it('renders the promotional heading', () => {
        render(<HeroBanner />);

        expect(
            screen.getByRole('heading', {
                name: /venha conhecer nossas promocoes/i,
            }),
        ).toBeInTheDocument();
    });

    it('renders the CTA button', () => {
        render(<HeroBanner />);

        expect(
            screen.getByRole('button', { name: /ver produto/i }),
        ).toBeInTheDocument();
    });
});
