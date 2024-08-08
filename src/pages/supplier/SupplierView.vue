<script setup lang="ts">
import BreadcrumbDefault from '@/components/breadcrumbs/BreadcrumbDefault.vue'
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import CreateSupplier from '@/pages/supplier/CreateSupplier.vue';
import UpdateSupplier from '@/pages/supplier/UpdateSupplier.vue';
import { useSupplierStore } from "@/store/supplier";
import type { Supplier } from '@/types/supplier.types';
const supplierStore = useSupplierStore();

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
    await supplierStore.getAllSuppliers();
});

const openCreateDialog = () => {
    supplierStore.supplier = null;
    supplierStore.submitted = false;
    supplierStore.createSupplierDialog = true;
};

const openUpdateDialog = (supplier: Supplier) => {
    supplierStore.supplier = { ...supplier };
    supplierStore.submitted = false;
    supplierStore.updateSupplierDialog = true;
}

const deleteSupplier = async (supplierId: number) => {
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
            await supplierStore.deleteSupplier(supplierId);
            Swal.fire({
                title: supplierStore.message ? 'Error' : 'Success',
                text: supplierStore.message ? supplierStore.message : 'Your supplier has been deleted!',
                icon: supplierStore.message ? 'error' : 'success',
                confirmButtonText: 'OK'
            });
            supplierStore.message = '';
        }
    } catch (error) {
        console.error('Error deleting supplier:', error);
        Swal.fire('An error occurred...', 'An error occurred while deleting the supplier...', 'error');
    }
};

const exportCSV = (event: any) => {
    dt.value.exportCSV();
};

const pageTitle = ref('Supplier ')
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

                <DataTable ref="dt" :value="supplierStore.suppliers" dataKey="supplierId" :paginator="true" :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} suppliers">
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
                    <Column field="supplierId" header="Id" :sortable="true" headerStyle="width:5%; min-width:5rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.supplierId }}
                        </template>
                    </Column>
                    <Column field="address" header="Address" :sortable="true" headerStyle="width:18%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.address }}
                        </template>
                    </Column>
                    <Column field="description" header="Description" :sortable="true"
                        headerStyle="width:18%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.description }}
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" headerStyle="width:18%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="product" header="Product" :sortable="true" headerStyle="width:18%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.product }}
                        </template>
                    </Column>
                    <Column field="quantity" header="Quantity" :sortable="true"
                        headerStyle="width:18%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.quantity }}
                        </template>
                    </Column>
                    <Column header="Actions" :sortable="false" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                @click="openUpdateDialog(slotProps.data)"></Button>
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                                @click="deleteSupplier(slotProps.data.supplierId)"></Button>
                        </template>
                    </Column>
                </DataTable>
                <CreateSupplier />
                <UpdateSupplier />
            </div>
        </div>
    </div>
</template>