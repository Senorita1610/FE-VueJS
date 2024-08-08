import { ICart } from "@/types/cart.types"

export const getTotalAmount = (carts: ICart[]) => {

    const totalAmount = carts.reduce((sum, item: ICart): number => {
        const totalPriceForItem = item.quantity * item.productVariant.price;
        return sum + totalPriceForItem
    }, 0)

    return totalAmount
}