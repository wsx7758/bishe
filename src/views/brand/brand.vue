<template>
    <div>
        <brandHeader title="品牌选择"/>
        <div class="brand">
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
    </div>
</template>
<script src='./brand.js'></script>
<style lang='less' src='./brand.less' scoped></style>
