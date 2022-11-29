<template>
  <div id="app">
    <h1>arr[0]:{{arr[0]}}</h1>
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
      arr:[6,7,8]
    }
  },
  mounted(){
    setTimeout(()=>{
        // this.arr[0] = 9;
        // this.arr.splice(0,1,9);
        // console.log(this.arr)

        const arr = [6,7,8]
        arr.splice(0,1,9);
        console.log(arr)
      },3000)
  }
}
</script>

<style>
</style>
