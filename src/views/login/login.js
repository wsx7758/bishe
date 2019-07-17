
import LoginHeader from '../../components/Headers.vue';
import {MessageBox} from 'mint-ui';
export default {
    name:'loginEmail',
    components:{
        LoginHeader
    },
    data(){
        return {
            usname:'',
            passward:'',
            headerCon:'账号登陆',
            redshow:false
        }
    },
    methods:{
        toreg(){
            this.$router.push('/registered');
        },
        toforget(){
            this.$router.push('/forget');
        },
        loginnow(){
            this.$axios.post('php/api/login/login.php',this.$qs.stringify({usname:this.usname,usps:this.passward}))
            .then(res=>{
                var obj = res.data.data[0];
                console.log(res);
                if(obj){
                    this.redshow = false;
                    MessageBox.confirm('是否15内免登录？').then(action => {
                        var storage = window.localStorage;
                        storage.setItem("usInfo",JSON.stringify({usid:obj.Id,logindate:new Date().getTime()}));
                        this.$store.commit('setisLogin',obj.Id);
                        this.$store.commit('setusid',obj.Id);
                        // console.log(JSON.parse(storage.getItem("usInfo")).usid)
                        this.$router.push('/home');
                    })
                    .catch(err=>{
                        this.$store.commit('setisLogin',obj.Id);
                        this.$store.commit('setusid',obj.Id);
                        this.$router.push('/home');
                    })
                }else{
                    this.redshow = true;
                }
            })
        }
    }
}
