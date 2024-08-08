<template>
    <Dialog v-model:visible="supplierStore.createSupplierDialog" :style="{ width: '450px' }"
        header="Create an supplier type" :modal="true" class="p-fluid" @update:visible="closeDialog">
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
            <Button type="submit" label="Save" severity="success"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useSupplierStore } from '@/store/supplier';
import type { SupplierBody } from '@/types/supplier.types';
import Swal from 'sweetalert2';
import { minValue, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const supplierStore = useSupplierStore();
const state = reactive<SupplierBody>({
    address: '',
    description: '',
    name: '',
    product: '',
    quantity: 0,
})
const rules = {
    address: { required },
    description: { required },
    name: { required },
    product: { required },
    quantity: { required, minValue: minValue(1) },
}
const v$ = useVuelidate(rules, state)

const resetForm = () => {
    state.address = '';
    state.name = '';
    state.description = '';
    state.product = '';
    state.quantity = 0;
}

const closeDialog = () => {
    console.log('closeDialog');
    supplierStore.createSupplierDialog = false;
    supplierStore.submitted = false;
    // resetForm();
};

const submitForm = async () => {
    supplierStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {
            supplierStore.createSupplierDialog = false;
            await supplierStore.createSupplier(state);
            Swal.fire({
                title: supplierStore.message ? 'Error' : 'Success',
                text: supplierStore.message ? supplierStore.message : 'Create supplier successfully!',
                icon: supplierStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            supplierStore.submitted = false;
            supplierStore.message = '';
            resetForm();
        } catch (error: any) {
            console.error('Error creating supplier:', error);
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