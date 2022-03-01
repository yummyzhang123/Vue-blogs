import Vue from 'vue'
import VueRouter from 'vue-router'
import showBlog from '../components/content/showBlog'
import AddBlog from '../components/content/addBlog'
import Detail from '../components/content/detail'
import EditBlog from '../components/content/editBlog'
import Login from "../components/content/login"
import MyBlog from "../components/content/myBlog"
Vue.use(VueRouter);

/*配置路由*/
 
const router= new VueRouter({
  routes:[
    {
      path: '/',
      component: showBlog,
      name: 'home'
    },
    { /*添加博客*/
      path: '/addBlog',
      component: AddBlog,
      meta:{
        requireAuth:true//true为这个页面需要登录权限
      }
    },
    { /*我的博客*/
      path: '/myBlog',
      component: MyBlog,
      meta:{
        requireAuth:true//true为这个页面需要登录权限
      }
    },
    {
      path:'/blog/:id',
      component:Detail,
      name:'blogs'
    },
    {
      path:'/editBlog',
      component:EditBlog,
      meta:{
        requireAuth:true//true为这个页面需要登录权限
      }
      //页面懒加载
      //component:()=>import ('../components/content/EditBlog.vue)
    },
    {
      path: '/login',
      component:Login
    }
  ],
  mode: 'history'   //去掉地址里的# 
  
})
  //为router实例对象声明全局前置导航守卫，
  //只要发生了路由跳转，就会出发beforeEach的function回调函数
//  router.beforeEach((to, from, next)=> {
//    //next三种状态 
//    //next()表放行，next('/login')表跳转，next(false)表拒接跳转

//    //跳转到我的博客时需要登录
//    if (to.path == '/myblog') {
//      const token = localStorage.getItem('token')
//      if (token) {
//        next()
//      }
//      else {
//        next('/login')
//      }
//    }
//    else {
//      next()
//    }
  
//  }) 

export default router