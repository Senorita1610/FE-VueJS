import { IProductVariant, IColor, IMemory } from "@/types/product.types";
export const getListVariant = (productVariants: IProductVariant[]) => {

    const uniqueColors: Set<string> = new Set();
    const uniqueMemories: Set<string> = new Set();

    productVariants?.forEach((variant) => {
        uniqueColors.add(JSON.stringify(variant.color));
        uniqueMemories.add(JSON.stringify(variant.memory));
    });

    const colorsArray = Array.from(uniqueColors).map((color) => JSON.parse(color) as IColor);
    const memoriesArray = Array.from(uniqueMemories).map((memory) => JSON.parse(memory) as IMemory);

    return {
        colorsArray,
        memoriesArray
    };
}
