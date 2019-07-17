
import sellHeader from '../../components/Headers';
import navTabar from '../../components/Navtabar';
export default {
    name:'sellcar',
    components:{
        sellHeader,
        navTabar
    },
    data(){
        return {
            headerCon:'卖车',
            steplist:[
                {
                    num:1,
                    content:'填写基本信息',
                    path:'/sellcar/one'
                },
                {
                    num:2,
                    content:'车辆照片',
                    path:'/sellcar/two'
                }
            ]
        }
    }
}
