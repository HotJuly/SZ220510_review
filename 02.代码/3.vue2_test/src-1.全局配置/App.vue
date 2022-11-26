<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <About></About>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

// 每个.vue文件,暴露出去的都是一个配置对象
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  a:1,
  mounted(){
    // console.log('App',this.$options.a)
    // console.log(c)
  }
}
</script>

<style>
</style>
