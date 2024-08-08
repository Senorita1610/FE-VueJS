import { EmployeeBody, Employee } from "@/types/user.types";
import { $axios } from "@plugins/axios/axios";

function getAllEmployees() {
    return $axios.get('/employee/all');
}

function createEmployee(employeeCreate: EmployeeBody) {
    const token = localStorage.getItem("token");
    return $axios.post('/employee/create', employeeCreate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function updateEmployee(employeeUpdate: Employee) {
    const token = localStorage.getItem("token");
    return $axios.put('/employee/update', employeeUpdate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function deleteEmployee(employeeId: number) {
    const token = localStorage.getItem("token");
    return $axios.delete(`/employee/${employeeId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getEmployeeById(employeeId: number) {
    const token = localStorage.getItem("token");
    return $axios.get(`/employee/${employeeId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export default {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
};