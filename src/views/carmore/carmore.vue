<template>
    <div>
        <carMoreHeader :title="isShowa?'车型属性':'筛选'" />
        <div class="carmore">
            <div class="carcolor">
                <div class="qualityTitle">色系</div>
                <ul>
                    <li v-for="(val,ind) in colorlist" :key="ind" @click="setcolor(val.name)" 
                    :class="val.name==colorLh?'colorpick':null">
                        <div :style="{background:val.color}" :class="val.name=='白色'?'shadow':null"></div>
                        <p>{{val.name}}</p>
                    </li>
                </ul>
            </div>
            <div class="otherMore">
                <div>
                    车龄
                    <span>{{isShowa?'(单位：年)':'（年以内）'}}</span>
                </div>
                <div v-if="isShowa">
                    <input type="text" placeholder="请输入" v-model="year">
                </div>
                <div v-if="isShowb">
                    <input type="text" placeholder="请输入" v-model="phpyear">
                </div>
            </div>
            <div class="otherMore" v-if="isShowa">
                <div>
                    已行驶
                    <span>(单位：万公里)</span>
                </div>
                <div>
                    <input type="text" placeholder="请输入" v-model="km">
                </div>
            </div>
            <div class="otherMore" v-if="isShowb">
                <div>
                    验车地址
                </div>
                <div>
                    <input @click="pcaShow=!pcaShow" type="text" placeholder="省、市、区..." v-model="phpycdz">
                </div>
            </div>
        </div>
        <div class="msg" v-if="isShowa">{{msg}}</div>
        <div class="acknowledge"><p @click="setCarMore">确认</p></div>
        <transition
            enter-active-class='animated fadeInUp'
　　　　     leave-active-class='animated fadeOutDown'
            >
        <div class="pca" v-if="pcaShow">
            <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
            <!-- <p>地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p> -->
            <div class="pcaOk"><p @click="pcaShow=!pcaShow">确定</p></div>
        </div>
        </transition>
        <transition
            enter-active-class='animated fadeIn'
　　　　     leave-active-class='animated fadeOut'
            >
        <div class="pcaMask" v-if="pcaShow" @click="setpcaMask"></div>
        </transition>
    </div>
</template>
<script src='./carmore.js'></script>
<style lang='less' src='./carmore.less' scoped></style>
