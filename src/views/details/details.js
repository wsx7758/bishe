
import Swiper from "swiper";
import detailHead from '../../components/Headers.vue';
import vue from 'vue';
import { MessageBox } from 'mint-ui';
export default {
    name:'details',
    components:{
        detailHead
    },
    data(){
        return {
            conlist:[],
            usimg:'',
            usname:'',
            uspho:'',
            iscollect:false
        }
    },
    methods:{
        telpho(){
            plus.device.dial(this.conlist[0].pho, true);
        },
        collect(){
            console.log(this.$route.params.usid)
            if(this.$route.params.usid){
                var o = this.iscollect;
                console.log(o)
                if(o){
                    MessageBox({
                        message: '已收藏'
                    });
                }else{
                    this.$axios.get(`php/api/details/updatelike.php`,{params:{id:this.conlist[0].Id}})//car人气加一
                    .then(res=>{
                        // console.log(res)
                    });
                    this.$axios.get(`php/api/details/setuslike.php`,{params:{carid:this.conlist[0].Id,usid:this.$store.state.isLogin}})//收藏
                    .then(res=>{
                        console.log(res)
                        if(res.data == 'overstep'){
                            MessageBox({
                                message: '最多只能收藏10辆哦！'
                            });
                            return;
                        }
                        MessageBox({
                            message: '收藏成功'
                        });
                        this.iscollect = true;
                    });
                }
            }
            
        }
    },
    created(){
        this.$axios.get(`php/api/details/selectcar.php`,{params:{id:this.$route.params.carid}})
        .then(res =>{
            this.conlist = res.data.data;
            this.uspho = res.data.data[0].pho;
            this.usname = res.data.data[0].person;
            vue.nextTick(()=>{
                this.mySwipera = new Swiper ('.swiper-container', {
                loop: true, // 循环模式选项
                autoplay: 2000,
                autoplayDisableOnInteraction : false,
                // 如果需要分页器
                pagination: '.swiper-pagination'
                });
            })
        });
    },
    beforeMount(){
            this.$axios.post('php/api/details/selectuser.php',this.$qs.stringify({id:this.$route.params.sellusid}))
            .then(res=>{
                this.usimg = res.data.data[0].usimg;
                // console.log(res);
            });
        if(this.$route.params.usid){
            this.$axios.get('php/api/details/selectuslike.php',{params:{usid:this.$route.params.usid,carid:this.$route.params.carid}})//查询是否已收藏
            .then(res=>{
                console.log(res)
                if(res.data == 'ok'){
                    this.iscollect = true;
                    console.log(this.iscollect)
                }else{
                    this.iscollect = false;
                }
            });
        }
        
    },
    beforeCreate(){
        document.addEventListener('plusready',function() {      
            
        },false)
    }
}
