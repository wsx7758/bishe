<template>
    <div>
        <forgetHeader :title="headerCon"/>
        <div class="regCon">
            <div class="usInfo"><input type="text" placeholder="请输入邮箱" v-model="usEmail"></div>
            <div class="red" v-show="emailshow">邮箱错误！</div>
            <div class="usInfo"><input type="password" placeholder="设置新密码" v-model="usPassworda" @blur="yzpsa"></div>
            <div class="red" v-show="psshowa">密码必须在6-12间！</div>
            <div class="usInfo"><input type="password" placeholder="确认新密码" v-model="usPasswordb" @blur="yzpsb"></div>
            <div class="red" v-show="psshowb">密码不一致！</div>
            <div class="emailCode">
                <div class="emailCodeL">
                    <input type="text" placeholder="验证码" v-model="code" ref="yzm">
                </div>
                <div class="emailCodeR" @click="getEmailCode" v-show="yzmshow"><u>获取验证码</u></div>
                <div class="emailCodeR" v-show="secshow">重新发送({{second}}s)</div>
            </div>
            <div class="red" v-show="isyes">请填入正确信息！</div>
            <div class="loginNow" @click="regNow">确认重置</div>
        </div>
    </div>
</template>
<script src='./forget.js'></script>
<style lang="less" src='./forget.less' scoped></style>

