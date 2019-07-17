
import collectHead from '../../components/Headers.vue';
import { MessageBox } from 'mint-ui';
export default {
    name:'collect',
    components:{
        collectHead
    },
    data(){
        return {
            carlist:[]
        }
    },
    methods:{
        toDetails(carid,usid,xiajia){
            if(xiajia == 0){
                this.$router.push({name:'details',params:{carid:carid,sellusid:usid,usid:this.$store.state.isLogin}});
                return;
            }
            MessageBox('提示', '该车已下架！');
        },
        delcollect(carid,userid,ind){
            MessageBox.confirm('取消收藏？').then(action => { 
                this.carlist.splice(ind,1);
                this.$axios.get('php/api/collect/del.php',{params:{carid:carid,usid:this.$store.state.isLogin}})
                .then(res=>{
                    console.log(res)
                })
            });
        }

    },
    created(){
        this.$axios.get('php/api/collect/selectuslike.php',{params:{id:this.$store.state.isLogin}})
        .then(res=>{
            var arr = res.data.data[0].uslike.split('&').slice(0,-1);
            console.log(arr)
            this.$axios.post('php/api/collect/selectcar.php',this.$qs.stringify({idlist:arr}))
            .then(res=>{
                console.log(res)
                this.carlist = res.data.data;
            })
        })
    }
}
