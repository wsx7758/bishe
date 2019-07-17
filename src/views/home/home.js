import Navls from '@/components/Navtabar.vue';
import Swiper from "swiper";
import vue from 'vue';
export default {
  name: 'home',
  components: {
    Navls
  },
  data(){
    return {
      bannera:[],
      bannerb:[],
      logolist:[],
      morelogo:false
    }
  },
  methods:{
    setbrand(val){
      this.$store.commit('setphpbrand',val)
      this.$router.push('/carlist');
    },
    getmoreBrand(){
      this.morelogo=!this.morelogo
    },
    tobuy(){
      this.$router.push('/carlist');
    }
  },
  created(){
    this.$axios.get('php/api/home/home.php')
    .then(res =>{
      this.bannera = res.data.data.slice(0,3);
      this.bannerb = res.data.data.slice(3,7);
      vue.nextTick(()=>{
          this.mySwipera = new Swiper ('.swiper-containera', {
          loop: true, // 循环模式选项
          autoplay: 2000,
          autoplayDisableOnInteraction : false,
          // 如果需要分页器
          pagination:'.swiper-pagination'
        });
        this.mySwiperb = new Swiper ('.swiper-containerb', {
          loop: true, // 循环模式选项
          autoplay: 3000,
          autoplayDisableOnInteraction : false,
          effect : 'flip',
          flipEffect: {
            slideShadows : true,
            limitRotation : true,
          }
        })
      })
    });
    this.$axios.get('php/api/home/homelogo.php')
    .then(res=>{
      // console.log(res)
      this.logolist=res.data.data.slice(0,20);
      // console.log(this.logolist)
    })
  },
  mounted(){
    // console.log(RESBASE_URL)
    
  },
  destroyed(){
    // this.mySwipera.close();
    // this.mySwiperb.close();
  }
}