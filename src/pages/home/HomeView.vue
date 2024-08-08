<template>
    <div class="tw-min-h-[70vh] tw-text-[1rem] tw-bg-[#f4f7fb] tw-pb-[40px]">
        <Container>
            <section class="tw-flex tw-flex-wrap tw-mx-[-15px]">
                <div
                    class="tw-relative tw-w-full tw-px-[15px] md:tw-flex-grow-0 md:tw-flex-shrink-0 md:tw-basis-4/6 md:tw-max-w-2/3 md:tw-pr-0">
                    <swiper :modules="modules" :slides-per-view="1" :loop="true" :autoplay="autoplay"
                        :pagination="pagination" :navigation="navigation">
                        <swiper-slide v-for="n in 10" :key="n">
                            <img :src="'src/assets/images/banner/b' + n + '.jpg'" alt=""
                                class="tw-w-full tw-h-[calc(100%-10px)] tw-max-h-96" />
                        </swiper-slide>
                        <div class="swiper-button-prev">
                        </div>
                        <div class="swiper-button-next">
                        </div>
                    </swiper>
                </div>
                <div
                    class="tw-relative tw-w-full tw-px-[15px] tw-pl-[10px] tw-max-h-96 tw-hidden md:tw-flex-grow-0 md:tw-flex-shrink-0 md:tw-basis-1/3 md:tw-max-w-1/3 md:tw-block">
                    <a href="https://digishop.vnpt.vn/sim-kem-goi/yolo100m/2489"
                        class="tw-mb-[10px] tw-block tw-h-[47.5%]">
                        <img src="https://digishop.vnpt.vn/digitalShop/images/banners/1717990793356475x152%20(1).jpg"
                            class="tw-w-full tw-max-h-[250px]" />
                    </a>
                    <a href="https://digishop.vnpt.vn/tin-tuc-km/tin-hot/khuyen-mai-nap-the-vinaphone-thang-6-2024"
                        class="tw-mb-[10px] tw-block tw-h-[47.5%]">
                        <img src="https://digishop.vnpt.vn/digitalShop/images/banners/1717990072828475x152.png"
                            class="tw-w-full tw-max-h-[250px]" />
                    </a>
                </div>
            </section>
        </Container>
        <div>
            <div class="tw-pb-[30px]">
                <section class="tw-mt-12">
                    <Container>
                        <div class="tw-flex tw-items-center tw-justify-between">
                            <router-link to="/" class="tw-flex tw-items-center tw-cursor-pointer">
                                <div
                                    class="tw-bg-white tw-rounded-full tw-w-[80px] tw-h-[80px] tw-shadow-md tw-flex tw-items-center tw-justify-center hover:tw-border-solid hover:tw-border-[1px] hover:tw-border-[#3aa4f6]">
                                    <img src="https://digishop.vnpt.vn/digitalShop/images/menu/1677835048065ic_chuyenmanggiuso.png"
                                        class="tw-max-w-[50px] tw-max-h-[50px] hover:tw-animate-bounce" />
                                </div>
                                <p
                                    class="tw-mb-0 tw-ml-[10px] tw-text-[18px] tw-max-w-[200px] tw-text-black hover:tw-text-[#0056b3] hover:tw-underline">
                                    Chọn
                                    sim
                                    số
                                </p>
                            </router-link>
                            <router-link to="/" class="tw-flex tw-items-center tw-cursor-pointer">
                                <div
                                    class="tw-bg-white tw-rounded-full tw-w-[80px] tw-h-[80px] tw-shadow-md tw-flex tw-items-center tw-justify-center hover:tw-border-solid hover:tw-border-[1px] hover:tw-border-[#3aa4f6]">
                                    <img src="https://digishop.vnpt.vn/digitalShop/images/menu/1695201829478icon 1.png"
                                        class="tw-max-w-[50px] tw-max-h-[50px] hover:tw-animate-bounce" />
                                </div>
                                <p
                                    class="tw-mb-0 tw-ml-[10px] tw-text-[18px] tw-max-w-[200px] tw-text-black hover:tw-text-[#0056b3] hover:tw-underline">
                                    Internet
                                    -
                                    Truyền hình
                                </p>
                            </router-link>
                            <router-link to="/" class="tw-flex tw-items-center tw-cursor-pointer">
                                <div
                                    class="tw-bg-white tw-rounded-full tw-w-[80px] tw-h-[80px] tw-shadow-md tw-flex tw-items-center tw-justify-center hover:tw-border-solid hover:tw-border-[1px] hover:tw-border-[#3aa4f6]">
                                    <img src="https://digishop.vnpt.vn/digitalShop/images/menu/1677835051833ic_goicuocdidong.png"
                                        class="tw-max-w-[50px] tw-max-h-[50px] hover:tw-animate-bounce" />
                                </div>
                                <p
                                    class="tw-mb-0 tw-ml-[10px] tw-text-[18px] tw-max-w-[200px] tw-text-black hover:tw-text-[#0056b3] hover:tw-underline">
                                    Gói cước
                                    di
                                    động
                                </p>
                            </router-link>
                            <router-link to="/" class="tw-flex tw-items-center tw-cursor-pointer">
                                <div
                                    class="tw-bg-white tw-rounded-full tw-w-[80px] tw-h-[80px] tw-shadow-md tw-flex tw-items-center tw-justify-center hover:tw-border-solid hover:tw-border-[1px] hover:tw-border-[#3aa4f6]">
                                    <img src="https://digishop.vnpt.vn/digitalShop/images/menu/1677835058428ic_napthe.png"
                                        class="tw-max-w-[50px] tw-max-h-[50px] hover:tw-animate-bounce" />
                                </div>
                                <p
                                    class="tw-mb-0 tw-ml-[10px] tw-text-[18px] tw-max-w-[200px] tw-text-black hover:tw-text-[#0056b3] hover:tw-underline">
                                    Nạp thẻ
                                </p>
                            </router-link>
                        </div>
                    </Container>
                </section>
                <section class="tw-mt-[3rem]">
                    <Container>
                        <div class="tw-flex tw-mb-[3rem]">
                            <div class="tw-flex tw-items-center">
                                <img src="https://digishop.vnpt.vn/digitalShop/images/menu/1677836500566ico_didong.png"
                                    class="tw-w-[17.43px] tw-mr-[10px]" />
                                <h2
                                    class="tw-font-fontMedium tw-not-italic tw-font-semibold tw-text-[32px] tw-text-[#0095d9] tw-my-0">
                                    Gói cước di động</h2>
                            </div>
                            <div class="tw-flex tw-items-center tw-text-[#5c5c5c] tw-ml-5">
                                <span
                                    class="tw-cursor-pointer tw-py-1 tw-pr-[30px] tw-pl-0 tw-text-[16px]/[24px] hover:tw-text-[#0095d9]"
                                    :class="selectedCategory === 'Gói DATA' ? 'tw-text-[#0071bc] tw-font-fontBold tw-no-underline' : ''"
                                    @click="selectedCategory = 'Gói DATA'"><strong>Gói DATA</strong></span>
                                <span
                                    class="tw-cursor-pointer tw-py-1 tw-pr-[30px] tw-pl-0 tw-text-[16px]/[24px] hover:tw-text-[#0095d9]"
                                    :class="selectedCategory === 'Gói trả trước' ? 'tw-text-[#0071bc] tw-font-fontBold tw-no-underline' : ''"
                                    @click="selectedCategory = 'Gói trả trước'">Gói trả trước</span>
                                <router-link to="https://digishop.vnpt.vn/di-dong" class="tw-text-[#5c5c5c]">
                                    <span
                                        class="tw-cursor-pointer tw-py-1 tw-pr-[30px] tw-pl-0 tw-text-[16px]/[24px] hover:tw-text-[#0095d9]">Xem
                                        tất cả</span>
                                </router-link>
                            </div>
                        </div>
                        <div>
                            <div class="tw-overflow-hidden">
                                <div class="tw-flex">
                                    <div class="tw-py-0 tw-px-[10px] tw-grow-0 tw-shrink-0 tw-basis-1/4 tw-max-w-[25%]"
                                        v-for="product in filteredPackages.slice(0, 4)" :key="product.packageId">
                                        <div
                                            class="box-mobile tw-relative tw-bg-white tw-shadow-[0px_0px_10px_rgba(146,146,146)] tw-rounded-lg tw-text-center tw-pb-12 tw-mb-12 hover:tw-shadow-[0_5px_25px_1px_#afafaf] hover:tw-no-underline">
                                            <router-link :to="`/${product.category?.slug}/${product.slug}`"
                                                class="tw-text-[#007bff] hover:tw-no-underline">
                                                <h3
                                                    class="tw-cursor-pointer tw-text-white tw-bg-[#40c3ff] tw-text-center tw-relative tw-text-[22px] tw-font-fontMedium tw-border-t-lg tw-p-[10px] hover:tw-bg-[#3aa4f6]">
                                                    {{ product.name }}
                                                    <span
                                                        class="tw-bg-[url(
                                                        https://digishop.vnpt.vn/static/imgs/icon-down.svg)] tw-w-[17px] tw-h-[10px] tw-bg-contain tw-absolute tw-bottom-[-9px] tw-left-0 tw-right-0 tw-m-auto"></span>
                                                </h3>
                                            </router-link>
                                            <div
                                                class="tw-relative tw-pt-[15px] tw-px-[20%] tw-pb-[11px] tw-overflow-hidden tw-h-[131px] tw-mb-6">
                                                <div v-html="product.subDesc" class="tw-text-[15px]/[28px]"></div>
                                            </div>
                                            <p class="tw-text-black tw-text-[18px] tw-mb-[10px]">
                                                <span class="tw-text-[20px]/[30px] tw-font-fontMedium"><strong>{{
                                                    formatMoney(
                                                        product.price)
                                                        }}</strong></span>&nbsp;đ/lượt
                                            </p>
                                            <div class="box-mobile__btn tw-flex tw-justify-center tw-m-auto">
                                                <div class="tw-relative tw-flex tw-items-center">
                                                    <span @click="openCreateDialog(product)">ĐĂNG KÝ</span>
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="arrow-right"
                                                        class="svg-inline--fa fa-arrow-right fa-w-14 btn--icon"
                                                        role="img" xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512" color="#fdf050" style="">
                                                        <path fill="currentColor"
                                                            d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                                                        </path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tw-flex">
                                    <div class="tw-py-0 tw-px-[10px] tw-grow-0 tw-shrink-0 tw-basis-1/4 tw-max-w-[25%]"
                                        v-for="product in filteredPackages.slice(4, 8)" :key="product.packageId">
                                        <div
                                            class="box-mobile tw-relative tw-bg-white tw-shadow-[0px_0px_10px_rgba(146,146,146)] tw-rounded-lg tw-text-center tw-pb-12 tw-mb-12 hover:tw-shadow-[0_5px_25px_1px_#afafaf] hover:tw-no-underline">
                                            <router-link :to="`/${product.category?.slug}/${product.slug}`"
                                                class="tw-text-[#007bff] hover:tw-no-underline">
                                                <h3
                                                    class="tw-cursor-pointer tw-text-white tw-bg-[#40c3ff] tw-text-center tw-relative tw-text-[22px] tw-font-fontMedium tw-border-t-lg tw-p-[10px] group-hover:tw-bg-[#3aa4f6]">
                                                    {{ product.name }}
                                                    <span
                                                        class="tw-bg-[url(
                                                        https://digishop.vnpt.vn/static/imgs/icon-down.svg)] tw-w-[17px] tw-h-[10px] tw-bg-contain tw-absolute tw-bottom-[-9px] tw-left-0 tw-right-0 tw-m-auto"></span>
                                                </h3>
                                            </router-link>
                                            <div
                                                class="tw-relative tw-pt-[15px] tw-px-[20%] tw-pb-[11px] tw-overflow-hidden tw-text-[15px]/[28px] tw-h-[131px] tw-mb-6 ">
                                                <div v-html="product.subDesc"></div>
                                            </div>
                                            <p class="tw-text-black tw-text-[18px] tw-mb-[10px]">
                                                <span class="tw-text-[20px]/[30px] tw-font-fontMedium"><strong>{{
                                                    formatMoney(
                                                        product.price)
                                                }}</strong></span>&nbsp;đ/lượt
                                            </p>
                                            <div class="box-mobile__btn tw-flex tw-justify-center tw-m-auto">
                                                <div class="tw-relative tw-flex tw-items-center">
                                                    <span @click="openCreateDialog(product)">ĐĂNG KÝ</span>
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="arrow-right"
                                                        class="svg-inline--fa fa-arrow-right fa-w-14 btn--icon"
                                                        role="img" xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512" color="#fdf050" style="">
                                                        <path fill="currentColor"
                                                            d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                                                        </path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Container>
                </section>
                <section class="tw-mt-12">
                    <Container>
                        <div class="tw-flex tw-mb-12">
                            <div class="tw-flex tw-items-center">
                                <img src="https://digishop.vnpt.vn/digitalShop/images/menu/1677836509938icon_truyenhinh.png"
                                    class="tw-w-[17.43px] tw-mr-[10px]" />
                                <h2
                                    class="tw-font-fontMedium tw-not-italic tw-font-semibold tw-text-[32px] tw-text-[#0095d9] tw-my-0">
                                    Internet - Truyền hình</h2>
                            </div>
                            <div class="tw-flex tw-items-center tw-text-[#5c5c5c] tw-ml-5">
                                <span
                                    class="tw-cursor-pointer tw-py-1 tw-pr-[30px] tw-pl-0 tw-text-[16px]/[24px] hover:tw-text-[#0095d9]"
                                    :class="selectedInternet === 'Internet cáp quang' ? 'tw-text-[#0071bc] tw-font-fontBold tw-no-underline' : ''"
                                    @click="selectedInternet = 'Internet cáp quang'">Internet cáp quang</span>
                                <span
                                    class="tw-cursor-pointer tw-py-1 tw-pr-[30px] tw-pl-0 tw-text-[16px]/[24px] hover:tw-text-[#0095d9]"
                                    :class="selectedInternet === 'Internet và Truyền hình' ? 'tw-text-[#0071bc] tw-font-fontBold tw-no-underline' : ''"
                                    @click="selectedInternet = 'Internet và Truyền hình'">Internet và Truyền
                                    hình</span>
                                <span
                                    class="tw-cursor-pointer tw-py-1 tw-pr-[30px] tw-pl-0 tw-text-[16px]/[24px] hover:tw-text-[#0095d9]"
                                    :class="selectedInternet === 'Internet, Truyền Hình Và Di Động' ? 'tw-text-[#0071bc] tw-font-fontBold tw-no-underline' : ''"
                                    @click="selectedInternet = 'Internet, Truyền Hình Và Di Động'">Internet, Truyền Hình
                                    Và Di Động</span>
                                <router-link to="https://digishop.vnpt.vn/internet-tv" class="tw-text-[#5c5c5c]">
                                    <span
                                        class="tw-cursor-pointer tw-py-1 tw-pr-[30px] tw-pl-0 tw-text-[16px]/[24px] tw-min-w-fit hover:tw-text-[#0095d9]">Xem
                                        tất cả</span>
                                </router-link>
                            </div>
                        </div>
                        <div class="internet">
                            <swiper :modules="modules" :slides-per-view="3" :loop="true" :autoplay="autoplay"
                                :pagination="pagination" :navigation="navigation" :spaceBetween="5">
                                <swiper-slide v-for="product in filteredInternets" :key="product.packageId"
                                    class="tw-px-[10px]">
                                    <div
                                        class="box-internet tw-bg-white tw-shadow-[0px_0px_10px_rgba(146,146,146,0.25)] tw-rounded-lg tw-cursor-pointer tw-relative tw-h-full tw-text-[#252525] hover:tw-shadow-[0_5px_25px_1px-#afafaf] undefined">
                                        <section>
                                            <div
                                                class="box-internet__border-top tw-h-[5px] tw-rounded-[2.5px] tw-absolute tw-top-0 tw-right-0 tw-w-full tw-bg-[#0095D9]">
                                            </div>
                                            <div class="tw-pt-10 tw-px-[8%] tw-pb-5 box-internet__top">
                                                <a
                                                    href="https://digishop.vnpt.vn/internet-tv/home-cam-2-indoor-nt/2865">
                                                    <h3
                                                        class="tw-font-fontMedium tw-text-[30px] tw-text-[#E7007F] tw-h-20">
                                                        <strong>{{ product.name }}</strong>
                                                    </h3>
                                                </a>
                                                <span class="tw-text-[20px] tw-font-fontMedium">&nbsp;</span>
                                            </div>
                                            <div class="tw-top-[10px] tw-px-[8%] tw-pb-5">
                                                <div class="box-internet__content">
                                                    <div v-html="product.subDesc"></div>
                                                </div>
                                                <div class="tw-flex tw-items-center tw-mt-[3rem]">
                                                    <h4 class="tw-text-[30px] tw-font-fontBold"><strong>{{ product.price
                                                            }}</strong></h4>
                                                    <span class="tw-font-fontMedium tw-ml-2 tw-text-black">
                                                        đ/ 1 tháng
                                                    </span>
                                                </div>
                                                <p class="tw-text-[#90a2a4] tw-text-[16px] tw-line-through"></p>
                                            </div>
                                        </section>
                                        <div
                                            class="box-internet__btn-wrapper tw-flex tw-items-center tw-justify-center tw-py-5 tw-px-[8%] tw-overflow-hidden">
                                            <div
                                                class="tw-w-1/3 tw-text-center tw-uppercase tw-leading-[18px] tw-rounded-[100px] tw-cursor-pointer tw-duration-500 tw-text-[#5C5C5C] tw-border-[1px] tw-border-solid tw-border-[#C4C4C4] tw-flex tw-items-center tw-justify-center tw-mr-[15px] tw-translate-x-[-40rem] hover:tw-text-[#3AA4F6] hover:tw-border-[#3AA4F6]">
                                                <router-link :to="`/${product.category?.slug}/${product.slug}`"
                                                    class="tw-flex tw-py-[7px] tw-px-0 tw-no-underline">
                                                    <span class="tw-mr-2 tw-text-[14px]/[18px]">Chi tiết</span>
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="arrow-right"
                                                        class="tw-w-[0.875em] tw-overflow-hidden" role="img"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                                        color="#3AA4F6">
                                                        <path fill="currentColor"
                                                            d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                                                        </path>
                                                    </svg>
                                                </router-link>
                                            </div>
                                            <div @click="openCreateDialog(product)"
                                                class="tw-w-1/3 tw-text-center tw-uppercase tw-leading-[18px] tw-rounded-[100px] tw-cursor-pointer tw-duration-500 btn-reg tw-text-[14px]/[18px] tw-text-[#fff] tw-bg-[#3AA4F6] tw-translate-x-[-55%] tw-py-[7px] tw-px-0 hover:tw-bg-[rgba(58,164,246,0.7)]">
                                                Đăng ký</div>
                                        </div>
                                    </div>
                                </swiper-slide>
                                <div class="swiper-button-prev">
                                </div>
                                <div class="swiper-button-next">
                                </div>
                            </swiper>

                        </div>
                    </Container>
                </section>

            </div>
        </div>
        <BillDetail />

    </div>
    <Login />
</template>
<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import Container from "@components/base/Container.vue";
import BillDetail from '@/pages/bill/BillDetail.vue';
import Login from "@pages/account/Login.vue";
import { usePackageStore } from '@/store/package';
import { useBillStore } from '@/store/bill';
import { formatMoney } from "@/utils/formatMoney";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay, EffectCube } from "swiper/modules";
import "swiper/css";
import 'swiper/css/autoplay';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { SwiperModule } from "swiper/types";
import { Package } from '@/types/package.types';

const packageStore = usePackageStore();
const billStore = useBillStore();
onMounted(async () => {
    await packageStore.getAllPackages();
});

const modules: SwiperModule[] = [Navigation, Pagination, Autoplay, EffectCube];
const pagination = {
    clickable: true,
};
const navigation = {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
};
const autoplay = { delay: 5000 };

const selectedCategory = ref('Gói DATA');
const selectedInternet = ref('Internet cáp quang');

const filteredPackages = computed(() => {
    return packageStore.packages.filter(pkg => pkg.category?.description === selectedCategory.value);
});

const filteredInternets = computed(() => {
    return packageStore.packages.filter(pkg => pkg.category?.description === selectedInternet.value);
});

const openCreateDialog = (packageDTO: Package) => {
    billStore.createBillDialog = true
    packageStore.selectedPackage = packageDTO;
};

</script>
<style lang="scss" scoped>
.swiper-button-prev {
    background-image: url('https://digishop.vnpt.vn/static/imgs/prev-icon.png') !important;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    width: 50px;
    height: 50px;
}

.swiper-button-next {
    background-image: url('https://digishop.vnpt.vn/static/imgs/next-icon.png') !important;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    width: 50px;
    height: 50px;
}

.swiper-button-next::after {
    display: none;
}

.swiper-button-prev::after {
    display: none;
}

svg {
    overflow: hidden;
    vertical-align: middle
}

.box-mobile:hover .btn-detail {
    transform: translateX(0);
}

.box-mobile:hover .btn-reg {
    transform: translateX(0);
}

.box-mobile:hover .pointer {
    background: #3aa4f6;
}

.box-mobile a:hover h3 {
    background: #3aa4f6;
}

.box-mobile__content {
    position: relative;
    padding: 15px 20% 11px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    height: 131px;
}

.box-mobile__content:after {
    content: "";
    width: 75%;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0px;
    height: 1px;
    position: absolute;
    background-color: #d0dddd;
}

.box-mobile__content * {
    font-size: 15px;
    line-height: 28px;
    margin-bottom: 0 !important;
}

.box-mobile__btn {
    color: #fff;
    background-color: #3AA4F6;
    border-radius: 20px;
    padding: 4px 15px;
    max-width: 50%;
    cursor: pointer;
}

.box-mobile__btn>div {
    font-size: 14px;
    line-height: 21px;
}

.box-mobile__btn .btn--icon {
    display: none;
    right: -10px;
    top: 3px;
    position: absolute;
}

.box-mobile__btn:hover {
    background: #0071bc;
    transition: all 0.4s linear;
}

.box-mobile__btn:hover>div {
    padding-right: 10px;
    transition: all 0.4s linear;
}

.box-mobile__btn:hover .btn--icon {
    display: initial;
    animation: ringring 2s linear;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    font-weight: 300;
    color: #fdf050;
}

.box-internet:hover {
    box-shadow: 0 5px 25px 1px #afafaf;
}

.box-internet:hover .btn-detail {
    transform: translateX(0);
}

.box-internet:hover .btn-reg {
    transform: translateX(0);
}

.box-internet:hover .box-internet__border-top {
    background-color: #40C3FF;
}

.box-internet h3 {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.box-internet__top {
    border-bottom: 0.8px solid #D0DDDD;
}

.box-internet__content {
    line-height: 28px;
    font-size: 15px;
    height: 170px;
    overflow-y: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
}

.box-internet__btn-wrapper {
    border-top: 0.8px solid #D0DDDD;
}
</style>