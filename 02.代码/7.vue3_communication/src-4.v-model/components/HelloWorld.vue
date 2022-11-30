<template>
  <div class="hello">
    <h1>hello</h1>
    <h2 @click="handler">Hello的msg:{{modelValue}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<script setup>
/*
  Vue3的v-model注意点：
    1.默认的标签属性名从value改为了modelValue
    2.默认的事件名称从input改为了update:[prop名称]
    3.属性名可以通过在v-model:新的属性名方式进行配置
*/
defineProps(["modelValue"])
const emits = defineEmits(["update:modelValue"]);

const  handler = ()=>{
  emits('update:modelValue','我是Hello的数据')
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
