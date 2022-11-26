<template>
  <div id="app">
    <h1>我是APP的name:{{ user.name }}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App" />
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
      msg: "我是data中的数据",
      user: {
        name: "xiaoming"
      }
    }
  },
  // provide:{
  //   msg:"我是APP组件的数据"
  // }
  provide() {
    return {
      msg: this.msg,
      // user:Vue.observable({
      //   name:"xiaoming"
      // })
      user: this.user
    }
  },
  mounted(){
    // setTimeout(()=>{
    //   this.user.name="laowang"
    // },3000)
  }
}
</script>

<style>

</style>
