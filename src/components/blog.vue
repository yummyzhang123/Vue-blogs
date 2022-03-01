<template>
  <el-container direction="vertical">
    <el-header>
      <el-row class="header-row" >
        <el-col class="header-title" :span="6" >
          <h1><router-link to="/">My Blog</router-link></h1>
        </el-col>
        <el-col :span="8" :offset="2" class="search">
          <input class="search-input" placeholder="Search"  v-model="search"/>
          <i class="el-icon-search"></i>
        </el-col>
        <el-col :span="2" :offset="1">
          <router-link to="/addBlog" class="head-blog-btn">写博客</router-link>
        </el-col>
         <el-col :span="2" >
          <router-link to='/myBlog' class="head-blog-btn" >我的博客</router-link>
        </el-col>
        <el-col :span="2" v-if="isSignIn===0" >
          <router-link to='/login' class="head-blog-btn" >登录</router-link>
        </el-col>
        <el-col :span="2"  v-else-if="isSignIn===1">
          <router-link to='/personal' class="head-blog-btn" >{{userinfo}}</router-link>
        </el-col> 
         
      </el-row>
    </el-header>
    <el-container direction="vertical" class="blog-main">
      <el-main>
        <router-view :search="search" :tag=0>
          <router-link></router-link>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
  import AddBlog from './content/addBlog'
  import ShowBlog from './content/showBlog'
    export default {
        name: "blog",
       components:{
        AddBlog,
        ShowBlog
      },
      data(){
        return{
          userinfo:'',
           search:'',
           
        }
      },
      methods:{
        getUserInfo(){
          this.$axios.get('/api/users/info')
          .then((res)=>{      
            let result=res.data
            if(result.code==0){this.userinfo=result.data.username}
          }).catch(e=>{console.log(e);})
        }
      },
      computed:{
        //返回目前的登录状态
        isSignIn(){
          return this.$store.state.isSignIn;
          
        }
      },
      created(){
        this.getUserInfo();
      }

    }
</script>

<style scoped>
  .el-header{
    width: 100%;
    line-height: 60px;
    background-color: #333535;
    color: #fff;
    text-align: center;
  }
  .header-row{
    max-width: 985px;
    margin: 0 auto;
  }
  .header-title{
    text-align: center;
  }
  .header-title a{
    color: #fff;
  }
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
  a{
    text-decoration: none;
    color: #000;
  }
  .head-blog-btn{
    color: #f5f5f5;
    font-size: 15px;
  }
  .search-input{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    width: 250px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    font-size: inherit;
    outline: 0;
    padding: 0 10px;
    font-size: 14px;
  }
  .el-icon-search{
    color: #696969;
    margin-left: -40px;
    cursor: pointer;
    width: 30px;
    height: 30px;
    line-height: 30px;
  }
</style>
