<script setup lang="ts">
import BreadcrumbDefault from '@/components/breadcrumbs/BreadcrumbDefault.vue'
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import CreateEmployee from '@/pages/employee/CreateEmployee.vue';
import UpdateEmployee from '@/pages/employee/UpdateEmployee.vue';
import { useUserStore } from "@/store/user";
import type { Employee } from '@/types/user.types';
const userStore = useUserStore();

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
    await userStore.getAllEmployees();
});

const openCreateDialog = () => {
    userStore.employee = null;
    userStore.submitted = false;
    userStore.createEmployeeDialog = true;
};

const openUpdateDialog = (employee: Employee) => {
    userStore.employee = { ...employee };
    userStore.submitted = false;
    userStore.updateEmployeeDialog = true;
}

const deleteEmployee = async (employeeId: number) => {
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
            await userStore.deleteEmployee(employeeId);
            Swal.fire({
                title: userStore.message ? 'Error' : 'Success',
                text: userStore.message ? userStore.message : 'Your employee has been deleted!',
                icon: userStore.message ? 'error' : 'success',
                confirmButtonText: 'OK'
            });
            userStore.message = '';
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        Swal.fire('An error occurred...', 'An error occurred while deleting the employee...', 'error');
    }
};

const exportCSV = (event: any) => {
    dt.value.exportCSV();
};

const pageTitle = ref('Employee ')
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

                <DataTable ref="dt" :value="userStore.employees" dataKey="employeeId" :paginator="true" :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} employees">
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
                    <Column field="employeeId" header="Id" :sortable="true" headerStyle="width:5%; min-width:5rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.employeeId }}
                        </template>
                    </Column>
                    <Column field="address" header="Address" :sortable="true" headerStyle="width:12%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.address }}
                        </template>
                    </Column>
                    <Column field="birthday" header="Birthday" :sortable="true"
                        headerStyle="width:12%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.birthday }}
                        </template>
                    </Column>
                    <Column field="gender" header="Gender" :sortable="true" headerStyle="width:12%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.gender }}
                        </template>
                    </Column>
                    <Column field="joinDate" header="Join Date" :sortable="true"
                        headerStyle="width:12%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.joinDate }}
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" headerStyle="width:12%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="phoneNumber" header="Phone Number" :sortable="true"
                        headerStyle="width:12%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.phoneNumber }}
                        </template>
                    </Column>
                    <Column header="Actions" :sortable="false" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                @click="openUpdateDialog(slotProps.data)"></Button>
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                                @click="deleteEmployee(slotProps.data.employeeId)"></Button>
                        </template>
                    </Column>
                </DataTable>
                <CreateEmployee />
                <UpdateEmployee />
            </div>
        </div>
    </div>
</template>