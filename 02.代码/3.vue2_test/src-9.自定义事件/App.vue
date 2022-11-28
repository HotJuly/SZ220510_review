<template>
  <div id="app">
    <h1>App:{{msg}}</h1>
    <!-- <HelloWorld :msg.sync="msg"/> -->
    <HelloWorld :msg="msg" @update:msg="(data)=>msg=data"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      msg:"我是App的数据"
    }
  },
  mounted(){
    // console.log(2)
    this.$bus.$emit('getMsg',123)

    setTimeout(()=>{
      this.$destroy();
      this.msg = 777
    },3000)
  }
}
</script>

<style>
</style>
