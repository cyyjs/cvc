<template>
    <div>
        <h1>时段选择</h1>
        <div class="box">
            <div>
                <schedule v-model="schedule"></schedule>
            </div>
            <div class="ml20">
                <h4> 选择结果</h4>
                <pre style="pre">{{JSON.stringify(schedule, null ,4)}}</pre>
            </div>
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
