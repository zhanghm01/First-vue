<template>
    <div id='photoinfo-container'>
        <h3 class='title'>{{photoinfo.title}}</h3>
        <div class="info">
            <div class="info-time">发布时间：{{photoinfo.add_time|dataFormat}}</div>
            <div class="info-click">点击：{{photoinfo.click}}次</div>
        </div>
        <hr>
        <div class="thumbs">
            <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
        </div>
        <!-- <div class="thumbs">
            <img class="preview-img" v-for="(item, index) in thumbsList" :src="item.src" height="100" @click="$preview.open(index, thumbsList)" :key="item.src">
        </div> -->
        <div class="content" v-html='photoinfo.content'></div>
        <comment :id="this.id"></comment>
    </div>
</template>

<script>
import comment from '../subcommponents/comment.vue'
export default {
    data(){
        return{
            id:this.$route.params.id,
            photoinfo:{},
            thumbsList:[]
        }
    },
    created(){
        this.getphotoinfo()
        this.getthumbsList()
    },
    methods:{
        getphotoinfo(){
            this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                // console.log(result.body)
                if(result.body.status == 0){
                    this.photoinfo = result.body.message[0];
                }
                else{
                    alert('error')
                }
            })
        },
        getthumbsList(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                // console.log(result.body)
                if (result.body.status === 0) {
                    // 循环每个图片数据，补全图片的宽和高
                    result.body.message.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                        // item.src=item.src;
                        item.msrc = item.src
                    });
                // 把完整的数据保存到 list 中
                    this.thumbsList = result.body.message;
                }
                
            })
        }
    },
    components:{
        comment
    }
}
</script>

<style lang="less" scoped>
#photoinfo-container{
    padding: 0 10px;
    .title{
        text-align: center;
        font-size:18px;
        color:greenyellow;
        margin: 15px 0;
    }
    .info{
        display: flex;
        justify-content: space-between;
        font-size:16px;
    }
    .content{
        font-size:16px;
        line-height:30px;
    }
}
</style>

<style lang="scss">
    #photoinfo-container {
        .thumbs {
            .my-gallery{
                display: flex;
                flex-wrap: wrap;
            }
            figure {
                width: 60px;
                height: 80px;
                margin: 10px;
                box-shadow: 0 0 8px #999;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
