<script setup lang="ts">
const props = defineProps(['pageTitle'])
</script>

<template>
    <div class="tw-mb-6 tw-flex tw-flex-col tw-gap-3 sm:tw-flex-row sm:tw-items-center sm:tw-justify-between">
        <h2 class="tw-text-[26px]/[30px] tw-font-semibold tw-text-black dark:tw-text-white">
            {{ props.pageTitle }}
        </h2>

        <nav>
            <ol class="tw-flex tw-items-center tw-gap-2">
                <li>
                    <router-link class="tw-font-medium tw-text-black" to="/dashboard"> Dashboard / </router-link>
                </li>
                <li class="tw-font-medium tw-text-primary">{{ props.pageTitle }}</li>
            </ol>
        </nav>
    </div>
</template>