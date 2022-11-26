import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true;

/*
  需求:将每个配置对象中的a属性,数值+1
  解决方案:通过Vue的自定义合并策略,可以一次性修改当前项目中所有组件的配置对象
*/

// Vue.config.optionMergeStrategies.a = function (parent, child, vm) {
//   console.log(parent, child, vm)
//   return child *2
// }

/*
  面试题:请问你是如何捕获到项目中出现的报错的?
  回答:
    1.try...catch(){}
      只能捕获一段代码中的报错
    2.Promise->catch方法
      只能捕获promise的报错
    3.errorCaptured->生命周期
      只能捕获后代组件的报错
    4.Vue.config.errorHandler
      该API可以捕获整个项目出现的所有报错
      如果是Vue项目就用这个
    5.window.onerror=function(){}
      如果是原生js项目,就用这个


  面试题:请问项目上线之后,你是如果知道项目出现了什么BUG的?
  回答:
    1.首先我们会通过上面的那些方法,捕获到项目中出现的错误
    2.通过在回调函数中,使用ajax请求,将这些报错信息发送到公司统一的错误收集服务器
    3.最终相关部门会收集报错,汇总到错误平台中,根据平台信息进行维护
*/

Vue.config.errorHandler=function(err, vm, info){
  console.log(err, vm, info)
}

Vue.config.ignoredElements = [
  "About",
  /^t-/
]

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
