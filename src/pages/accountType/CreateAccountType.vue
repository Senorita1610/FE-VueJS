<template>
    <Dialog v-model:visible="accountStore.createAccountTypeDialog" :style="{ width: '450px' }"
        header="Create an account type" :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model="v$.name.$model"
                    :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty && accountStore.submitted }" />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <small v-if="v$.name.$invalid && accountStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="position">Position</label>
                <InputText id="position" v-model="v$.position.$model"
                    :class="{ 'p-invalid': v$.position.$invalid && v$.position.$dirty && accountStore.submitted }" />
                <div class="input-errors" v-for="error of v$.position.$errors" :key="error.$uid">
                    <small v-if="v$.position.$invalid && accountStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>

            <div class="field">
                <label for="role">Role</label>
                <InputText id="role" v-model="v$.role.$model"
                    :class="{ 'p-invalid': v$.role.$invalid && v$.role.$dirty && accountStore.submitted }" />
                <div class="input-errors" v-for="error of v$.role.$errors" :key="error.$uid">
                    <small v-if="v$.role.$invalid && accountStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <Button type="submit" label="Save" severity="success"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAccountStore } from '@/store/account';
import type { AccountTypeBody } from '@/types/account.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const accountStore = useAccountStore();

const state = reactive<AccountTypeBody>({
    name: '',
    position: '',
    role: '',
})
const rules = {
    name: { required },
    position: { required },
    role: { required },
}
const v$ = useVuelidate(rules, state)

const resetForm = () => {
    state.name = '';
    state.position = '';
    state.role = '';
}

const closeDialog = () => {
    console.log('closeDialog');
    accountStore.createAccountTypeDialog = false;
    accountStore.submitted = false;
    // resetForm();
};

const submitForm = async () => {
    accountStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {
            accountStore.createAccountTypeDialog = false;
            await accountStore.createAccountType(state);
            Swal.fire({
                title: accountStore.message ? 'Error' : 'Success',
                text: accountStore.message ? accountStore.message : 'Create account type successfully!',
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
            console.error('Error creating account type:', error);
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