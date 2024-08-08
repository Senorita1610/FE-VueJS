<template>
    <Dialog v-model:visible="accountStore.updateAccountTypeDialog" :style="{ width: '450px' }"
        header="Update an account type" :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model="v$.name.$model"
                    :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty }" />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <small class="p-error">{{ error.$message }}</small>
                </div>
            </div>
            <div class="field">
                <label for="position">Position</label>
                <InputText id="position" v-model="v$.position.$model"
                    :class="{ 'p-invalid': v$.position.$invalid && v$.position.$dirty }" />
                <div class="input-errors" v-for="error of v$.position.$errors" :key="error.$uid">
                    <small class="p-error">{{ error.$message }}</small>
                </div>
            </div>
            <div class="field">
                <label for="role">Role</label>
                <InputText id="role" v-model="v$.role.$model"
                    :class="{ 'p-invalid': v$.role.$invalid && v$.role.$dirty }" />
                <div class="input-errors" v-for="error of v$.role.$errors" :key="error.$uid">
                    <small class="p-error">{{ error.$message }}</small>
                </div>
            </div>
            <Button type="submit" label="Save" severity="info" @click="submitForm"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useAccountStore } from '@/store/account';
import type { AccountType } from '@/types/account.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const accountStore = useAccountStore();
const state = reactive<AccountType>({
    accountTypeId: 0,
    name: '',
    position: '',
    role: '',
});
const rules = {
    name: { required },
    position: { required },
    role: { required },
};
const v$ = useVuelidate(rules, state);

const closeDialog = () => {
    accountStore.updateAccountTypeDialog = false;
    accountStore.submitted = false;
};

watch(() => accountStore.accountType, (newVal) => {
    if (newVal) {
        state.accountTypeId = newVal.accountTypeId
        state.name = newVal.name;
        state.position = newVal.position;
        state.role = newVal.role;
    }
}, { immediate: true });

const submitForm = async () => {
    accountStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {

            accountStore.updateAccountTypeDialog = false;
            await accountStore.updateAccountType(state);
            Swal.fire({
                title: accountStore.message ? 'Error' : 'Success',
                text: accountStore.message ? accountStore.message : 'Update account type successfully!',
                icon: accountStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            accountStore.submitted = false;
            accountStore.message = '';
        } catch (error: any) {
            console.error('Error creating category:', error);
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

<style lang="scss" scoped></style>