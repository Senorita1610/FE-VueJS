export function formatMoney(amount: number): string {
    const formattedAmount = new Intl.NumberFormat('en-US').format(amount);
    return formattedAmount;
}