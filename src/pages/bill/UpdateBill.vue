<template>
    <Dialog v-model:visible="billStore.updateBillDialog" :style="{ width: '450px' }" header="Update an bill type"
        :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="totalPrice">Total Price</label>
                <InputNumber id="totalPrice" v-model="v$.totalPrice.$model"
                    :class="{ 'p-invalid': v$.totalPrice.$invalid && v$.totalPrice.$dirty && billStore.submitted }" />
                <div class="input-errors" v-for="error of v$.totalPrice.$errors" :key="error.$uid">
                    <small v-if="v$.totalPrice.$invalid && billStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="customer">Customer</label>
                <Dropdown id="customer" v-model="v$.customer.$model" :options="userStore.customers"
                    optionLabel="customerId" placeholder="Select customer" class="w-full md:w-14rem"
                    :class="{ 'p-invalid': v$.customer.$invalid && v$.customer.$dirty && billStore.submitted }" />
                <div class="input-errors" v-for="error of v$.customer.$errors" :key="error.$uid">
                    <small v-if="v$.customer.$invalid && billStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="employee">Employee</label>
                <Dropdown id="employee" v-model="v$.employee.$model" :options="userStore.employees"
                    optionLabel="employeeId" placeholder="Select employee" class="w-full md:w-14rem"
                    :class="{ 'p-invalid': v$.employee.$invalid && v$.employee.$dirty && billStore.submitted }" />
                <div class="input-errors" v-for="error of v$.employee.$errors" :key="error.$uid">
                    <small v-if="v$.employee.$invalid && billStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="promotion">Promotion</label>
                <Dropdown id="promotion" v-model="v$.promotion.$model" :options="promotionStore.promotions"
                    optionLabel="promotionId" placeholder="Select promotion" class="w-full md:w-14rem" />
            </div>
            <div class="field">
                <label for="paymentMethod">Payment Method</label>
                <Dropdown id="paymentMethod" v-model="v$.paymentMethod.$model"
                    :options="paymentMethodStore.paymentMethods" optionLabel="paymentMethodId"
                    placeholder="Select payment method" class="w-full md:w-14rem"
                    :class="{ 'p-invalid': v$.paymentMethod.$invalid && v$.paymentMethod.$dirty && billStore.submitted }" />
                <div class="input-errors" v-for="error of v$.paymentMethod.$errors" :key="error.$uid">
                    <small v-if="v$.paymentMethod.$invalid && billStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="packageDTO">Package</label>
                <Dropdown id="packageDTO" v-model="v$.packageDTO.$model" :options="packageStore.packages"
                    optionLabel="packageId" placeholder="Select package" class="w-full md:w-14rem"
                    :class="{ 'p-invalid': v$.packageDTO.$invalid && v$.packageDTO.$dirty && billStore.submitted }" />
                <div class="input-errors" v-for="error of v$.packageDTO.$errors" :key="error.$uid">
                    <small v-if="v$.packageDTO.$invalid && billStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <Button type="submit" label="Save" severity="info" @click="submitForm"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useBillStore } from '@/store/bill';
import { useUserStore } from "@/store/user";
import { usePromotionStore } from '@/store/promotion';
import { usePackageStore } from '@/store/package';
import { usePaymentMethodStore } from '@/store/paymentMethod';
import type { Bill } from '@/types/bill.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const billStore = useBillStore();
const userStore = useUserStore();
const promotionStore = usePromotionStore();
const packageStore = usePackageStore();
const paymentMethodStore = usePaymentMethodStore();
const state = reactive<Bill>({
    billId: 0,
    totalPrice: 0,
    customer: null,
    employee: null,
    paymentMethod: null,
    promotion: null,
    packageDTO: null
});
const rules = {
    billId: { required },
    totalPrice: { required },
    customer: { required },
    employee: { required },
    paymentMethod: { required },
    promotion: {},
    packageDTO: { required }
};
const v$ = useVuelidate(rules, state);

const closeDialog = () => {
    billStore.updateBillDialog = false;
    billStore.submitted = false;
    // resetForm();
};

watch(() => billStore.bill, (newVal) => {
    if (newVal) {
        state.billId = newVal.billId
        state.totalPrice = newVal.totalPrice;
        state.customer = newVal.customer;
        state.employee = newVal.employee;
        state.paymentMethod = newVal.paymentMethod;
        state.promotion = newVal.promotion;
        state.packageDTO = newVal.packageDTO;
    }
}, { immediate: true });

const submitForm = async () => {
    billStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {

            billStore.updateBillDialog = false;
            await billStore.updateBill(state);
            Swal.fire({
                title: billStore.message ? 'Error' : 'Success',
                text: billStore.message ? billStore.message : 'Update bill successfully!',
                icon: billStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            billStore.submitted = false;
            billStore.message = '';
        } catch (error: any) {
            console.error('Error updating bill:', error);
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