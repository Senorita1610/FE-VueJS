<script setup lang="ts">
import HeaderArea from '@components/header/HeaderArea.vue'
import SidebarArea from '@components/sidebar/SidebarArea.vue'
</script>

<template>
    <div class="layout-wrapper">
        <div class="tw-flex tw-overflow-hidden tw-bg-body">
            <SidebarArea />
            <div class="tw-relative tw-flex tw-flex-1 tw-flex-col tw-overflow-y-auto tw-overflow-x-hidden">
                <HeaderArea />
                <div class="layout-main-container">
                    <div class="layout-main">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>