<template>
    <Container class="tw-pt-[60px] tw-min-h-[80vh]">
        <div class="tw-flex tw-justify-center tw-items-center tw-text-[1.5rem] tw-font-bold">
            <img src="https://cdn.24h.com.vn//images/404img_092018.png" class="sm:tw-w-[330px] sm:tw-h-[200px]"
                alt="404" />
            <div class="sm:tw-w-2/5 sm:tw-ml-[50px]">
                <span>Truy cập của bạn có thể bị lỗi hoặc không tìm thấy nội dung</span>
                <div
                    class="tw-items-center tw-w-[260px] tw-mt-10 tw-text-[21px] tw-font-bold tw-bg-[#D71925] tw-text-white tw-flex tw-justify-center tw-p-[5px] tw-cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.27em" height="1em" viewBox="0 0 1664 1312">
                        <path fill="currentColor"
                            d="M1408 768v480q0 26-19 45t-45 19H960V928H704v384H320q-26 0-45-19t-19-45V768q0-1 .5-3t.5-3l575-474l575 474q1 2 1 6m223-69l-62 74q-8 9-21 11h-3q-13 0-21-7L832 200L140 777q-12 8-24 7q-13-2-21-11l-62-74q-8-10-7-23.5T37 654L756 55q32-26 76-26t76 26l244 204V64q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5" />
                    </svg>
                    <router-link to="/">
                        <span class="tw-ml-[1rem] tw-text-white tw-no-underline">Quay lại trang chủ</span>
                    </router-link>
                </div>
            </div>
        </div>
    </Container>
</template>

<script lang="ts" setup>
import Container from "@/components/base/Container.vue";
</script>