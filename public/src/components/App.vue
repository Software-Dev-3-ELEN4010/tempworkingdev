<template>
  <div id="app">
    <div class="container">
      <div class="row col-md-6 offset-md-3">
        <create-list></create-list>
        <navbar></navbar><list-shopping-lists></list-shopping-lists>
      </div>
    </div>
  </div>
</template>


<script>
  import CreateList from './CreateList.vue';
  import ListShoppingLists from './ListShoppingLists.vue';
  import navbar from './navbar.vue'
  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {navbar,CreateList, ListShoppingLists},
  }
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>