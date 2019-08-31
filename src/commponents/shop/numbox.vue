<template>
        <div class="mui-numbox" data-numbox-min='1'>
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			    <input id="test" class="mui-input-numbox" type="number" value="1" ref='numbox' @change='countChanged'/>
				<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        mui('.mui-numbox').numbox()
    },
    methods:{
        countChanged(){
            const numbox_count = this.$refs.numbox.value;
            this.$emit('getCount',parseInt(numbox_count))
            // console.log(numbox_count)
        }
    },
    props:['max'],
    watch:{
        'max':function(newVal,oldVal){
            mui('.mui-numbox').numbox().setOption('max',newVal)
        }
    }
}
</script>

<style lang="less" scoped>

</style>
