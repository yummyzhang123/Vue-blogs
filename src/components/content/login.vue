<template>
<div>
    <!-- 登录 -->
    <div class="LoginBox" v-if="status == 1">
    <div class="LoginBox-Box"> 
        <el-form :model="form" ref="form" :rules="rules" label-width="0" :inline="false" size="normal" key="1">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
       <el-form-item prop="password">
        <el-input type="password" v-model="form.password" @keyup.enter.native="onSubmit" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login iconfont " type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
      <el-form-item>
        <span>还没注册？去<span class="sign" @click="toSign">注册</span></span>
      </el-form-item>
    </el-form>
    </div>
    </div>
    <!-- 注册 -->
    <div class="register"  v-else>
    <div class="registerBox">
      <el-form :model="regform" ref="regform" :rules="regrules" label-width="0" :inline="false" size="normal" key="2">
      <el-form-item prop="regname">
        <el-input v-model="regform.regname"  placeholder="请输入用户名" ></el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="regform.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item  prop="pass">
        <el-input type="password" placeholder="请输入密码" v-model="regform.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item  prop="checkPass">
        <el-input type="password" placeholder="请再次输入密码" v-model="regform.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login" type="primary" @click="register">注册</el-button>
      </el-form-item>
      <el-form-item>
        <p>注册完成？去<span class="sign" @click="toLogin">登录</span></p>
             </el-form-item>
    </el-form>
    </div>
    
  </div>
    </div>
</template>
<script>
import axios from 'axios'
import Cookie from 'js-cookie'
export default {
    
    name:"login",
    data(){
        // 确认密码的规则
         var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.regform.checkPass !== '') {
            this.$refs.regform.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regform.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      
        return{
        status:1,
        loading:true,
        form:{
          username:'',
          password:''
        },
        regform:{
          regname:'',
          nickname:'',
          pass:'',
          checkPass:''
        },
        // 登录规则
         rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3个 到 15 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
        },
        // 注册规则
         regrules: {
          regname: [
            { required: true, message: '请输入您的用户名', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
          

          ],
          nickname:[
             { required: true, message: '请输入您的昵称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
        }
    },
    methods:{
    //转换到登录状态
    toLogin(){this.status=1;},    
    //转换到注册状态
    toSign(){this.status=0;},
    // 登录
    onSubmit(){
        this.$refs['form'].validate((res) => {
          if(res){
            this.loading = true;
            this.$axios.post('/api/users/login',this.form)
             .then((res)=>{
                 let result=res.data
                 if(result.code ===0){
                      // 设置Cookie
                     Cookie.set('token',result.token)
                     // 设置token
                     this.$store.commit('setToken',result.token)
                     // 登录成功，去里修改登录状态
                     this.$store.commit('changIsSignIn',1)
                     this.$store.commit('changUserOn',this.form.username)
                     setTimeout(()=>{
                         this.loading=false;
                         this.$router.push({name:'home'})
                     },1500)
                 }
                 
             })
                     
          }else {
            alert("登录失败")
            return false
          }
        })
      },
      // 注册
      register(){
        let data = {"username":this.regform.regname,"password":this.regform.pass,"nickname":this.regform.nickname};
        this.$refs['regform'].validate((valid)=>{
           if(valid){
               this.$axios.post('/api/users/register',data)
               .then(res=>{
                 this.$message({
                 message: res.data.msg,
                 type: res.data.code==0? 'success':'error'
                 });      
                })
           }
           else{
               console.log('注册失败！');
               return false;
           }
       })
       
       
       
      }
    }
}
</script>
<style scoped>

</style>