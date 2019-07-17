
import vue from 'vue';
import Navls from '@/components/Navtabar.vue';
import { Indicator ,InfiniteScroll } from 'mint-ui';
vue.use(InfiniteScroll);
export default {
    name:'carlist',
    components:{
        Navls
    },
    data(){
        return {
            nodatashow:false,
            loading:false,
            carlist:[],
            orderlist:[],
            orderpick:'',
            isShow:false,
            start:0,
            end:15,
            brandlit:[],
            brandShow:false,
            maskShow:false,
            picklist:[],
            picklistShow:false,
            userid:null,
            oldBrandName:'',
            homeTop:0,
            oldVuexPhpval:''
        }
    },
    beforeRouteLeave(to,from,next){
        this.homeTop = document.documentElement.scrollTop;
        next();
    },
    beforeRouteEnter(to,from,next){
        
        next();
    },
    methods:{
        loadMore(){
            if(this.start !=0){
                this.loading = true;
                var obj = this.$store.state.phpval;
                    Indicator.open({
                        text: '加载数据中...',
                        spinnerType: 'triple-bounce'
                    });
                    this.$axios.post('php/api/carlist/select.php',this.$qs.stringify({obj:obj,px:this.$store.state.phppx,start:this.start,end:this.end,userid:this.$store.state.isLogin}))
                    .then(res =>{
                        var arr = res.data.data;
                        if(arr.length == 0){
                            Indicator.close();
                            this.nodatashow = true;
                        }else{
                            this.start =this.start+15;
                            this.end = this.end+15;
                            this.carlist = this.carlist.concat(arr);
                            this.loading = false;
                            Indicator.close();
                            this.nodatashow = false;
                        }
                    });
            }
        },
        toDetails(carid,secarusid){
            this.$router.push({name:'details',params:{carid:carid,usid:this.$store.state.isLogin,sellusid:secarusid}});
        },
        setLh(pick,phpval,name){
            if(pick == 0){
                this.$store.commit('setphppx',phpval);
                this.setpickList({repeat:'px',value:name});
            }
            if(pick == 1){
                this.$store.commit('setphpprice',phpval);
                this.setpickList({repeat:'price',value:name});
            }
            this.isShow = false;
        },
        delimg(val,ind){
            this.$store.commit('updatePhpval',val);
            this.picklist.splice(ind,1); 
        },
        toCarMore(){
            this.$router.push('/carmore');
        },
        phpval(){
            document.documentElement.scrollTop = 0;
            Indicator.open({
                text: '加载数据中...',
                spinnerType: 'triple-bounce'
            });
            var obj = this.$store.state.phpval;
            this.start = 0;
            this.end = 15;
            this.$axios.post('php/api/carlist/select.php',this.$qs.stringify({obj:obj,px:this.$store.state.phppx,start:this.start,end:this.end,userid:this.$store.state.isLogin}))
            .then(res =>{
                var arr = res.data.data
                this.carlist = res.data.data;
                Indicator.close();
                if(arr .length == 15){//判断是否有下一页
                    this.loading = false;
                    this.start =this.start+15;
                    this.end = this.end+15;
                }else{
                    this.nodatashow = true;
                }
            })
        },
        setpickList(val){//防止重复picklist
            if(this.picklist.length == 0){
                this.picklist.push(val);
                return;
            }
            for(var i in this.picklist){
                if(this.picklist[i].repeat == val.repeat){
                    this.picklist[i].value = val.value;
                    return;
                }
            }
            this.picklist.push(val);
        },
        pySegSort(arr){
            if(!String.prototype.localeCompare)return null;
            var letters = "*abcdefghjklmnopqrstwxyz".split('');
            var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
            
            var segs = [];
            var curr;
            letters.forEach(function(item,i){
                curr = {letter: item.toUpperCase(), data:[]};
                arr.forEach(function(item2){
                    if((!zh[i-1] || zh[i-1].localeCompare(item2.one_level_complex,'zh') <= 0) && item2.one_level_complex.localeCompare(zh[i],'zh') == -1) {
                        curr.data.push(item2);
                    }
                });
                if(curr.data.length) {
                    segs.push(curr);
                    curr.data.sort(function(a,b){
                        return a.one_level_complex.localeCompare(b);
                    });
                }
            });
            return segs;
        },
        showBrand(){
            this.brandShow = true;
            this.maskShow = true;
            this.isShow = false;
        },
        setBrand(val){//设置品牌
            this.$store.commit('setphpbrand',val);
            this.setpickList({repeat:'brandName',value:val});
            this.brandShow = false;
            this.maskShow = false;
        },
        setSort(val){//设置排序
            this.brandShow = false;
            if(val == 0) {
                this.orderlist = [
                {
                    name:'人气最高',
                    val:'likes',
                    pick:0
                },
                {
                    name:'价格最高',
                    val:'pricedesc',
                    pick:0
                },
                {
                    name:'价格最低',
                    val:'priceasc',
                    pick:0
                }
            ];}
            if(val == 1) {
                this.orderlist = [
                {
                    name:'5万以下',
                    val:'5',
                    pick:1
                },
                {
                    name:'5-10万',
                    val:'510',
                    pick:1
                },
                {
                    name:'10-20万',
                    val:'1020',
                    pick:1
                },
                {
                    name:'20万以上',
                    val:'20',
                    pick:1
                }
            ];}
            this.isShow = true;
            // this.maskShow = !this.maskShow;
        },
        isMask(){//点击遮罩
            this.brandShow = false;
            this.maskShow = false;
            this.isShow = false;
        }
    },
    
    beforeMount(){
        this.phpval();
        this.$axios.get("php/api/home/homelogo.php")
        .then(res=>{
            this.brandlit = this.pySegSort(res.data.data);
        })
    },
    activated(){
        this.userid = this.$store.state.isLogin;
        var obj = this.$store.state.phpval;
        var o ={};
        for(var key in obj){
            if(obj[key] && key!='price'){
                if(key=='year'){
                     o = {
                        "repeat":key,
                        "value":`${obj[key]}年以下`
                    }
                }else{
                    o = {
                        "repeat":key,
                        "value":obj[key]
                    }
                }
                this.setpickList(o);
            }
            
        }
        document.documentElement.scrollTop = this.homeTop;      
    },
    deactivated(){
        
    },
    computed:{

    },
    watch:{
        picklist:{
            handler(newval, oldval) {
                if(newval.length == 0){
                    this.picklistShow = false;
                }else{
                    this.picklistShow = true;
                }
                this.phpval();
            },
            deep: true
        },
       userid:{
           handler(){
               this.phpval();
           },
           deep: true
       } 
    }
}