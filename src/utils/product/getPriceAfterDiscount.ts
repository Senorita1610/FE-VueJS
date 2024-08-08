export const getRealPrice = (price: number, discountPercentage: number): number => {
    if (discountPercentage <= 0) {
        return price
    }

    const discountPercentagePrice =
        (price * discountPercentage) / 100;

    return price + discountPercentagePrice
}

