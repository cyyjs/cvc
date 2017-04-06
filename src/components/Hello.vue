<template>
    <div class="">
        <h1>Vue 组件</h1>
        <img height="600" src="http://upload-images.jianshu.io/upload_images/2250086-abb5985cb7931e9b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="">
    </div>
</template>
<script>
export default {
    name: 'hello',
    data () {
        return {
            msg: ''
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
