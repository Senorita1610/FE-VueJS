import { defineStore } from "pinia";
import { ref } from 'vue';
import type { PromotionBody, Promotion } from "@/types/promotion.types";
import promotionService from "@/api/promotion/promotion";

export const usePromotionStore = defineStore("promotion", () => {
    const promotion = ref<Promotion | null>(null);
    const promotions = ref<Promotion[]>([]);

    const createPromotionDialog = ref(false);
    const updatePromotionDialog = ref(false);
    const submitted = ref(false);
    const message = ref('');

    const getAllPromotions = async () => {
        try {
            const response = await promotionService.getAllPromotions();
            if (response.data) {
                promotions.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createPromotion = async (promotion: PromotionBody) => {
        try {
            const response = await promotionService.createPromotion(promotion);
            if (response.data.success) {
                promotions.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const updatePromotion = async (promotion: Promotion) => {
        try {
            const response = await promotionService.updatePromotion(promotion);
            if (response.data.success) {
                const index = promotions.value.findIndex((c) => c.promotionId === promotion.promotionId);
                promotions.value[index] = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const deletePromotion = async (id: number) => {
        try {
            const response = await promotionService.deletePromotion(id);
            if (response.data.success) {
                promotions.value = promotions.value.filter((c) => c.promotionId !== id);
            }
            message.value = response.data.data.msgContent;

        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getPromotionById = async (id: number) => {
        try {
            const response = await promotionService.getPromotionById(id);
            if (response.data.success) {
                promotion.value = response.data.data.payload;
            }
            message.value = response.data.data.msgContent
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return {
        promotion,
        promotions,
        createPromotionDialog,
        updatePromotionDialog,
        submitted,
        message,
        getAllPromotions,
        createPromotion,
        updatePromotion,
        deletePromotion,
        getPromotionById,
    };
});

