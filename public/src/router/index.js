import Vue from 'vue'
import Home from '../components/Home.vue'
import Router from 'vue-router'
// import Login from '../components/Login.vue'
import CreateList from '../components/CreateList.vue'
import ListShoppingLists from '../components/ListShoppingLists.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TempPage',
      component: Home
    },
    {
      path: '/createList',
      name: 'CreateList',
      component: CreateList
    },
    {
      path: '/list-shopping-list',
      name: 'ListShoppingLists',
      component: ListShoppingLists
    }
  ]
})
