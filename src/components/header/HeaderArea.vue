<script setup lang="ts">
import { useSidebarStore } from '@store/sidebar'
import DropdownUser from '@components/header/DropdownUser.vue'

const { toggleSidebar } = useSidebarStore()
const sidebarStore = useSidebarStore()
</script>

<template>
  <header
    class="tw-sticky tw-top-0 tw-z-999 tw-flex tw-w-full tw-bg-white tw-drop-shadow-1 dark:tw-bg-boxdark dark:tw-drop-shadow-none">
    <div
      class="tw-flex tw-flex-grow tw-items-center tw-justify-between tw-py-4 tw-px-4 tw-shadow-2 md:tw-px-6 2xl:tw-px-11">
      <div class="tw-flex tw-items-center tw-gap-2 sm:tw-gap-4 lg:tw-hidden">
        <!-- Hamburger Toggle BTN -->
        <button
          class="tw-z-99999 tw-block tw-rounded-sm tw-border tw-border-stroke tw-bg-white tw-p-1.5 tw-shadow-sm dark:tw-border-strokedark dark:tw-bg-boxdark lg:tw-hidden"
          @click="() => {
            console.log('Toggling Sidebar')
            toggleSidebar()
          }
            ">
          <span class="tw-relative tw-block tw-h-5.5 tw-w-5.5 tw-cursor-pointer">
            <span class="tw-block tw-absolute tw-right-0 tw-h-full tw-w-full">
              <span
                class="tw-relative tw-top-0 tw-left-0 tw-my-1 tw-block tw-h-0.5 tw-w-0 tw-rounded-sm tw-bg-black tw-delay-[0] tw-duration-200 tw-ease-in-out dark:tw-bg-white"
                :class="{ '!tw-w-full tw-delay-300': !sidebarStore.isSidebarOpen }"></span>
              <span
                class="tw-relative tw-top-0 tw-left-0 tw-my-1 tw-block tw-h-0.5 tw-w-0 tw-rounded-sm tw-bg-black tw-delay-150 tw-duration-200 tw-ease-in-out dark:tw-bg-white"
                :class="{ '!tw-w-full tw-delay-400': !sidebarStore.isSidebarOpen }"></span>
              <span
                class="tw-relative tw-top-0 tw-left-0 tw-my-1 tw-block tw-h-0.5 tw-w-0 tw-rounded-sm tw-bg-black tw-delay-200 tw-duration-200 tw-ease-in-out dark:tw-bg-white"
                :class="{ '!tw-w-full tw-delay-500': !sidebarStore.isSidebarOpen }"></span>
            </span>
            <span class="tw-block tw-absolute tw-right-0 tw-h-full tw-w-full tw-rotate-45">
              <span
                class="tw-absolute tw-left-2.5 tw-top-0 tw-block tw-h-full tw-w-0.5 tw-rounded-sm tw-bg-black tw-delay-300 tw-duration-200 tw-ease-in-out dark:tw-bg-white"
                :class="{ '!tw-h-0 tw-delay-[0]': !sidebarStore.isSidebarOpen }"></span>
              <span
                class="tw-delay-400 tw-absolute tw-left-0 tw-top-2.5 tw-block tw-h-0.5 tw-w-full tw-rounded-sm tw-bg-black tw-duration-200 tw-ease-in-out dark:tw-bg-white"
                :class="{ '!tw-h-0 tw-delay-200': !sidebarStore.isSidebarOpen }"></span>
            </span>
          </span>
        </button>
        <!-- Hamburger Toggle BTN -->
        <router-link class="tw-block tw-flex-shrink-0 lg:tw-hidden" to="/">
          <img src="@/assets/images/logo/logo-icon.svg" alt="Logo" />
        </router-link>
      </div>
      <div class="tw-hidden sm:tw-block">
      </div>

      <div class="tw-flex tw-items-center tw-gap-3 2xsm:tw-gap-7">
        <ul class="tw-flex tw-items-center tw-gap-2 2xsm:tw-gap-4">

        </ul>

        <!-- User Area -->
        <DropdownUser />
        <!-- User Area -->
      </div>
    </div>
  </header>
</template>