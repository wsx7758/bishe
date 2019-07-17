<template>
    <div class="loginEmail">
        <LoginHeader :title="headerCon"/>
        <div class="logo">
            <img src="../../assets/logo.png" alt="">
        </div>
        <div class="loginCon">
            <div class="usName usInfo">
                <input type="text" v-model="usname" placeholder="请输入账号或邮箱">
            </div>
            <div class="usPsw usInfo"> 
                <input type="password" v-model="passward" placeholder="密码">
                <div></div>
            </div>
            <div class="red" v-show="redshow">账号或密码有误！</div>
            <div class="loginNow" @click="loginnow">登录</div>
            <p @click="toforget"><u>忘记密码？</u></p>
            <p @click="toreg"><u>没有账号？</u></p>
        </div>
    </div>
</template>
<script src='./login.js'></script>
<style lang='less' src='./login.less' scoped></style>