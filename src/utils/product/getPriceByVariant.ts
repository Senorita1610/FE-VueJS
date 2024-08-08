import { IProductVariant } from "@/types/product.types";

export const getPriceByVariant = (colorId?: number, memoryId?: number, productVariants?: IProductVariant[], basePrice?: number): number => {
    if (productVariants) {
        const productVariant = productVariants.find((variant) => variant.color?.id === colorId && variant.memory?.id === memoryId)
        if (productVariant) {
            return productVariant?.price as number
        }
        else {
            return -1
        }
    }
    return basePrice as number

}

export const getStockByVariant = (colorId?: number, memoryId?: number, productVariants?: IProductVariant[]): number => {
    if (productVariants) {
        const productVariant = productVariants.find((variant) => variant.color?.id === colorId && variant.memory?.id === memoryId)
        return productVariant?.stock as number
    }
    return 0

}