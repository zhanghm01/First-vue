<template>
    <div id='app-container'>
        <mt-header fixed title="try-again">
             <span slot="left" @click='goBack' v-show='flag'>
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header>

        <transition>
            <router-view></router-view>        
        </transition>

        <nav class="mui-bar mui-bar-tab">
		    <router-link class="mui-tab-item1 mui-active" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/music">
                <span class="mui-icon mui-icon-extra mui-icon-extra-custom"></span>
				<span class="mui-tab-label">音乐</span>
			</router-link>
            <router-link class="mui-tab-item1" to="/shop">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id='badge'>{{$store.getters.getAllnumber}}</span>
                </span>

				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/user">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">用户</span>
			</router-link>
			
		</nav>
    </div>
</template>

<script>
import NewsListVue from './commponents/news/NewsList.vue';
export default {
   data(){
       return{
           flag:false
       }
   },
   methods: {
       goBack(){
           this.$router.go(-1)
       }
   },
   created() {
       this.flag = this.$route.path === "/home" ? false : true;
   },
   watch:{
       '$route.path':function(newval){
           if(newval == '/home')
           {
               this.flag=false;
           }
           else{
               this.flag=true
           }
       }
   }
}
</script>

<style lang="scss" scoped>
    #app-container{
        padding-top: 40px;
        overflow: hidden;
        padding-bottom: 50px;
        .mint-header{
            z-index:99;
        }
    }

    .v-enter{
        transform: translateX(100%);
        opacity:0;
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active{
        transition:all 0.5s ease;
    }

    .mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item1.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
</style>
