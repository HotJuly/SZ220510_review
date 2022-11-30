<template>
  <HelloWorld/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {provide,ref} from 'vue'
import HelloWorld from '@/components/HelloWorld'
/*
provide:{
  msg:666,
  age:3
}
*/
const msg = ref(666);
provide('msg',msg);
provide('age',3);
</script>

<style>
</style>
