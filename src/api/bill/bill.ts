import { BillBody, Bill, BillCustomer } from "@/types/bill.types";
import { Package } from "@/types/package.types";
import { $axios } from "@plugins/axios/axios";

function getAllBills() {
    return $axios.get('/bill/all');
}

function createBill(billCreate: BillBody) {
    const token = localStorage.getItem("token");
    return $axios.post('/bill/create', billCreate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function updateBill(billUpdate: Bill) {
    const token = localStorage.getItem("token");
    return $axios.put('/bill/update', billUpdate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function deleteBill(billId: number) {
    const token = localStorage.getItem("token");
    return $axios.delete(`/bill/${billId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getBillById(billId: number) {
    return $axios.get(`/bill/${billId}`);
};

function createBillByCustomer(phoneNumber: string, packageDTO: Package | null) {
    return $axios.post(`/bill/create-by-customer/${phoneNumber}`, packageDTO);
};

export default {
    getAllBills,
    createBill,
    updateBill,
    deleteBill,
    getBillById,
    createBillByCustomer
};