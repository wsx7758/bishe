
export default {
    name:'welcome',
    methods:{
        loginEmail(){
            this.$router.push('/loginemail')
        },
        toReg(){
           this.$router.push('/registered') 
        },
        toHome(){
            this.$router.push('/home') 
        }
    }
}