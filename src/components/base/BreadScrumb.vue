<template>
  <div class="app-bread-scrumb tw-cursor-pointer tw-text-gray-600 tw-gap-2">
    <Container class="main">
      <div class="item tw-flex tw-gap-2 tw-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10.633" viewBox="0 0 12 10.633">
          <path id="home"
            d="M13.2,9.061H12.1v3.965a.6.6,0,0,1-.661.661H8.793V9.721H6.15v3.965H3.507a.6.6,0,0,1-.661-.661V9.061h-1.1c-.4,0-.311-.214-.04-.494L7,3.259a.634.634,0,0,1,.936,0l5.3,5.307c.272.281.356.495-.039.495Z"
            transform="translate(-1.471 -3.053)" fill="#d70018"></path>
        </svg>
        <router-link to="/" class="tw-block">
          Trang chủ
        </router-link>
      </div>
      <router-link :to="nav.path" class="hover:tw-text-red nav-item tw-flex tw-items-center tw-gap-2"
        v-for="(nav, index) in subNavs" :key="index">
        <div class="icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                fill="#959595"></path>
            </g>
          </svg>
        </div>
        <span>
          {{ nav.name }}
        </span>
      </router-link>
      <div v-if="namePage" class="tw-text-red tw-cursor-default nav-item tw-flex tw-items-center tw-gap-2">
        <div class="icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                fill="#959595"></path>
            </g>
          </svg>
        </div>
        <span>
          {{ namePage }}
        </span>
      </div>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import Container from './Container.vue';

interface INav {
  name: string,
  path: string
}

const { namePage, subNavs } = defineProps<{ namePage: string, subNavs?: INav[] }>();

const navItems: string[] = [
  "Điện thoại",
  "iPhone 15 Pro Max"
]
</script>
<script lang="ts">
export default {
  name: "BreadScrumb",
};
</script>

<style scoped lang="scss">
.app-bread-scrumb {
  padding: 5px 0;
  box-shadow: $box-shadow-section-bottom;

  .main {
    display: flex;
    font-size: 13px;

    .item {
      &:hover {
        color: $red;
      }
    }
  }

  .icon {
    svg {
      height: 13px;
      width: 13px;
      fill: $gray;
    }
  }
}
</style>