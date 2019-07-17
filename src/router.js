import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import { MessageBox } from 'mint-ui';
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path:"/",
      redirect:'/welcome'
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('./views/welcome/index.vue'),
      beforeEnter:(to, from, next) => {
        var storage = window.localStorage;
        var usInfo = JSON.parse(storage.getItem("usInfo"));
        var newdate = new Date().getTime();
        if(usInfo){
            if((newdate-usInfo.logindate)/86400000<=15){
            store.commit('setisLogin',usInfo.usid);
            store.commit('setusid',usInfo.usid);
            next('/home');
          }else{
            storage.clear();
            next();
          }
        }else{
          next();
        }
      }
    },
    {
      path: '/loginemail',
      name: 'loginemail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/login/LoginEmail.vue')
    },
    {
      path: '/registered',
      name: 'registered',
      component: () => import('./views/registered/Registered.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home/Home.vue')
    },
    {
      path: '/carlist',
      name: 'carlist',
      component: () => import('./views/carlist/Carlist.vue')
    },
    {
      path: '/sellcar',
      name: 'sellcar',
      redirect:'/sellcar/one',
      component: () => import('./views/sellcar/SellcarHome.vue'),
      children:[
        {
          path: '/sellcar/one',
          name: 'sellcarOne',
          component: () => import('./views/sellcar/views/one.vue')
        },
        {
          path: '/sellcar/two',
          name: 'sellcarTwo',
          component: () => import('./views/sellcar/views/two.vue')
        }
      ],
      beforeEnter:(to, from, next) => {
        if(store.state.isLogin){
          next()
        }else{
          MessageBox.confirm('请先登录').then(() => {
            next('/loginemail');
          })
          .catch(()=>{
            next(from.path)
          })
        }
      }
    },
    {
      path: '/brand',
      name: 'brand',
      component: () => import('./views/brand/brand.vue')
    },
    {
      path: '/carmore',
      name: 'carmore',
      component: () => import('./views/carmore/carmore.vue'),
      beforeEnter:(to, from, next) => {
        // console.log(from.path )
        if(from.path == '/carlist'){
          store.commit('setiscarmoreShow','ok');
        }
        if(from.path != '/carlist'){
          store.commit('setiscarmoreShow','');
        }
        next();
      }
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('./views/details/details.vue'),
      beforeEnter:(to, from, next) => {
        if(store.state.isLogin){
          next()
        }else{
          MessageBox.confirm('请先登录').then(() => {
            next('/loginemail');
          })
          .catch(()=>{
            next(from.path)
          })
        }
      }
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('./views/my/my.vue'),
      beforeEnter:(to, from, next) => {
        // alert(getCookie('usid'));
        if(store.state.isLogin){
          next()
        }else{
          MessageBox.confirm('请先登录').then(() => {
            next('/loginemail');
          })
          .catch(()=>{
            next(from.path)
          })
        }
      }
    },
    {
      path: '/collect',
      name: 'collect',
      component: () => import('./views/collect/collect.vue')
    },
    {
      path: '/mycar',
      name: 'mycar',
      component: () => import('./views/mysellcar/mysellcar.vue')
    },
    {
      path: '/forget',
      name: 'forget',
      component: () => import('./views/forget/forget.vue')
    }
  ]
})
