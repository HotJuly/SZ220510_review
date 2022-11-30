<template>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import myBus from '@/myBus';
import HelloWorld from '@/components/HelloWorld'

myBus.on('getMsg',(data)=>{
  console.log('getMsg',data)
})

</script>

<style>
</style>
