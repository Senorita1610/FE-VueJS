<script setup lang="ts">
import { useSidebarStore } from '@store/sidebar'
import { useRoute } from 'vue-router'
import SvgDropdown from '@assets/svg/dropdown.svg?raw';
import SidebarDropdown from './SidebarDropdown.vue'

const sidebarStore = useSidebarStore()

const props = defineProps(['item', 'index'])
const currentPage = useRoute().name

interface SidebarItem {
    label: string
}

const handleItemClick = () => {
    const pageName = sidebarStore.page === props.item.label ? '' : props.item.label
    sidebarStore.page = pageName

    if (props.item.children) {
        return props.item.children.some((child: SidebarItem) => sidebarStore.selected === child.label)
    }
}
</script>

<template>
    <li>
        <router-link :to="item.route"
            class="group tw-relative tw-flex tw-items-center tw-text-[16px] tw-gap-2.5 tw-rounded-sm tw-py-2 tw-px-4 tw-font-medium tw-text-bodydark1 tw-duration-300 tw-ease-in-out hover:tw-bg-graydark dark:hover:tw-bg-meta-4"
            @click.prevent="handleItemClick" :class="{
                'tw-bg-graydark dark:tw-bg-meta-4': sidebarStore.page === item.label
            }">
            <span v-html="item.icon"></span>

            {{ item.label }}
            <div v-if="item.children" class="tw-absolute tw-right-4 tw-top-1/2 tw--translate-y-1/2 tw-fill-current"
                :class="{ 'tw-rotate-180': sidebarStore.page === item.label }" v-html="SvgDropdown"></div>
        </router-link>

        <!-- Dropdown Menu Start -->
        <div class="tw-translate tw-transform tw-overflow-hidden" v-show="sidebarStore.page === item.label">
            <SidebarDropdown v-if="item.children" :items="item.children" :currentPage="currentPage"
                :page="item.label" />
            <!-- Dropdown Menu End -->
        </div>
    </li>
</template>
