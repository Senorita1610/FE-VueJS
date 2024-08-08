import { defineStore } from "pinia";
import { ref } from 'vue';
import type { BillBody, Bill, BillCustomer } from "@/types/bill.types";
import billService from "@/api/bill/bill";
import { Package } from "@/types/package.types";

export const useBillStore = defineStore("bill", () => {
    const bill = ref<Bill | null>(null);
    const bills = ref<Bill[]>([]);

    const createBillDialog = ref(false);
    const updateBillDialog = ref(false);
    const submitted = ref(false);
    const message = ref('');

    const getAllBills = async () => {
        try {
            const response = await billService.getAllBills();
            if (response.data) {
                bills.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createBill = async (bill: BillBody) => {
        try {
            const response = await billService.createBill(bill);
            if (response.data.success) {
                bills.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const updateBill = async (bill: Bill) => {
        try {
            const response = await billService.updateBill(bill);
            if (response.data.success) {
                const index = bills.value.findIndex((c) => c.billId === bill.billId);
                bills.value[index] = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const deleteBill = async (id: number) => {
        try {
            const response = await billService.deleteBill(id);
            if (response.data.success) {
                bills.value = bills.value.filter((c) => c.billId !== id);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getBillById = async (id: number) => {
        try {
            const response = await billService.getBillById(id);
            if (response.data.success) {
                bill.value = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createBillByCustomer = async (phoneNumber: string, packageDTO: Package | null) => {
        try {
            const response = await billService.createBillByCustomer(phoneNumber, packageDTO);
            if (response.data.success) {
                bills.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return {
        bill,
        bills,
        createBillDialog,
        updateBillDialog,
        submitted,
        message,
        getAllBills,
        createBill,
        updateBill,
        deleteBill,
        getBillById,
        createBillByCustomer
    };
});

