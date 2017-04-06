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
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.nav {
    border-bottom: 1px solid #ccc;
    height: 35px;
    & a {
        padding: 10px;
    }
}
</style>
