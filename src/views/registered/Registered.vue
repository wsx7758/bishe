<template>
    <div>
        <RegHeader :title="headerCon"/>
        <div class="regCon">
            <div class="usInfo"><input type="text" placeholder="账号(字母、数字组合并以字母开头6-12位)" v-model="usName" @blur="yznama"></div>
            <div class="red" v-show="nameshow">{{errname}}</div>
            <div class="usInfo"><input type="password" placeholder="密码" v-model="usPassword" @blur="yzps"></div>
            <div class="red" v-show="psshow">密码必须在6-12间！</div>
            <div class="usInfo"><input type="text" placeholder="邮箱" v-model="usEmail"></div>
            <div class="red" v-show="emailshow">{{emailprompt}}</div>
            <div class="emailCode">
                <div class="emailCodeL">
                    <input type="text" placeholder="验证码" v-model="code" ref="yzm">
                </div>
                <div class="emailCodeR" @click="getEmailCode" v-show="yzmshow"><u>获取验证码</u></div>
                <div class="emailCodeR" v-show="secshow">重新发送({{second}}s)</div>
            </div>
            <div class="red" v-show="isyes">请填入正确信息！</div>
            <div class="loginNow" @click="regNow">注 册</div>
        </div>
    </div>
</template>
<script src='./reg.js'></script>
<style lang="less" src='./reg.less' scoped></style>

