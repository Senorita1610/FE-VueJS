<template>

    <Dialog v-model:visible="accountStore.requestLogin" :style="{ width: '450px' }" header="Login" :modal="true"
        class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="username">Username</label>
                <InputText id="username" v-model="v$.username.$model"
                    :class="{ 'p-invalid': v$.username.$invalid && v$.username.$dirty && accountStore.submitted }" />
                <div class="input-errors" v-for="error of v$.username.$errors" :key="error.$uid">
                    <small v-if="v$.username.$invalid && accountStore.submitted" class="p-error">{{
                        error.$message
                    }}</small>
                </div>
            </div>

            <div class="field">
                <label for="password">Password</label>
                <InputText id="password" v-model="v$.password.$model"
                    :class="{ 'p-invalid': v$.password.$invalid && v$.password.$dirty && accountStore.submitted }" />
                <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                    <small v-if="v$.password.$invalid && accountStore.submitted" class="p-error">{{
                        error.$message
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
import type { LoginBody } from '@/types/account.types';
import Swal from 'sweetalert2';
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const accountStore = useAccountStore();
onMounted(async () => {
    await accountStore.getAllAccountTypes();
});

const state = reactive<LoginBody>({
    username: '',
    password: '',
})
const rules = {
    username: { required },
    password: { required },
}
const v$ = useVuelidate(rules, state)

const resetForm = () => {
    state.username = '';
    state.password = '';
}

const closeDialog = () => {
    console.log('closeDialog');
    accountStore.requestLogin = false;
    accountStore.submitted = false;
    // resetForm();
};

const submitForm = async () => {
    accountStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {
            accountStore.requestLogin = false;
            await accountStore.login(state);
            Swal.fire({
                title: 'Succeed',
                text: 'Login successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            accountStore.submitted = false;
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
.ant-modal-content {
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-radius: 8px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    pointer-events: auto;
}
</style>