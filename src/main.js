
import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入获取数据
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//导入图片缩略图插件 
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
var cart = JSON.parse(localStorage.getItem('cart')||'[]');
var store = new Vuex.Store({
    state:{
        cart:cart
    },
    mutations:{
        addTocar(state,selectedGoods){
            var flag = false;
            state.cart.some(item=>{
                if (item.id == selectedGoods.id) {
                    item.number += parseInt(selectedGoods.number)
                    flag = true
                    return true
                  }


                if(item.id === selectedGoods.id){
                    state.cart.number += parseInt(selectedGoods.number)
                    flag=true;
                    return true
                }
            })
            if(!flag){
                state.cart.push(selectedGoods)
            }
            
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        updateshoplist(state,shoplist){
            state.cart.some(item=>{
                if(item.id == shoplist.id){
                    item.number = parseInt(shoplist.number);
                    return true
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        removeshopone(state,goodsid){
            state.cart.some((item,i)=>{
                if(item.id==goodsid){
                    state.cart.splice(i,1)
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart))                       
        },
        undateshopselected(state,goodsselected){
            state.cart.some(item=>{
                if(item.id == goodsselected.id){
                    item.choose = goodsselected.choose;
                    return true;
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart))                       
        }
    },
    getters:{
        getAllnumber(state){
            var total = 0;
            state.cart.forEach(item=>{
                total += item.number;
            })
            return total;
        },
        getShopcarnum(state){
            var o={};
            state.cart.forEach(item=>{
                o[item.id] = item.number
            })
            return o
        },
        getshoponeselected(state){
            var o = {};
            state.cart.forEach(item=>{
                o[item.id] = item.choose;
            })
            return o;
        },
        getshoplistjieuan(state){
            var o={
                number:0,money:0
            }
            state.cart.forEach(item=>{
                if(item.choose){
                    o.number+=item.number;
                    o.money+=(item.number * item.price)
                }
            })
            return o;
        }
    }
})




//导入格式化时间插件
import moment from 'moment'
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

//导入MintUI库
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
//导入MUI库
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import app from './App.vue'
import router from './router.js'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
  })