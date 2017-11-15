<template>
    <div class="">
        <h1>Vue 组件 DEMO</h1>
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
<style lang='scss' scoped>
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
img {
    width: 800px;
    transition: border-radius 1s, width 1s;
    &:hover{
        border-radius: 50%;
        width: 600px;
    }
}
a {
    color: #42b983;
}
</style>
