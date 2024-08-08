<script setup lang="ts">
import BreadcrumbDefault from '@/components/breadcrumbs/BreadcrumbDefault.vue'
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import CreatePromotion from '@/pages/promotion/CreatePromotion.vue';
import UpdatePromotion from '@/pages/promotion/UpdatePromotion.vue';
import { usePromotionStore } from "@/store/promotion";
import type { Promotion } from '@/types/promotion.types';
const promotionStore = usePromotionStore();

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
    await promotionStore.getAllPromotions();
});

const openCreateDialog = () => {
    promotionStore.promotion = null;
    promotionStore.submitted = false;
    promotionStore.createPromotionDialog = true;
};

const openUpdateDialog = (promotion: Promotion) => {
    promotionStore.promotion = { ...promotion };
    promotionStore.submitted = false;
    promotionStore.updatePromotionDialog = true;
}

const deletePromotion = async (promotionId: number) => {
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
            await promotionStore.deletePromotion(promotionId);
            Swal.fire({
                title: promotionStore.message ? 'Error' : 'Success',
                text: promotionStore.message ? promotionStore.message : 'Your promotion has been deleted!',
                icon: promotionStore.message ? 'error' : 'success',
                confirmButtonText: 'OK'
            });
            promotionStore.message = '';
        }
    } catch (error) {
        console.error('Error deleting promotion:', error);
        Swal.fire('An error occurred...', 'An error occurred while deleting the promotion...', 'error');
    }
};

const exportCSV = (event: any) => {
    dt.value.exportCSV();
};

const pageTitle = ref('Promotion ')
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

                <DataTable ref="dt" :value="promotionStore.promotions" dataKey="promotionId" :paginator="true"
                    :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} promotions">
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
                    <Column field="promotionId" header="Id" :sortable="true" headerStyle="width:10%; min-width:5rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.promotionId }}
                        </template>
                    </Column>
                    <Column field="content" header="Content" :sortable="true" headerStyle="width:20%; min-width:20rem;">
                        <template #body="slotProps">
                            <div v-html="slotProps.data.content"></div>
                        </template>
                    </Column>
                    <Column field="startDate" header="Start Date" :sortable="true"
                        headerStyle="width:20%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.startDate }}
                        </template>
                    </Column>
                    <Column field="endDate" header="End Date" :sortable="true"
                        headerStyle="width:20%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.endDate }}
                        </template>
                    </Column>
                    <Column field="packageDTO" header="Package" :sortable="true"
                        headerStyle="width:20%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.packageDTO.name }}
                        </template>
                    </Column>
                    <Column header="Actions" :sortable="false" headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                @click="openUpdateDialog(slotProps.data)"></Button>
                            <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                                @click="deletePromotion(slotProps.data.promotionId)"></Button>
                        </template>
                    </Column>
                </DataTable>
                <CreatePromotion />
                <UpdatePromotion />
            </div>
        </div>
    </div>
</template>