
import myaddress from '../../../json/pca.json';
export default {
    name:'sellOne',
    data(){
        return {
            pcaShow:false,
            brandName:'',
            carQuality:'',
            pho:'',
            person:'',
            price:'',
            spsj:'',
            ycdz:'',
            msg:'',
            pickerValue:'',
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
            ],
            myAddressProvince:'省',
            myAddressCity:'市',
            myAddresscounty:'区/县'
        }
    },
    methods:{
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
                this.ycdz = `${values[0]}-${values[1]}-${values[2]}`;
            }
        },
        handleConfirm(){
            var d = new Date(this.pickerValue);
            console.log(d)
            if(d == 'Invalid Date'){
                var realDate = '2009-1-1';
            }else{
                var realDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            }
            this.spsj = realDate;
        },
        setspsj(){
            this.$refs.pickerSpsj.open();
        },
        toTakePhoto(){
            var obj = {
                pho:this.pho,
                person:this.person,
                price:this.price,
                ycdz:this.ycdz,
                spsj:this.spsj
            }
            for(var i in obj){
                if(obj[i] == ''){
                    this.msg = '请完善信息！';
                    return;
                }
            }
            this.$store.commit('setuserIfo',obj);
            this.$router.push('/sellcar/two');
        },
        goBrand(){
            this.$router.push('/brand');
        },
        gocarMore(){
            this.$router.push('/carmore');
        }
    },
    beforeMount(){
        this.brandName = this.$store.state.brandName.name;
        this.carQuality = this.$store.state.carMoreShow;
        this.pho = this.$store.state.carMore.pho;
        this.spsj = this.$store.state.carMore.spsj;
        this.ycdz = this.$store.state.carMore.ycdz;
        this.person = this.$store.state.carMore.person;
        this.price = this.$store.state.carMore.price;
    },
    mounted(){
        this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
        this.myAddressSlots[0].defaultIndex = 0 
        // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
        //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
        });
    }
}
