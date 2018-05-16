<template>
    <g-signin-button
            :params="googleSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError">
        Sign in with Google
    </g-signin-button>
</template>

<script>
    import axios from 'axios';
    export default {
        data () {
            return {
                googleSignInParams: {
                    client_id: '524026545688-sdc1t3qoqhijb2bk1u3svph5v7mq7n49.apps.googleusercontent.com'
                }
            }
        },
        created: function (){
//            this.setLoginState();
        },
        methods: {
//            setLoginState(){
//                if (this.$session.get('profileID')!=false){
//
//                }
//                this.$session.set('profileID',false)
//            },
            onSignInSuccess (googleUser) {
                const profile = googleUser.getBasicProfile()
                console.log(profile)
                console.log(profile.getId())
                console.log(profile.getEmail())
                this.$session.set('profileID',profile.getId())
                this.$session.set('profilePhoto',profile.getImageUrl())
                let param = {
                    googleId: profile.getId(),
                    googleName: profile.getName(),
                    googleEmail: profile.getEmail(),
                    googlePhoto: profile.getImageUrl(),
                }
                axios.post('/api/addUser', param).then((response) => {
                    console.log("user added to db");
                }).catch((error) => {
                    console.log(error);
                })
                location.reload()
            },
            onSignInError (error) {
                // `error` contains any error occurred.
                console.log('Login failed', error)
            },
        }
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