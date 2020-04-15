<template>
    <div id="test">
        {{text}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            text:'abcdefg'
        }
    }
}
</script>

<style>
    #test{
        color: red;
    }
</style>