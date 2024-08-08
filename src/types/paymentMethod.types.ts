export interface PaymentMethodBody {
    name: string,
    description: string,
}

export interface PaymentMethod {
    paymentMethodId: number,
    name: string,
    description: string,
}