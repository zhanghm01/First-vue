<template>
    <div id='shoplist-container'>
        <div class="shoplist">
            <div class="mui-card" v-for='(item,index) in shopcarlist' :key='item.id'>
			    <div class="mui-card-content">
				    <div class="mui-card-content-inner">
					    <mt-switch 
                            v-model='$store.getters.getshoponeselected[item.id]' 
                            @change='selectedchange(item.id,$store.getters.getshoponeselected[item.id])'></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount='$store.getters.getShopcarnum[item.id]' :goodsid='item.id'></numbox>
                                <a href="" @click.prevent='remove(item.id,index)'>删除</a>
                            </p>
                        </div>
				    </div>
			    </div>
		    </div>
        </div>
        <div class="jiesuan">
            <div class="mui-card">
			    <div class="mui-card-content">
				    <div class="mui-card-content-inner">
				    	<div class="total">
                            <p>总计（不含运费）：</p>
                            <p>已勾选商品<span class="num">{{$store.getters.getshoplistjieuan['number']}}</span>件，总价：<span class="money">￥{{$store.getters.getshoplistjieuan['money']}}</span>
                            </p>
                        </div>
                        <div class="compute">
                            <mt-button type='danger' size='small'>去结算</mt-button>
                        </div>
				    </div>
			    </div>
		    </div>
        </div>
    </div>
</template>

<script>
import numbox from '../shop/shopcarnumbox.vue'
export default {
    data(){
        return{
            shopcarlist:[]
        }
    },
    created(){
        this.getshopcarlist()
    },
    methods: {
        getshopcarlist(){
            var shopcarID=[];
            this.$store.state.cart.forEach(element => {
                shopcarID.push(element.id)
            });
            if(shopcarID.length == 0)
            {return}
            this.$http.get('api/goods/getshopcarlist/'+shopcarID.join(',')).then(result=>{
                console.log(result.body)
                if(result.body.status == 0){
                    this.shopcarlist = result.body.message;
                }
                else{
                    alert('error')
                }
            })
        },
        remove(id,index){
            this.shopcarlist.splice(index,1);
            this.$store.commit('removeshopone',id)
        },
        selectedchange(id,value){
            console.log(id+'---'+value)
            this.$store.commit('undateshopselected',{id,'choose':value})
        }
    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
#shoplist-container{
    background-color: #eee;
    overflow: hidden;
    .shoplist{
        .mui-card-content-inner{
            display: flex;
            // justify-content: space-between;
            align-items: center;
            img{
                width: 60px;
                height: 60px;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h1{
                    font-size:16px;
                }
                .price{
                    color:red;
                }
            }
        }
        
    }
    .jiesuan{
        .mui-card-content-inner{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .total{
                .num{
                    color:red;
                }
                .money{
                    color:red;
                }
            }
        }
    }
}
</style>
