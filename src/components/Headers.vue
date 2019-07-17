<template>
    <header>
        <div class="headerLeft" @click="goBack"></div>
            {{title}}
    </header>
</template>
<script>
export default {
    name:'headers',
    props:{
        title:String
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang='less' scoped>
@import '../less/mixin.less';
 header{
     text-align: center;
     .fs(22);
     .h(64);
     background-color: #F6D631;
     .lh(64);
    position: fixed;
    .t(0);
    .l(0);
    .r(0);
    z-index: 999;
     .headerLeft{
         position: absolute;
        .t(10);
         .w(44);
         .h(44);
         background: url('../assets/ic_arrow_left_return_black.png')no-repeat center center;
         .bs(15);
     }
 }
</style>


