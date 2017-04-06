<template>
    <div class="location">
        <div>
            <div class="location_title">选择地域</div>
            <div class="location_search">
                <input type="text" v-model="searchStr" placeholder="请输入内容">
                <i class="iconfont">&#xe611;</i>
            </div>
            <div class="location_tree">
                <ul ref="left_tree">
                    <li v-for="p in location" v-show="checkShow(p.name, p.children)">
                        <span @click="switchHandle">
                            <i class="iconfont close">&#xe66f;</i>
                            <i class="iconfont open">&#xe66e;</i>
                        </span>
                        <label :for="'p_' + p.name">
                            <input type="checkbox" :id="'p_'+p.name" @click="selectAll(p.name, $event)" :checked="checkAllState(p.name)">
                            <span>{{p.name}}</span>
                        </label>
                        <ul class="child_list">
                            <li v-for="c in p.children" v-show="checkShow(c.name)">
                                <label :for="c.name">
                                    <input type="checkbox" :value="p.name +'_'+c.name" :id="c.name" v-model="checkedLocation">
                                    <span>{{c.name}}</span>
                                </label>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <div class="location_title">
                <select name="type" v-model="type">
                    <option :value="1">定向到以下地区</option>
                    <option :value="2">不定向到以下地区</option>
                </select>
            </div>
            <div class="location_tree right_location_tree">
                <ul class="right_tree">
                    <li v-for="(cl, p) in rightData">
                        <span @click="switchHandle" style="float:left;">
                            <i class="iconfont close">&#xe66f;</i>
                            <i class="iconfont open">&#xe66e;</i>
                        </span>
                        <div>
                            <span>{{p}}</span>
                            <span class="remove" @click="remove(p)">x</span>
                        </div>
                        <ul class="child_list">
                            <li v-for="c in cl" style="text-align: right;">
                                <span style="float:left;">{{c}}</span>
                                <span class="remove" @click="remove(p + '_' + c)">x</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import location from './location.json'
let countCityMap = {}
location.forEach(item => {
    countCityMap[item.name] = item.children.length
})
export default {
    props: {
        value: {
            type: Object,
            default: () => ({
                location: [],
                province: [],
                city: [],
                type: 1
            })
        }
    },
    data() {
        return {
            location,
            type: this.value.type,
            searchStr: '',
            checkedLocation: [...this.value.location || []],
            selectCityMap: {}
        }
    },
    computed: {
        rightData() {
            let map = {}
            this.checkedLocation.forEach(item => {
                let pc = item.split('_')
                map[pc[0]] = map[pc[0]] || []
                map[pc[0]].push(pc[1])
            })
            return map
        },
        data() {
            let province = []
            let city = []
            this.selectCityMap = {}
            this.checkedLocation.forEach(item => {
                let pc = item.split('_')
                this.selectCityMap[pc[0]] = this.selectCityMap[pc[0]] || 0
                this.selectCityMap[pc[0]] ++
                if (province.indexOf(pc[0]) === -1) {
                    province.push(pc[0])
                }
                if (city.indexOf(pc[1]) === -1) {
                    city.push(pc[1])
                }
            })
            return {
                location: this.checkedLocation,
                province,
                city
            }
        }
    },
    methods: {
        switchHandle(event) {
            let ul = event.target.parentNode.parentNode
            if (ul.className !== 'open') {
                ul.className = 'open'
            } else {
                ul.className = ''
            }
        },
        checkShow(name, cname) {
            if (name.indexOf(this.searchStr) !== -1 || cname && JSON.stringify(cname).indexOf(this.searchStr) !== -1) {
                return true
            } else {
                return false
            }
        },
        checkAllState(name) {
            return this.data.province.indexOf(name) !== -1
        },
        selectAll(name, event) { // 全选
            let checked = event.target.checked
            let p = this.location.filter(item => item.name === name)[0] || {children: []}
            let clist = p.children.map(item => name + '_' + item.name)
            let list = [...this.checkedLocation]
            if (checked) {
                clist = clist.filter(item => list.indexOf(item) === -1)
                this.checkedLocation = [...list, ...clist]
            } else {
                this.checkedLocation = this.checkedLocation.filter(item => clist.indexOf(item) === -1)
            }
        },
        checkIndeterminate() {
            for (let p in countCityMap) {
                let checkbox = this.$refs.left_tree.querySelector('#p_' + p)
                if (this.selectCityMap[p] > 0 && this.selectCityMap[p] !== countCityMap[p]) {
                    checkbox.indeterminate = true
                } else {
                    checkbox.indeterminate = false
                }
            }
        },
        remove(p) {
            this.checkedLocation = this.checkedLocation.filter(item => item.indexOf(p) === -1)
        }
    },
    watch: {
        type() {
            this.$emit('input', {...this.data, type: this.type})
        },
        data: {
            handler(v) {
                this.checkIndeterminate() // 检查半选择状态
                this.$emit('input', {...v, type: this.type})
            },
            deep: true
        },
        value: {
            handler(v) {
                this.checkIndeterminate() // 检查半选择状态
            },
            deep: true
        }
    },
    mounted() {
        this.checkIndeterminate()
    }
}
</script>
<style lang='scss' scoped>
.location {
    user-select: none;
    font-size: 1rem;
    border: 1px solid #ccc;
    width: 500px;
    height: 400px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    &>div {
        font-size: 14px;
        align-items: stretch;
        text-align: left;
        border: 1px solid #ccc;
        width: 100%;
        margin: 10px;
        &>.location_title {
            background: #ccc;
            padding: 8px 10px;
        }
        &>.location_search {
            position: relative;
            padding: 10px 30px 10px 10px;
            & input {
                width: 100%;
                line-height: 25px;
                border-radius: 3px;
                border: 1px solid #ccc;
                padding-left: 5px;
                padding-right: 10px;
            }
            &>i {
                position: absolute;
                right: 16px;
                top: 16px;
                color: #aaa;
            }
        }
        &>.location_tree {
            overflow: auto;
            height: 280px;
            padding: 0 10px 10px 10px;
            & ul {
                list-style: none;
                padding: 0;
                margin: 0;
                & i {
                    color: #aaa;
                    font-size: 12px;
                    cursor: pointer;
                }
                &>.open {
                    &>span {
                        & .close {
                            display: none;
                        }
                        & .open {
                            display: inline;
                        }
                    }
                    &>.child_list {
                        display: block;
                    }
                }
                &>li {
                    line-height: 26px;
                    &>span> {
                        & .open {
                            display: none;
                        }
                    }
                }
                & .child_list {
                    padding-left: 16px;
                    display: none;
                }
            }
            &>.right_tree {
                & div {
                    padding-left: 17px;
                    text-align: right;
                    & span:first-child {
                        float: left;
                    }
                }
                & .remove {
                    cursor: pointer;
                    font-size: 16px;
                    width: 20px;
                    display: inline-block;
                    text-align: center;
                    height: 20px;
                    line-height: 20px;
                    &:hover {
                        background: #eee;
                    }
                }
            }
        }
        &>.right_location_tree {
            height: 330px;
        }
    }
}
</style>
