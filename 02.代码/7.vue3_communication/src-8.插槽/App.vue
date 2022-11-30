<template>
  <HelloWorld>
  <!-- 如果书写了template标签就必须书写#default,否则无法显示该默认插槽 -->
    <h1>我是默认插槽</h1>
    <template #header>
      <h1>我是header插槽</h1>
    </template>
    <template #footer="scope">
      <h1>我是header插槽,{{scope.msg}}</h1>
    </template>
  </HelloWorld>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import HelloWorld from '@/components/HelloWorld'

</script>

<style>
</style>
