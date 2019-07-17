import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:null,//判断是否登录
    brandName:{
      name:''
    },
    carMore:{
      brandName:'',
      color:'',
      year:'',
      km:'',
      pho:'',
      person:'',
      price:'',
      ycdz:'',
      spsj:'',
      userid:'',
      imglist:[]
    },
    carMoreShow:'',
    phpval:{//条件查询sql
      brandName:'',
      color:'',
      year:'',
      ycdz:'',
      price:''
    },
    phppx:'',//排序
    iscarlistRej:0,//是否进入list时加载分类
    iscarmoreShow:0//设置是否是筛选
  },
  mutations: {
    setcollect(state,val){//设置收藏
      state.isCollect = val;
    },
    setbrand(){
        arguments[0].brandName.name = arguments[1];
        arguments[0].carMore.brandName = arguments[1];
    },
    setusid(state,val){
      state.carMore.userid = val;
    },
    setcarMore(state,obj){
        state.carMore.color = obj.color;
        state.carMore.year = obj.year;
        state.carMore.km = obj.km;
        state.carMore.loc = obj.loc;
        state.carMoreShow = `${obj.color} ${obj.year}年 ${obj.km}万千里  `;
    },
    setuserIfo(state,obj){
      state.carMore.pho = obj.pho;
      state.carMore.person = obj.person;
      state.carMore.price = obj.price;
      state.carMore.ycdz = obj.ycdz;
      state.carMore.spsj = obj.spsj;
    },
    setimglist(state,arr){
      state.carMore.imglist = arr;
    },
    initcarMore(state){
        state.carMore.color = '';
        state.carMore.year = '';
        state.carMore.km = '';
        state.carMore.loc = '';
        state.carMoreShow = `点击设置属性`;
        state.carMore.pho = '';
        state.carMore.person = '';
        state.carMore.price = '';
        state.carMore.ycdz = '';
        state.carMore.spsj = '';
        state.carMore.imglist = [];
        state.brandName.name = '点击选择品牌';
    },
    setphppx(state,val){//设置查询参数px
      state.phppx = val;
    },
    setphpbrand(state,val){//设置查询参数brand
      state.phpval.brandName = val;
    },
    setphpprice(state,val){//设置查询参数price
      state.phpval.price = val;
    },
    setphpsx(state,val){
      state.phpval.color = val.color;
      state.phpval.year = val.year;
      state.phpval.ycdz = val.ycdz;
    },
    setlistRej(state,val){
      state.iscarlistRej = val;
    },
    updatePhpval(state,val){
      var obj = state.phpval;
      if(val == 'px'){
        state.phppx = '';
        return;
      }
      for(var key in obj){
        if(key == val){
          state.phpval[key] = '';
        }
      }
    },
    setiscarmoreShow(state,val){
      if(val){
        state.iscarmoreShow = 1;
        return;
      }
      state.iscarmoreShow = 0;
    },
    setisLogin(state,val){//设置userid
      state.isLogin = val;
    }
  },
  actions: {

  }
})
