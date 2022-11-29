import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode:"hash",
    // mode:"history",
    routes:[
        {
            path:"/home",
            component:Home,
            meta:{
                isShowHeader:true
            }
        },
        {
            path:"/about",
            component:About
        }
    ]
});

export default router;