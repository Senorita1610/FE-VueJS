import { defineStore } from "pinia";
import { ref } from 'vue';
import type { SupplierBody, Supplier } from "@/types/supplier.types";
import supplierService from "@/api/supplier/supplier";

export const useSupplierStore = defineStore("supplier", () => {
    const supplier = ref<Supplier | null>(null);
    const suppliers = ref<Supplier[]>([]);

    const createSupplierDialog = ref(false);
    const updateSupplierDialog = ref(false);
    const submitted = ref(false);
    const message = ref('');

    const getAllSuppliers = async () => {
        try {
            const response = await supplierService.getAllSuppliers();
            if (response.data) {
                suppliers.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createSupplier = async (supplier: SupplierBody) => {
        try {
            const response = await supplierService.createSupplier(supplier);
            if (response.data.success) {
                suppliers.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const updateSupplier = async (supplier: Supplier) => {
        try {
            const response = await supplierService.updateSupplier(supplier);
            if (response.data.success) {
                const index = suppliers.value.findIndex((c) => c.supplierId === supplier.supplierId);
                suppliers.value[index] = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const deleteSupplier = async (id: number) => {
        try {
            const response = await supplierService.deleteSupplier(id);
            if (response) {
                suppliers.value = suppliers.value.filter((c) => c.supplierId !== id);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getSupplierById = async (id: number) => {
        try {
            const response = await supplierService.getSupplierById(id);
            if (response.data.success) {
                supplier.value = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return {
        supplier,
        suppliers,
        createSupplierDialog,
        updateSupplierDialog,
        submitted,
        message,
        getAllSuppliers,
        createSupplier,
        updateSupplier,
        deleteSupplier,
        getSupplierById,
    };
});

