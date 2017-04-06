<template>
    <div>
        <h1>省市选择</h1>
        <div style="padding-left:350px;">
            <location v-model="location"></location>
        </div>
        <hr>
        <div>
            <br> 选择结果
            <pre style="pre">{{JSON.stringify(location, null ,4)}}</pre>
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
pre {
    text-align: left;
    margin: auto;
    width: 300px;
}
</style>
