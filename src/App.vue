<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <keep-alive include="carlist">
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="less">
#app {
  text-align: center;
  color: #2c3e50;
  font-family: 'Arial Normal', 'Arial';
  font-weight: 400;
  font-style: normal;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
