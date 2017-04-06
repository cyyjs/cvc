<template>
    <div class="picker" :style="style">
        <div class="picker_title">
            <label for="all">
                <input type="checkbox" name="all" id="all" @click="selectAll"> <span>全选</span>
            </label>
            <span v-show="!noLimit">已选择<strong>{{dateList.length}}</strong>天</span>
            <label for="noLimit">
                <input type="checkbox" name="noLimit" id="noLimit" v-model="noLimit" @click="changeNoLimit"> <span>不限结束时间</span>
            </label>
        </div>
        <div class="calendar-body">
            <div class="left">
                <div class="_head">
                    <button type="button" style="float:left;" @click="prevMonth">&lt;</button>
                    <span style="margin-left:-20px;">{{formatMonth(leftMonth)}}</span>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                        </tr>
                        <tr v-for="w in leftDays">
                            <td :class="{active: d && (noLimit ||  dateList.indexOf(leftMonthStr + '-' + d) !== -1), disabled: disabledDay(d, leftMonthStr + '-' + d), noselect: !d}" v-for="d in w" @click="selectDay(leftMonthStr + '-'+ d, $event)">{{d}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="right">
                <div class="_head">
                    <button type="button" style="float:right;" @click="nextMonth">&gt;</button>
                    <span style="margin-left:20px;">{{formatMonth(rightMonth)}}</span>
                </div>
                <table cellpadding=1>
                    <tbody>
                        <tr>
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                        </tr>
                        <tr v-for="w in rightDays">
                            <td :class="{active: d && (noLimit ||  dateList.indexOf(rightMonthStr + '-' + d) !== -1), disabled: disabledDay(d, rightMonthStr + '-' + d), noselect: !d}" v-for="d in w" @click="selectDay(rightMonthStr + '-'+ d, $event)">{{d}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => ({
                date: [],
                date_no_limit: 2
            })
        },
        style: {
            type: Object,
            default: () => ({})
        },
        min: [String, Date]
    },
    data() {
        return {
            leftMonth: null,
            rightMonth: null,
            noLimit: this.value.date_no_limit === 1,
            dateList: [...this.value.date]
        }
    },
    computed: {
        leftDays() {
            let day = new Date(this.leftMonth)
            return this.getDays(day)
        },
        rightDays() {
            let day = new Date(this.rightMonth)
            return this.getDays(day)
        },
        leftMonthStr() {
            return this.getYYYYMM(this.leftMonth)
        },
        rightMonthStr() {
            return this.getYYYYMM(this.rightMonth)
        },
        minDay() {
            let d = null
            if (!this.min) {
                d = new Date()
            } else if (typeof this.min === 'string') {
                d = new Date(this.min)
            } else {
                d = new Date(this.min)
            }
            d.setDate(d.getDate() - 1)
            return d
        },
        allDays() {
            let prevMonth = this.leftMonthStr
            let nextMonth = this.rightMonthStr
            let list = []
            this.leftDays.forEach(w => {
                w.forEach(d => {
                    if (d) {
                        list.push([prevMonth, d].join('-'))
                    }
                })
            })
            this.rightDays.forEach(w => {
                w.forEach(d => {
                    if (d) {
                        list.push([nextMonth, d].join('-'))
                    }
                })
            })
            return list
        }
    },
    methods: {
        disabledDay(d, ymd) {
            if (d && this.minDay) {
                if (new Date(ymd) < this.minDay) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        formatMonth(date) {
            return [date.getFullYear(), date.getMonth() + 1].join('年') + '月'
        },
        prevMonth() {
            let date = this.rightMonth
            this.rightMonth = new Date(date.setMonth(date.getMonth() - 1))
            this.leftMonth = new Date(date.setMonth(date.getMonth() - 1))
        },
        nextMonth() {
            let date = this.leftMonth
            this.leftMonth = new Date(date.setMonth(date.getMonth() + 1))
            this.rightMonth = new Date(date.setMonth(date.getMonth() + 1))
        },
        getYYYYMM(date) {
            return [date.getFullYear(), date.getMonth() + 1].join('-')
        },
        getDays(nextMonth) {
            let m = new Date(nextMonth)
            m.setMonth(m.getMonth() + 1) // 获取前一个月最后一天
            m.setDate(0)
            let sumDay = m.getDate()    // 获取最后一天日期
            let lestWeek = m.getDay() || 0  // 获取最后一天星期
            let firstWeek = lestWeek - sumDay % 7 + 1 // 获取第一天的星期
            if (firstWeek < 0) {
                firstWeek = 7 + firstWeek
            }
            let list = []
            let w = []
            // console.log(sumDay, lestWeek, firstWeek)
            for (let i = 0 - firstWeek; i < sumDay; i++) {
                if (w.length < 7) {
                    if (i >= 0) {
                        w.push(i + 1)
                    } else {
                        w.push('')
                    }
                } else {
                    list.push(w)
                    w = [i + 1]
                }
            }
            if (w.length) {
                list.push(w)
            }
            return list
        },
        selectAll(event) {
            if (event.target.checked) {
                let all = this.allDays.filter(item => this.dateList.indexOf(item) === -1)
                if (this.minDay) {
                    all = all.filter(item => new Date(item) > this.minDay)
                }
                let addList = all
                this.dateList = this.dateList.concat(addList)
            } else {
                this.dateList = this.dateList.filter(item => {
                    if (this.allDays.indexOf(item) !== -1) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            this.changeDateList()
        },
        selectDay(d, event) {
            if (event.target.className) {
                this.dateList = this.dateList.filter(item => item !== d)
            } else {
                this.dateList.push(d)
            }
            this.changeDateList()
        },
        changeDateList() {
            this.$emit('input', {
                date_no_limit: this.noLimit ? 1 : 2,
                date: this.dateList
            })
        },
        changeNoLimit() {
            this.dateList = []
            this.changeDateList()
        }
    },
    watch: {
        value(v) {
            this.noLimit = v.date_no_limit === 1
            this.dateList = [...v.date]
        }
    },
    created() {
        let date = new Date()
        this.leftMonth = new Date()
        this.rightMonth = new Date(date.setMonth(date.getMonth() + 1))
        this.dateList = [...this.value.date]
    }
}
</script>
<style lang='scss' scoped>
.flex {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: space-between;
}

.picker {
    user-select: none;
    width: 500px;
    padding: 5px;
    & ._head {
        line-height: 30px;
        font-size: 14px;
        text-align: center;
        &>button {
            margin-top: 4px;
            width: 30px;
            border: none;
            background: none;
            outline: none;
            cursor: pointer;
            font-size: 12px;
        }
    }
    & .picker_title {
        font-size: 14px;
        line-height: 30px;
        @extend .flex;
    }
    & .calendar-body {
        @extend .flex;
        &>div {
            padding: 10px;
            flex-grow: 1;
            align-items: stretch;
            border: 1px solid #ccc;
            &:last-child {
                border-left: 0;
            }
            table {
                width: 100%;
                font-size: 12px;
                min-width: 224px;
                color: #666;
                & td {
                    line-height: 30px;
                    width: 30px;
                    text-align: center;
                    cursor: pointer;
                    &:hover {
                        background: #e4e8f1;
                    }
                    &.active {
                        background-color: #20a0ff!important;
                        color: #fff;
                    }
                    &.disabled {
                        background-color: #f4f4f4;
                        opacity: 1;
                        cursor: not-allowed;
                        color: #ccc;
                    }
                    &.noselect:hover {
                        background: #fff;
                    }
                }
            }
        }
    }
}
</style>
