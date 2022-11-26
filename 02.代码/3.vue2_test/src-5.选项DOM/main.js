import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
/*
  面试题:请问能够控制Vue项目显示内容的地方有几个?
  回答:
    1.el配置选项
    2.template配置选项
    3.render配置选项

    优先级:render>template>el
*/

new Vue({
  el:"#app",
  data:{
    msg:"我是el的数据",
    msg2:"我是template的数据",
  },
  template:"<h2>我是template内容,{{msg2}}</h2>",
  render: function (h) { return h(App) },
  // render:h=>h(App)
})
// .$mount('#app')
