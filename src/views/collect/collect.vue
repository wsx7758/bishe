<template>
    <div>
        <collectHead title='我的收藏' />
        <main>
            <div class="allCar">
                <ul>
                    <li v-for="(val,ind) in carlist" :key="ind" @click="toDetails(val.Id,val.userid,val.xiajia)">
                        <div><img :src="val.carimg.split('&')[0]" alt=""></div>
                        <div class="allCarR">
                            <div><span>品牌：</span><i>{{val.brandName}}</i></div>
                            <div><span>车龄：</span><i>{{val.year}}</i> 年</div>
                            <div class="carPrice"><span>价格：</span><i>{{val.price}}</i> 万</div>
                            <div class="carloc"><span>车辆所在地：</span><i>{{val.ycdz}}</i></div>
                            <div class="carPrice" v-show="val.xiajia==0?false:true"><i>已下架 !</i></div>
                        </div>
                        <div class="delete" @click.stop="delcollect(val.Id,val.userid,ind)">取消收藏</div>
                    </li>
                </ul>
                <div class="nothing" v-if="carlist.length==0?true:false">您还没有收藏哦</div>
            </div>
        </main>
    </div>
</template>

<script src='./collect.js'></script>

<style lang='less' src='./collect.less' scoped></style>
