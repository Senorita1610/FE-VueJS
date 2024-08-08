import { defineStore } from "pinia";
import { ref } from 'vue';
import type { PaymentMethodBody, PaymentMethod } from "@/types/paymentMethod.types";
import paymentMethodService from "@/api/paymentMethod/paymentMethod";

export const usePaymentMethodStore = defineStore("paymentMethod", () => {
    const paymentMethod = ref<PaymentMethod | null>(null);
    const paymentMethods = ref<PaymentMethod[]>([]);

    const createPaymentMethodDialog = ref(false);
    const updatePaymentMethodDialog = ref(false);
    const submitted = ref(false);
    const message = ref('');

    const getAllPaymentMethods = async () => {
        try {
            const response = await paymentMethodService.getAllPaymentMethods();
            if (response.data) {
                paymentMethods.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createPaymentMethod = async (paymentMethod: PaymentMethodBody) => {
        try {
            const response = await paymentMethodService.createPaymentMethod(paymentMethod);
            if (response.data.success) {
                paymentMethods.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;

        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    };

    const updatePaymentMethod = async (paymentMethod: PaymentMethod) => {
        try {
            const response = await paymentMethodService.updatePaymentMethod(paymentMethod);
            if (response.data.success) {
                const index = paymentMethods.value.findIndex((c) => c.paymentMethodId === paymentMethod.paymentMethodId);
                paymentMethods.value[index] = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const deletePaymentMethod = async (id: number) => {
        try {
            const response = await paymentMethodService.deletePaymentMethod(id);
            if (response.data.success) {
                paymentMethods.value = paymentMethods.value.filter((c) => c.paymentMethodId !== id);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getPaymentMethodById = async (id: number) => {
        try {
            const response = await paymentMethodService.getPaymentMethodById(id);
            if (response.data) {
                paymentMethod.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return {
        paymentMethod,
        paymentMethods,
        createPaymentMethodDialog,
        updatePaymentMethodDialog,
        submitted,
        message,
        getAllPaymentMethods,
        createPaymentMethod,
        updatePaymentMethod,
        deletePaymentMethod,
        getPaymentMethodById,
    };
});

