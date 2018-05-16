import Vue from 'vue'
import Router from 'vue-router'
import tempPage from '../components/Login.vue'
import CreateList from '../components/CreateList.vue'
import ListShoppingLists from '../components/ListShoppingLists.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TempPage',
      component: tempPage
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