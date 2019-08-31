<template>
    <div class='goodsdesc-container'>
        <h3 class='title'>{{goodsdesc.title}}</h3>
        <hr>
        <div class="content" v-html='goodsdesc.content'></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.params.id,
            goodsdesc:{}
        }
    },
    created(){
        this.getgoodsdesc()
    },
    methods:{
        getgoodsdesc(){
            this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                console.log(result.body)
                if(result.body.status == 0){
                    this.goodsdesc = result.body.message[0]
                }
                else{
                    alert('error')
                }
            })
        }
    }
}
</script>

<style lang="scss">
.goodsdesc-container{
    padding: 4px;
    h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>
