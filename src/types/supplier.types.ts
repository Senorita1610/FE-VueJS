export interface SupplierBody {
    address: string,
    description: string,
    name: string,
    product: string,
    quantity: number,
}

export interface Supplier {
    supplierId: number,
    address: string,
    description: string,
    name: string,
    product: string,
    quantity: number,
}