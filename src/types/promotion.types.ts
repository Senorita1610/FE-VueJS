import { Package } from "./package.types";

export interface PromotionBody {
    content: string,
    startDate: string,
    endDate: string,
    packageDTO: Package | null,
}

export interface Promotion {
    promotionId: number,
    content: string,
    startDate: string,
    endDate: string,
    packageDTO: Package | null,
}