<script setup lang="ts">
import BreadcrumbDefault from '@/components/breadcrumbs/BreadcrumbDefault.vue'
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import CreatePackage from '@/pages/package/CreatePackage.vue';
import UpdatePackage from '@/pages/package/UpdatePackage.vue';
import { usePackageStore } from "@/store/package";
import type { Package } from '@/types/package.types';
const packageStore = usePackageStore();

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
    await packageStore.getAllPackages();
});

const openCreateDialog = () => {
    packageStore.packageDetail = null;
    packageStore.submitted = false;
    packageStore.createPackageDialog = true;
};

const openUpdateDialog = (packageDetail: Package) => {
    packageStore.packageDetail = { ...packageDetail };
    packageStore.submitted = false;
    packageStore.updatePackageDialog = true;
}

const deletePackage = async (packageId: number) => {
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
            await packageStore.deletePackage(packageId);
            Swal.fire({
                title: packageStore.message ? 'Error' : 'Success',
                text: packageStore.message ? packageStore.message : 'Your package has been deleted!',
                icon: packageStore.message ? 'error' : 'success',
                confirmButtonText: 'OK'
            });
            packageStore.message = '';
        }
    } catch (error) {
        console.error('Error deleting package:', error);
        Swal.fire('An error occurred...', 'An error occurred while deleting the package...', 'error');
    }
};

const exportCSV = (event: any) => {
    dt.value.exportCSV();
};

const pageTitle = ref('Package ')
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

                <DataTable ref="dt" :value="packageStore.packages" dataKey="packageId" :paginator="true" :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} packages">
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
                    <Column field="packageId" header="Id" :sortable="true" headerStyle="width:5%; min-width:5rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.packageId }}
                        </template>
                    </Column>
                    <Column field="description" header="Description" :sortable="true"
                        headerStyle="width:10%; min-width:30rem;">
                        <template #body="slotProps">
                            <div v-html="slotProps.data.description"></div>
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" headerStyle="width:8%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="price" header="Price" :sortable="true" headerStyle="width:8%; min-width:8rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.price }}
                        </template>
                    </Column>
                    <Column field="quantity" header="Quantity" :sortable="true" headerStyle="width:8%; min-width:5rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.quantity }}
                        </template>
                    </Column>
                    <Column field="releaseDate" header="Release date" :sortable="true"
                        headerStyle="width:10%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.releaseDate }}
                        </template>
                    </Column>
                    <Column field="validity" header="Validity" :sortable="true" headerStyle="width:8%; min-width:5rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.validity }}
                        </template>
                    </Column>
                    <Column field="category" header="Category" :sortable="true"
                        headerStyle="width:10%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.category.name }}
                        </template>
                    </Column>
                    <Column field="supplier" header="Supplier" :sortable="true"
                        headerStyle="width:10%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.supplier.name }}
                        </template>
                    </Column>
                    <Column header="Actions" :sortable="false" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                @click="openUpdateDialog(slotProps.data)"></Button>
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                                @click="deletePackage(slotProps.data.packageId)"></Button>
                        </template>
                    </Column>
                </DataTable>
                <CreatePackage />
                <UpdatePackage />
            </div>
        </div>
    </div>
</template>