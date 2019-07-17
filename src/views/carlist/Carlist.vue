<template>
    <div class="carlist">
        <header>
            买 车
        </header>
        <main :class="picklistShow?'maxpt':'minpt'">
            <div class="pickList">
                <ul class="pickListUl">
                    <li @click="setSort(0)">
                        排序
                        
                    </li>
                    <li @click="showBrand">品牌</li>
                    <li  @click="setSort(1)">价格</li>
                    <li @click="toCarMore">筛选</li>
                </ul>
            </div>
            <div class="already" v-show="isShow?false:picklistShow">
                <div>已筛选：</div>
                <div>
                    <ul class="alredyul">
                        <li v-for="(val,ind) in picklist" :key="ind">
                            {{val.value}}
                            <p @click.stop="delimg(val.repeat,ind)">x</p>
                        </li>
                    </ul>
                </div>
            </div>
            <transition
                enter-active-class='animated fadeInDown'
    　　　　     leave-active-class=''
                >
            <div class="reorder" v-show="isShow">
                <ul>
                    <li v-for="(item,ind) in orderlist" @click="setLh(item.pick,item.val,item.name,ind)" :key="ind" :class="item.val==orderpick?'lh':null">{{item.name}}</li>
                </ul>
            </div>
            </transition>
            <div class="allCar"  >
                <ul ref="allCar"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                    <li v-for="(val,ind) in carlist" :key="ind" @click="toDetails(val.Id,val.userid)">
                        <div><img :src="val.carimg.split('&')[0]"  onerror="this.src='../../assets/err.jpg';this.onerror=null;"></div>
                        <div class="allCarR">
                            <div><span>品牌：</span><i>{{val.brandName}}</i></div>
                            <div><span>车龄：</span><i>{{val.year}}</i> 年</div>
                            <div class="carPrice"><span>价格：</span><i>{{val.price}}</i> 万</div>
                            <div class="carloc"><span>车辆所在地：</span><i>{{val.ycdz}}</i></div>
                        </div>
                    </li>
                </ul>
                <div class="nodata" v-show="nodatashow">暂无数据</div>
            </div>
            <transition
            enter-active-class='animated fadeInRight'
　　　　     leave-active-class='animated fadeOutRight'
            >
            <div class="brand" v-show="brandShow">
                <p class="brandTitle">请选择品牌：</p>
                <div v-for="(val,ind) in brandlit" :key="ind" class="brandCon">
                    <p>{{val.letter=='Z'?'其他':val.letter}}</p>
                    <ul>
                        <li v-for="(item,ind2) in val.data" :key="ind2" @click="setBrand(item.one_level_complex)">
                            <img :src="item.logo_image" alt="">
                            <span>{{item.one_level_complex}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            </transition>
            <transition
            enter-active-class='animated fadeIn'
　　　　     leave-active-class='animated fadeOut'
            >
                <div class="brandMask animated fadeIn " @click="isMask" v-show="maskShow"></div>
            </transition>
            <transition
            enter-active-class='animated fadeIn'
　　　　     leave-active-class='animated fadeOut'
            >
            <div class="sortMask animated fadeIn " @click="isMask" v-show="isShow"></div>
            </transition>
        </main>
        <Navls />
    </div>
</template>
<script src='./carlist.js'></script>
<style lang='less' src='./carlist.less' scoped></style>

