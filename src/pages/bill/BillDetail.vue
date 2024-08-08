<template>
    <Dialog v-model:visible="billStore.createBillDialog" :style="{ width: '800px' }" header="Bạn muốn đăng ký gói cước"
        :modal="true" class="p-fluid" @update:visible="closeDialog">
        <div class="ant-model-body tw-px-2 tw-pt-2 tw-pb-[-1px]">
            <form @submit.prevent="submitForm" class="ant-form ant-form-horizontal">
                <div>
                    <div class="confirm-repack">
                        <div class="confirm-repack__line"><span>Tên gói cước</span><strong class="tw-text-[#0571bc]">{{
                            packageStore.selectedPackage?.name }}</strong></div>
                        <div class="confirm-repack__line"><span>Chu kì sử dụng</span><strong
                                class="tw-text-[#0571bc]">{{ packageStore.selectedPackage?.validity
                                }}&nbsp;Ngày</strong>
                        </div>
                        <div class="confirm-repack__line"><span>Giá gói</span><strong class="tw-text-[#0571bc]">{{
                            formatMoney(packageStore.selectedPackage?.price ?? 0) }}
                                đ</strong></div>
                        <div class="field">
                            <label for="phoneNumber">Phone Number</label>
                            <InputText id="phoneNumber" v-model="v$.phoneNumber.$model"
                                :class="{ 'p-invalid': v$.phoneNumber.$invalid && v$.phoneNumber.$dirty && billStore.submitted }" />
                            <div class="input-errors" v-for="error of v$.phoneNumber.$errors" :key="error.$uid">
                                <small v-if="v$.phoneNumber.$invalid && billStore.submitted" class="p-error">{{
                                    error.$message
                                }}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tw-my-[30px] tw-flex tw-justify-center">
                    <Button label="Quay lại" severity="secondary"
                        class="tw-h-[34px] tw-text-[15px]/[18px] tw-rounded-[100px] tw-border-[1px] tw-border-solid tw-border-[rgb(196,196,196)] tw-py-[4px] tw-px-[15px] tw-mr-[5%] tw-w-1/5 tw-font-fontMedium"></Button>
                    <Button type="submit" label="Tiếp tục" severity="info"
                        class="tw-h-[34px] tw-text-[15px]/[18px] tw-rounded-[100px] tw-border-[1px] tw-border-solid tw-border-[rgb(196,196,196)] tw-py-[4px] tw-px-[15px] tw-mr-[5%] tw-w-1/5 tw-font-fontMedium"></Button>
                </div>
            </form>
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useBillStore } from '@/store/bill';
import { usePackageStore } from '@/store/package';
import { BillCustomer, type BillBody } from '@/types/bill.types';
import { formatMoney } from "@/utils/formatMoney";
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const billStore = useBillStore();
const packageStore = usePackageStore();

const state = reactive<BillCustomer>({
    phoneNumber: '',
    packageDTO: null

})
const rules = {
    phoneNumber: { required },
}
const v$ = useVuelidate(rules, state)

const resetForm = () => {
    state.phoneNumber = '';
}

const closeDialog = () => {
    console.log('closeDialog');
    billStore.createBillDialog = false;
    billStore.submitted = false;
    // resetForm();
};


const submitForm = async () => {
    billStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {
            billStore.createBillDialog = false;
            state.packageDTO = packageStore.selectedPackage;
            await billStore.createBillByCustomer(state.phoneNumber, packageStore.selectedPackage);
            Swal.fire({
                title: billStore.message ? 'Error' : 'Success',
                text: billStore.message ? billStore.message : 'Create bill successfully!',
                icon: billStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            billStore.submitted = false;
            billStore.message = '';
            resetForm();
        } catch (error: any) {
            console.error('Error creating bill:', error);
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

.ant-modal-body {
    font-size: 1.6rem;
    color: #000;
    line-height: 1.5715;
    word-wrap: break-word;
}

.ant-form-horizontal .ant-form-item-label {
    flex-grow: 0;
}

.ant-form-horizontal .ant-form-item-control {
    flex: 1 1 0;
    min-width: 0;
}

.ant-form-horizontal .ant-form-item-label[class$='-24']+.ant-form-item-control,
.ant-form-horizontal .ant-form-item-label[class*='-24 ']+.ant-form-item-control {
    min-width: unset;
}

.ant-form {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
}

.confirm-repack {
    width: 60%;
    margin: 0 auto;
    color: #5C5C5C;
    font-size: 16px;
    text-align: left;
}

.confirm-repack__line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.confirm-repack__line span:last-child {
    color: #0571bc;
    font-family: var(--font-medium);
}

@media screen and (min-width: 200px) and (max-width: 767px) {
    .confirm-repack {
        width: 100%;
    }
}

.form-modal__btn {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}

.form-modal__btn button {
    width: 20%;
}

.form-modal__btn--close {
    text-align: center;
    text-transform: uppercase;
    font-size: 15px;
    line-height: 18px;
    border-radius: 100px;
    border: 1px solid #c4c4c4;
    background-color: #fff;
    padding: 4px 15px;
    box-shadow: 0px 10px 20px rgba(177, 186, 201, 0.15);
    color: #5c5c5c;
    font-family: var(--font-medium);
    cursor: pointer;
    margin-right: 5%;
}

@media screen and (min-width: 200px) and (max-width: 767px) {
    .form-modal__btn button {
        width: 45%;
    }

    .form-modal .ant-modal-close-x {
        width: 35px;
        height: 35px;
        line-height: 30px;
    }
}
</style>