<template>
    <div id='comment'>
        <h1>评论区</h1>
        <hr>
        <textarea placeholder='请输入要评论的内容...（不超过120字）' maxlength="120" v-model='msg'></textarea>
        <mt-button type="primary" size='large' @click='postComment'>发表</mt-button>
        <div class="comment">
            <ul>
                <li v-for='(item,i) in comments' :key='i'>
                    <p class="info">第{{i+1}}楼用户：匿名用户 发表时间：{{item.add_time | dataFormat}}</p>
                    <p class="content">{{item.content}}</p>
                </li>
            </ul>
            <mt-button type="danger" size='large' @click='getMore'>更多</mt-button>        
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            // id:this.$route.params.id,
            pageIndex:1,
            comments:[],
            msg:''
        }
    },
    created() {
        this.getComment();
    },
    methods:{
        getComment(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
                // console.log(result.body)
                if(result.body.status ==0){
                    this.comments = this.comments.concat(result.body.message)                    
                }                
                else{
                    alert('error')
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getComment();
        },
        postComment(){
            if(this.msg.trim().length==0){
                return alert('nothing input')
            }
            this.$http.post('api/postcomment/'+this.id,{content:this.msg.trim()}).then(result=>{
                if(result.body.status == 0){
                    var cmt={
                        user_name:"匿名用户",
                        add_time:Date.now(),
                        content:this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg=''
                }
            })
        }
    },
    props:["id"]
}
</script>

<style lang="scss" scoped>
#comment{
    .comment{
        margin: 10px 0;
        ul{
            list-style:none;
            margin: 0;
            padding: 0;
            .info{
                background-color: #ccc
            }
            .content{
                margin-left: 20px;
            }
        }
    }
}
</style>
