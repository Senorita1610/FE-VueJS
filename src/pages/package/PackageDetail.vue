<template>
    <div class="tw-min-h-[70vh] tw-text-[1rem] tw-bg-[#f4f7fb] tw-pb-[40px]">
        <Container>
            <section class="tw-flex tw-flex-wrap tw-mx-[-15px]">
                <div
                    class="tw-relative tw-w-full tw-px-[15px] md:tw-flex-grow-0 md:tw-flex-shrink-0 md:tw-basis-4/6 md:tw-max-w-2/3 md:tw-pr-0">
                    <swiper :modules="modules" :slides-per-view="1" :loop="true" :autoplay="autoplay"
                        :pagination="pagination" :navigation="navigation">
                        <swiper-slide v-for="n in 10" :key="n">
                            <img :src="images[n - 1]" alt="" class="tw-w-full tw-h-[calc(100%-10px)] tw-max-h-96" />
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
        <Container>
            <div class="bread-crumb">
                <nav class="ant-breadcrumb">
                    <ol>
                        <li class="tw-flex">
                            <span class="bold">
                                <router-link to="/"><strong>Trang chủ</strong></router-link>
                            </span>
                            <span class="ant-breadcrumb-separator">
                                <svg aria-hidden="true" class="svg-inline--fa fa-caret-right fa-w-6"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" color="#4D4D4D">
                                    <path fill="currentColor"
                                        d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z">
                                    </path>
                                </svg>
                            </span>
                        </li>
                        <li class="tw-flex">
                            <span class="ant-breadcrumb-link">
                                <a class="tw-cursor-pointer" href="/di-dong">{{
                                    packageStore.selectedPackage?.category?.name }}</a>
                            </span>
                            <span class="ant-breadcrumb-separator">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right"
                                    class="tw-w-[0.375em] tw-overflow-hidden tw-align-middle" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" color="#4D4D4D">
                                    <path fill="currentColor"
                                        d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z">
                                    </path>
                                </svg>
                            </span>
                        </li>
                        <li class="tw-flex">
                            <span class="ant-breadcrumb-link">
                                <a class="tw-cursor-pointer" href="/di-dong">{{
                                    packageStore.selectedPackage?.category?.description }}</a>
                            </span>
                            <span class="ant-breadcrumb-separator">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-right"
                                    class="tw-w-[0.375em] tw-overflow-hidden tw-align-middle" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512" color="#4D4D4D">
                                    <path fill="currentColor"
                                        d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z">
                                    </path>
                                </svg>
                            </span>
                        </li>
                        <li>
                            <span class="bread-crumb__last">{{ packageStore.selectedPackage?.name }}</span>

                        </li>
                    </ol>
                </nav>
            </div>
        </Container>
        <div class="pack-detail">
            <Container>
                <div class="row">
                    <div class="col-12 col-lg-12">
                        <section class="pack-detail__content">
                            <div class="pack-detail__img tw-hidden lg:tw-block">
                                <!-- <img alt="EKD10"
                                    src="https://digishop.vnpt.vn/digitalShop/images/production/1719220335799Data DVS-76.jpg" /> -->
                            </div>
                            <div class="pack-detail__info">
                                <div class="tw-flex">
                                    <h1 class="tw-font-semibold">{{ packageStore.selectedPackage?.name }}</h1>
                                    <div class="tw-relative tw-ml-12 tw-mt-2">
                                        <img src="https://digishop.vnpt.vn/static/imgs/bl-month.svg" />
                                        <p class="pack-detail__info--time tw-absolute tw-text-white">
                                            {{ packageStore.selectedPackage?.validity }}&nbsp;Ngày
                                        </p>
                                    </div>
                                </div>
                                <div class="pack-detail__price">
                                    <span class="tw-font-semibold">{{ formatMoney(packageStore.selectedPackage?.price ??
                                        0)
                                        }} đ</span>
                                </div>
                                <div class="pack-detail__des">
                                    <div v-html="packageStore.selectedPackage?.subDesc ?? ''">
                                    </div>
                                </div>
                                <div class="pack-detail__cycle">
                                    <div class="input-cycle btn-hover2 active">
                                        <span>{{ packageStore.selectedPackage?.validity }}&nbsp;Ngày</span>
                                        <img src="https://digishop.vnpt.vn/static/imgs/check-radio.svg" alt="active" />
                                    </div>
                                </div>
                                <div class="pack-detail__button">
                                    <button type="button" class=" btn-custom btn-hover2">
                                        <span @click="openCreateDialog(packageStore.selectedPackage)">Đăng ký
                                            ngay</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <section class="tw-mt-12">
                    <h5>Thông tin chi tiết</h5>
                    <div class="pack-detail__detail show">
                        <div v-html="packageStore.selectedPackage?.description"></div>
                    </div>
                </section>
            </Container>
        </div>
    </div>
    <BillDetail />
</template>
<script lang="ts" setup>
import Container from "@components/base/Container.vue";
import BillDetail from '@/pages/bill/BillDetail.vue';
import { formatMoney } from "@/utils/formatMoney";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay, EffectCube } from "swiper/modules";
import "swiper/css";
import 'swiper/css/autoplay';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { SwiperModule } from "swiper/types";
import { usePackageStore } from '@/store/package';
import { useBillStore } from '@/store/bill';
import { Package } from '@/types/package.types';
import img1 from '@/assets/images/banner/b1.jpg';
import img2 from '@/assets/images/banner/b2.jpg';
import img3 from '@/assets/images/banner/b3.jpg';
import img4 from '@/assets/images/banner/b4.jpg';
import img5 from '@/assets/images/banner/b5.jpg';
import img6 from '@/assets/images/banner/b6.jpg';
import img7 from '@/assets/images/banner/b7.jpg';
import img8 from '@/assets/images/banner/b8.jpg';
import img9 from '@/assets/images/banner/b9.jpg';
import img10 from '@/assets/images/banner/b10.jpg';
const route = useRoute();
const packageStore = usePackageStore();
const billStore = useBillStore();
const packageSlug = Array.isArray(route.params.packageSlug)
    ? route.params.packageSlug[0]
    : route.params.packageSlug;
onMounted(async () => {
    await packageStore.getPackageBySlug(packageSlug);
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

const images = [
    img1, img2, img3, img4, img5,
    img6, img7, img8, img9, img10
];

const openCreateDialog = (packageDTO: Package | null) => {
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

.bold {
    font-family: var(--font-bold);
}

.medium {
    font-family: var(--font-medium);
}

.margin-auto {
    margin: 0 auto;
}

ul,
li {
    list-style-type: none;
    padding-left: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
}

.bread-crumb {
    font-size: 16px;
    margin-top: 15px;
}

.bread-crumb .ant-breadcrumb a {
    color: #4d4d4d;
}

.bread-crumb .ant-breadcrumb span {
    color: #4d4d4d;
}

.bread-crumb .ant-breadcrumb span:hover {
    text-decoration: underline;
}

.bread-crumb .ant-breadcrumb-separator {
    margin: 0 12px;
}

.bread-crumb__last {
    font-family: var(--font-bold);
    color: #40C3FF !important;
}

.ant-breadcrumb {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.85);
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
}

.ant-breadcrumb .anticon {
    font-size: 14px;
}

.ant-breadcrumb ol {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
}

.ant-breadcrumb a {
    color: rgba(0, 0, 0, 0.45);
    transition: color 0.3s;
}

.ant-breadcrumb a:hover {
    color: rgba(0, 0, 0, 0.85);
}

.ant-breadcrumb li:last-child {
    color: rgba(0, 0, 0, 0.85);
}

.ant-breadcrumb li:last-child a {
    color: rgba(0, 0, 0, 0.85);
}

li:last-child>.ant-breadcrumb-separator {
    display: none;
}

.ant-breadcrumb-separator {
    margin: 0 8px;
    color: rgba(0, 0, 0, 0.45);
}

.ant-breadcrumb-link>.anticon+span,
.ant-breadcrumb-link>.anticon+a {
    margin-left: 4px;
}

.pack-detail {
    margin-top: 30px;
}

.pack-detail section {
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(146, 146, 146, 0.25);
    border-radius: 8px;
    padding: 30px 5%;
}

.pack-detail__img {
    width: 25%;
    margin-right: 5%;
}

.pack-detail__img>img {
    width: 100%;
    max-height: 209px;
}

.pack-detail__content {
    display: flex;
    height: 100%;
}

.pack-detail__content h1 {
    font-family: var(--font-bold);
    color: #196fb0;
    font-size: 30px;
    margin-bottom: 10px;
}

.pack-detail__info {
    width: 70%;
}

.pack-detail__info--time {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 0;
    line-height: 24px;
    font-family: var(--font-medium);
}

.pack-detail h5 {
    color: #163567;
    font-family: var(--font-medium);
    margin-bottom: 20px;
    font-size: 24px;
}

.pack-detail__deal {
    display: flex;
    padding: 5px 10px;
    background: linear-gradient(270deg, #1a73e9 0%, #6c92f4 100%);
    color: #fff;
    margin-bottom: 15px;
}

.pack-detail__deal h4 {
    color: #fff;
    margin-left: 10px;
    font-family: var(--font-bold);
    font-size: 2.2rem;
}

.pack-detail__count-down {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-left: auto;
}

.pack-detail__count-down span {
    color: #FFFFFF;
    margin-right: 15px;
}

.pack-detail__count-down p {
    background: #e7007f;
    padding: 2px;
    border-radius: 2px;
    margin-right: 5px;
    width: 22px;
    height: 22px;
    text-align: center;
    margin-bottom: 0;
}

.pack-detail__price {
    border-bottom: solid 1px #dadada;
    margin-bottom: 20px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
}

.pack-detail__price span {
    font-family: var(--font-medium);
    font-size: 22px;
}

.pack-detail__price span:first-child {
    color: #e7007f;
    margin-right: 20px;
}

.pack-detail__price span:nth-child(2) {
    text-decoration: line-through;
    color: #9a9a9a;
}

.pack-detail__price p {
    margin-left: auto;
    background: url("/static/imgs/icon-km-2.svg");
    background-size: cover;
    background-position: center;
    padding: 5px;
    padding-left: 12px;
    color: #fff;
    margin-bottom: 0;
}

.pack-detail__des {
    color: #5C5C5C;
    line-height: 28px;
}

.pack-detail__detail {
    margin-top: 20px;
    line-height: 30px;
    color: #5C5C5C;
    max-height: 240px;
    display: block;
    overflow: hidden;
}

.pack-detail__detail.show {
    overflow-y: auto;
    max-height: 100em;
}

.pack-detail__cycle {
    display: flex;
    margin-bottom: 30px;
    margin-top: 30px;
}

.pack-detail__button {
    display: flex;
    align-content: center;
    justify-content: space-around;
    flex-wrap: nowrap;
    flex-direction: row;
}

.pack-detail .btn-read {
    color: #424445;
    font-family: var(--font-bold);
    background-color: #fff;
    border: 1px solid #C4C4C4;
    border-radius: 3px;
    margin: 20px auto 0;
    outline: none;
    padding: 5px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pack-detail .btn-read span {
    margin-right: 10px;
}

@media screen and (max-width: 991px) {
    .pack-detail {
        background-color: #fff;
        margin-top: 15px;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .pack-detail section {
        box-shadow: none;
        padding: 0;
    }

    .pack-detail__info {
        width: 100%;
    }

    .pack-detail__info button {
        width: 100%;
        padding-top: 10px;
        padding-bottom: 10px;
    }
}

.input-cycle {
    margin-right: 16px;
    height: 30px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #C4C4C4;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
}

.input-cycle.active {
    border-color: #40C3FF;
}

.input-cycle img {
    position: absolute;
    bottom: -1px;
    right: -1px;
}

.btn-hover2:hover {
    transition: all 0.25s;
    box-shadow: 0 0.5em 0.5em -0.4em #3aa4f6;
    transform: translateY(-0.25em);
}

.btn-custom {
    text-align: center;
    text-transform: uppercase;
    font-size: 15px;
    line-height: 18px;
    border-radius: 100px;
    padding: 8px 30px;
    box-shadow: 0px 10px 20px rgba(177, 186, 201, 0.15);
    color: #fff;
    font-family: var(--font-medium);
    background-color: #3aa4f6;
    border: none;
    cursor: pointer;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    position: relative;
    overflow: hidden;
    display: block;
}

.btn-custom:hover {
    background-color: rgba(58, 164, 246, 0.7);
}

.btn-custom span {
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
}

@media screen and (min-width: 200px) and (max-width: 767px) {
    .btn-custom {
        padding: 8px 15px;
    }
}

.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px
}
</style>