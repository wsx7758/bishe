
import mycarHead from '../../components/Headers.vue';
import { MessageBox } from 'mint-ui';
export default {
    name:'mysellcar',
    components:{
        mycarHead
    },
    data(){
        return {
            carlist:[]
        }
    },
    methods:{
        delcar(id,ind){
            MessageBox.confirm('确定已卖出？').then(action => {
                this.carlist.splice(ind,1);
                this.$axios.get('php/api/mysellcar/deletecar.php',{params:{id:id}})
                .then(res=>{
                    console.log(res)
                })
            });
        }
    },
    created(){
        console.log(this.$store.state.carMore.userid)
        this.$axios.get('php/api/mysellcar/select.php',{params:{id:this.$route.params.id}})
        .then(res=>{
            console.log(res)
            this.carlist = res.data.data;
        })
    }
}
