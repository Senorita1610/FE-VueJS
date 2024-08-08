<script setup lang="ts">
import { useSidebarStore } from '@store/sidebar'
import { ref } from 'vue'

const sidebarStore = useSidebarStore()

const props = defineProps(['items', 'page'])
const items = ref(props.items)

const handleItemClick = (index: number) => {
    const pageName =
        sidebarStore.selected === props.items[index].label ? '' : props.items[index].label
    sidebarStore.selected = pageName
}
</script>

<template>
    <ul class="tw-mt-4 tw-mb-5.5 tw-flex tw-flex-col tw-gap-2.5 tw-pl-6">
        <template v-for="(childItem, index) in items" :key="index">
            <li>
                <router-link :to="childItem.route" @click="handleItemClick(index)"
                    class="group tw-relative tw-flex tw-items-center tw-gap-2.5 tw-rounded-md tw-px-4 tw-font-medium tw-text-bodydark2 tw-duration-300 tw-ease-in-out hover:tw-text-white"
                    :class="{
                        '!tw-text-white': childItem.label === sidebarStore.selected
                    }">
                    {{ childItem.label }}
                </router-link>
            </li>
        </template>
    </ul>
</template>
