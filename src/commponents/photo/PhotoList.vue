<template>
    <div id='photolist-container'>
        <!-- 顶部滑动导航栏 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id==0?' mui-active':'']" href="#item1mobile" data-wid="tab-top-subpage-1.html"  v-for='item in listcategory' :key='item.id' @tap='getpiclist(item.id)'>
							{{item.title}}
						</a>
					</div>
				</div>
		</div>
        <!-- 懒加载图片区域 -->
        <ul class='piclist-content'>
            <router-link v-for="item in piclist" :key='item.id' tag='li' :to="'/home/photoinfo/'+item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div class="info-body">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from '../../lib/mui//js/mui.min.js'

export default {
    data(){
        return{
            listcategory:[],
            piclist:[]
        }
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0003 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created() {
        this.getphotolist()
        this.getpiclist(0)
    },
    methods:{
        getphotolist(){
            this.$http.get('api/getimgcategory').then(result=>{
                // console.log(result.body)
                if(result.body.status == 0)
                {
                    this.listcategory = [{'title':'全部',id:0}]
                    this.listcategory = this.listcategory.concat(result.body.message);
                    // console.log(this.listcategory)
                }
                else{
                    alert('error')
                }
            })
        },
        getpiclist(cateID){
            this.$http.get('api/getimages/'+cateID).then(result=>{
                // console.log(result.body)
                if(result.body.status == 0){
                    this.piclist = result.body.message;
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
*{
    touch-action:pan-y;
}
.piclist-content{
    margin: 0;
    padding: 10px;
    padding-bottom: 0px;
    li{
        background-color: #ccc;
        margin-top: 10px;
        box-shadow: 0 0 6px #999;
        position: relative;
        img{
            width:100%;
            height:100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }
    .info{
        position: absolute;
        bottom: 0;
        color: #fff;
        text-align: left;
        background-color: rgba(0,0,0,.4);
        max-height: 84px;
        .info-title{    
            font-size:14px;
        }
        .info-body{
            font-size:13px;
        }
    }
}

</style>
