import { CategoryBody, Category } from "@/types/category.types";
import { $axios } from "@plugins/axios/axios";

function getAllCategories() {
    return $axios.get('/category/all');
}

function createCategory(categoryCreate: CategoryBody) {
    const token = localStorage.getItem("token");
    return $axios.post('/category/create', categoryCreate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function updateCategory(categoryUpdate: Category) {
    const token = localStorage.getItem("token");
    return $axios.put('/category/update', categoryUpdate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function deleteCategory(categoryId: number) {
    const token = localStorage.getItem("token");
    return $axios.delete(`/category/${categoryId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getCategoryById(categoryId: number) {
    return $axios.get(`/category/${categoryId}`);
};

export default {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
};