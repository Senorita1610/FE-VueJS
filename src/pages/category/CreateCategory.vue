<template>
    <Dialog v-model:visible="categoryStore.createCategoryDialog" :style="{ width: '450px' }"
        header="Create an category type" :modal="true" class="p-fluid" @update:visible="closeDialog">
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
            <Button type="submit" label="Save" severity="success"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { useCategoryStore } from '@/store/category';
import type { CategoryBody } from '@/types/category.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const categoryStore = useCategoryStore();

const state = reactive<CategoryBody>({
    name: '',
    description: '',
    slug: '',
})
const rules = {
    name: { required },
    description: { required },
}
const v$ = useVuelidate(rules, state)

const resetForm = () => {
    state.name = '';
    state.description = '';
}

const closeDialog = () => {
    console.log('closeDialog');
    categoryStore.createCategoryDialog = false;
    categoryStore.submitted = false;
    // resetForm();
};

const submitForm = async () => {
    categoryStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {
            categoryStore.createCategoryDialog = false;
            await categoryStore.createCategory(state);
            Swal.fire({
                title: categoryStore.message ? 'Error' : 'Success',
                text: categoryStore.message ? categoryStore.message : 'Create category successfully!',
                icon: categoryStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            categoryStore.submitted = false;
            categoryStore.message = '';
            resetForm();
        } catch (error: any) {
            console.error('Error creating category:', error);
            Swal.fire({
                title: 'A problem has occurred',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.swal-button {
    font-size: 16px;
}
</style>