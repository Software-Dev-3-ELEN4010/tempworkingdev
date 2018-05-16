<template>
    <span><p>Hey Chris, this could be your new login page ;)</p> </span>
</template>

<script>
    export default {
        data () {
            return {
                message: 'hello!'
            }
        },
        created () {
            this.message = 'bye!'
        }
    }
</script>