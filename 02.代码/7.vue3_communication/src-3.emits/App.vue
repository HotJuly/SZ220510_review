<template>
  <h1>App的msg:{{msg}}</h1>
  <HelloWorld @abc="handler"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref} from 'vue';
import HelloWorld from '@/components/HelloWorld'
const msg = ref("我是APP的初始化数据")

const handler = (data)=>{
  // console.log('handler',data)
  msg.value = data;
}
</script>

<style>
</style>
