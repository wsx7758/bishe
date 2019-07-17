<template>
    <main>
        <div class="uploadimg">上传车辆照片：</div>
        <div ref="imglist" class="imglist" @click="getImg">
            <div v-for="(item,ind) in imglist" :key='ind'>
                <img :src="item" alt="" ref="img">
                <p @click.stop="delimg(ind)">x</p>
            </div>
            
        </div>
            <div class="pickphoto" v-if="pickphotoshow">{{errmsg}}！</div>
            <div class="sure" v-if="sure">正在发布中，请稍候...</div>
         <div class="toPhoto" @click="toPrice">确认发布</div>
         <div class="imgMode animated fadeInUp" v-show="imgmode">
                <div @click="getCam">拍照</div>
                <div @click="getLoc">相册选取</div>
                <div @click="getImg">取消</div>
            </div>
         <div class="mask animated fadeIn" v-show="imgmode"  @click="getImg"></div>
         <div class="photoEx">
             <div class="swiper-container">
                <div class="swiper-wrapper">
                  <!-- <div class="swiper-slide" v-for="(item,ind) in bannerb" :key='ind'>
                    <img :src="item.car_image_rename" alt="">
                  </div> -->
                  <div class="swiper-slide" v-for="(val,ind) in sampleimg" :key="ind">
                    <img :src="val.sample_image_url" alt="">
                  </div>
                  <!-- <div class="swiper-slide">
                    aaaaa
                  </div>
                  <div class="swiper-slide">
                    aaaaa
                  </div> -->
                </div>
                <div class="swiper-pagination"></div>
            </div>
         </div>
    </main>
</template>
<script src='./two.js'></script>
<style lang='less' src='./two.less' scoped></style>

