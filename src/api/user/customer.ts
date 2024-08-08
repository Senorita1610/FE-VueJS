import { CustomerBody, Customer } from "@/types/user.types";
import { $axios } from "@plugins/axios/axios";

function getAllCustomers() {
    return $axios.get('/customer/all');
}

function createCustomer(customerCreate: CustomerBody) {
    const token = localStorage.getItem("token");
    return $axios.post('/customer/create', customerCreate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function updateCustomer(customerUpdate: Customer) {
    const token = localStorage.getItem("token");
    return $axios.put('/customer/update', customerUpdate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function deleteCustomer(customerId: number) {
    const token = localStorage.getItem("token");
    return $axios.delete(`/customer/${customerId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getCustomerById(customerId: number) {
    const token = localStorage.getItem("token");
    return $axios.get(`/customer/${customerId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export default {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
};