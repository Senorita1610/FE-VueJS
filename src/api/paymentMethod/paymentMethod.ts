import { PaymentMethodBody, PaymentMethod } from "@/types/paymentMethod.types";
import { $axios } from "@plugins/axios/axios";

function getAllPaymentMethods() {
    return $axios.get('/payment-method/all');
}

function createPaymentMethod(paymentMethodCreate: PaymentMethodBody) {
    const token = localStorage.getItem("token");
    return $axios.post('/payment-method/create', paymentMethodCreate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function updatePaymentMethod(paymentMethodUpdate: PaymentMethod) {
    const token = localStorage.getItem("token");
    return $axios.put('/payment-method/update', paymentMethodUpdate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function deletePaymentMethod(paymentMethodId: number) {
    const token = localStorage.getItem("token");
    return $axios.delete(`/payment-method/${paymentMethodId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getPaymentMethodById(paymentMethodId: number) {
    const token = localStorage.getItem("token");
    return $axios.get(`/payment-method/${paymentMethodId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export default {
    getAllPaymentMethods,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    getPaymentMethodById,
};