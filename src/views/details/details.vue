<template>
    <div class="details">
        <detailHead title='详 情' />
        <main>
            <div v-for="item in conlist" :key="item.Id">
                <div>
                    <div class="swipera">
                        <div class="swiper-container">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(img,ind) in item.carimg.split('&').slice(0,-1)" :key='ind'>
                                    <img :src="img" alt="">
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
                <div class="detailsCon">
                    <div class="carDetails">
                        <div><p>车 辆 信 息</p></div>
                        <div class="aboutCar">
                            <div><span>定价：</span><strong>{{item.price}} 万</strong></div>
                            <div><span>品牌：</span>{{item.brandName}}</div>
                            <div><span>已行驶：</span>{{item.km}} 万公里</div>
                            <div><span>车龄：</span>{{item.year}} 年</div>
                            <div><span>车辆所在地：</span>{{item.ycdz}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="userInfo">
                <div class="usImg">
                    <img :src="usimg" alt="">
                </div>
                <div class="usName">
                    <div>{{usname}}</div>
                    <div>电话：{{uspho}}</div>
                </div>
            </div>
        </main>
        <footer>
            <div @click="collect">
                <p :class="iscollect?'icon':null"><span class="iconfont icon-star"></span></p>
                <p>收藏</p>
            </div>
            <div @click="telpho">
                <p><span class="iconfont icon-lianxi"></span></p>
                <p>联系卖家</p>
            </div>
        </footer>
    </div>
</template>
<script src='./details.js'></script>
<style lang='less' src='./details.less' scoped></style>

