<template>
    <main>
        <div>
            <div class="oneCon" @click="goBrand">
                <div>品牌车系</div>
                <div>
                    <input type="text" placeholder="点击设置" v-model="brandName" />
                </div>
            </div>
            <div class="oneCon" @click="gocarMore">
                <div>车型属性</div>
                <div>
                    <input type="text" placeholder="点击设置" v-model="carQuality" />
                </div>
            </div>
            <div class="oneCon">
                <div>上牌时间</div>
                <div>
                    <input type="text"  @click="setspsj" placeholder="点击选择" v-model="spsj"  >
                    <!-- <div @click="setspsj">{{}}</div> -->
                </div>
            </div>
            <div class="oneCon">
                <div>验车地址</div>
                <div @click="pcaShow=!pcaShow">
                    <input type="text" placeholder="省、市、区..." v-model="ycdz">
                </div>
            </div>
            <div class="oneCon">
                <div>联系电话</div>
                <div><input type="text" placeholder="点击输入联系电话" v-model="pho"></div> 
            </div>
            <div class="oneCon">
                <div>联系人</div>
                <div><input type="text" placeholder="点击输入联系人" v-model="person"></div>
            </div>
            <div class="oneCon">
                <div>价格设置<span>(单位：万)</span></div>
                <div><input type="text" placeholder="点击输入价格" v-model="price"></div>
            </div>
        </div>
        <div class="msg">{{msg}}</div>
        <div class="toPhoto" @click="toTakePhoto">下一步</div>
        <div>
            <mt-datetime-picker
                ref="pickerSpsj"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                v-model="pickerValue"
                @confirm="handleConfirm"
                >
            </mt-datetime-picker>
        </div>
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
        <div class="pcaMask" v-if="pcaShow"></div>
        </transition>
    </main>
</template>
<script src='./one.js'></script>
<style lang='less' src='./one.less' scoped></style>
