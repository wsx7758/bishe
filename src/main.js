import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import qs from 'qs';
import { DatetimePicker,Picker,Spinner  } from 'mint-ui';

import utils from'@/components/share.js';
import Mui from 'vue-awesome-mui';

Vue.use(Mui);
Vue.prototype.$utils=utils;
// import { Picker } from 'mint-ui';
// import { Spinner } from 'mint-ui';
// import { InfiniteScroll } from 'mint-ui';
Vue.component(Spinner.name, Spinner);
Vue.component(Picker.name, Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
// axios.defaults.baseURL = 'http://192.168.43.209:8521/';
axios.interceptors.request.use(
  config => {
    // config.headers.contentType='x-www-form-urlencoded';
    // config.headers.post['Content-Type']='x-www-form-urlencoded'
      // console.log(config.headers.post['Content-Type']);
      // console.log(config);
      if(!/http/.test(config.url)){
        config.url = 'http://59.110.138.64:8521/'+config.url;
      }

      return config;
  },
  err => {
      return Promise.reject(err);
  });
//Require local
// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
  response => {
    // console.log(config);
      return response;
  },
  error => {
      
      return Promise.reject(error.response.data) 
  });
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
