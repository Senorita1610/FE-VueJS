<template>
    <Dialog v-model:visible="paymentMethodStore.createPaymentMethodDialog" :style="{ width: '450px' }"
        header="Create payment method" :modal="true" class="p-fluid" @update:visible="closeDialog">
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
            <Button type="submit" label="Save" severity="success"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePaymentMethodStore } from '@/store/paymentMethod';
import type { PaymentMethodBody } from '@/types/paymentMethod.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const paymentMethodStore = usePaymentMethodStore();
onMounted(async () => {
    await paymentMethodStore.getAllPaymentMethods();
});

const state = reactive<PaymentMethodBody>({
    name: '',
    description: '',
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
    paymentMethodStore.createPaymentMethodDialog = false;
    paymentMethodStore.submitted = false;
    // resetForm();
};

const submitForm = async () => {
    paymentMethodStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {
            paymentMethodStore.createPaymentMethodDialog = false;
            await paymentMethodStore.createPaymentMethod(state);
            Swal.fire({
                title: paymentMethodStore.message ? 'Error' : 'Success',
                text: paymentMethodStore.message ? paymentMethodStore.message : 'Payment method created successfully!',
                icon: paymentMethodStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            paymentMethodStore.submitted = false;
            paymentMethodStore.message = '';
            resetForm();
        } catch (error: any) {
            console.error('Error creating paymentMethod:', error);
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