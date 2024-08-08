<template>
    <Dialog v-model:visible="packageStore.createPackageDialog" :style="{ width: '450px' }" header="Create package"
        :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="subDesc">Sub Description</label>
                <Editor id="subDesc" v-model="v$.subDesc.$model" />
                <div class="input-errors" v-for="error of v$.subDesc.$errors" :key="error.$uid">
                    <small v-if="v$.subDesc.$invalid && packageStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="description">Description</label>
                <Editor id="description" v-model="v$.description.$model" />
                <div class="input-errors" v-for="error of v$.description.$errors" :key="error.$uid">
                    <small v-if="v$.description.$invalid && packageStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model="v$.name.$model"
                    :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty && packageStore.submitted }" />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <small v-if="v$.name.$invalid && packageStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="price">Price</label>
                <InputNumber id="price" v-model="v$.price.$model"
                    :class="{ 'p-invalid': v$.price.$invalid && v$.price.$dirty && packageStore.submitted }" />
                <div class="input-errors" v-for="error of v$.price.$errors" :key="error.$uid">
                    <small v-if="v$.price.$invalid && packageStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="quantity">Quantity</label>
                <InputNumber id="quantity" v-model="v$.quantity.$model"
                    :class="{ 'p-invalid': v$.quantity.$invalid && v$.quantiy.$dirty && packageStore.submitted }" />
                <div class="input-errors" v-for="error of v$.quantity.$errors" :key="error.$uid">
                    <small v-if="v$.quantity.$invalid && packageStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="releaseDate">Release Date</label>
                <Calendar id="releaseDate" @date-select="handleDateSelect" v-model="v$.releaseDate.$model" showIcon
                    :class="{ 'p-invalid': v$.releaseDate.$invalid && v$.releaseDate.$dirty && packageStore.submitted }" />
                <div class="input-errors" v-for="error of v$.releaseDate.$errors" :key="error.$uid">
                    <small v-if="v$.birthday.$invalid && packageStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="validity">Validity</label>
                <InputNumber id="validity" v-model="v$.validity.$model"
                    :class="{ 'p-invalid': v$.validity.$invalid && v$.validity.$dirty && packageStore.submitted }" />
                <div class="input-errors" v-for="error of v$.validity.$errors" :key="error.$uid">
                    <small v-if="v$.validity.$invalid && packageStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="category">Category</label>
                <Dropdown id="category" v-model="v$.category.$model" :options="categoryStore.categories"
                    optionLabel="description" placeholder="Select category" class="w-full md:w-14rem"
                    :class="{ 'p-invalid': v$.category.$invalid && v$.category.$dirty && packageStore.submitted }" />
                <div class="input-errors" v-for="error of v$.category.$errors" :key="error.$uid">
                    <small v-if="v$.accountType.$invalid && packageStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="supplier">Supplier</label>
                <Dropdown id="supplier" v-model="v$.supplier.$model" :options="supplierStore.suppliers"
                    optionLabel="name" placeholder="Select supplier" class="w-full md:w-14rem"
                    :class="{ 'p-invalid': v$.supplier.$invalid && v$.supplier.$dirty && packageStore.submitted }" />
                <div class="input-errors" v-for="error of v$.supplier.$errors" :key="error.$uid">
                    <small v-if="v$.supplier.$invalid && packageStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <Button type="submit" label="Save" severity="success"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePackageStore } from '@/store/package';
import { useCategoryStore } from '@/store/category';
import { useSupplierStore } from '@/store/supplier';
import type { PackageBody } from '@/types/package.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const packageStore = usePackageStore();
const categoryStore = useCategoryStore();
const supplierStore = useSupplierStore();
onMounted(async () => {
    await packageStore.getAllPackages();
    await categoryStore.getAllCategories();
    await supplierStore.getAllSuppliers();
});

const state = reactive<PackageBody>({
    subDesc: '',
    description: '',
    name: '',
    price: 0,
    quantity: 0,
    releaseDate: '',
    validity: 0,
    slug: '',
    category: null,
    supplier: null,
})
const rules = {
    name: { required },
    subDesc: { required },
    description: { required },
    price: { required },
    quantity: { required },
    releaseDate: { required },
    validity: { required },
    category: { required },
    supplier: { required },
}
const v$ = useVuelidate(rules, state);

const handleDateSelect = (date: Date) => {
    state.releaseDate = formatDateToString(date)
}
const formatDateToString = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00`;
}

const resetForm = () => {
    state.subDesc = '';
    state.description = '';
    state.name = '';
    state.price = 0;
    state.quantity = 0;
    state.releaseDate = '';
    state.validity = 0;
    state.category = null;
    state.supplier = null;
}

const closeDialog = () => {
    console.log('closeDialog');
    console.log(state.description);
    packageStore.createPackageDialog = false;
    packageStore.submitted = false;
    // resetForm();
};

const submitForm = async () => {
    packageStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {
            packageStore.createPackageDialog = false;
            await packageStore.createPackage(state);
            Swal.fire({
                title: packageStore.message ? 'Error' : 'Success',
                text: packageStore.message ? packageStore.message : 'Create package successfully!',
                icon: packageStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            packageStore.submitted = false;
            packageStore.message = '';
            // resetForm();
        } catch (error: any) {
            console.error('Error creating package:', error);
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