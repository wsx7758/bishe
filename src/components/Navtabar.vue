<template>
    <nav>
        <router-link active-class='nowNav' class="navList" tag='div' v-for="(item,ind) in navlist" :key="ind" :to="item.path">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
        </router-link>
    </nav>
</template>
<script>
export default {
    nama:'navtabar',
    data(){
        return {
            navlist:[
                {name:'首页',path:'/home',icon:'iconfont icon-iconfontzhizuobiaozhun14'},
                {name:'买车',path:'/carlist',icon:'iconfont icon-iconfontzhizuobiaozhun023120'},
                {name:'卖车',path:'/sellcar',icon:'iconfont icon-maiche'},
                {name:'我的',path:'/my',icon:'iconfont icon-04'}
            ]
        }
    }
}
</script>
<style lang='less' scoped>
    @import '../less/mixin.less';
    @import '../fonticon/iconfont.css';
    nav{
        z-index: 999;
        .w(375);
        position: fixed;
        .b(0);
        .h(50);
        background:  #F7CF0D;
        display: flex;
        .navList{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            i{
                .fs(25);
            }
        }
        .nowNav{
            color: red;
        }
    }
</style>

