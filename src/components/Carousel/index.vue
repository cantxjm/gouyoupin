<template>
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
      <!-- carousel:轮播图 -->
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要左右导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      // 立即监听：不管你数据有没有变化，上来立即监听一次
      immediate: true,
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            autoplay: true,
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
  /* watch: {
    // 监听bannerList数据的变化
    bannerList: {
      immediate: true,
      handler(newValue, oldValue) {
        // 如果执行handler方法，代表组件实例身上这个属性的数据已经有了【数组：四个元素】
        // 当前这个函数执行：只能保证bannerList数据有了，但是没办法保证v-for已经执行结束
        // v-for执行完毕，才有结构

        // netxTick:在下次 DOM更新 循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        this.$nextTick(() => {
          // 当你执行这个回调的时候：保证服务器数据回来了，v-for执行完毕了【轮播图的结构一定有了】
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            autoplay: true,
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },*/
};
</script>

<style>
</style>