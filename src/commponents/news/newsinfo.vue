<template>
    <div id="newsinfo">
        <h3 class='title'>{{newsinfo.title}}</h3>
        <div class='info'>
            <span class="time">发布时间：{{newsinfo.add_time | dataFormat}}</span>
            <span class="click">点击：{{newsinfo.click}}次</span>
        </div>
        <hr>
        <div class="content" v-html="newsinfo.content"></div>
        <hr>
        <comment :id="this.id"></comment>
    </div>
</template>

<script>
import comment from '../subcommponents/comment.vue'
export default {
    data(){
        return{
            id: this.$route.params.id,
            newsinfo:{}
        }
    },
    created(){
        this.getnewsinfo()
    },
    methods:{
        getnewsinfo(){
            this.$http.get("api/getnew/" + this.id).then(result=>{
                // console.log(result.body)
                if(result.body.status ==0){
                    this.newsinfo = result.body.message[0];
                }
                else{
                    alert('error')
                }
            })
        }
    },
    components:{
        comment:comment
    }
}
</script>

<style lang="scss" scoped>
#newsinfo{
    padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
    }
    .info{
        color:aqua;
        display: flex;
        justify-content: space-between;
    }
}
</style>
