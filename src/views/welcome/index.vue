<template>
    <div class="welcomeBg">
        <div class="logo"><img src="../../assets/logo.png" alt=""></div>
        <main>
            <div class="LR">
                <div @click="loginEmail"><u>登  录</u></div>
                <div @click="toReg"><u>注  册</u></div>
            </div>
            <div class="xgg" @click="toHome"><u>先逛逛</u></div>
        </main>
    </div>
</template>
<script src='./welcome.js'></script>
<style lang='less' src='./welcome.less' scoped></style>


