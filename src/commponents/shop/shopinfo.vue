<template>
    <div id='goodsinfo-container'>
        <div class="mui-card">
			<div class="mui-card-content">
			    <div class="mui-card-content-inner">
                    <swipe :lunbotu='lunbotu' :isfull="false"></swipe>
				</div>
			</div>
		</div>       
        <div class="mui-card">
			<div class="mui-card-header">{{goodsinfo.title}}</div>
			<div class="mui-card-content">
			    <div class="mui-card-content-inner">
                    <div class="price">
                        <del class="market">市场价：￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：
                        <span class="sell">￥{{goodsinfo.sell_price}}</span>
                    </div>
                    <p class="buy">
                        购买数量：<numbox @getCount = 'selectedCount' :max='goodsinfo.stock_quantity'></numbox>
                    </p>
                    <div class="car">
                        <mt-button type='primary' size='small'>立即购买</mt-button>
                        <mt-button type="danger" size='small' @click='addToshopcar'>加入购物车</mt-button> 
                    </div>
				</div>
			</div>
		</div>  
        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
			    <div class="mui-card-content-inner">
					<p class="goodsid">商品货号：{{goodsinfo.goods_no}}</p>
					<p class="goodsstock">库存情况：{{goodsinfo.stock_quantity}}件</p>
					<p class="goodstime">上架时间：{{goodsinfo.add_time}}</p>
				</div>
			</div>
            <div class="mui-card-footer">
                <mt-button type='primary' size='large' plain @click=goGoodsdesc(goodsinfo.id)>图文介绍</mt-button>
                <mt-button type="danger" size='large' plain @click=goGoodscomment(id)>商品评论</mt-button> 
            </div>
		</div> 

        <transition
            @before-enter='beforeEnter'
            @enter='enter'
            @after-enter='afterEnter'>
            <div class="ball" v-show='ballflag' ref='ball'></div>           
        </transition>

    </div>
</template>

<script>
import swipe from '../subcommponents/swipe.vue'
import numbox from '../shop/numbox.vue'
import goodscommentVue from './goodscomment.vue';
export default {
    data(){
        return{
            id:this.$route.params.id,
            lunbotu:[],
            goodsinfo:{},
            ballflag:false,
            new_count:1
        }
    },
    created(){
        this.getgoodslunto()
        this.getgoodsinfo()
    },
    methods:{
        getgoodslunto(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                // console.log(result.body)
                if(result.body.status == 0){
                    result.body.message.forEach(element => {
                        element.img = element.src
                    });
                    this.lunbotu = result.body.message
                }
                else{
                    alert('error')
                }
            })
        },
        getgoodsinfo(){
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                // console.log(result.body)
                if(result.body.status == 0){
                    this.goodsinfo = result.body.message[0]
                }
                else{
                    alert('error')
                }
            })
        },
        goGoodsdesc(id){
            this.$router.push({'name':'goodsdesc',params:{id}})
        },
        goGoodscomment(id){
            this.$router.push({name:'goodscomment',params:{id}})
        },
        addToshopcar(){
            this.ballflag = !this.ballflag;
            var selectedGoods = {
                id:this.id,
                number:this.new_count,
                price:this.goodsinfo.sell_price,
                choose:true
            }
            this.$store.commit('addTocar',selectedGoods)
        },
        beforeEnter(el){
            el.style.transform = 'translate(0,0)';
        },
        enter(el,done){
            el.offsetWidth;
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const badgePosition = document.getElementById('badge').getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;
            // console.log(xDist,yDist)
            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = 'all ease 1s'
            done()
        },
        afterEnter(el){
            this.ballflag=!this.ballflag;
        },
        selectedCount(count){
            this.new_count = count;
            console.log(this.new_count)
        }
    },
    components:{
        swipe,numbox
    }
}
</script>

<style lang="less" scoped>
#goodsinfo-container{
    background-color: pink;
    overflow: hidden;
    .sell{
        color:red;
    }
    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        left: 144px;
        top: 376px;
        z-index:99;
    }
}

</style>


