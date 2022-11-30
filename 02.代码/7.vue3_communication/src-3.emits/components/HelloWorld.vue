<template>
  <div class="hello">
    <h1 @click="clickHandler">hello</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
const emits = defineEmits(["abc"]);
// console.log(emits)

const clickHandler = ()=>{
  emits('abc',123)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
