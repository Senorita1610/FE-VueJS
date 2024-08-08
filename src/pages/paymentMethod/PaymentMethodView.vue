<script setup lang="ts">
import BreadcrumbDefault from '@/components/breadcrumbs/BreadcrumbDefault.vue'
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import CreatePaymentMethod from '@/pages/paymentMethod/CreatePaymentMethod.vue';
import UpdatePaymentMethod from '@/pages/paymentMethod/UpdatePaymentMethod.vue';
import { usePaymentMethodStore } from "@/store/paymentMethod";
import type { PaymentMethod } from '@/types/paymentMethod.types';
const paymentMethodStore = usePaymentMethodStore();

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
    await paymentMethodStore.getAllPaymentMethods();
});

const openCreateDialog = () => {
    paymentMethodStore.paymentMethod = null;
    paymentMethodStore.submitted = false;
    paymentMethodStore.createPaymentMethodDialog = true;
};

const openUpdateDialog = (paymentMethod: PaymentMethod) => {
    paymentMethodStore.paymentMethod = { ...paymentMethod };
    paymentMethodStore.submitted = false;
    paymentMethodStore.updatePaymentMethodDialog = true;
}

const deletePaymentMethod = async (paymentMethodId: number) => {
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
            await paymentMethodStore.deletePaymentMethod(paymentMethodId);
            Swal.fire({
                title: paymentMethodStore.message ? 'Error' : 'Success',
                text: paymentMethodStore.message ? paymentMethodStore.message : 'Your payment method has been deleted!',
                icon: paymentMethodStore.message ? 'error' : 'success',
                confirmButtonText: 'OK'
            });
            paymentMethodStore.message = '';
        }
    } catch (error) {
        console.error('Error deleting paymentMethod:', error);
        Swal.fire('An error occurred...', 'An error occurred while deleting the paymentMethod...', 'error');
    }
};

const exportCSV = (event: any) => {
    dt.value.exportCSV();
};

const pageTitle = ref('Payment Method ')
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

                <DataTable ref="dt" :value="paymentMethodStore.paymentMethods" dataKey="paymentMethodId"
                    :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} payment methods">
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
                    <Column field="paymentMethodId" header="Id" :sortable="true"
                        headerStyle="width:10%; min-width:5rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.paymentMethodId }}
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" headerStyle="width:40%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="description" header="Description" :sortable="true"
                        headerStyle="width:40%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.description }}
                        </template>
                    </Column>
                    <Column header="Actions" :sortable="false" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                @click="openUpdateDialog(slotProps.data)"></Button>
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                                @click="deletePaymentMethod(slotProps.data.paymentMethodId)"></Button>
                        </template>
                    </Column>
                </DataTable>
                <CreatePaymentMethod />
                <UpdatePaymentMethod />
            </div>
        </div>
    </div>
</template>