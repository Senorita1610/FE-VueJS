<script setup lang="ts">
import { useSidebarStore } from '@store/sidebar';
import { onClickOutside } from '@vueuse/core';
import SvgLogout from '@assets/svg/logout.svg?raw';
import SvgAccountType from '@assets/svg/accounttype.svg?raw';
import SvgAccount from '@assets/svg/account.svg?raw';
import SvgCustomer from '@assets/svg/customer.svg?raw';
import SvgEmployee from '@assets/svg/employee.svg?raw';
import SvgSupplier from '@assets/svg/supplier.svg?raw';
import SvgCategory from '@assets/svg/category.svg?raw';
import SvgPackage from '@assets/svg/package.svg?raw';
import SvgPaymentMethod from '@assets/svg/paymentmethod.svg?raw';
import SvgPromotion from '@assets/svg/promotion.svg?raw';
import SvgBill from '@assets/svg/bill.svg?raw';
import { ref } from 'vue'
import SidebarItem from './SidebarItem.vue'

const target = ref(null)

const sidebarStore = useSidebarStore()

onClickOutside(target, () => {
  sidebarStore.isSidebarOpen = false
})

const menuGroups = ref([
  {
    name: 'MENU',
    menuItems: [
      {
        icon: SvgAccountType,
        label: 'Account Types',
        route: '/account-type'
      },
      {
        icon: SvgAccount,
        label: 'Account',
        route: '/account',
      },
      {
        icon: SvgCustomer,
        label: 'Customer',
        route: '/customer'
      },
      {
        icon: SvgEmployee,
        label: 'Employee',
        route: '/employee',
      },
      {
        icon: SvgSupplier,
        label: 'Supplier',
        route: '/supplier'
      },
      {
        icon: SvgCategory,
        label: 'Category',
        route: '/category',
      },
      {
        icon: SvgPromotion,
        label: 'Promotion',
        route: '/promotion',
      },
      {
        icon: SvgPackage,
        label: 'Package',
        route: '/package',
      },
      {
        icon: SvgPaymentMethod,
        label: 'Payment Method',
        route: '/payment-method',
      },
      {
        icon: SvgBill,
        label: 'Bill',
        route: '/bill',
      },
    ]
  },
  {
    name: 'OTHERS',
    menuItems: [
      {
        icon: SvgLogout,
        label: 'Authentication',
        route: '#',
        children: [
          { label: 'Log out', route: '/' },
        ]
      }
    ]
  }
])
</script>

<template>
  <aside
    class="tw-absolute tw-left-0 tw-top-0 tw-z-9999 tw-flex tw-h-screen tw-w-70 tw-flex-col tw-overflow-y-hidden tw-bg-black tw-duration-300 tw-ease-linear dark:tw-bg-boxdark lg:tw-static lg:tw-translate-x-0"
    :class="{
      'tw-translate-x-0': sidebarStore.isSidebarOpen,
      'tw--translate-x-full': !sidebarStore.isSidebarOpen
    }" ref="target">
    <!-- SIDEBAR HEADER -->
    <div class="tw-flex tw-items-center tw-justify-between tw-gap-2 tw-px-6 tw-py-5.5 lg:tw-py-6.5">
      <router-link to="/">
        <img src="@/assets/images/logo/logo.svg" alt="Logo" />
      </router-link>

      <button class="tw-block lg:tw-hidden" @click="sidebarStore.isSidebarOpen = false">
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
            fill="black" />
        </svg>
      </button>
    </div>
    <!-- SIDEBAR HEADER -->

    <div class="no-scrollbar tw-flex tw-flex-col tw-overflow-y-auto tw-duration-300 tw-ease-linear">
      <!-- Sidebar Menu -->
      <nav class="tw-mt-5 tw-py-4 tw-px-4 lg:tw-mt-9 lg:tw-px-6">
        <template v-for="menuGroup in menuGroups" :key="menuGroup.name">
          <div>
            <h3 class="tw-mb-4 tw-ml-4 tw-text-sm tw-font-medium tw-text-bodydark2">{{ menuGroup.name }}</h3>

            <ul class="tw-mb-6 tw-flex tw-flex-col tw-gap-1.5">
              <SidebarItem v-for="(menuItem, index) in menuGroup.menuItems" :item="menuItem" :key="index"
                :index="index" />
            </ul>
          </div>
        </template>
      </nav>
      <!-- Sidebar Menu -->
    </div>
  </aside>
</template>
