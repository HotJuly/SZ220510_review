import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Vue.filter('myFilter',function(value){
//   // console.log('myFilter')
//   return value+"!!!!!!!!!!!!!!"
// })

/*
  需求:项目中,所有的组件,在他们挂载结束的时候,需要打印他们的组件名称
  答案:可以使用混合来实现

  混合分为两种:
    1.全局混合
    2.局部混合

  注意点:
    1.如果混合中,出现了生命周期钩子函数,而且组件内部也有相同的钩子函数,那么三者可以共存
    2.如果除了生命周期钩子函数之外的东西,出现了冲突
      那么优先级 组件内置优先>局部混合>全局混合

*/

Vue.mixin({
  mounted(){
    console.log('全局混合',this.$options.name)
  }
})

new Vue({
  name:"Root",
  render: function (h) { return h(App) },
}).$mount('#app')
