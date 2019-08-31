<template>
    <div id='newslist'>
        <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for='item in newslist' :key='item.key'>
				<router-link :to="'/home/newsinfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						{{item.title}}
						<p class='mui-ellipsis'>
                            <!-- {{item.zhaiyao}} -->
                            <span>发布时间：{{item.add_time | dataFormat}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>   
					</div>
				</router-link>
			</li>
		</ul>
    </div>
</template>

<script>
import comment from '../subcommponents/comment.vue'
export default {
    data(){
        return {
            newslist:[]
        }
    },
    created(){
        this.getnewslist()
    },
    methods:{
        getnewslist(){
            this.$http.get("api/getnewslist").then(result=>{
                // console.log(result.body)
                if(result.body.status ==0){
                    this.newslist = result.body.message;
                }
                else{
                    alert('error')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#newslist{
    .mui-media-body{
        font-size:14px;
        .mui-ellipsis{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #226aff;
        }
    }
    
}
</style>
