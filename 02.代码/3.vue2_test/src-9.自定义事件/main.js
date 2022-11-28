import Vue from 'vue'
import App from './App.vue'

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false

new Vue({
  // beforeCreate(){
  //   Vue.prototype.$bus = this;
  // },
  render: function (h) { return h(App) },
}).$mount('#app')
