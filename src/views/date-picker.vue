<template>
    <div class="hello">
        <h1>日历插件</h1>
        <div style="padding-left:300px;">
            <date-picker v-model="date" :min="min"></date-picker>
        </div>
        <hr>
        <div>
            <br> 选择结果
            <pre style="pre">{{JSON.stringify(date, null ,4)}}</pre>
        </div>
    </div>
</template>
<script>
import DatePicker from '@/components/date-picker/picker'
export default {
    components: {
        DatePicker
    },
    data () {
        return {
            min: new Date(),
            date: {
                date: ['2017-2-1'],
                date_no_limit: 2
            }
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

pre {
    text-align: left;
    margin: auto;
    width: 300px;
}
</style>
