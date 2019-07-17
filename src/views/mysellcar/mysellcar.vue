<template>
    <div>
        <mycarHead title='我在卖的' />
        <main>
            <div class="allCar">
                <ul>
                    <li v-for="(val,ind) in carlist" :key="ind">
                        <div><img :src="val.carimg.split('&')[0]" alt=""></div>
                        <div class="allCarR">
                            <div><span>品牌：</span><i>{{val.brandName}}</i></div>
                            <div><span>车龄：</span><i>{{val.year}}</i> 年</div>
                            <div class="carPrice"><span>价格：</span><i>{{val.price}}</i> 万</div>
                            <div class="carloc"><span>车辆所在地：</span><i>{{val.ycdz}}</i></div>
                        </div>
                        <div class="delete" @click="delcar(val.Id,ind)">删除</div>
                    </li>
                </ul>
                <div class="nothing" v-if="carlist.length==0?true:false">暂无在卖信息！</div>
            </div>
        </main>
    </div>
</template>
<script src='./mysellcar.js'></script>
<style lang='less' src='./mysellcar.less' scoped></style>
