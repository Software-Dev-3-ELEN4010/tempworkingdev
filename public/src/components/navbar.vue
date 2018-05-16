<template>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Remember The Oreos</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto" v-if="login!=undefined">
                <li class="nav-item">
                    <router-link class="nav-link" to="/createList">Create List</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/listShoppingList">Public Lists</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/MyLists">My Lists</router-link>
                </li>
                <li class="nav-item">
                    <button class="button button-primary" v-on:click="logout()">Log out</button>
                </li>
                <li><img height="60px" class="nav-link" v-bind:src="userPhoto"></li>
                <li>{{profileName}}</li>
            </ul>
            <ul v-if="login==undefined" class="navbar-nav mr-auto">
                <li>
                    <login class="nav-link"></login>
                </li>
            </ul>
        </div>
    </nav>


</template>

<script>
    import Login from './Login.vue'
    export default {
        data() {
            return {
                login: undefined,
                userPhoto: undefined,
                profileName: undefined
            }
        },
        created: function () {
            if (this.$session.get('profileId') == undefined) {
                this.$router.push("/")
            }
            console.log(this.$session.get('profileId'))
            setTimeout(() => {
                console.log("times over");
                this.setLoginState()
            }, 2000);
            this.userPhoto = this.$session.get('profilePhoto')
            this.profileName = this.$session.get('profileName')
        },

        methods: {
            setLoginState(){
                this.login = this.$session.get('profileId')
            },
            logout(){
                this.$session.set('profileId', undefined)
                this.setLoginState()
                this.$router.push("/")
            }
        },

        components: {Login}
    }
</script>
