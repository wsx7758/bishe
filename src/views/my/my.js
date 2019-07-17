
import myNav from '../../components/Navtabar.vue';
import {MessageBox , Toast} from 'mint-ui';
export default {
    name:'my',
    components:{
        myNav
    },
    data(){
        return {
            usimg:null,
            userInfo:[],
            usid:null,
            usmaskshow:false
        }
    },
    methods:{
        setnewimg(){
            if(this.usimg){
                var img = document.createElement('img');
                img.src = this.usimg;
                var canvas = document.createElement("canvas");
                canvas.width = '1080';
                canvas.height = '810';
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                this.$axios.post('php/api/my/setuserimg.php',this.$qs.stringify({img:canvas.toDataURL().split(',')[1],userid:this.$store.state.isLogin}))
                .then(res=>{
                    console.log(res)
                    Toast({
                        message: '更改成功',
                        duration: 2000,
                    });
                    that.setusmaskshow();
                })
            }else{
                Toast({
                        message: '请先选择照片',
                        duration: 2000,
                    });
            }
        },
        setusmaskshow(){
            this.usmaskshow = !this.usmaskshow;
            this.usimg = null;
        },
        loginout(){
            var storage = window.localStorage;
            MessageBox.confirm('确定退出登录?').then(action => {
                storage.clear();
                this.$store.commit('setisLogin',null);
                // this.$store.commit('initcarMore');
                this.$router.push('/');
            });
        },
        toCollect(){
            console.log(this.userInfo[0].Id)
            this.$router.push({name:'collect',params:{id:this.userInfo[0].Id}})
        },
        toMysell(){
            this.$router.push({name:'mycar',params:{id:this.$store.state.isLogin}})
        },
        getLoc(){//相册选取
            var that = this;
            plus.gallery.pick(
                function(path){
                    // alert(path)
                    that.usimg = path;
                },
                function(e){
                    alert(e)
                }
            );
        },
        getCam(){
            var cmr = plus.camera.getCamera();
            var res = cmr.supportedImageResolutions[0];
            var fmt = cmr.supportedImageFormats[0];
            var io = plus.io;
            var that = this;
            cmr.captureImage( function( path ){
                    // alert( "摄像头ok: " + path ); 
                    io.resolveLocalFileSystemURL(path,function(entry){
                        that.usimg = entry.fullPath;
                    },
                    function(e){
                        alert( "Resolve file URL failed: " + e.message );
                    }); 
                },
                function( error ) {
                    alert( "Capture image failed: " + error.message );
                },
                {resolution:res,format:fmt}
            );
        }
    },
    created(){
        this.$axios.get('php/api/my/userinfo.php',{params:{usid:this.$store.state.isLogin}})
        .then(res=>{
            this.userInfo = res.data.data;
            console.log(res)
        })
    },
    beforeCreate(){
        console.log(JSON.parse(window.localStorage.getItem('usInfo')));
        document.addEventListener('plusready',function() {      
            
        },false)
    }
}
