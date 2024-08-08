<script setup lang="ts">
import BreadcrumbDefault from '@/components/breadcrumbs/BreadcrumbDefault.vue'
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import CreateBill from '@/pages/bill/CreateBill.vue';
import UpdateBill from '@/pages/bill/UpdateBill.vue';
import { useBillStore } from "@/store/bill";

import type { Bill } from '@/types/bill.types';
const billStore = useBillStore();

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
    await billStore.getAllBills();
});

const openCreateDialog = () => {
    billStore.bill = null;
    billStore.submitted = false;
    billStore.createBillDialog = true;
};

const openUpdateDialog = (bill: Bill) => {
    billStore.bill = { ...bill };
    billStore.submitted = false;
    billStore.updateBillDialog = true;
}

const deleteBill = async (billId: number) => {
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
            await billStore.deleteBill(billId);
            Swal.fire({
                title: billStore.message ? 'Error' : 'Success',
                text: billStore.message ? billStore.message : 'Your bill has been deleted!',
                icon: billStore.message ? 'error' : 'success',
                confirmButtonText: 'OK'
            });
            billStore.message = '';
        }
    } catch (error) {
        console.error('Error deleting bill:', error);
        Swal.fire('An error occurred...', 'An error occurred while deleting the bill...', 'error');
    }
};

const exportCSV = (event: any) => {
    dt.value.exportCSV();
};

const pageTitle = ref('Bill ')
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

                <DataTable ref="dt" :value="billStore.bills" dataKey="billId" :paginator="true" :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} bills">
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
                    <Column field="billId" header="Id" :sortable="true" headerStyle="width:10%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.billId }}
                        </template>
                    </Column>
                    <Column field="totalPrice" header="Total price" :sortable="true"
                        headerStyle="width:20%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.totalPrice }}
                        </template>
                    </Column>
                    <Column field="customer" header="Customer" :sortable="true"
                        headerStyle="width:20%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.customer.phoneNumber }}
                        </template>
                    </Column>
                    <Column field="employee" header="Employee" :sortable="true"
                        headerStyle="width:20%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.employee?.name }}
                        </template>
                    </Column>
                    <Column field="paymentMethod" header="Payment Method" :sortable="true"
                        headerStyle="width:20%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.paymentMethod?.name }}
                        </template>
                    </Column>
                    <Column field="promotion" header="Promotion" :sortable="true"
                        headerStyle="width:20%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.promotion?.promotionId }}
                        </template>
                    </Column>
                    <Column field="packageDTO" header="Package" :sortable="true"
                        headerStyle="width:20%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.packageDTO.name }}
                        </template>
                    </Column>
                    <Column header="Actions" :sortable="false" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                @click="openUpdateDialog(slotProps.data)"></Button>
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                                @click="deleteBill(slotProps.data.billId)"></Button>
                        </template>
                    </Column>
                </DataTable>
                <CreateBill />
                <UpdateBill />
            </div>
        </div>
    </div>
</template>