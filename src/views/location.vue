<template>
    <div>
        <h1>省市选择</h1>
        <div class="box">
            <div>
                <location v-model="location"></location>
            </div>
            <div class="ml20">
                <h4> 选择结果</h4>
                <pre style="pre">{{JSON.stringify(location, null ,4)}}</pre>
            </div>
        </div>
    </div>
</template>
<script>
import Location from '@/components/location/location'
export default {
    components: {
        Location
    },
    data () {
        return {
            location: {
                location: ['辽宁_鞍山'],
                type: 2
            }
        }
    }
}
</script>
