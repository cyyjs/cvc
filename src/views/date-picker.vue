<template>
    <div class="hello">
        <h1>日历插件</h1>
        <div class="box">
            <div>
                <date-picker v-model="date" :min="min"></date-picker>
            </div>
            <div class="ml20">
                <h4> 选择结果</h4>
                <pre style="pre">{{JSON.stringify(date, null ,4)}}</pre>
            </div>
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
