
import forgetHeader from '../../components/Headers.vue';
import { Toast,MessageBox } from 'mint-ui';
export default {
    name:'registered',
    components:{
        forgetHeader
    },
    data(){
        return {
            yzmshow:true,
            secshow:false,
            second:60,
            isyes:false,
            headerCon:'忘记密码',
            usEmail:'',
            usPassworda:'',
            usPasswordb:'',
            emailCode:'',
            code:'',
            emailshow:false,
            psshowa:false,
            psshowb:false,
            errname:''
        }
    },
    methods:{
        yzpsa(){//验证密码
            if(/^[a-zA-Z0-9]{6,12}$/.test(this.usPassworda)){
                this.psshowa = false;
            }else{
                this.psshowa = true;
            }
        },
        yzpsb(){
            if(this.usPassworda == this.usPasswordb){
                this.psshowb = false;
            }else{
                this.psshowb = true;
            }
        },
        yznama(){//验证用户名
            if(/^[a-zA-Z][a-zA-Z0-9]{6,12}$/.test(this.usName)){
                this.$axios.get(`php/api/reg/repeat.php?usname=${this.usName}`)
                .then(res=>{
                    console.log(res)
                    if(res.data == 'no'){
                        this.errname = '用户名已存在！';
                        this.nameshow = true;
                    }else{
                        this.nameshow = false;
                    }
                })
                this.nameshow = true;
            } else{
                this.errname = '账号必须字母、数字组合并以字母开头6-12位！';
                this.nameshow = true;
            }
        },
        getEmailCode(){
            if(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.usEmail)){
                this.emailshow = false;
                this.$axios.get(`http://59.110.138.64:80/api/email/email.php?email=${this.usEmail}`)
                .then((res)=>{
                    if(res.data.code==0){
                    Toast({
                        message: res.data.msg,
                        duration: 2000
                    });
                    }else{
                        this.emailCode=res.data.emailCode;
                        this.yzmshow = false;
                        this.secshow = true;
                        Toast({
                            message: res.data.msg,
                            duration: 2000,
                        });
                        var timera = setInterval(()=>{
                            this.second = this.second-1;
                        },1000);
                        this.timerb = setTimeout(() => {
                            clearTimeout(timera);
                            this.yzmshow = true;
                            this.secshow = false;
                        }, 60000);
                    }
                })
                .catch((err)=>{
                    alert(err);
                })
            }else{
                this.emailshow = true;
            }
            
        },
        regNow(){
            if(this.psshowa==false&&this.psshowb==false&&this.emailshow==false&&this.usEmail!=''&&this.usPassworda!=''&&this.usPasswordb!=''&&this.code!=''){
                this.isyes = false;
                if(this.emailCode == this.code){
                this.$axios.post(`php/api/forget/update.php`,
                    this.$qs.stringify({email:this.usEmail,usps:this.usPassworda}),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                    )
                    .then((res)=>{
                        console.log(res)
                            // this.$router.push('/loginemail');
                        // this.emailCode=res.data.code
                        MessageBox.confirm('密码重置成功！').then(action => {
                            this.$router.push('/loginemail');
                        });
                    }) 
                }else{
                    this.$refs.yzm.focus();
                    Toast({
                            message: '验证码不正确',
                            duration: 2000,
                        });
                }
            }else{
                this.isyes = true;
            }
        }
    },
    destroyed(){
        clearTimeout(this.timerb);
    }
}
