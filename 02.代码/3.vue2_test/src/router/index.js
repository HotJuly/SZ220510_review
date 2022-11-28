import Vue from 'vue'
import VueRouter from 'vue-router'

import A from '@/components/A.vue'
import B from '@/components/B.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode:"hash",
    routes:[
        {
            path:"/A",
            component:A
        },
        
        {
            path:"/B",
            component:B
        }
    ]
})