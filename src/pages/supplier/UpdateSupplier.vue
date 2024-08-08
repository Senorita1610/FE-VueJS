<template>
    <Dialog v-model:visible="supplierStore.updateSupplierDialog" :style="{ width: '450px' }"
        header="Update an supplier type" :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="address">Address</label>
                <InputText id="address" v-model="v$.address.$model"
                    :class="{ 'p-invalid': v$.address.$invalid && v$.address.$dirty && supplierStore.submitted }" />
                <div class="input-errors" v-for="error of v$.address.$errors" :key="error.$uid">
                    <small v-if="v$.address.$invalid && supplierStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="description">Description</label>
                <InputText id="description" v-model="v$.description.$model"
                    :class="{ 'p-invalid': v$.description.$invalid && v$.description.$dirty && supplierStore.submitted }" />
                <div class="input-errors" v-for="error of v$.description.$errors" :key="error.$uid">
                    <small v-if="v$.description.$invalid && supplierStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model="v$.name.$model"
                    :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty && supplierStore.submitted }" />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <small v-if="v$.name.$invalid && supplierStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="product">Product</label>
                <InputText id="product" v-model="v$.product.$model"
                    :class="{ 'p-invalid': v$.product.$invalid && v$.product.$dirty && supplierStore.submitted }" />
                <div class="input-errors" v-for="error of v$.product.$errors" :key="error.$uid">
                    <small v-if="v$.product.$invalid && supplierStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="quantity">Quantity</label>
                <InputNumber id="quantity" v-model="v$.quantity.$model"
                    :class="{ 'p-invalid': v$.quantity.$invalid && v$.quantity.$dirty && supplierStore.submitted }" />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <small v-if="v$.quantity.$invalid && supplierStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <Button type="submit" label="Save" severity="info" @click="submitForm"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useSupplierStore } from '@/store/supplier';
import type { Supplier } from '@/types/supplier.types';
import Swal from 'sweetalert2';
import { minValue, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const supplierStore = useSupplierStore();
const state = reactive<Supplier>({
    supplierId: 0,
    address: '',
    description: '',
    name: '',
    product: '',
    quantity: 0,
});
const rules = {
    supplierId: { required },
    address: { required },
    description: { required },
    name: { required },
    product: { required },
    quantity: { required, minValue: minValue(0) },
};
const v$ = useVuelidate(rules, state);

const closeDialog = () => {
    supplierStore.updateSupplierDialog = false;
    supplierStore.submitted = false;
    // resetForm();
};

watch(() => supplierStore.supplier, (newVal) => {
    if (newVal) {
        state.supplierId = newVal.supplierId;
        state.address = newVal.address;
        state.description = newVal.description;
        state.name = newVal.name;
        state.product = newVal.product;
        state.quantity = newVal.quantity;
    }
}, { immediate: true });

const submitForm = async () => {
    supplierStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {

            supplierStore.updateSupplierDialog = false;
            await supplierStore.updateSupplier(state);
            Swal.fire({
                title: supplierStore.message ? 'Error' : 'Success',
                text: supplierStore.message ? supplierStore.message : 'Update supplier successfully!',
                icon: supplierStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            supplierStore.submitted = false;
            supplierStore.message = '';
        } catch (error: any) {
            console.error('Error updating supplier:', error);
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