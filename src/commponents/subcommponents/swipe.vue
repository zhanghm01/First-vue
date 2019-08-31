<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item class='swipe1' v-for='item in lunbotu' :key='item.id'>
          <img :src="item.img" :class="{'full':isfull}">   
      </mt-swipe-item>
      <!-- <mt-swipe-item class='swipe2'>2</mt-swipe-item>
      <mt-swipe-item class='swipe3'>3</mt-swipe-item> -->
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data(){
    return {}
  },
  methods:{},
  props:["lunbotu","isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;

    img {
      // width: 100%;
      height: 100%;
    }
  }
}
.full{
  width:100%;
}
</style>
