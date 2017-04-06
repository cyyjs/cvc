<template>
    <div>
        <h1>时段选择</h1>
        <div style="padding-left:300px;">
            <schedule v-model="schedule"></schedule>
        </div>
        <hr>
        <div>
            <br> 选择结果
            <pre style="pre">{{JSON.stringify(schedule, null ,4)}}</pre>
        </div>
    </div>
</template>
<script>
import Schedule from '@/components/schedule/schedule'
export default {
    components: {
        Schedule
    },
    data () {
        return {
            schedule: ['000']
        }
    }
}
</script>
<style scoped>
pre {
    text-align: left;
    margin: auto;
    width: 300px;
}
</style>
