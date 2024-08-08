<template>
    <Dialog v-model:visible="accountStore.updateAccountDialog" :style="{ width: '450px' }"
        header="Update an account type" :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="fullName">Fullname</label>
                <InputText id="fullName" v-model="v$.fullName.$model"
                    :class="{ 'p-invalid': v$.fullName.$invalid && v$.fullName.$dirty }" />
                <div class="input-errors" v-for="error of v$.fullName.$errors" :key="error.$uid">
                    <small class="p-error">{{ error.$message }}</small>
                </div>
            </div>
            <div class="field">
                <label for="username">Username</label>
                <InputText id="username" v-model="v$.username.$model" disabled />
            </div>
            <div class="field">
                <label for="accountType">Account Type</label>
                <Dropdown id="accountType" v-model="v$.accountType.$model" :options="accountStore.accountTypes"
                    optionLabel="position" placeholder="Select an account type" class="w-full md:w-14rem"
                    :class="{ 'p-invalid': v$.accountType.$invalid && v$.accountType.$dirty && accountStore.submitted }" />
                <div class="input-errors" v-for="error of v$.accountType.$errors" :key="error.$uid">
                    <small v-if="v$.accountType.$invalid && accountStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <Button type="submit" label="Save" severity="info" @click="submitForm"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useAccountStore } from '@/store/account';
import type { Account } from '@/types/account.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const accountStore = useAccountStore();
const state = reactive<Account>({
    accountId: 0,
    fullName: '',
    username: '',
    accountType: null,
});
const rules = {
    accountId: { required },
    fullName: { required },
    username: { required },
    accountType: { required },
};
const v$ = useVuelidate(rules, state);

const closeDialog = () => {
    accountStore.updateAccountTypeDialog = false;
    accountStore.submitted = false;
    // resetForm();
};

watch(() => accountStore.account, (newVal) => {
    if (newVal) {
        state.accountId = newVal.accountId
        state.fullName = newVal.fullName;
        state.username = newVal.username;
        state.accountType = newVal.accountType;
    }
}, { immediate: true });

const submitForm = async () => {
    accountStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {

            accountStore.updateAccountDialog = false;
            await accountStore.updateAccount(state);
            Swal.fire({
                title: accountStore.message ? 'Error' : 'Success',
                text: accountStore.message ? accountStore.message : 'Update account successfully!',
                icon: accountStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            accountStore.submitted = false;
            accountStore.message = '';
        } catch (error: any) {
            console.error('Error updating account:', error);
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