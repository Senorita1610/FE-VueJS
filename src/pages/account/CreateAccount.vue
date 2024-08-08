<template>
    <Dialog v-model:visible="accountStore.createAccountDialog" :style="{ width: '450px' }"
        header="Create an account type" :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="fullName">Fullname</label>
                <InputText id="fullName" v-model="v$.fullName.$model"
                    :class="{ 'p-invalid': v$.fullName.$invalid && v$.fullName.$dirty && accountStore.submitted }" />
                <div class="input-errors" v-for="error of v$.fullName.$errors" :key="error.$uid">
                    <small v-if="v$.fullName.$invalid && accountStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="username">Username</label>
                <InputText id="username" v-model="v$.username.$model"
                    :class="{ 'p-invalid': v$.username.$invalid && v$.username.$dirty && accountStore.submitted }" />
                <div class="input-errors" v-for="error of v$.username.$errors" :key="error.$uid">
                    <small v-if="v$.username.$invalid && accountStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>

            <div class="field">
                <label for="password">Password</label>
                <InputText id="password" v-model="v$.password.$model"
                    :class="{ 'p-invalid': v$.password.$invalid && v$.password.$dirty && accountStore.submitted }" />
                <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                    <small v-if="v$.password.$invalid && accountStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
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
            <Button type="submit" label="Save" severity="success"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useAccountStore } from '@/store/account';
import type { AccountBody } from '@/types/account.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const accountStore = useAccountStore();
onMounted(async () => {
    await accountStore.getAllAccountTypes();
});

const state = reactive<AccountBody>({
    fullName: '',
    username: '',
    password: '',
    accountType: null
})
const rules = {
    fullName: { required },
    username: { required },
    password: { required },
    accountType: { required },
}
const v$ = useVuelidate(rules, state)

const resetForm = () => {
    state.fullName = '';
    state.username = '';
    state.password = '';
    state.accountType = null;
}

const closeDialog = () => {
    console.log('closeDialog');
    accountStore.createAccountDialog = false;
    accountStore.submitted = false;
    // resetForm();
};

const submitForm = async () => {
    accountStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {
            accountStore.createAccountDialog = false;
            await accountStore.createAccount(state);
            Swal.fire({
                title: accountStore.message ? 'Error' : 'Success',
                text: accountStore.message ? accountStore.message : 'Create account successfully!',
                icon: accountStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            accountStore.submitted = false;
            accountStore.message = '';
            resetForm();
        } catch (error: any) {
            console.error('Error creating account:', error);
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