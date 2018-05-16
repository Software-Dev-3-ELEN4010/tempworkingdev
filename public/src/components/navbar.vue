<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">Remember the Oreos</a>
                </div>
                <ul class="nav navbar-nav">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/createList">Create List</router-link></li>
                    <li><router-link to="/listShoppingList">List Shoppings Lists</router-link></li>
                    <li><router-link to="/MyLists">My Lists</router-link></li>
                    <li v-if="login==undefined"><login></login></li>
                    <li v-if="login!=undefined">
                        <button class="g-signin-button" v-on:click="logout()">Log out</button>
                        <img v-bind:src="userPhoto">
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    import Login from './Login.vue'
    export default {
        data() {
            return {
                login: undefined,
                userPhoto: undefined
            }
        },
        created: function (){
            setTimeout(() => {
                console.log("times over");
                this.setLoginState()
            }, 2000);
            this.userPhoto = this.$session.get('profilePhoto')
        },

        methods: {
            setLoginState(){
                this.login = this.$session.get('profileId')
            },
            logout(){
                this.$session.set('profileId',undefined)
                this.setLoginState()
            }
        },

        components : {Login}
    }
</script>

<style>
    .g-signin-button {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }
</style>