<template>
    <div class="schedule">
        <div class="schedule_title">
            <span>快捷设置</span>
            <label for="st1">
                <input type="radio" id="st1" name="select_type" value="all" v-model="selectType">全时段投放
            </label>
            <label for="st2">
                <input type="radio" id="st2" name="select_type" value="workDay" v-model="selectType">周一到周五投放
            </label>
            <label for="st3">
                <input type="radio" id="st3" name="select_type" value="weekend" v-model="selectType">周六、周日投放
            </label>
            <span class="tip">
                <span>未选</span>
            <span>已选</span>
            </span>
        </div>
        <table cellspacing="0">
            <thead>
                <tr>
                    <th></th>
                    <th v-for="i in 24" @click="clickHead(i-1)">{{i-1}}</th>
                </tr>
            </thead>
            <tbody @click="clickTbody">
                <tr v-for="w in 7">
                    <td class="week" @click="clickDate(w-1)">
                        周{{weekList[w-1]}}
                    </td>
                    <td :class="{item: true, active: active(w -1, h)}" v-for="h in 24" :data="w -1 + ('0' + (h -1)).slice(-2)"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
let all = []
let workDay = []
let weekend = []
for (let start = 0; start < 7; start++) {
    for (let i = 0; i < 24; i++) {
        let item = start + ('0' + i).slice(-2)
        all.push(item)
        if (start === 0 || start === 6) {
            weekend.push(item)
        } else {
            workDay.push(item)
        }
    }
}
let selectTypeDays = {
    all,
    workDay,
    weekend
}
export default {
    props: {
        value: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    data() {
        return {
            weekList: ['日', '一', '二', '三', '四', '五', '六'],
            data: this.value,
            show: 0,
            selectType: null
        }
    },
    methods: {
        checkoutAll(event) {
            this.checkedAll = event.target.checked
            if (this.checkedAll) {
                this.data = this.all
            } else {
                this.data = []
            }
        },
        clickHead(i) {
            let h = ('0' + i).slice(-2)
            let hasSelect = !!this.data.filter(item => item.endsWith(h)).length
            if (hasSelect) {
                this.data = this.data.filter(item => !item.endsWith(h))
            } else {
                let hl = []
                for (let i = 0; i < 7; i++) {
                    let item = i + h
                    if (!this.data.includes(item)) {
                        hl.push(item)
                    }
                }
                this.data = this.data.concat(hl)
            }
        },
        clickDate(d) {
            let hasSelect = !!this.data.filter(item => item.startsWith(String(d))).length
            if (hasSelect) {
                this.data = this.data.filter(item => !item.startsWith(String(d)))
            } else {
                let hl = []
                for (var i = 0; i < 24; i++) {
                    let item = d + ('0' + i).slice(-2)
                    if (!this.data.includes(item)) {
                        hl.push(item)
                    }
                }
                this.data = this.data.concat(hl)
            }
        },
        clickTbody(event) {
            let target = event.target
            if (target.tagName === 'TD') {
                let v = target.getAttribute('data')
                if (!v) {
                    return false
                }
                if (this.data.indexOf(v) !== -1) {
                    this.data = this.data.filter(i => i !== v)
                } else {
                    this.data.push(v)
                }
            }
        },
        active(d, h) {
            let str = d + ('0' + (h - 1)).slice(-2)
            return this.data.indexOf(str) !== -1
        }
    },
    watch: {
        data(n) {
            this.$emit('input', n)
        },
        value(v) {
            this.data = v
        },
        selectType(v) {
            this.data = [...selectTypeDays[v]]
        }
    },
    mounted() {
        // console.log('sss', this.value)
    }
}
</script>
<style lang='scss' scoped>
.schedule {
    border: 1px solid #ccc;
    width: 620px;
    padding: 10px;
    & .schedule_title {
        text-align: left;
        font-size: 14px;
        line-height: 30px;
        &>label {
            margin: 0 10px;
        }
        & .tip {
            &>span {
                margin-left: 10px;
                &:first-child {
                    margin-left: 40px;
                }
                &:last-child {
                    &::before {
                        background: #20a0ff;
                    }
                }
                &::before {
                    content: " ";
                    display: inline-block;
                    border: 1px solid #ccc;
                    width: 18px;
                    height: 18px;
                    vertical-align: text-bottom;
                    margin-right: 5px;
                }
            }
        }
    }
    & table {
        user-select: none;
        width: 620px;
        font-size: 12px;
        & thead>tr>th {
            width: 24px;
            height: 24px;
            line-height: 24px;
            cursor: pointer;
        }
        tbody {
            & td {
                border-right: 1px solid #ddd;
                border-top: 1px solid #ddd;
                line-height: 24px;
                width: 24px;
                padding: 0;
                text-align: center;
                transition: all .2s ease-in-out;
                cursor: pointer;
            }
            &>tr:last-child>td:not(.week) {
                border-bottom: 1px solid #ddd;
            }
            .active {
                background: #20a0ff;
            }
        }
        .week {
            background: #fff;
            border: 0;
            border-right: 1px solid #ddd;
            width: 40px;
        }
    }
}
</style>
