import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import PostList from '@/components/PostList'
import Post from '@/components/Post'
import Index from '@/components/Index'
import UserConsult from '@/components/UserConsult'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: 'post',
          name: 'PostList',
          component: PostList
        }, {
          path: 'post/:id',
          name: 'Post',
          component: Post
        }, {
          path: 'userConsult',
          name: 'UserConsult',
          component: UserConsult
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
