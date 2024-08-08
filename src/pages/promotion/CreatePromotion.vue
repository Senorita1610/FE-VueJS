<template>
    <Dialog v-model:visible="promotionStore.createPromotionDialog" :style="{ width: '450px' }"
        header="Create an promotion type" :modal="true" class="p-fluid" @update:visible="closeDialog">
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
            <Button type="submit" label="Save" severity="success"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePromotionStore } from '@/store/promotion';
import { usePackageStore } from '@/store/package';
import type { PromotionBody } from '@/types/promotion.types';
import Swal from 'sweetalert2';
import { required, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const promotionStore = usePromotionStore();
const packageStore = usePackageStore();
onMounted(async () => {
    await packageStore.getAllPackages();
});

const state = reactive<PromotionBody>({
    content: '',
    startDate: '',
    endDate: '',
    packageDTO: null,
})

const mustBeEarlierDate = helpers.withMessage(
    'Start date must be earlier than end date.',
    (value: string) => {
        const endDate = computed(() => state.endDate);
        if (!value || !endDate.value) return true;
        if (!checkDateFormat(endDate.value)) return true;
        return new Date(value) < new Date(endDate.value);
    }
);

const checkDateFormat = (param: string) => {
    if (!param) return true;
    return new Date(param).toString() !== 'Invalid Date';
};

const validateDateFormat = helpers.withMessage(
    'Please enter a valid date.',
    checkDateFormat
);
const rules = {
    content: { required },
    startDate: {
        required, validateDateFormat,
        mustBeEarlierDate,
    },
    endDate: { required, validateDateFormat },
    packageDTO: { required }
}
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


const resetForm = () => {
    state.content = '';
    state.startDate = '';
    state.endDate = '';
    state.packageDTO = null
}

const closeDialog = () => {
    console.log('closeDialog');
    promotionStore.createPromotionDialog = false;
    promotionStore.submitted = false;
    // resetForm();
};

const submitForm = async () => {
    promotionStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {
            promotionStore.createPromotionDialog = false;
            handleStartDateSelect(new Date(state.startDate));
            handleEndDateSelect(new Date(state.endDate));
            await promotionStore.createPromotion(state);
            Swal.fire({
                title: promotionStore.message ? 'Error' : 'Success',
                text: promotionStore.message ? promotionStore.message : 'Create promotion successfully!',
                icon: promotionStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            promotionStore.submitted = false;
            promotionStore.message = '';
            resetForm();
        } catch (error: any) {
            console.error('Error creating promotion:', error);
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