import VueRouter from 'vue-router'

// import HomeContainer from './commponents/tabbar/HomeContainer.vue'
import HomeContainer from './commponents/tabbar/HomeContainer.vue'
import MusicContainer from './commponents/tabbar/MusicContainer.vue'
import ShopContainer from './commponents/tabbar/ShopContainer.vue'
import UserContainer from './commponents/tabbar/UserContainer.vue'
import NewsList from './commponents/news/NewsList.vue'
import PhotoList from './commponents/photo/PhotoList.vue'
import MusicList from './commponents/music/MusicList.vue'
import ShopList from './commponents/shop/ShopList.vue'
import NewsInfo from './commponents/news/newsinfo.vue'
import PhotoInfo from './commponents/photo/photoinfo.vue'
import ShopInfo from './commponents/shop/shopinfo.vue'
import GoodsDesc from './commponents/shop/goodsdesc.vue'
import GoodsComment from './commponents/shop/goodscomment.vue'

var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/music',component:MusicContainer},
        {path:'/shop',component:ShopContainer},
        {path:'/user',component:UserContainer},
        {path:'/home/newslist',component:NewsList},
        {path:'/home/photolist',component:PhotoList},
        {path:'/home/musiclist',component:MusicList},
        {path:'/home/shoplist',component:ShopList},
        {path:'/home/newsinfo/:id',component:NewsInfo},
        {path:'/home/photoinfo/:id',component:PhotoInfo},
        {path:'/home/shopinfo/:id',component:ShopInfo,name:'shopinfo'},
        {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'}
    ]
})
export default router

