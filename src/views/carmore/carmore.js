
import carMoreHeader from '../../components/Headers';
import myaddress from '../../json/pca.json';
export default {
    name:'carmore',
    components:{
        carMoreHeader
    },
    data(){
        return {
            pcaShow:false,
            colorLh:'',
            colorlist:[
                {name:'咖啡色',color:'#9D691D'},
                {name:'橙色',color:'#FF9B14'},
                {name:'深灰色',color:'#999999'},
                {name:'白色',color:'#fff'},
                {name:'紫色',color:'#E27FEF'},
                {name:'红色',color:'#FF3E46'},
                {name:'绿色',color:'#5FEB53'},
                {name:'蓝色',color:'#00C4FF'},
                {name:'银灰色',color:'#DFE1DE'},
                {name:'香槟色',color:'#EED68C'},
                {name:'黄色',color:'#FFD700'},
                {name:'黑色',color:'#000'}
            ],
            colorpick:'',
            year:'',
            km:'',
            msg:'',
            isShowa:true,
            isShowb:'',
            phpcolor:'',
            phpycdz:'',
            phpyear:'',
            myAddressSlots: [
            {
            flex: 1,
            defaultIndex: 1, 
            values: Object.keys(myaddress), //省份数组
            className: 'slot1',
            textAlign: 'center'
            }, {
            divider: true,
            content: '-',
            className: 'slot2'
            }, {
            flex: 1,
            values: this.getCity('北京市'),
            className: 'slot3',
            textAlign: 'center'
            },
            {
            divider: true,
            content: '-',
            className: 'slot4'
            },
            {
            flex: 1,
            values: this.getarea('北京市','市辖区'),
            className: 'slot5',
            textAlign: 'center'
            }
            ]
        }
    },
    methods:{
        //点击遮罩
        setpcaMask(){
            this.pcaShow = false;
        },
        //这个就是初始化逻辑，其实就是获取省下的所有市，取决于你的json数据格式
        getCity(pro){
            return Object.keys(myaddress[pro])
        },
        //这个就是初始化逻辑，其实就是获取省下的某个市下的区，取决于你的json数据格式
        getarea(pro,city){
            return myaddress[pro][city]
        },
        onMyAddressChange(picker, values) {
            if(myaddress[values[0]]){ //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
                picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
                this.myAddressProvince = values[0];
                this.myAddressCity = values[1];
                this.myAddresscounty = values[2];
                this.phpycdz = `${values[0]}-${values[1]}-${values[2]}`;
            }
        },
        setcolor(val){
            if(this.isShowa) this.colorpick = val;
            if(this.isShowb) this.phpcolor = val;
            this.colorLh = val;
        },
        setCarMore(){
            if(this.isShowa){
                var obj = {
                    color:this.colorpick,
                    year:this.year,
                    km:this.km
                }
                for(var i in obj) {
                    if(obj[i] == ''){
                        this.msg = '请填写完整信息!';
                        return;
                    }
                }
                this.$store.commit('setcarMore',obj);
                this.$router.push('/sellcar/one');
            }
            if(this.isShowb){
                var obj = {
                    color:this.phpcolor,
                    year:this.phpyear,
                    ycdz:this.phpycdz
                }
                this.$store.commit('setphpsx',obj);
                this.$router.push('/carlist');
            }
            
        }
    },
    created(){
        if(this.$store.state.iscarmoreShow){
            this.isShowa = false;
            this.isShowb = true;
            this.phpcolor = this.$store.state.phpval.color;
            this.phpyear = this.$store.state.phpval.year;
            this.phpycdz = this.$store.state.phpval.ycdz;
            this.colorLh = this.$store.state.phpval.color
        }
    },
    mounted(){
        this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0 
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
        });
    }
}
