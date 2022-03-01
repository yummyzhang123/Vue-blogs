<template>
  <el-container direction="vertical" class="blog-main">
      <el-main>
        <ShowBlog :search="search" :tag=1>
          <router-link></router-link>
        </ShowBlog>
      </el-main>
    </el-container>
</template>

<script>
import ShowBlog from './showBlog'
export default {
  name: 'myBlog',
  components:{
        ShowBlog
      },
  data(){
      return {
          search:'',
         
      }
  },
  methods:{
        getUserInfo(){
          this.$axios.get('/api/users/info')
          .then((res)=>{      
            let result=res.data
            if(result.code==0){this.search=result.data.username}
    
          }).
          catch(e=>{console.log(e);})
        }
      },
     
      created(){
        this.getUserInfo();
      }
}
</script>

<style scoped>
.el-main{
    margin: 0 auto;
    margin-bottom: 60px;
  }
.blog-main{
    background-color: #d2f0ed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0 auto;
    position: fixed;
    top: 60px;
    right: 0;
    left: 0;
    bottom: 0;
  }
</style>

