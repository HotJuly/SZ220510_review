<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <h1>{{ msg }}</h1>
    <h1 v-pre>{{msg}}</h1>
    <h1 v-once>{{ msg }}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: 'APP'
    }
  },
  mounted() {
    setTimeout(() => {
      this.msg = 'hello'
    }, 2000)
  }
}
</script>

<style>

</style>
