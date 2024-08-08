import { Category } from "./category.types";
import { Supplier } from "./supplier.types";

export interface PackageBody {
    subDesc: string,
    description: string,
    name: string,
    price: number,
    quantity: number,
    releaseDate: string,
    validity: number,
    slug: string,
    category: Category | null,
    supplier: Supplier | null,
}

export interface Package {
    packageId: number,
    subDesc: string,
    description: string,
    name: string,
    price: number,
    quantity: number,
    releaseDate: string,
    validity: number,
    slug: string,
    category: Category | null,
    supplier: Supplier | null,
}