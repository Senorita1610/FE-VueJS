<script setup lang="ts">
import BreadcrumbDefault from '@/components/breadcrumbs/BreadcrumbDefault.vue'
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import CreateAccount from '@/pages/account/CreateAccount.vue';
import UpdateAccount from '@/pages/account/UpdateAccount.vue';
import { useAccountStore } from "@/store/account";
import type { Account } from '@/types/account.types';
const accountStore = useAccountStore();

const dt = ref<any>();
interface Filters {
    global: { value: string | null; matchMode: string };
}

const filters = ref<Filters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onBeforeMount(() => {
    initFilters();
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
onMounted(async () => {
    await accountStore.getAllAccounts();
});

const openCreateDialog = () => {
    accountStore.account = null;
    accountStore.submitted = false;
    accountStore.createAccountDialog = true;
};

const openUpdateDialog = (account: Account) => {
    accountStore.account = { ...account };
    accountStore.submitted = false;
    accountStore.updateAccountDialog = true;
}

const deleteAccount = async (accountId: number) => {
    try {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            await accountStore.deleteAccount(accountId);
            Swal.fire({
                title: accountStore.message ? 'Error' : 'Success',
                text: accountStore.message ? accountStore.message : 'Your account has been deleted!',
                icon: accountStore.message ? 'error' : 'success',
                confirmButtonText: 'OK'
            });
            accountStore.message = '';
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        Swal.fire('An error occurred...', 'An error occurred while deleting the account...', 'error');
    }
};

const exportCSV = (event: any) => {
    dt.value.exportCSV();
};

const pageTitle = ref('Account ')
</script>

<template>
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="mr-2" severity="success"
                                @click="openCreateDialog"></Button>
                        </div>
                    </template>

                    <template v-slot:end>
                        <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)"></Button>
                    </template>
                </Toolbar>

                <DataTable ref="dt" :value="accountStore.accounts" dataKey="accountId" :paginator="true" :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} accounts">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage {{ pageTitle }}</h5>
                            <IconField iconPosition="left" class="block mt-2 md:mt-0">
                                <InputIcon class="pi pi-search" />
                                <InputText class="w-full sm:w-auto" v-model="filters['global'].value"
                                    placeholder="Search..." />
                            </IconField>
                        </div>
                    </template>

                    <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
                    <Column field="accountId" header="Id" :sortable="true" headerStyle="width:10%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.accountId }}
                        </template>
                    </Column>
                    <Column field="fullName" header="Full Name" :sortable="true"
                        headerStyle="width:20%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.fullName }}
                        </template>
                    </Column>
                    <Column field="username" header="Username" :sortable="true"
                        headerStyle="width:20%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.username }}
                        </template>
                    </Column>
                    <Column field="accountType" header="Account Type" :sortable="true"
                        headerStyle="width:20%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.accountType.position }} - {{ slotProps.data.accountType.role }}
                        </template>
                    </Column>
                    <Column header="Actions" :sortable="false" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                @click="openUpdateDialog(slotProps.data)"></Button>
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                                @click="deleteAccount(slotProps.data.accountId)"></Button>
                        </template>
                    </Column>
                </DataTable>
                <CreateAccount />
                <UpdateAccount />
            </div>
        </div>
    </div>
</template>