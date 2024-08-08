import { Package } from "./package.types";
import { PaymentMethod } from "./paymentMethod.types";
import { Promotion } from "./promotion.types";
import { Customer, Employee } from "./user.types";

export interface BillBody {
    totalPrice: number,
    customer: Customer | null,
    employee: Employee | null,
    paymentMethod: PaymentMethod | null,
    promotion: Promotion | null,
    packageDTO: Package | null
}

export interface Bill {
    billId: number,
    totalPrice: number,
    customer: Customer | null,
    employee: Employee | null,
    paymentMethod: PaymentMethod | null,
    promotion: Promotion | null,
    packageDTO: Package | null
}

export interface BillCustomer {
    phoneNumber: string,
    packageDTO: Package | null
}