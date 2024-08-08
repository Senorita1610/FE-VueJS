import { PromotionBody, Promotion } from "@/types/promotion.types";
import { $axios } from "@plugins/axios/axios";

function getAllPromotions() {
    return $axios.get('/promotion/all');
}

function createPromotion(promotionCreate: PromotionBody) {
    const token = localStorage.getItem("token");
    return $axios.post('/promotion/create', promotionCreate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function updatePromotion(promotionUpdate: Promotion) {
    const token = localStorage.getItem("token");
    return $axios.put('/promotion/update', promotionUpdate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function deletePromotion(promotionId: number) {
    const token = localStorage.getItem("token");
    return $axios.delete(`/promotion/${promotionId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getPromotionById(promotionId: number) {
    const token = localStorage.getItem("token");
    return $axios.get(`/promotion/${promotionId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

export default {
    getAllPromotions,
    createPromotion,
    updatePromotion,
    deletePromotion,
    getPromotionById,
};