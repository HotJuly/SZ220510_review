<template>
  <div class="hello">
    <h1>hello</h1>
    <h1>pageX:{{pageX}}</h1>
    <h1>pageY:{{pageY}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
import moveHook from '@/hooks/moveHook';
const {pageX,pageY} =  moveHook();


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
