import { PackageBody, Package } from "@/types/package.types";
import { $axios } from "@plugins/axios/axios";

function getAllPackages() {
    return $axios.get('/package/all');
}

function createPackage(packageCreate: PackageBody) {
    const token = localStorage.getItem("token");
    return $axios.post('/package/create', packageCreate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function updatePackage(packageUpdate: Package) {
    const token = localStorage.getItem("token");
    return $axios.put('/package/update', packageUpdate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function deletePackage(packageId: number) {
    const token = localStorage.getItem("token");
    return $axios.delete(`/package/${packageId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getPackageById(packageId: number) {
    const token = localStorage.getItem("token");
    return $axios.get(`/package/${packageId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getPackageBySlug(slug: string) {
    return $axios.get(`/package/find/${slug}`);
};

export default {
    getAllPackages,
    createPackage,
    updatePackage,
    deletePackage,
    getPackageById,
    getPackageBySlug
};