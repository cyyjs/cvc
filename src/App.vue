<template>
    <div id="app">
        <div class="nav">
            <router-link to="/">Home</router-link>
            <router-link to="date-picker">日历</router-link>
            <router-link to="location">省市选择</router-link>
            <router-link to="schedule">时段选择</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'app'
}
</script>
<style lang='scss'>
body {
    padding: 0;
    margin: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.nav {
    line-height: 45px;
    background: cadetblue;
    & a {
        padding: 10px;
        color: #fff;
        text-decoration: none;
        &:hover {
            border-bottom: 3px solid #20a0ff;
            background-color: #6db39f;
        }
    }
}

.box {
    display: flex;
    justify-content: center;
}

.ml20 {
    margin-left: 20px;
}

pre {
    text-align: left;
    margin: auto;
    max-height: 350px;
    overflow: auto;
}
</style>
