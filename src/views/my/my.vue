<template>
    <div class="my">
        <header>
            个人中心
        </header>
        <main>
            <div class="setusimg animated fadeInUp"  v-show="usmaskshow">
                <div class="fontleft">上传新头像：</div>
                <div @click="getCam">拍照</div>
                <div @click="getLoc">相册选取</div>
                <div class="suer">
                    <div @click="setusmaskshow">取消</div>
                    <div @click="setnewimg">确定</div>
                </div>
            </div>
            <div class="myInfo" v-for="(val,ind) in userInfo" :key="ind" @click="usmaskshow=true">
                <div class="myInfoL">
                    <img :src="usimg?usimg:val.usimg" alt="">
                </div>
                <div class="myInfoM">
                    <div>
                        ID：{{val.Id}}
                    </div>
                    <div>
                        用户：{{val.usname}}
                    </div>
                </div>
                <!-- <div class="myInfoR">
                    >
                </div> -->
            </div>
            <div class="mysee">
                <div class="mylike" @click="toCollect">
                    <div class="mylikeL">
                        <img src="../../assets/aixin.png" alt="">
                    </div>
                    <div class="mylikeM">我的收藏</div>
                    <p>></p>
                </div>
                <div class="mylike" @click="toMysell">
                    <div class="mylikeL">
                        <img src="../../assets/maichu.png" alt="">
                    </div>
                    <div class="mylikeM">我在卖的车</div>
                    <p>></p>
                </div>
                <div class="mylike" @click="$utils.shareHref()">
                    <div class="mylikeL">
                        <img src="../../assets/sharingsharef.png" alt="">
                    </div>
                    <div class="mylikeM">分享给朋友</div>
                    <!-- <p>></p> -->
                </div>
            </div>
            <div class="outLogin" @click="loginout">退出登录</div>
        </main>
        <myNav />
        <div class="usmask animated fadeIn" v-show="usmaskshow" @click="setusmaskshow"></div>
    </div>
</template>
<script src='./my.js'></script>
<style lang='less' src='./my.less' scoped></style>
