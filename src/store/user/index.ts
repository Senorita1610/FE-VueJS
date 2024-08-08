import { defineStore } from "pinia";
import { ref } from 'vue';
import type { CustomerBody, Customer, EmployeeBody, Employee } from "@/types/user.types";
import customerService from "@/api/user/customer";
import employeeService from "@/api/user/employee";

export const useUserStore = defineStore("user", () => {
    const customer = ref<Customer | null>(null);
    const customers = ref<Customer[]>([]);

    const employee = ref<Employee | null>(null);
    const employees = ref<Employee[]>([]);

    const createCustomerDialog = ref(false);
    const updateCustomerDialog = ref(false);
    const createEmployeeDialog = ref(false);
    const updateEmployeeDialog = ref(false);
    const submitted = ref(false);
    const message = ref('');

    const getAllCustomers = async () => {
        try {
            const response = await customerService.getAllCustomers();
            if (response.data) {
                customers.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createCustomer = async (customer: CustomerBody) => {
        try {
            const response = await customerService.createCustomer(customer);
            if (response.data.success) {
                customers.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const updateCustomer = async (customer: Customer) => {
        try {
            const response = await customerService.updateCustomer(customer);
            if (response.data.success) {
                const index = customers.value.findIndex((c) => c.customerId === customer.customerId);
                customers.value[index] = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const deleteCustomer = async (id: number) => {
        try {
            const response = await customerService.deleteCustomer(id);
            if (response.data.success) {
                customers.value = customers.value.filter((c) => c.customerId !== id);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getCustomerById = async (id: number) => {
        try {
            const response = await customerService.getCustomerById(id);
            if (response.data.success) {
                customer.value = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getAllEmployees = async () => {
        try {
            const response = await employeeService.getAllEmployees();
            if (response.data) {
                employees.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createEmployee = async (employee: EmployeeBody) => {
        try {
            const response = await employeeService.createEmployee(employee);
            if (response.data.success) {
                employees.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const updateEmployee = async (employee: Employee) => {
        try {
            const response = await employeeService.updateEmployee(employee);
            if (response.data.success) {
                const index = employees.value.findIndex((c) => c.employeeId === employee.employeeId);
                employees.value[index] = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const deleteEmployee = async (id: number) => {
        try {
            const response = await employeeService.deleteEmployee(id);
            if (response.data.success) {
                employees.value = employees.value.filter((c) => c.employeeId !== id);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getEmployeeById = async (id: number) => {
        try {
            const response = await employeeService.getEmployeeById(id);
            if (response.data.success) {
                employee.value = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return {
        customer,
        customers,
        createCustomerDialog,
        updateCustomerDialog,
        submitted,
        getAllCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
        getCustomerById,
        employee,
        employees,
        createEmployeeDialog,
        updateEmployeeDialog,
        message,
        getAllEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
    };
});

