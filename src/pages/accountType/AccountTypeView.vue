<script setup lang="ts">
import BreadcrumbDefault from '@/components/breadcrumbs/BreadcrumbDefault.vue'
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import CreateAccountType from '@/pages/accountType/CreateAccountType.vue';
import UpdateAccountType from '@/pages/accountType/UpdateAccountType.vue';
import { useAccountStore } from "@/store/account";
import type { AccountType } from '@/types/account.types';
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
    await accountStore.getAllAccountTypes();
});

const openCreateDialog = () => {
    accountStore.accountType = null;
    accountStore.submitted = false;
    accountStore.createAccountTypeDialog = true;
};

const openUpdateDialog = (accountType: AccountType) => {
    accountStore.accountType = { ...accountType };
    accountStore.submitted = false;
    accountStore.updateAccountTypeDialog = true;
}

const deleteAccountType = async (accountTypeId: number) => {
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
            await accountStore.deleteAccountType(accountTypeId);
            Swal.fire({
                title: accountStore.message ? 'Error' : 'Success',
                text: accountStore.message ? accountStore.message : 'Your account type has been deleted!',
                icon: accountStore.message ? 'error' : 'success',
                confirmButtonText: 'OK'
            });
            accountStore.message = '';
        }
    } catch (error) {
        console.error('Error deleting account type:', error);
        Swal.fire('An error occurred...', 'An error occurred while deleting the account type...', 'error');
    }
};

const exportCSV = (event: any) => {
    dt.value.exportCSV();
};

const pageTitle = ref('Account Types ')
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

                <DataTable ref="dt" :value="accountStore.accountTypes" dataKey="accountTypeId" :paginator="true"
                    :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} account types">
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
                    <Column field="accountTypeId" header="Id" :sortable="true"
                        headerStyle="width:10%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.accountTypeId }}
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" headerStyle="width:25%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="position" header="Position" :sortable="true"
                        headerStyle="width:25%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.position }}
                        </template>
                    </Column>
                    <Column field="role" header="Role" :sortable="true" headerStyle="width:25%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.role }}
                        </template>
                    </Column>
                    <Column header="Actions" :sortable="false" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                @click="openUpdateDialog(slotProps.data)"></Button>
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                                @click="deleteAccountType(slotProps.data.accountTypeId)"></Button>
                        </template>
                    </Column>
                </DataTable>
                <CreateAccountType />
                <UpdateAccountType />
            </div>
        </div>
    </div>
</template>