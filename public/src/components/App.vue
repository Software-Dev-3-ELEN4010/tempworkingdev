<template>
  <div id="app">
    <div class="container">

      <navbar></navbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import navbar from './navbar.vue'
  export default {
    name: 'app',
    components: {navbar},
  }
</script>
