import { SwiperOptions } from "swiper/types";


interface ResponsiveOptions {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
}

export const breakpoints: ResponsiveOptions = {
  320: { slidesPerView: 2, spaceBetween: 10 },
  768: { slidesPerView: 2, spaceBetween: 10 },
  1024: { slidesPerView: 4, spaceBetween: 13 },
  1224: { slidesPerView: 5, spaceBetween: 15 },
};

export const breakpointOrders: ResponsiveOptions = {
  320: { slidesPerView: 1.5, spaceBetween: 10 },
  768: { slidesPerView: 2.5, spaceBetween: 10 },
  1024: { slidesPerView: 4.5, spaceBetween: 13 },
  1224: { slidesPerView: 5.5, spaceBetween: 15 },
}