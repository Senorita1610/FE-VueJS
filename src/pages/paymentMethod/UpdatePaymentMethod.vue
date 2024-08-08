<template>
    <Dialog v-model:visible="paymentMethodStore.updatePaymentMethodDialog" :style="{ width: '450px' }"
        header="Update payment method" :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model="v$.name.$model"
                    :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty && paymentMethodStore.submitted }" />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <small v-if="v$.name.$invalid && paymentMethodStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="description">Description</label>
                <InputText id="description" v-model="v$.description.$model"
                    :class="{ 'p-invalid': v$.description.$invalid && v$.description.$dirty && paymentMethodStore.submitted }" />
                <div class="input-errors" v-for="error of v$.description.$errors" :key="error.$uid">
                    <small v-if="v$.description.$invalid && paymentMethodStore.submitted" class="p-error">{{
                        error.$message
                    }}</small>
                </div>
            </div>
            <Button type="submit" label="Save" severity="info" @click="submitForm"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { usePaymentMethodStore } from '@/store/paymentMethod';
import type { PaymentMethod } from '@/types/paymentMethod.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const paymentMethodStore = usePaymentMethodStore();
const state = reactive<PaymentMethod>({
    paymentMethodId: 0,
    name: '',
    description: '',
});
const rules = {
    paymentMethodId: { required },
    name: { required },
    description: { required },
};
const v$ = useVuelidate(rules, state);

const closeDialog = () => {
    paymentMethodStore.updatePaymentMethodDialog = false;
    paymentMethodStore.submitted = false;
    // resetForm();
};

watch(() => paymentMethodStore.paymentMethod, (newVal) => {
    if (newVal) {
        state.paymentMethodId = newVal.paymentMethodId
        state.name = newVal.name;
        state.description = newVal.description;
    }
}, { immediate: true });

const submitForm = async () => {
    paymentMethodStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {

            paymentMethodStore.updatePaymentMethodDialog = false;
            await paymentMethodStore.updatePaymentMethod(state);
            Swal.fire({
                title: paymentMethodStore.message ? 'Error' : 'Success',
                text: paymentMethodStore.message ? paymentMethodStore.message : 'Update payment method successfully!',
                icon: paymentMethodStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            paymentMethodStore.submitted = false;
            paymentMethodStore.message = '';
        } catch (error: any) {
            console.error('Error updating payment method:', error);
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