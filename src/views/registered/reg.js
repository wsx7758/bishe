
import RegHeader from '../../components/Headers.vue';
import { Toast , MessageBox } from 'mint-ui';
export default {
    name:'registered',
    components:{
        RegHeader
    },
    data(){
        return {
            yzmshow:true,
            secshow:false,
            second:60,
            emailprompt:'邮箱错误！',
            isyes:false,
            headerCon:'注 册',
            usEmail:'',
            usName:'',
            usPassword:'',
            emailCode:'',
            code:'',
            emailshow:false,
            nameshow:false,
            psshow:false,
            errname:''
        }
    },
    methods:{
        yzps(){//验证密码
            if(/^[a-zA-Z0-9]{6,12}$/.test(this.usPassword)){
                this.psshow = false;
            }else{
                this.psshow = true;
            }
        },
        yznama(){//验证用户名
            if(/^[a-zA-Z][a-zA-Z0-9]{5,11}$/.test(this.usName)){
                this.$axios.get(`php/api/reg/repeat.php?usname=${this.usName}`)
                .then(res=>{
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
                this.$axios.get(`php/api/reg/selectemail.php?email=${this.usEmail}`)
                .then(res=>{
                    if(res.data.code==0){
                        this.emailshow = false;
                        this.$axios.get(`http://59.110.138.64:80/api/email/email.php?email=${this.usEmail}`)
                        .then((data)=>{
                            if(data.data.code == 0){
                            Toast({
                                message: res.data.msg,
                                duration: 2000
                                // iconClass: 'icon icon-success'
                            });
                            }else{
                                this.emailCode=data.data.emailCode;
                                this.yzmshow = false;
                                this.secshow = true;
                                Toast({
                                    message: data.data.msg,
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
                        this.emailprompt = res.data.msg;
                    }
                })
            }else{
                this.emailshow = true;
            }
            
        },
        regNow(){
            if(this.psshow==false&&this.nameshow==false&&this.emailshow==false&&this.usEmail!=''&&this.usName!=''&&this.usPassword!=''&&this.code!=''){
                this.isyes = false;
                if(this.emailCode == this.code){
                this.$axios.post(`php/api/reg/reg.php`,
                    this.$qs.stringify({usemail:this.usEmail,usname:this.usName,uspassword:this.usPassword}),
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                    )
                    .then((res)=>{
                        MessageBox.alert('注册成功！').then(action => {
                            this.$router.push('/loginemail');
                        });
                        
                        // this.emailCode=res.data.code
                    }); 
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
