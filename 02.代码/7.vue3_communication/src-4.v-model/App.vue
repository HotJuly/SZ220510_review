<template>
  <h1>App的msg:{{msg}}</h1>
  <!-- <HelloWorld v-model:msg="msg"/> -->
  <HelloWorld v-model="msg"/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import {ref} from'vue'
import HelloWorld from '@/components/HelloWorld'

const msg = ref('我是APP的数据')

</script>

<style>
</style>
