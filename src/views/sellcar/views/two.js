
import Swiper from "swiper";
import vue from "vue";
import { Toast  } from 'mint-ui';
export default {
    name:'sellTwo',
    data(){
        return {
            imgmode:false,
            imglist:[],
            dataURL:[],
            imga:[],
            sampleimg:[],
            pickphotoshow:false,
            errmsg:'请先选择图片',
            sure:false
        }
    },
    methods:{
        toPrice(){
            if(this.imglist.length == 0){
                this.pickphotoshow = true;
                return;
            }
            this.pickphotoshow = false;
            this.getBase64Image(this.imglist);
        },
        delimg(ind){
            this.imglist.splice(ind,1);
        },
        getImg(){
            this.imgmode=!this.imgmode;
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
                        that.getImg();
                        if(that.imglist.length == 6){
                            that.errmsg = '只能上传六张';
                            that.pickphotoshow = true;
                            return;
                        }
                        that.imglist.push(entry.fullPath);
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
        },
        getLoc(){//相册选取
            var that = this;
            plus.gallery.pick(
                function(path){
                    that.getImg();
                    if(that.imglist.length == 6){
                        that.errmsg = '只能上传六张';
                        that.pickphotoshow = true;
                        return;
                    }
                    that.imglist.push(path);
                },
                function(e){
                    alert(e)
                }
            );
        },
        getBase64Image(imglist) {//图片\车辆情况上传
            this.sure = true;
            this.pickphotoshow = false;
            for(var i in imglist){
                var img = document.createElement('img');
                img.src = imglist[i];
                var canvas = document.createElement("canvas");
                canvas.width = '1080';
                canvas.height = '810';
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                this.dataURL.push(canvas.toDataURL().split(',')[1])
            }
            this.$store.commit('setimglist',this.dataURL);
            this.$axios.post('php/api/uploadimg/upload.php',this.$qs.stringify(this.$store.state.carMore))
            .then(res=>{
                this.$store.commit('initcarMore');
                Toast({
                        message: '发布成功',
                        duration: 2000,
                    });
                this.sure = false;
                this.imglist = [];
                this.$router.push('/sellcar')
            })
        }

    },
    beforeCreate(){
        document.addEventListener('plusready',function() {      
            
        },false)
    },
    mounted(){
        this.$axios.get("php/api/sample/sample.php")
        .then(res=>{
            this.sampleimg = res.data.data;
            vue.nextTick(()=>{
                this.mySwipera = new Swiper ('.swiper-container', {
                loop: true, // 循环模式选项
                autoplay: 2000,
                utoplayDisableOnInteraction : false,
                // 如果需要分页器
                pagination: '.swiper-pagination'
                });
            })
        });
    },
    destroyed(){
        // this.mySwipera.close();
    }
}
