<template>
    <div>
        <sellHeader :title="headerCon"/>
        <div class="sellcar">
            <ul>
                <li v-for="(val,ind) in steplist" :key="ind" :class="val.path==$route.path?'lh':''">
                    <p>{{val.num}}</p>
                    <div>{{val.content}}</div>
                </li>
            </ul>
        </div>
        <router-view></router-view>
        <navTabar />
    </div>
</template>
<script src='./sellcarhome.js'></script>
<style lang='less' src='./sellcarhome.less' scoped></style>
