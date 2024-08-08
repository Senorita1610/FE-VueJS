<template>
    <Dialog v-model:visible="promotionStore.updatePromotionDialog" :style="{ width: '450px' }"
        header="Update an promotion type" :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="content">Content</label>
                <Editor id="content" v-model="v$.content.$model" />
                <div class="input-errors" v-for="error of v$.content.$errors" :key="error.$uid">
                    <small v-if="v$.content.$invalid && promotionStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="startDate">Start Date</label>
                <Calendar id="startDate" v-model="v$.startDate.$model" dateFormat="dd-mm-yy" showIcon
                    :class="{ 'p-invalid': v$.startDate.$invalid && v$.startDate.$dirty && promotionStore.submitted }" />
                <div class="input-errors" v-for="error of v$.startDate.$errors" :key="error.$uid">
                    <small v-if="v$.startDate.$invalid && promotionStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="endDate">End Date</label>
                <Calendar id="endDate" v-model="v$.endDate.$model" dateFormat="dd-mm-yy" showIcon
                    :class="{ 'p-invalid': v$.endDate.$invalid && v$.endDate.$dirty && promotionStore.submitted }" />
                <div class="input-errors" v-for="error of v$.endDate.$errors" :key="error.$uid">
                    <small v-if="v$.endDate.$invalid && promotionStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="packageDTO">Package</label>
                <Dropdown id="packageDTO" v-model="v$.packageDTO.$model" :options="packageStore.packages"
                    optionLabel="name" placeholder="Select package" class="w-full md:w-14rem"
                    :class="{ 'p-invalid': v$.packageDTO.$invalid && v$.packageDTO.$dirty && packageStore.submitted }" />
                <div class="input-errors" v-for="error of v$.packageDTO.$errors" :key="error.$uid">
                    <small v-if="v$.packageDTO.$invalid && packageStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <Button type="submit" label="Save" severity="info" @click="submitForm"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { usePromotionStore } from '@/store/promotion';
import { usePackageStore } from '@/store/package';
import type { Promotion } from '@/types/promotion.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const promotionStore = usePromotionStore();
const packageStore = usePackageStore();
const state = reactive<Promotion>({
    promotionId: 0,
    content: '',
    startDate: '',
    endDate: '',
    packageDTO: null,
});
const rules = {
    promotionId: { required },
    content: { required },
    startDate: { required },
    endDate: { required },
    packageDTO: { required }
};
const v$ = useVuelidate(rules, state);

const handleStartDateSelect = (date: Date) => {
    state.startDate = formatDateToString(date)
}

const handleEndDateSelect = (date: Date) => {
    state.endDate = formatDateToString(date)
}

const formatDateToString = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00`;
}

const closeDialog = () => {
    promotionStore.updatePromotionDialog = false;
    promotionStore.submitted = false;
    // resetForm();
};

watch(() => promotionStore.promotion, (newVal) => {
    if (newVal) {
        state.promotionId = newVal.promotionId
        state.content = newVal.content;
        state.startDate = newVal.startDate;
        state.endDate = newVal.endDate;
        state.packageDTO = newVal.packageDTO;
    }
}, { immediate: true });

const submitForm = async () => {
    promotionStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {

            promotionStore.updatePromotionDialog = false;
            handleStartDateSelect(new Date(state.startDate));
            handleEndDateSelect(new Date(state.endDate));
            await promotionStore.updatePromotion(state);
            Swal.fire({
                title: promotionStore.message ? 'Error' : 'Success',
                text: promotionStore.message ? promotionStore.message : 'Update promotion successfully!',
                icon: promotionStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            promotionStore.submitted = false;
            promotionStore.message = '';
        } catch (error: any) {
            console.error('Error updating promotion:', error);
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