<template>
    <div @dragstart="ondragstart">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // Object
        }
    },
    methods: {
        ondragstart(event) {
            event.dataTransfer.setData('Text', event)
            console.log(event)
        }
        // methodMap
    },
    mounted() {
        console.log(this.$slot)
    }
}
</script>

<style lang='scss' scoped>
    /*style*/
</style>
