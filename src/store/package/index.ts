import { defineStore } from "pinia";
import { ref } from 'vue';
import type { PackageBody, Package } from "@/types/package.types";
import packageService from "@/api/package/package";

export const usePackageStore = defineStore("package", () => {
    const packageDetail = ref<Package | null>(null);
    const packages = ref<Package[]>([]);
    const selectedPackage = ref<Package | null>(null);

    const createPackageDialog = ref(false);
    const updatePackageDialog = ref(false);
    const submitted = ref(false);
    const message = ref('');

    const getAllPackages = async () => {
        try {
            const response = await packageService.getAllPackages();
            if (response.data) {
                packages.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createPackage = async (packageDetail: PackageBody) => {
        try {
            const response = await packageService.createPackage(packageDetail);
            if (response.data.success) {
                packages.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const updatePackage = async (packageDetail: Package) => {
        try {
            const response = await packageService.updatePackage(packageDetail);
            if (response.data.success) {
                const index = packages.value.findIndex((c) => c.packageId === packageDetail.packageId);
                packages.value[index] = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const deletePackage = async (id: number) => {
        try {
            const response = await packageService.deletePackage(id);
            if (response.data.success) {
                packages.value = packages.value.filter((c) => c.packageId !== id);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getPackageById = async (id: number) => {
        try {
            const response = await packageService.getPackageById(id);
            if (response.data.success) {
                packageDetail.value = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getPackageBySlug = async (slug: string) => {
        try {
            const response = await packageService.getPackageBySlug(slug);
            if (response.data.success) {
                selectedPackage.value = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return {
        packageDetail,
        packages,
        selectedPackage,
        createPackageDialog,
        updatePackageDialog,
        submitted,
        message,
        getAllPackages,
        createPackage,
        updatePackage,
        deletePackage,
        getPackageById,
        getPackageBySlug
    };
});

