<template>
    <div>
        <h1>拖放排序</h1>
        <p style="color:red">for循环的key不能使用order,因为order排序后数组的第一个元素对应的值总是0</p>
        <div class="box">

            <div class="list">
                <draggable v-model="list">
                    <div v-for="i in list" :order="i.order" class="item" :key="i.name">
                        {{i.name}}
                    </div>
                </draggable>
            </div>
            <div class="ml20">
                <h4> 结果</h4>
                <pre style="pre">{{JSON.stringify(list, null ,4)}}</pre>
            </div>
        </div>
        <a href="javascript:;" @click="add">add</a>
    </div>
</template>
<script>
import Draggable from '@/components/draggable/index'
import DraggableItem from '@/components/draggable/item'
export default {
    components: {
        Draggable,
        DraggableItem
    },
    data () {
        return {
            list: [
                {
                    order: 1,
                    name: '项目2'
                }, {
                    order: 2,
                    name: '项目3'
                }, {
                    order: 0,
                    name: '项目1'
                }
            ]
        }
    },
    methods: {
        add() {
            let index = this.list.length
            this.list.push({
                order: index,
                name: '项目' + (index + 1)
            })
        }
    },
    mounted() {
    }
}
</script>
<style>
.list{
    border: 1px solid #ccc;
}
.item{
    border: 1px solid #ccc;
    margin: 5px;
    padding: 5px 10px;
    width: 200px;
}
</style>

