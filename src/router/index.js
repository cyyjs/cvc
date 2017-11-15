import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import DatePicker from '@/views/date-picker'
import Location from '@/views/location'
import Schedule from '@/views/schedule'
import Draggable from '@/views/draggable'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello
    }, {
        path: '/date-picker',
        name: 'DatePicker',
        component: DatePicker
    }, {
        path: '/location',
        name: 'Location',
        component: Location
    }, {
        path: '/schedule',
        name: 'Schedule',
        component: Schedule
    }, {
        path: '/draggable',
        name: 'Draggable',
        component: Draggable
    }]
})
