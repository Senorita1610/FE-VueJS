<script setup lang="ts">
import BreadcrumbDefault from '@/components/breadcrumbs/BreadcrumbDefault.vue'
import { FilterMatchMode } from 'primevue/api';
import { ref, onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';
import CreateCategory from '@/pages/category/CreateCategory.vue';
import UpdateCategory from '@/pages/category/UpdateCategory.vue';
import { useCategoryStore } from "@/store/category";
import type { Category } from '@/types/category.types';
const categoryStore = useCategoryStore();

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
    await categoryStore.getAllCategories();
});

const openCreateDialog = () => {
    categoryStore.category = null;
    categoryStore.submitted = false;
    categoryStore.createCategoryDialog = true;
};

const openUpdateDialog = (category: Category) => {
    categoryStore.category = { ...category };
    categoryStore.submitted = false;
    categoryStore.updateCategoryDialog = true;
}

const deleteCategory = async (categoryId: number) => {
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
            await categoryStore.deleteCategory(categoryId);
            Swal.fire({
                title: categoryStore.message ? 'Error' : 'Success',
                text: categoryStore.message ? categoryStore.message : 'Your category has been deleted!',
                icon: categoryStore.message ? 'error' : 'success',
                confirmButtonText: 'OK'
            });
            categoryStore.message = '';
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        Swal.fire('An error occurred...', 'An error occurred while deleting the category...', 'error');
    }
};

const exportCSV = (event: any) => {
    dt.value.exportCSV();
};

const pageTitle = ref('Category ')
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

                <DataTable ref="dt" :value="categoryStore.categories" dataKey="categoryId" :paginator="true" :rows="10"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories">
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
                    <Column field="categoryId" header="Id" :sortable="true" headerStyle="width:10%; min-width:5rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.categoryId }}
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
                                @click="deleteCategory(slotProps.data.categoryId)"></Button>
                        </template>
                    </Column>
                </DataTable>
                <CreateCategory />
                <UpdateCategory />
            </div>
        </div>
    </div>
</template>