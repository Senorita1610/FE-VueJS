import { SupplierBody, Supplier } from "@/types/supplier.types";
import { $axios } from "@plugins/axios/axios";

function getAllSuppliers() {
    return $axios.get('/supplier/all');
}

function createSupplier(supplierCreate: SupplierBody) {
    const token = localStorage.getItem("token");
    return $axios.post('/supplier/create', supplierCreate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function updateSupplier(supplierUpdate: Supplier) {
    const token = localStorage.getItem("token");
    return $axios.put('/supplier/update', supplierUpdate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function deleteSupplier(supplierId: number) {
    const token = localStorage.getItem("token");
    return $axios.delete(`/supplier/${supplierId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getSupplierById(supplierId: number) {
    const token = localStorage.getItem("token");
    return $axios.get(`/supplier/${supplierId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export default {
    getAllSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierById,
};