<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>pageX:{{pageX}}</h1>
    <h1>pageY:{{pageY}}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import moveMixin from '@/mixins/moveMixin'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  mixins:[moveMixin],
  data(){
    return{
      pageX:-1
    }
  }
}
</script>

<style>
</style>
