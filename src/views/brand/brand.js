
import brandHeader from '../../components/Headers';
export default {
    name:'brand',
    components:{
        brandHeader
    },
    data(){
        return {
            brandlit:[]
        }
    },
    methods:{
        pySegSort(arr){
            if(!String.prototype.localeCompare)return null;
            var letters = "*abcdefghjklmnopqrstwxyz".split('');
            var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
            
            var segs = [];
            var curr;
            letters.forEach(function(item,i){
                curr = {letter: item.toUpperCase(), data:[]};
                arr.forEach(function(item2){
                    if((!zh[i-1] || zh[i-1].localeCompare(item2.one_level_complex,'zh') <= 0) && item2.one_level_complex.localeCompare(zh[i],'zh') == -1) {
                        curr.data.push(item2);
                    }
                });
                if(curr.data.length) {
                    segs.push(curr);
                    curr.data.sort(function(a,b){
                        return a.one_level_complex.localeCompare(b);
                    });
                }
            });
            return segs;
        
        },
        setBrand(val){
            this.$store.commit('setbrand',val)
            // console.log(this.$store.state)
            this.$router.go(-1);
        }
    },
    created(){
        this.$axios.get("/php/api/home/homelogo.php")
        .then(res=>{
            this.brandlit = this.pySegSort(res.data.data);
        })
    },
    mounted(){
        
    }
}
