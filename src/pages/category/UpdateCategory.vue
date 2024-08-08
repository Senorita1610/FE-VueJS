<template>
    <Dialog v-model:visible="categoryStore.updateCategoryDialog" :style="{ width: '450px' }"
        header="Update an category type" :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model="v$.name.$model"
                    :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty && categoryStore.submitted }" />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <small v-if="v$.name.$invalid && categoryStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="description">Description</label>
                <InputText id="description" v-model="v$.description.$model"
                    :class="{ 'p-invalid': v$.description.$invalid && v$.description.$dirty && categoryStore.submitted }" />
                <div class="input-errors" v-for="error of v$.description.$errors" :key="error.$uid">
                    <small v-if="v$.description.$invalid && categoryStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <Button type="submit" label="Save" severity="info" @click="submitForm"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useCategoryStore } from '@/store/category';
import type { Category } from '@/types/category.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const categoryStore = useCategoryStore();
const state = reactive<Category>({
    categoryId: 0,
    name: '',
    description: '',
    slug: '',
});
const rules = {
    categoryId: { required },
    name: { required },
    description: { required },
};
const v$ = useVuelidate(rules, state);

const closeDialog = () => {
    categoryStore.updateCategoryDialog = false;
    categoryStore.submitted = false;
    // resetForm();
};

watch(() => categoryStore.category, (newVal) => {
    if (newVal) {
        state.categoryId = newVal.categoryId
        state.name = newVal.name;
        state.description = newVal.description;
    }
}, { immediate: true });

const submitForm = async () => {
    categoryStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {

            categoryStore.updateCategoryDialog = false;
            await categoryStore.updateCategory(state);
            Swal.fire({
                title: categoryStore.message ? 'Error' : 'Success',
                text: categoryStore.message ? categoryStore.message : 'Update category successfully!',
                icon: categoryStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            categoryStore.submitted = false;
            categoryStore.message = '';
        } catch (error: any) {
            console.error('Error updating category:', error);
            Swal.fire({
                title: 'A problem has occurred',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    }
};
</script>