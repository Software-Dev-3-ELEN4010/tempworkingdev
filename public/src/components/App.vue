<template>
    <div id="app">
        <div class="container">
            <navbar></navbar>
            <router-view></router-view>
            <notifications group="foo"/>
        </div>
    </div>
</template>

<notifications group="foo"/>

<script>
    import navbar from './navbar.vue'
    export default {
        name: 'app',
        components: {navbar},
    }
</script>
