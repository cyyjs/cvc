<template>
    <div @dragenter.prev="dragover($event)" ref="parent">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            moveDom: null,
            list: []
        }
    },
    methods: {
        dragstart(event) {
            if (event.target.parentNode === this.$refs.parent) {
                this.moveDom = event.target
                event.target.style.backgroundColor = '#eee'
                event.dataTransfer.dropEffect = 'move'
            } else {
                event.preventDefault()
            }
            // event.dataTransfer.setData('text/html', event.target.innerHTML)
            // event.dataTransfer.setDragImage(event.target, 10, 0)
            // console.log('====', event)
        },
        dragend(event) {
            event.target.style.backgroundColor = 'inherit'
            let divs = this.$refs.parent.childNodes
            let list = []
            for (let i = 0; i < divs.length; i++) {
                let order = divs[i].getAttribute('order')
                list.push(this.value.filter(item => item.order === +order)[0])
            }
            list = list.map((item, index) => {
                item.order = index
                return item
            })
            this.$emit('input', list)
        },
        dragover(event) {
            // console.log(event.target, event.target.getAttribute('draggable'))
            if (event.target.getAttribute('draggable')) {
                let next = event.target.nextSibling && event.target.nextSibling !== this.moveDom ? event.target.nextSibling : event.target
                if (event.target === this.$refs.parent.lastChild) {
                    this.$refs.parent.appendChild(this.moveDom)
                } else {
                    this.$refs.parent.insertBefore(this.moveDom, next)
                }
            }
        },
        init() {
            let list = [...this.value]
            list = list.sort((a, b) => a.order - b.order > 0 ? 1 : -1)
            // console.log(list)
            if (JSON.stringify(list) !== JSON.stringify(this.value)) {
                this.$emit('input', list)
            } else {
                // console.log(this.list)
                let ls = this.$slots.default || []
                ls.forEach(item => {
                    if (item.elm) {
                        item.elm.removeEventListener('dragstart', this.dragstart)
                        item.elm.removeEventListener('dragend', this.dragstart)
                        item.elm.addEventListener('dragstart', this.dragstart)
                        item.elm.addEventListener('dragend', this.dragend)
                        item.elm.setAttribute('draggable', true)
                    }
                })
            }
        }
        // methodMap
    },
    watch: {
        value: {
            handler() {
                this.$nextTick(() => {
                    this.init()
                })
            },
            deep: true
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang='scss' scoped>
    /*style*/
</style>
