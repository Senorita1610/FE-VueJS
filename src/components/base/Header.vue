<template>
  <section class="tw-bg-[#f2f2f2] tw-h-[35px] tw-items-center tw-transition-all tw-hidden lg:tw-block">
    <Container class="header-top">
      <div class="header-top__content">
        <router-link to="/" class="header-top__nav-item">
          <img :src="Headmic" alt="support"
            class="tw-text-[16px] tw-mr-[5px] tw-w-[20px] tw-h-[20px] tw-align-middle" />
          <span>Hỗ trợ</span>
        </router-link>
      </div>
    </Container>
  </section>
  <section class="tw-bg-white tw-w-full tw-shadow-md tw-top-0 tw-z-20 tw-h-[60px] tw-hidden lg:tw-block">
    <Container class="header">
      <div class="header__content">
        <router-link to="/">
          <h1>
            <img src="https://digishop.vnpt.vn/static/imgs/logo.png" alt="support" />
          </h1>
        </router-link>
        <router-link to="/" class="header__nav-item">
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="black"
              d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-3 19h-2v-1h2zm3-2H8V5h8z" />
          </svg> -->
          <img src="https://digishop.vnpt.vn/digitalShop/images/menu/1679798384615ic_didong2x.png" alt="" width="20" />
          <span>DI ĐỘNG</span>
        </router-link>
        <router-link to="/" class="header__nav-item">
          <img class="img_menu" alt=""
            src="https://digishop.vnpt.vn/digitalShop/images/menu/1679798391140ic_internet2x.png" width="20" />
          <span>INTERNET - TRUYỀN HÌNH</span>
        </router-link>
        <router-link to="/" class="header__nav-item">
          <img class="img_menu" alt=""
            src="https://digishop.vnpt.vn/digitalShop/images/menu/1713233361378icon-dichvuso.png" width="20" />
          <span>DỊCH VỤ SỐ</span>
        </router-link>
        <router-link to="/" class="header__nav-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="black" d="M4 6V4h16v2zm0 14v-6H3v-2l1-5h16l1 5v2h-1v6h-2v-6h-4v6zm2-2h6v-4H6z" />
          </svg>
        </router-link>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="black"
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
          </svg>
        </div>
        <div v-if="accountStore.isAuthenticated == false" role="button" class="tw-text-[20px] tw-cursor-pointer"
          @click="handleClick">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 448 512">
            <path fill="currentColor"
              d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
            </path>
          </svg>
        </div>
        <div v-else>
          <DropdownUser />
        </div>
      </div>
    </Container>
  </section>
</template>

<script lang="ts" setup>
import Container from "@components/base/Container.vue";
import DropdownUser from '@components/header/DropdownUser.vue'
import Headmic from "@assets/svg/headmic.svg";
import { useAccountStore } from '@/store/account';
const accountStore = useAccountStore();
onMounted(async () => {
  await accountStore.authenticate();
});

const handleClick = () => {
  accountStore.requestLogin = true;
};
</script>
<style lang="scss" scoped>
.header-top {
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}

.header-top__content {
  display: flex;
  align-items: center;
}

.header-top__menu {
  position: relative;
  display: flex;
  align-items: center;
}

.header-top__nav-item {
  position: relative;
  margin-bottom: 0;
  color: var(--neutral2);
  margin-right: 20px;
  cursor: pointer;
  font-size: 16px;
  padding: 5px 0;
}

.header-top__nav-item .img_menu {
  max-width: 20px;
  max-height: 20px;
}

.header-top__nav-item img {
  width: 20px;
  height: 20px;
}

.header-top__nav-item::before {
  content: '';
  width: 0%;
  left: 3px;
  bottom: 3px;
  height: 1px;
  position: absolute;
  background-color: var(--primary3);
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.header-top__nav-item:hover::before {
  width: 95%;
}

.header-top__nav-item:hover {
  color: var(--primary3);
  text-decoration: none;
}

.header-top__nav-item:hover img,
.header-top__nav-item:hover svg {
  filter: invert(75%) sepia(90%) saturate(85) hue-rotate(205deg);
}

.header-top__nav-item:hover ul {
  visibility: visible;
}

.header-top__nav-item img {
  margin-right: 5px;
}

.header-top ul {
  position: absolute;
  z-index: 2;
  top: 34px;
  left: 0;
  visibility: hidden;
  background-color: #fff;
  color: var(--neutral2);
  box-shadow: 0px 2px 5px #dedede;
}

.header-top li {
  white-space: nowrap;
  padding: 0.5rem 1.5rem;
}

.header-top li:hover {
  background-color: #efefef;
}

.header {
  position: relative;
  height: 100%;
  background-color: #fff;
}

.header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header svg,
.header__search-icon {
  font-size: 20px;
  padding: 17px 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.header svg:hover,
.header__search-icon:hover {
  filter: invert(75%) sepia(50%) saturate(35) hue-rotate(185deg);
}

.header a span {
  text-transform: uppercase;
  font-family: var(--font-medium);
  color: #2d2d2d;
  margin-left: 10px;
}

.header a:hover {
  text-decoration: none !important;
}

.header__search-wrapper {
  position: absolute;
  z-index: 10;
  bottom: -54px;
  right: 8px;
  padding: 9px 14px;
  background: #f2f2f2;
  width: 330px;
  box-shadow: 0px 2px 8px #dedede;
}

.header__banner {
  height: 40px;
  width: auto;
}

.header__user {
  height: 50%;
  width: auto;
  font-family: var(--font-medium);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
}

.header__user img {
  height: 100%;
  margin-right: 8px;
}

.header__menu-dropdown-user-info {
  width: 280px;
}

.header__menu-dropdown-user-info .ant-collapse {
  background-color: transparent;
}

.header__menu-dropdown-user-info .ant-collapse-content-box {
  padding: 0px;
}

.header__menu-dropdown-user-info .ant-collapse-header {
  background-color: transparent;
}

.header__menu-dropdown-user-info .ant-collapse-header:hover {
  background-color: #f5f5f5;
  color: #0571bc;
}

.header__menu-dropdown {
  margin-bottom: 0;
  font-family: var(--font-medium);
}

.header__menu-dropdown li {
  padding: 10px 16px;
  cursor: pointer;
}

.header__menu-dropdown li:hover {
  background-color: #f5f5f5;
  color: #0571bc;
}

.header__menu-dropdown a {
  text-decoration: none;
  color: inherit;
}

.header__nav-item {
  position: relative;
  margin-bottom: 0;
  cursor: pointer;
  padding: 17px 0;
}

.header__nav-item .img_menu {
  max-width: 20px;
  max-height: 20px;
}

.header__nav-item::before {
  content: '';
  width: 0%;
  left: 0;
  bottom: 1px;
  height: 2px;
  position: absolute;
  background-color: var(--primary3);
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}

.header__nav-item:hover::before {
  width: 80%;
}

.header__nav-item:hover span {
  color: var(--primary3);
  text-decoration: none;
}

.header__nav-item:hover img {
  filter: invert(60%) sepia(100%) saturate(85) hue-rotate(205deg);
}

.header a {
  color: #000;
  text-decoration: none;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 991px) {
  .header__wap-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .header__wap-content--right {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
  }

  .header__wap-content--right svg {
    font-size: 22px;
  }

  .header__user {
    height: 45%;
  }

  .header__menu {
    width: 100vw;
    background-color: #fff;
    transform: translate(-115%);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    position: absolute;
    top: 60px;
    left: 0;
    z-index: 20;
    transition: all 0.4s;
  }

  .header__menu--top {
    padding: 20px;
    box-shadow: 0px 3px 8px rgba(168, 168, 168, 0.3);
  }

  .header__menu--bottom {
    padding: 20px;
  }

  .header__btn-customer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header__btn-customer span {
    width: 47%;
    color: #77869e;
    font-family: var(--font-medium);
    font-size: 12px;
    background-color: #f2f2f2;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    text-transform: uppercase;
  }

  .header__btn-customer span.active-cust {
    background-color: #3aa4f6;
    color: #fff;
  }

  .header__btn-support {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
  }

  .header__btn-support a {
    width: 47%;
    padding: 10px 0;
    border-radius: 6px;
    border: 1px solid #dadada;
    justify-content: center;
  }

  .header__btn-support span {
    font-size: 13px;
    color: #4d4d4d;
    text-transform: none !important;
  }

  .header__close-btn {
    width: 20%;
    z-index: 21;
    display: flex;
    align-items: center;
    padding-left: 9px;
    min-height: 1px;
  }

  .header__close-btn div,
  .header__close-btn div::before,
  .header__close-btn div::after {
    width: 27px;
    height: 3px;
    border-radius: 30px;
    background: #0571bc;
    transition: 0.3s;
    position: absolute;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.101);
    content: '';
  }

  .header__close-btn div::before {
    width: 27px;
    right: 0;
    top: -8px;
  }

  .header__close-btn div::after {
    width: 27px;
    right: 0;
    top: 8px;
  }

  .header.open-menu .header__menu {
    transform: translateX(-3.1%);
  }

  .header.open-menu .header__close-btn {
    min-height: 1px;
  }

  .header.open-menu .header__close-btn div {
    background: transparent;
    box-shadow: none;
  }

  .header.open-menu .header__close-btn div::before {
    top: 0;
    width: 27px;
    transform: rotate(45deg);
  }

  .header.open-menu .header__close-btn div::after {
    top: 0;
    width: 27px;
    transform: rotate(135deg);
  }
}

@media screen and (min-width: 200px) and (max-width: 767px) {
  .header.open-menu .header__menu {
    transform: translateX(0);
  }
}

@media screen and (min-width: 200px) and (max-width: 767px) and (orientation: landscape) {
  .header.open-menu .header__menu {
    transform: translateX(-13.3%);
  }
}
</style>