export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value / 100);
}

export function formatInstallments(
    price: number,
    installments: number = 2,
    installmentValueOverride?: number,
): string {
    const installmentValue = installmentValueOverride ?? price / installments;
    return `ou ${installments}x de ${formatCurrency(installmentValue)} sem juros`;
}

export function getOldPrice(price: number): number {
    return Math.round(price * 1.1);
}
