<template>
  <HelloWorld ref="hello666"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref,onMounted} from 'vue';
import HelloWorld from '@/components/HelloWorld'

const hello666 = ref();

onMounted(() => {
  console.log(hello666.value.msg)
  console.log(hello666.value.clickHandler)
})

</script>

<style>
</style>
