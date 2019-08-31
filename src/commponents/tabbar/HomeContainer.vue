<template>
  <div>
	<swipe :lunbotu='lunbotu' :isfull="true"></swipe>
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
			<img src="../../images/xinwen.jpg" alt="">
            <div class="mui-media-body">新闻</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to='/home/photolist'>
			<img src="../../images/tupian.jpg" alt="">
            <div class="mui-media-body">图片</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to='/home/shoplist'>
			<img src="../../images/gouwuche.jpg" alt="">
            <div class="mui-media-body">购物</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to='/home/musiclist'>
			<img src="../../images/yinyve.jpg" alt="">
            <div class="mui-media-body">音乐</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
			<img src="../../images/yonghu.jpg" alt="">
            <div class="mui-media-body">用户</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
			<img src="../../images/liuyan.jpg" alt="">
            <div class="mui-media-body">留言</div>
          </a>
        </li>
      </ul>
    </div>
	
  </div>
</template>

<script>
import swipe from '../subcommponents/swipe.vue'
import {Toast} from 'mint-ui'
export default {
	data(){
		return {
			lunbotu:[]
		}
	},
	created(){
		this.getlunbotu()
	},
	methods:{
		getlunbotu(){
			this.$http.get("api/getlunbo").then(result=>{
				// console.log(result.body)
				if(result.body.status ==0){
					this.lunbotu = result.body.message;
					// Toast('ok')
				}
				else{
					Toast('error')
				}
			})
		}
	},
	components:{
		swipe
	}
};
</script>

<style lang="scss" scoped>
img{
	width:60px;
	height:60px;
}
</style>
