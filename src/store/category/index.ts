import { defineStore } from "pinia";
import { ref } from 'vue';
import type { CategoryBody, Category } from "@/types/category.types";
import categoryService from "@/api/category/category";

export const useCategoryStore = defineStore("category", () => {
    const category = ref<Category | null>(null);
    const categories = ref<Category[]>([]);

    const createCategoryDialog = ref(false);
    const updateCategoryDialog = ref(false);
    const submitted = ref(false);
    const message = ref('');

    const getAllCategories = async () => {
        try {
            const response = await categoryService.getAllCategories();
            if (response.data) {
                categories.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createCategory = async (category: CategoryBody) => {
        try {
            const response = await categoryService.createCategory(category);
            if (response.data.success) {
                categories.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const updateCategory = async (category: Category) => {
        try {
            const response = await categoryService.updateCategory(category);
            if (response.data.success) {
                const index = categories.value.findIndex((c) => c.categoryId === category.categoryId);
                categories.value[index] = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const deleteCategory = async (id: number) => {
        try {
            const response = await categoryService.deleteCategory(id);
            if (response.data.success) {
                categories.value = categories.value.filter((c) => c.categoryId !== id);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getCategoryById = async (id: number) => {
        try {
            const response = await categoryService.getCategoryById(id);
            if (response.data.success) {
                category.value = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return {
        category,
        categories,
        createCategoryDialog,
        updateCategoryDialog,
        submitted,
        message,
        getAllCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
    };
});

