<template>
  <main class="home">
    <Navls />
    <div class="homeCon">
        <div class="conT" @click="tobuy">
          <div class="search">
            <img src="../../assets/sec.png" alt="">
            <input  type="text" placeholder="更多好车">
          </div>
          <div class="swipera">
              <div class="swiper-container swiper-containera">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,ind) in bannera" :key='ind'>
                    <img :src="item.carousel_image" alt="">
                  </div>
                </div>
              <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
              
              <!-- 如果需要导航按钮 -->
                <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div> -->
              
              <!-- 如果需要滚动条 -->
                <!-- <div class="swiper-scrollbar"></div> -->
              </div>
          </div>
        </div>
        <div class="conM">
          <!-- <div class="pickList"> -->
            <ul class="brandList" :style="morelogo?{height:'auto'}:null">
              <li v-for="(val,ind) in logolist" :key="ind" @click="setbrand(val.one_level_complex)">
                <img :src="val.logo_image" alt="">
              </li>
              <!-- <li><img src="../../assets/alllogo.png" alt=""></li> -->
            </ul>
          <div class="morebrand" @click="getmoreBrand"><p :class="morelogo?'up':'down'"></p></div>
          </div>
          <div class="allcar" @click="tobuy">
            查看全部优质车源
          </div>
        <!-- </div> -->
        <div class="conB">
          <div class="swiper-container swiper-containerb">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,ind) in bannerb" :key='ind'>
                    <img :src="item.carousel_image" alt="">
                  </div>
                </div>
          </div>
        </div>
    </div>
  </main>
</template>

<script src='./home.js'></script>
<style lang='less' src='./home.less' scoped></style>
