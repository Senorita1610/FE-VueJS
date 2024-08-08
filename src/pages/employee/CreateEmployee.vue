<template>
    <Dialog v-model:visible="userStore.createEmployeeDialog" :style="{ width: '450px' }" header="Create a employee"
        :modal="true" class="p-fluid" @update:visible="closeDialog">
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="address">Address</label>
                <InputText id="address" v-model="v$.address.$model"
                    :class="{ 'p-invalid': v$.address.$invalid && v$.address.$dirty && userStore.submitted }" />
                <div class="input-errors" v-for="error of v$.address.$errors" :key="error.$uid">
                    <small v-if="v$.address.$invalid && userStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="birthday">Birthday</label>
                <Calendar id="birthday" v-model="v$.birthday.$model" dateFormat="dd-mm-yy" showIcon
                    :class="{ 'p-invalid': v$.birthday.$invalid && v$.birthday.$dirty && userStore.submitted }" />
                <div class="input-errors" v-for="error of v$.birthday.$errors" :key="error.$uid">
                    <small v-if="v$.birthday.$invalid && userStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="gender">Gender</label>
                <Dropdown id="gender" v-model="v$.gender.$model" :options="genders" optionLabel="name"
                    optionValue="code" placeholder="Select gender" class="w-full md:w-14rem"
                    :class="{ 'p-invalid': v$.gender.$invalid && v$.gender.$dirty && userStore.submitted }" />
                <div class="input-errors" v-for="error of v$.gender.$errors" :key="error.$uid">
                    <small v-if="v$.gender.$invalid && userStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="joinDate">Join date</label>
                <Calendar id="joinDate" v-model="v$.joinDate.$model" dateFormat="dd-mm-yy" showIcon
                    :class="{ 'p-invalid': v$.joinDate.$invalid && v$.joinDate.$dirty && userStore.submitted }" />
                <div class="input-errors" v-for="error of v$.joinDate.$errors" :key="error.$uid">
                    <small v-if="v$.joinDate.$invalid && userStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model="v$.name.$model"
                    :class="{ 'p-invalid': v$.name.$invalid && v$.name.$dirty && userStore.submitted }" />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <small v-if="v$.name.$invalid && userStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>

            <div class="field">
                <label for="phoneNumber">Phone Number</label>
                <InputText id="phoneNumber" v-model="v$.phoneNumber.$model"
                    :class="{ 'p-invalid': v$.phoneNumber.$invalid && v$.phoneNumber.$dirty && userStore.submitted }" />
                <div class="input-errors" v-for="error of v$.phoneNumber.$errors" :key="error.$uid">
                    <small v-if="v$.phoneNumber.$invalid && userStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <div class="field">
                <label for="account">Account</label>
                <Dropdown id="account" v-model="v$.account.$model" :options="accountStore.accounts"
                    optionLabel="fullName" placeholder="Select an account" class="w-full md:w-14rem"
                    :class="{ 'p-invalid': v$.account.$invalid && v$.account.$dirty && userStore.submitted }" />
                <div class="input-errors" v-for="error of v$.account.$errors" :key="error.$uid">
                    <small v-if="v$.account.$invalid && userStore.submitted" class="p-error">{{ error.$message
                        }}</small>
                </div>
            </div>
            <Button type="submit" label="Save" severity="success"></Button>
        </form>
    </Dialog>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/store/user';
import { useAccountStore } from '@/store/account';
import type { EmployeeBody } from '@/types/user.types';
import Swal from 'sweetalert2';
import { minValue, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const userStore = useUserStore();
const accountStore = useAccountStore();
onMounted(async () => {
    await accountStore.getAllAccounts();
    await userStore.getAllEmployees();
});

const genders = ref([
    { name: 'Nam', code: 1 },
    { name: 'Nữ', code: 2 },
]);

const state = reactive<EmployeeBody>({
    address: '',
    birthday: '',
    gender: 0,
    joinDate: '',
    name: '',
    phoneNumber: '',
    account: null
})
const rules = {
    address: { required },
    birthday: { required },
    gender: { required, minValue: minValue(1) },
    joinDate: { required },
    name: { required },
    phoneNumber: { required },
    account: { required }
}
const v$ = useVuelidate(rules, state)

const handleBirthdaySelect = (date: Date) => {
    state.birthday = formatDateToString(date)
}

const handleJoinDateSelect = (date: Date) => {
    state.joinDate = formatDateToString(date)
}

const formatDateToString = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const resetForm = () => {
    state.address = '';
    state.birthday = '';
    state.gender = 0;
    state.joinDate = '';
    state.name = '';
    state.phoneNumber = '';
    state.account = null;
}

const closeDialog = () => {
    console.log('closeDialog');
    userStore.createEmployeeDialog = false;
    userStore.submitted = false;
    // resetForm();
};

const submitForm = async () => {
    userStore.submitted = true;
    v$.value.$touch();
    if (!v$.value.$invalid) {
        try {
            console.log(state.birthday);
            userStore.createEmployeeDialog = false;
            handleBirthdaySelect(new Date(state.birthday));
            handleJoinDateSelect(new Date(state.joinDate));
            await userStore.createEmployee(state);
            Swal.fire({
                title: userStore.message ? 'Error' : 'Success',
                text: userStore.message ? userStore.message : 'Create employee successfully!',
                icon: userStore.message ? 'error' : 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'swal-button'
                }
            });
            userStore.submitted = false;
            userStore.message = '';
            resetForm();
        } catch (error: any) {
            console.error('Error creating employee:', error);
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