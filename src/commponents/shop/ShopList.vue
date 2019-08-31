<template>
    <div id='goodslist-container'>
        <div class="goods" v-for='item in goodslist' :key='item.id' @click='goDetails(item.id)'>
            <img :src="item.img_url" alt="">
            <!-- <img :src="item.img_url" alt=""> -->
            <h3 class='title'>{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class='old'>￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size='large' @click='getMoregoods'>更多</mt-button>        
    </div>
</template>

<script>
export default {
    data(){
        return{
            pageIndex:1,
            goodslist:[]
        }
    },
    created(){
        this.getgoodslist()
    },
    methods:{
        getgoodslist(){
            this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(result=>{
                // console.log(result.body)
                if(result.body.status == 0){
                    this.goodslist = this.goodslist.concat(result.body.message)
                }
                else{
                    alert('error')
                }
            })
        },
        getMoregoods(){
            this.pageIndex++;
            this.getgoodslist();
            console.log(this.goodslist)
        },
        goDetails(id){
            // console.log(this);
            this.$router.push({ name: "shopinfo", params: { id } });
        }
    }
}
</script>

<style lang="scss" scoped>
#goodslist-container{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 7px;
    .goods{
        width:49%;
        border:1px solid #ccc;
        box-shadow:0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height:293px;
        .title{
            font-size:14px;
        }
        img{
            width:100%;
        }
        .info{
            background-color: pink;
            .price{
                .now{
                    color:red;
                    font-weight:bold;
                    font-size:16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size:14px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size:13px;
            }
        }
    }
    
    
    
}
</style>
